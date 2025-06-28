// Load environment variables from .env file
require("dotenv").config();

// Import Firebase Functions & HTTPS Trigger
const functions = require("firebase-functions");
const cors = require("cors");

// ✅ Define allowed origins
const allowedOrigins = [
  "https://ginomahee.github.io",
  "http://localhost:5500", // for local testing
];

// ✅ Dynamic CORS handler based on allowed origins
const corsHandler = cors({
  origin: function(origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
});

/**
 * 🔐 Secure API Key Retrieval Function
 * Allows only requests from allowed origins to access the key
 */
exports.getAPIKey = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => { // ✅ Apply CORS middleware
    res.json({
      apiKey: "AIzaSyAhoehKvQ4SyFf7kT2sTC9J0ZODaYI9ero",
      authDomain: "loop-catcher-firebase.firebaseapp.com",
      projectId: "loop-catcher-firebase",
      storageBucket: "loop-catcher-firebase.appspot.com",
      messagingSenderId: "1061069234561",
      appId: "1:1061069234561:web:dea799c96bc67901888880",
    });
  });
});

/**
 * 🚀 Additional Firebase Function Triggers (Expand As Needed)
 *
 * Docs: https://firebase.google.com/docs/functions
 */

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});
