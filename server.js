const express = require("express");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(cors());

// ⚠️ Aceptar binario crudo (lo que manda FoxPro)
app.use(express.raw({ type: "*/*", limit: "10mb" }));

// Configuración Cloudinary
cloudinary.config({
  cloud_name: "dwucgfuo2",
  api_key: "917284229925649",
  api_secret: "CW_w8KMgnxX5X8Hc__tQEFsjR8I"
});

// Endpoint
app.post("/subir", async (req, res) => {
  try {
    // Nombre temporal
    const filePath = path.join(__dirname, "temp.jpg");

    // Guardar archivo recibido
    fs.writeFileSync(filePath, req.body);

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // (Opcional) borrar archivo temporal
    fs.unlinkSync(filePath);

    // Respuesta
    res.json({ url: result.secure_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Levantar servidor
app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});