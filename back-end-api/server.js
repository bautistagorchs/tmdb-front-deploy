const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));
app.listen(3001, () => {
  console.log("Server levantado en el 3001");
});
