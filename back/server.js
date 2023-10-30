const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./db/index");
const cors = require("cors");
const routes = require("./routes/index");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(3001, () => {
      console.log("Server levantado en el 3001");
    });
  })
  .catch(console.error);
