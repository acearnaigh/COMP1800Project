const express = require("express");
const app = express();

let port = 8000;

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
