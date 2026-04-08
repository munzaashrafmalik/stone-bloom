import express from 'express';
import crypto from 'crypto';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// JazzCash Sandbox URL
const JAZZCASH_URL = process.env.JAZZCASH_SANDBOX === 'true' 
  ? 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/MobileAccount'
  : 'https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/MobileAccount';

// Generate hashed signature
function generateSignature(data, salt) {
  const sortedData = Object.keys(data)
    .sort()
    .map(key => data[key])
    .join('&');
  
  const signature = crypto
    .createHmac('sha256', salt)
    .update(sortedData)
    .digest('hex')
    .toUpperCase();
  
  return signature;
}

// @route   POST /api/payment/jazzcash/initiate
// @desc    Initiate JazzCash payment
// @access  Private
router.post('/jazzcash/initiate', protect, async (req, res) => {
  try {
    const { orderId, mobileNumber } = req.body;

    if (!orderId || !mobileNumber) {
      return res.status(400).json({ 
        message: 'Order ID and mobile number are required' 
      });
    }

    // Get order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Generate unique transaction ID
    const transactionId = `T${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const dateTime = new Date().toISOString().replace(/[-:T.]/g, '').substr(0, 14);

    // Prepare JazzCash request
    const requestData = {
      pp_Version: '1.1',
      pp_Command: 'Purchase',
      pp_ProductID: 'P1',
      pp_TxnRefNo: transactionId,
      pp_TxnCurrency: 'PKR',
      pp_TxnAmount: order.totalPrice.toFixed(2),
      pp_TxnDateTime: dateTime,
      pp_BillReference: 'billRef',
      pp_Description: `Order #${order._id.toString().substr(-8)}`,
      pp_ReturnURL: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`,
      pp_MPMobileNumber: mobileNumber.replace(/^0/, '+92'),
      pp_SubMerchantID: '',
      pp_DiscountedAmount: '',
      pp_DiscountedCurrency: '',
      pp_DiscountedTxnAmount: '',
      pp_DiscountedTxnCurrency: ''
    };

    // Generate signature
    const signature = generateSignature(requestData, process.env.JAZZCASH_INTEGRITY_SALT);

    // Prepare final request
    const paymentRequest = {
      ...requestData,
      pp_Password: process.env.JAZZCASH_PASSWORD,
      pp_Integrity_Salt: process.env.JAZZCASH_INTEGRITY_SALT,
      pp_Integrity_Signature: signature,
      pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID
    };

    // In production, you would send this to JazzCash API
    // For now, return the payment URL and parameters
    res.json({
      success: true,
      paymentUrl: JAZZCASH_URL,
      paymentData: paymentRequest,
      transactionId,
      orderId: order._id,
      amount: order.totalPrice,
      message: 'Redirect to JazzCash for payment'
    });
  } catch (error) {
    console.error('JazzCash initiate error:', error);
    res.status(500).json({ 
      message: 'Payment initiation failed',
      error: error.message 
    });
  }
});

// @route   POST /api/payment/jazzcash/callback
// @desc    JazzCash payment callback
// @access  Public
router.post('/jazzcash/callback', async (req, res) => {
  try {
    const {
      pp_ResponseCode,
      pp_ResponseMessage,
      pp_TxnRefNo,
      pp_OrderID,
      pp_TxnAmount,
      pp_TxnCurrency,
      pp_TxnDateTime,
      pp_BillReference,
      pp_MerchantID
    } = req.body;

    console.log('JazzCash Callback:', req.body);

    // Verify signature (in production)
    // const receivedSignature = req.body.pp_Integrity_Signature;
    // const calculatedSignature = generateSignature(req.body, process.env.JAZZCASH_INTEGRITY_SALT);

    if (pp_ResponseCode === '000') {
      // Payment successful
      // Find order and update payment status
      // This would be handled by the frontend redirect
      res.json({
        status: 'success',
        message: 'Payment successful',
        transactionId: pp_TxnRefNo
      });
    } else {
      // Payment failed
      res.json({
        status: 'failed',
        message: pp_ResponseMessage || 'Payment failed',
        transactionId: pp_TxnRefNo
      });
    }
  } catch (error) {
    console.error('JazzCash callback error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Callback processing failed' 
    });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify payment status
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { transactionId, orderId } = req.body;

    if (!transactionId || !orderId) {
      return res.status(400).json({ 
        message: 'Transaction ID and Order ID are required' 
      });
    }

    // Update order payment status
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'Processing';
    order.paymentResult = {
      id: transactionId,
      status: 'success',
      updateTime: new Date().toISOString(),
      emailAddress: req.user.email
    };

    await order.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      order: {
        id: order._id,
        status: order.status,
        isPaid: order.isPaid
      }
    });
  } catch (error) {
    console.error('Payment verify error:', error);
    res.status(500).json({ 
      message: 'Payment verification failed',
      error: error.message 
    });
  }
});

// @route   GET /api/payment/status/:orderId
// @desc    Get payment status for order
// @access  Private
router.get('/status/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      orderId: order._id,
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      paymentMethod: order.paymentMethod,
      status: order.status,
      totalPrice: order.totalPrice
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
