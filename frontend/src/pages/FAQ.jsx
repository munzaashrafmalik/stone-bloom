import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Q: What types of earrings do you offer?",
      answer: "We offer a wide variety of earrings including Korean style, pearl, zircon, butterfly, flower, bow, heart, and many more designs. All our earrings are made from high-quality materials with gold and silver plating."
    },
    {
      question: "Q: Are your earrings hypoallergenic?",
      answer: "Yes! Most of our earrings are made from hypoallergenic materials like alloy and stainless steel, making them safe for sensitive ears. However, if you have extremely sensitive skin, we recommend consulting with your doctor first."
    },
    {
      question: "Q: How long does the plating last?",
      answer: "With proper care, our gold and silver plating can last 6-12 months or even longer. To extend the life of your jewelry, avoid contact with water, perfumes, and chemicals. Store in a dry place when not in use."
    },
    {
      question: "Q: What is your delivery time?",
      answer: "We deliver nationwide in Pakistan. Delivery time is typically 3-7 working days for major cities (Karachi, Lahore, Islamabad) and 5-10 days for smaller towns and remote areas."
    },
    {
      question: "Q: Do you offer Cash on Delivery (COD)?",
      answer: "Yes! We offer Cash on Delivery (COD) all over Pakistan. You can pay when you receive your order. We also accept JazzCash and other digital payment methods."
    },
    {
      question: "Q: What is your return policy?",
      answer: "We offer a 7-day return policy. If you receive a damaged or wrong item, please contact us within 48 hours of delivery. Items must be in original condition with tags intact for returns."
    },
    {
      question: "Q: How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via SMS and email. You can use this number to track your order on our Track Order page or contact us at 0336-6840648."
    },
    {
      question: "Q: Do you offer free shipping?",
      answer: "Yes! We offer FREE shipping on all orders above Rs. 5,000. For orders below Rs. 5,000, a nominal shipping charge of Rs. 200 applies."
    },
    {
      question: "Q: Can I exchange earrings if they don't match my preference?",
      answer: "Yes, we offer exchanges within 7 days of delivery. The earrings must be unused, in original packaging with tags. Contact us at 0336-6840648 or munzamalik09@gmail.com to initiate an exchange."
    },
    {
      question: "Q: Are your earrings suitable for bridal wear?",
      answer: "Absolutely! We have a special collection of bridal and party wear earrings that are perfect for weddings, Eid, and other special occasions. Check out our Party Wear Earrings collection."
    },
    {
      question: "Q: How should I care for my jewelry?",
      answer: "To keep your jewelry looking new: 1) Keep away from water and moisture 2) Avoid contact with perfumes and chemicals 3) Store in a dry place, preferably in a jewelry box 4) Clean gently with a soft cloth 5) Remove during physical activities."
    },
    {
      question: "Q: Do you have a physical store?",
      answer: "Currently, we operate online only. Our office is located in Saddar, Karachi. You can visit by appointment only. Contact us at 0336-6840648 to schedule a visit."
    },
    {
      question: "Q: Can I cancel my order after placing it?",
      answer: "Yes, you can cancel your order within 24 hours of placing it. After 24 hours, the order may have already been processed for shipping. Contact us immediately at 0336-6840648 for cancellations."
    },
    {
      question: "Q: Do you ship internationally?",
      answer: "Currently, we only ship within Pakistan. International shipping will be available soon. Stay tuned!"
    },
    {
      question: "Q: How can I contact customer support?",
      answer: "You can reach us at:\n📞 Phone: 0336-6840648\n💬 WhatsApp: 0336-6840648\n📧 Email: stone.bloom09@gmail.com\n📍 Location: Saddar, Karachi, Pakistan\n\nBusiness Hours: Mon-Sat 10AM-9PM, Sun 12PM-8PM"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff9fa', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #ffb6c1 0%, #d4a5d4 100%)', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', color: 'white', marginBottom: '15px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          ❓ Frequently Asked Questions
        </h1>
        <p style={{ fontSize: '18px', color: 'white', opacity: 0.95 }}>
          Find answers to common questions about our jewelry
        </p>
      </div>

      {/* FAQs */}
      <div style={{ maxWidth: '900px', margin: '-40px auto 0', padding: '0 20px' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: '15px',
              marginBottom: '15px',
              boxShadow: '0 4px 15px rgba(255, 182, 193, 0.2)',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: '25px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '17px', fontWeight: '600', color: '#2d2d2d' }}>
                {faq.question}
              </span>
              <span style={{ fontSize: '20px', color: '#ffb6c1', transition: 'transform 0.3s ease' }}>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            
            {openIndex === index && (
              <div style={{ padding: '0 25px 25px', color: '#666', lineHeight: '1.8', fontSize: '15px' }}>
                <div style={{ paddingTop: '15px', borderTop: '2px solid #f0e6e6' }}>
                  {faq.answer.split('\n').map((line, i) => (
                    <p key={i} style={{ marginBottom: '10px' }}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div style={{ maxWidth: '900px', margin: '40px auto 0', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #ffb6c1 0%, #d4a5d4 100%)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '15px' }}>Still Have Questions?</h2>
          <p style={{ fontSize: '16px', color: 'white', opacity: 0.95, marginBottom: '25px' }}>
            Our customer support team is here to help!
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <a href="tel:03366840648" style={{ background: 'white', color: '#ffb6c1', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              📞 Call Us
            </a>
            <a href="https://wa.me/923366840648" target="_blank" rel="noopener noreferrer" style={{ background: 'white', color: '#25D366', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              💬 WhatsApp
            </a>
            <a href="mailto:munzamalik09@gmail.com" style={{ background: 'white', color: '#ffb6c1', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              📧 Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
