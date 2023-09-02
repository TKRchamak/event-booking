// import configData from "./config";
// require("dotenv").config();
// const express = require("express");
// const cloudinary = require("cloudinary").v2;
// const cors = require("cors");
// const Multer = require("multer");

// cloudinary.config({
//     cloud_name: configData.STORAGE_NAME,
//     api_key: configData.STORAGE_API_KEY,
//     api_secret: configData.STORAGE_API_SECRET,
// })

// const storage = new Multer.memoryStorage();
// const upload = Multer({
//   storage,
// });

// async function handleUpload(file) {
//   const res = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return res;
// }

// const app = express();

// app.use(cors());

// app.get('/', function(req, res) {
//     res.send('Hi')
// })

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log(req.file)
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     const cldRes = await handleUpload(dataURI);
//     res.json(cldRes);
//   } catch (error) {
//     console.log(error);
//     res.send({
//       message: error.message,
//     });
//   }
// });
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server Listening on ${port}`);
// });