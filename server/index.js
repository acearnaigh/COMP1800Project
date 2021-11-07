const express = require("express");
const { collection, addDoc } = require("firebase/firestore");

const db = require("./firebase");
const app = express();

app.use(express.json());

app.post("/posts", async (req, res) => {
  const data = req.body;
  const collectionRef = collection(db, "posts");
  await addDoc(collectionRef, data);
  res.status(200).send();
});

let port = 8000;

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
