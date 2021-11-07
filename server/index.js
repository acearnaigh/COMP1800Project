const express = require("express");
const { collection, addDoc, getDocs } = require("firebase/firestore");

const db = require("./firebase");
const app = express();

app.use(express.json());

// route for creating a post
app.post("/posts", async (req, res) => {
  const data = req.body;
  const collectionRef = collection(db, "posts");
  await addDoc(collectionRef, data);
  res.status(200).send();
});

// route for getting all posts
app.get("/posts", async (req, res) => {
  const collectionRef = collection(db, "posts");
  const postsSnapshot = await getDocs(collectionRef);
  const posts = [];
  postsSnapshot.forEach((doc) => {
    posts.push({ id: doc.id, data: doc.data() });
  });

  res.send(posts);
});

let port = 8000;

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
