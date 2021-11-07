const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDCzZQUkQh1ak8bKDDbKeL6DkjIhSTCA9M",
  authDomain: "comp-1800-project-bby-18.firebaseapp.com",
  projectId: "comp-1800-project-bby-18",
  storageBucket: "comp-1800-project-bby-18.appspot.com",
  messagingSenderId: "416108549162",
  appId: "1:416108549162:web:b748773cedf38456725f53",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
