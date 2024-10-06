import express from "express";
import pdfRouter from "./src/api/pdf/pdf.index.js";
import cors from "cors";
const app = express();
const port = 9000;

app.use(cors());
app.use("/api", pdfRouter);
app.listen(port, () => {
  console.log(`${port}포트에서 서버가 열렸습니다.`);
});
