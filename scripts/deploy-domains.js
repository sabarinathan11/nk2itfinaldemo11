const { execSync } = require('child_process');
require('dotenv').config();
const fs = require('fs');

console.log('🚀 Deploying DNS records to Cloudflare...');

try {
  // Replace placeholders in dns-records.json if FRONTEND_IP/BACKEND_IP provided
  const dnsPath = 'dns-records.json';
  if (fs.existsSync(dnsPath)) {
    let dns = fs.readFileSync(dnsPath, 'utf8');
    if (process.env.FRONTEND_IP) dns = dns.replace(/YOUR_FRONTEND_IP/g, process.env.FRONTEND_IP);
    if (process.env.BACKEND_IP) dns = dns.replace(/YOUR_BACKEND_IP/g, process.env.BACKEND_IP);
    fs.writeFileSync(dnsPath, dns);
  }

  // Ensure wrangler is logged in
  console.log('🔐 Make sure you ran: wrangler login');

  // Bulk upload DNS records (requires wrangler with API token logged in)
  execSync('wrangler dns bulk upload dns-records.json', { stdio: 'inherit' });

  console.log('✅ DNS records deployed successfully!');
  console.log('🌐 Update nameservers at your registrar to use Cloudflare for nk2telco.com.au');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
