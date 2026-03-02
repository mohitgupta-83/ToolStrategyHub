const bcrypt = require("bcryptjs");

const plain = "admin123";
const hash = "$2b$10$JUl.0EmP5X/LSK.0FAIV5e03CM9Z7gwgUk6IObrqljGnGMp4LAofK";

bcrypt.compare(plain, hash).then(isMatch => {
    console.log(`Checking match for "${plain}" against stored hash...`);
    console.log(`Match Result: ${isMatch}`);

    if (!isMatch) {
        console.log("❌ Hash does not match plain text!");
        // Generate a fresh one
        const newHash = bcrypt.hashSync(plain, 10);
        console.log("Generated fresh hash:", newHash);
    } else {
        console.log("✅ Hash matches perfectly.");
    }
});
