import { useState } from 'react';
import { FaTimes, FaRuler, FaQuestionCircle } from 'react-icons/fa';

const SizeGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('rings');

  if (!isOpen) return null;

  const ringSizes = [
    { size: '5', diameter: '15.7mm', circumference: '49.3mm' },
    { size: '6', diameter: '16.5mm', circumference: '51.9mm' },
    { size: '7', diameter: '17.3mm', circumference: '54.4mm' },
    { size: '8', diameter: '18.1mm', circumference: '57.0mm' },
    { size: '9', diameter: '18.9mm', circumference: '59.5mm' },
    { size: '10', diameter: '19.8mm', circumference: '62.1mm' },
  ];

  return (
    <div className="modal active" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <FaRuler style={{ fontSize: '40px', color: '#b76e79', marginBottom: '15px' }} />
          <h2 style={{ fontSize: '28px', color: '#333' }}>Size Guide</h2>
          <p style={{ color: '#666', fontSize: '15px' }}>Find your perfect fit</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <button
            onClick={() => setActiveTab('rings')}
            style={{
              flex: 1,
              padding: '12px',
              background: activeTab === 'rings' ? '#b76e79' : '#f5f5f5',
              color: activeTab === 'rings' ? 'white' : '#666',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Ring Size Chart
          </button>
          <button
            onClick={() => setActiveTab('how-to')}
            style={{
              flex: 1,
              padding: '12px',
              background: activeTab === 'how-to' ? '#b76e79' : '#f5f5f5',
              color: activeTab === 'how-to' ? 'white' : '#666',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            How to Measure
          </button>
        </div>

        {/* Ring Size Chart */}
        {activeTab === 'rings' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Size</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Diameter</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Circumference</th>
                </tr>
              </thead>
              <tbody>
                {ringSizes.map((ring, index) => (
                  <tr key={ring.size} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{ring.size}</td>
                    <td style={{ padding: '12px' }}>{ring.diameter}</td>
                    <td style={{ padding: '12px' }}>{ring.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* How to Measure */}
        {activeTab === 'how-to' && (
          <div style={{ padding: '20px 0' }}>
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
                Method 1: Measure Your Finger
              </h3>
              <ol style={{ paddingLeft: '20px', color: '#666', lineHeight: '2' }}>
                <li>Wrap a thin strip of paper around your finger</li>
                <li>Mark where the paper overlaps</li>
                <li>Measure the length in millimeters</li>
                <li>Divide by 3.14 to get the diameter</li>
                <li>Match with the size chart above</li>
              </ol>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>
                Method 2: Measure an Existing Ring
              </h3>
              <ol style={{ paddingLeft: '20px', color: '#666', lineHeight: '2' }}>
                <li>Take a ring that fits well</li>
                <li>Measure the inside diameter in millimeters</li>
                <li>Match with the size chart above</li>
              </ol>
            </div>

            <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '10px' }}>
              <p style={{ color: '#856404', fontSize: '14px', margin: 0 }}>
                <FaQuestionCircle style={{ marginRight: '8px' }} />
                <strong>Tip:</strong> Measure your finger at the end of the day when it's warm for the most accurate size.
              </p>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="btn btn-primary btn-block"
          style={{ marginTop: '25px', padding: '15px' }}
        >
          Got It!
        </button>
      </div>
    </div>
  );
};

export default SizeGuideModal;
