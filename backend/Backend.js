import express from "express";
import cors from "cors";
import ds_conn, { RUNNING_INVESTMENTS } from "./ds/conn";
import router from "./routes";
import bodyParser from "body-parser";
import { create_default_admin } from "./handlers/starter";
import { fulfil_investment } from "./handlers/investments";

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

router(app);

setInterval(() => {
  let runnings = RUNNING_INVESTMENTS.read();

  runnings.map((data) => fulfil_investment(data));
}, 10 * 60 * 1000); // Every ten minutes

app.get("/", (req, res) =>
  res.send("<div><h1>Hi, its Ultra Capitals.</h1></div>")
);

app.listen(1459, () => {
  ds_conn();

  create_default_admin();

  console.log("Ultra Capitals Backend started on :1459");
});
