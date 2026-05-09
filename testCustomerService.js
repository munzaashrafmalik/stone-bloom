// Test file for Customer Service APIs
// Run with: node testCustomerService.js (requires server to be running)

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testContact = {
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '03001234567',
  subject: 'Product Inquiry',
  message: 'I would like to know more about your products.'
};

const testNewsletter = {
  email: 'newsletter@example.com',
  name: 'Newsletter Subscriber',
  source: 'footer'
};

const testFAQ = {
  question: 'Test Question?',
  answer: 'Test Answer',
  category: 'general',
  order: 100,
  isPublished: true
};

const testPage = {
  title: 'Test Page',
  slug: 'test-page',
  content: '# Test Page\n\nThis is a test page.',
  metaDescription: 'Test page description',
  isPublished: true,
  order: 100
};

// Helper function to make requests
async function makeRequest(endpoint, method = 'GET', body = null, token = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { error: error.message };
  }
}

// Test functions
async function testContactForm() {
  console.log('\n📧 Testing Contact Form...');

  // Submit contact form
  const result = await makeRequest('/contact', 'POST', testContact);
  console.log('Submit Contact:', result.status === 201 ? '✅ PASS' : '❌ FAIL', result.data?.message);

  return result;
}

async function testNewsletter() {
  console.log('\n📰 Testing Newsletter...');

  // Subscribe
  const subscribe = await makeRequest('/newsletter/subscribe', 'POST', testNewsletter);
  console.log('Subscribe:', subscribe.status === 201 ? '✅ PASS' : '❌ FAIL', subscribe.data?.message);

  // Try to subscribe again (should fail)
  const duplicate = await makeRequest('/newsletter/subscribe', 'POST', testNewsletter);
  console.log('Duplicate Check:', duplicate.status === 400 ? '✅ PASS' : '❌ FAIL', duplicate.data?.message);

  // Unsubscribe
  const unsubscribe = await makeRequest('/newsletter/unsubscribe', 'POST', { email: testNewsletter.email });
  console.log('Unsubscribe:', unsubscribe.status === 200 ? '✅ PASS' : '❌ FAIL', unsubscribe.data?.message);
}

async function testFAQs() {
  console.log('\n❓ Testing FAQs...');

  // Get all FAQs
  const allFaqs = await makeRequest('/faq');
  console.log('Get All FAQs:', allFaqs.status === 200 ? '✅ PASS' : '❌ FAIL', `Found ${allFaqs.data?.faqs?.length || 0} FAQs`);

  // Get FAQs by category
  const shippingFaqs = await makeRequest('/faq?category=shipping');
  console.log('Get by Category:', shippingFaqs.status === 200 ? '✅ PASS' : '❌ FAIL', `Found ${shippingFaqs.data?.faqs?.length || 0} shipping FAQs`);

  // Get single FAQ (if exists)
  if (allFaqs.data?.faqs?.length > 0) {
    const faqId = allFaqs.data.faqs[0]._id;
    const singleFaq = await makeRequest(`/faq/${faqId}`);
    console.log('Get Single FAQ:', singleFaq.status === 200 ? '✅ PASS' : '❌ FAIL');

    // Submit feedback
    const feedback = await makeRequest(`/faq/${faqId}/feedback`, 'POST', { helpful: true });
    console.log('Submit Feedback:', feedback.status === 200 ? '✅ PASS' : '❌ FAIL');
  }
}

async function testPages() {
  console.log('\n📄 Testing Pages...');

  // Get all pages
  const allPages = await makeRequest('/pages');
  console.log('Get All Pages:', allPages.status === 200 ? '✅ PASS' : '❌ FAIL', `Found ${allPages.data?.length || 0} pages`);

  // Get single page by slug
  const aboutPage = await makeRequest('/pages/about-us');
  console.log('Get About Us:', aboutPage.status === 200 ? '✅ PASS' : '❌ FAIL');

  const privacyPage = await makeRequest('/pages/privacy-policy');
  console.log('Get Privacy Policy:', privacyPage.status === 200 ? '✅ PASS' : '❌ FAIL');

  const termsPage = await makeRequest('/pages/terms-conditions');
  console.log('Get Terms:', termsPage.status === 200 ? '✅ PASS' : '❌ FAIL');
}

async function testAdminEndpoints(adminToken) {
  console.log('\n🔐 Testing Admin Endpoints...');
  console.log('Note: These tests require a valid admin token');

  if (!adminToken) {
    console.log('⚠️  Skipping admin tests (no token provided)');
    return;
  }

  // Test admin FAQ endpoints
  const adminFaqs = await makeRequest('/faq/admin/all', 'GET', null, adminToken);
  console.log('Get All FAQs (Admin):', adminFaqs.status === 200 ? '✅ PASS' : '❌ FAIL');

  // Test admin page endpoints
  const adminPages = await makeRequest('/pages/admin/all', 'GET', null, adminToken);
  console.log('Get All Pages (Admin):', adminPages.status === 200 ? '✅ PASS' : '❌ FAIL');

  // Test admin contact endpoints
  const adminContacts = await makeRequest('/contact/admin', 'GET', null, adminToken);
  console.log('Get All Contacts (Admin):', adminContacts.status === 200 ? '✅ PASS' : '❌ FAIL');

  // Test admin newsletter endpoints
  const adminSubscribers = await makeRequest('/newsletter/admin/subscribers', 'GET', null, adminToken);
  console.log('Get All Subscribers (Admin):', adminSubscribers.status === 200 ? '✅ PASS' : '❌ FAIL');
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Customer Service API Tests...');
  console.log('Make sure the server is running on http://localhost:5000');

  try {
    // Test public endpoints
    await testContactForm();
    await testNewsletter();
    await testFAQs();
    await testPages();

    // Test admin endpoints (requires token)
    // To test admin endpoints, first login and get a token, then pass it here
    // const adminToken = 'YOUR_ADMIN_TOKEN_HERE';
    // await testAdminEndpoints(adminToken);

    console.log('\n✅ All tests completed!');
    console.log('\nTo test admin endpoints:');
    console.log('1. Login as admin to get a token');
    console.log('2. Uncomment the adminToken lines in this file');
    console.log('3. Run the tests again');

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { runTests, testContactForm, testNewsletter, testFAQs, testPages, testAdminEndpoints };
