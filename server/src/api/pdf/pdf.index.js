import express from "express";
import * as pdfController from "./pdf.controller.js";
import multer from "multer";

let router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), (req, res) => {
  pdfController.pdfParsingController(req, res);
});

export default router;
