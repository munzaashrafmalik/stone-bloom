import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send Order Confirmation Email to Customer
export const sendOrderConfirmationEmail = async (order, customerEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: customerEmail,
    subject: '🎉 Order Confirmed - Stone & Bloom',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #b76e79 0%, #d4a5d4 100%); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Your Order!</h1>
          <p style="color: white; font-size: 18px;">Order #${order._id.toString().slice(-8).toUpperCase()}</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Dear ${order.shippingAddress.fullName},</p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            Thank you for shopping at <strong>Stone & Bloom</strong>! 
            Your order has been placed successfully and we're processing it now.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #b76e79; margin-top: 0;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Order ID:</strong></td>
                <td style="padding: 10px 0; color: #333;">#${order._id.toString().slice(-8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Order Date:</strong></td>
                <td style="padding: 10px 0; color: #333;">${new Date(order.createdAt).toLocaleDateString('en-PK')}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Payment Method:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.paymentMethod}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Total Amount:</strong></td>
                <td style="padding: 10px 0; color: #b76e79; font-size: 18px; font-weight: bold;">Rs. ${order.totalPrice}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #b76e79; margin-top: 0;">Shipping Address</h2>
            <p style="color: #555; line-height: 1.8;">
              ${order.shippingAddress.fullName}<br/>
              ${order.shippingAddress.street}<br/>
              ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br/>
              ${order.shippingAddress.country}<br/>
              Phone: ${order.shippingAddress.phone}
            </p>
          </div>
          
          <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <p style="color: #2e7d32; font-size: 15px; margin: 0;">
              📦 We'll send you another email when your order ships!
            </p>
          </div>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            Need help? Contact us:<br/>
            📞 0336-6840648<br/>
            📧 munzamalik09@gmail.com
          </p>
        </div>
        
        <div style="background: #b76e79; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
          <p style="color: white; margin: 0; font-size: 14px;">
            © 2026 Stone & Bloom - Premium Jewelry Collection
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent to:', customerEmail);
    return { success: true };
  } catch (error) {
    console.error('❌ Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send New Order Notification to Owner
export const sendNewOrderNotificationToOwner = async (order) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.OWNER_EMAIL,
    subject: '🎉 NEW ORDER RECEIVED! - Stone & Bloom',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
          <h1 style="color: white; margin: 0;">🎉 New Order Received!</h1>
          <p style="color: white; font-size: 18px;">Order #${order._id.toString().slice(-8).toUpperCase()}</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Dear Admin,</p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            You have received a new order on <strong>Stone & Bloom</strong>!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #4caf50; margin-top: 0;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.shippingAddress.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.shippingAddress.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.user?.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>City:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.shippingAddress.city}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #4caf50; margin-top: 0;">Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Order ID:</strong></td>
                <td style="padding: 10px 0; color: #333;">#${order._id.toString().slice(-8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Items:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.orderItems.length} products</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Payment:</strong></td>
                <td style="padding: 10px 0; color: #333;">${order.paymentMethod}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Total:</strong></td>
                <td style="padding: 10px 0; color: #4caf50; font-size: 18px; font-weight: bold;">Rs. ${order.totalPrice}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5173/admin/orders" 
               style="background: #4caf50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
              View Order in Admin Panel
            </a>
          </div>
        </div>
        
        <div style="background: #4caf50; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
          <p style="color: white; margin: 0; font-size: 14px;">
            © 2026 Stone & Bloom Admin Panel
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ New order notification sent to owner:', process.env.OWNER_EMAIL);
    return { success: true };
  } catch (error) {
    console.error('❌ Email send error:', error);
    return { success: false, error: error.message };
  }
};
