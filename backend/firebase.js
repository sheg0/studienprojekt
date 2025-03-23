const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "studienprojekt-esra.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
