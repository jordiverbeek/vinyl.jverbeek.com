const express = require("express");
const cors = require("cors");
const routes = require("./routes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend draait op http://localhost:${PORT}`));