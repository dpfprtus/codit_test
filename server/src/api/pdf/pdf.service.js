import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";

// PDF 파일 분석 함수 (PDF.js 사용)
export const analyzePDF = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdfDocument = await pdfjsLib.getDocument(data).promise;

  let fullText = "";

  // 신·구조문대비표부터 추출 시작
  for (let pageNum = 6; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();

    // 페이지에서 텍스트 추출

    const pageText = textContent.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n"; // 각 페이지의 텍스트를 줄바꿈으로 구분
  }

  return fullText;
};

// 신구조문 파싱 로직
export const parseDocuments = (pdfText) => {
  const lines = pdfText.split("\n");

  const results = [];
  let currentSection = {
    current: [],
    revised: [],
  };
  let isCurrent = false;
  let isRevised = false;

  lines.forEach((line) => {
    line = line.trim(); // 앞뒤 공백 제거

    // "현행"으로 시작하면 현행 조문 시작
    if (line.includes("현행")) {
      isCurrent = true;
      isRevised = false;
      currentSection = { current: [], revised: [] };
    }

    // "개정안"으로 시작하면 개정안 조문 시작
    else if (line.includes("개정안")) {
      isCurrent = false;
      isRevised = true;
    }

    // "현행"과 "개정안"에 해당하지 않으면 내용 파싱
    else if (isCurrent) {
      currentSection.current.push(line); // 현행 조문에 추가
    } else if (isRevised) {
      currentSection.revised.push(line); // 개정안 조문에 추가
    }

    // 현행/개정안 조문이 완성되었으면 결과에 추가
    if (
      currentSection.current.length > 0 &&
      currentSection.revised.length > 0
    ) {
      results.push([
        currentSection.current.join(" "),
        currentSection.revised.join(" "),
      ]);
      currentSection = { current: [], revised: [] }; // 다음 섹션을 위해 초기화
    }
  });

  return results;
};
