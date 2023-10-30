const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./db/index");

app.use(express.json());
app.use(morgan("dev"));

db.sync({ force: false })
  .then(() => {
    app.listen(3001, () => {
      console.log("Server levantado en el 3001");
    });
  })
  .catch(console.error);
