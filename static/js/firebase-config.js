// static/js/firebase-config.js

// Your Firebase configuration - FIXED storageBucket
const firebaseConfig = {
  apiKey: "AIzaSyDP3gZZ-TDYrhI1HsvHEvLgorcoCglGFfI",
  authDomain: "showmelive-31302.firebaseapp.com",
  projectId: "showmelive-31302",
  storageBucket: "showmelive-31302.appspot.com",  // ← CHANGED THIS
  messagingSenderId: "217957462256",
  appId: "1:217957462256:web:b74f2be26d6f1b238b5235",
  measurementId: "G-ZK8ZGXDEEM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('🔥 Firebase initialized with project:', firebaseConfig.projectId);
console.log('✅ Auth domain:', firebaseConfig.authDomain);