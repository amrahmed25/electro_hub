const fs = require('fs');

const BASE_URL = 'https://electrohub-pi4ayssj.b4a.run';

const ADMIN_EMAIL = 'admin@electrohub.com';
const ADMIN_PASSWORD = 'Admin@123456';

const componentsData = JSON.parse(fs.readFileSync('./components.json', 'utf-8'));

async function uploadComponents() {
  try {
    console.log('1. Logging in to get Admin Token...');
    
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      throw new Error(`Login failed! Status: ${loginResponse.status} - ${errorText}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.data?.accessToken || loginData.data?.token || loginData.token; 
    
    if (!token) {
      throw new Error('Login succeeded but token was not found in response structure.');
    }
    
    console.log('✅ Login successful! Token retrieved.');
    console.log('Starting data upload to ElectroHub backend...\n');

    for (const item of componentsData) {
      console.log(`Uploading: ${item.name}...`);
      
      // 🌟 التعديل هنا: ترجمة الأسماء للغة اللي بيفهمها الباك إند 🌟
      const componentPayload = {
        name: item.name,
        description: item.description,
        price: Number(item.price), 
        stockQuantity: Number(item.stock),    // اتعدلت
        category: item.category,
        manufacturer: item.manufacturer,
        packageType: item.package,            // اتعدلت
        imageUrl: item.image,                 // اتعدلت
        datasheetUrl: item.datasheet,         // اتعدلت
        specs: {                              // اتعدلت (جمعناهم جواها)
          features: item.features || [],
          applications: item.applications || []
        }
      };

      const uploadRes = await fetch(`${BASE_URL}/components`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(componentPayload)
      });

      if (uploadRes.ok) {
        console.log(`✅ Success: ${item.name}`);
      } else {
        const errorData = await uploadRes.text();
        console.log(`❌ Failed: ${item.name} - Reason: ${errorData}`);
      }
    }
    
    console.log('\n🎉 All components processed successfully!');

  } catch (error) {
    console.error('💥 Error during execution:', error.message);
  }
}

uploadComponents();