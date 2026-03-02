const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
    console.log("❌ Please provide a password.");
    console.log("Usage: node generate-secrets.js <your-password>");
    process.exit(1);
}

const jwtSecret = crypto.randomBytes(32).toString("hex");
const hash = bcrypt.hashSync(password, 12);

console.log("\n✅ Secrets Generated Successfully!\n");
console.log("Copy these lines into your .env.local file (and Vercel environment variables):\n");
console.log(`JWT_SECRET="${jwtSecret}"`);
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
console.log("⚠️  Keep your JWT_SECRET safe and do not commit the .env.local file to version control.");
