const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

var obj = {
  data: [],
};

app.get("/", async (req, res) => {
  const data = fs.readFileSync(`${__dirname}/data/data.json`, {
    encoding: "utf8",
  });

  console.log(JSON.parse(data).data.length);
  res.send(data);
});

app.post("/test", async (req, res) => {
  res.send("Done");

  console.log(JSON.stringify(req.body));
  obj = JSON.parse(
    fs.readFileSync(`${__dirname}/data/data.json`, {
      encoding: "utf8",
    })
  );

  obj.data.push(req.body.valuesInput);

  var json = JSON.stringify(obj);

  fs.writeFileSync(`${__dirname}/data/data.json`, json, "utf8", (err) =>
    console.log("Err")
  );
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Listining on PORT 8000");
});
