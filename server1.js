const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(cors());

//const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "dwucgfuo2",
  api_key: "917284229925649",
  api_secret: "CW_w8KMgnxX5X8Hc__tQEFsjR8I"
});

app.post("/subir", express.raw({ type: "*/*", limit: "10mb" }), async (req, res) => {
  const fs = require("fs");

  fs.writeFileSync("temp.jpg", req.body);

  const result = await cloudinary.uploader.upload("temp.jpg");

  res.json({ url: result.secure_url });
});

//app.post("/subir", upload.single("foto"), async (req, res) => {
//  try {
//    const result = await cloudinary.uploader.upload(req.file.path);
//    res.json({ url: result.secure_url });
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});