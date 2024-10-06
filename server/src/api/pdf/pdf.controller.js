import * as pdfService from "./pdf.service.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // 현재 파일의 경로 가져오기
let __dirname = path.dirname(__filename); // 파일 경로에서 디렉토리 경로 추출
__dirname = path.join(__dirname, "../../../");

export const pdfParsingController = async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  try {
    // PDF 분석
    const pdfText = await pdfService.analyzePDF(filePath);
    console.log(pdfText);

    // 신구조문 파싱
    const parsedResult = pdfService.parseDocuments(pdfText);

    fs.unlinkSync(filePath);

    // 결과 반환
    res.json({
      success: true,
      data: parsedResult,
    });
  } catch (err) {
    console.error("pdf 처리 실패:", err);
    res.status(500).json({
      success: false,
      message: "pdf 처리 실패",
    });
  }
};
