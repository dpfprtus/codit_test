import React, { useState, useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs.map";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const canvasRef = useRef(null);

  // PDF 파일 로드 및 페이지 렌더링
  useEffect(() => {
    if (pdfFile) {
      const loadingTask = pdfjsLib.getDocument(pdfFile);
      loadingTask.promise
        .then((pdf) => {
          setNumPages(pdf.numPages);
          renderPage(pdf, pageNum);
        })
        .catch((err) => {
          console.error("PDF 로딩 실패", err);
        });
    }
  }, [pdfFile, pageNum]);

  // PDF 페이지 렌더링
  const renderPage = (pdf, pageNumber) => {
    pdf.getPage(pageNumber).then((page) => {
      const scale = 1.0;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  };

  // PDF 파일 선택 핸들러 (Blob을 사용하여 파일 로드) => 파일선택 후 서버에 PDF 전송
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const pdfBlob = URL.createObjectURL(file);
      setPdfFile(pdfBlob);
      handleFileUpload(file); // PDF 파일 서버에 전송
      console.log("pdf 전송");
    }
  };

  // 서버로 PDF 파일 전송
  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    fetch("http://localhost:9000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("파일 업로드 성공:", data);
      })
      .catch((error) => {
        console.error("파일 업로드 실패:", error);
      });
  };

  // 페이지 이동 핸들러
  const handlePreviousPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={pageNum <= 1}>
          이전 페이지
        </button>
        <span>
          Page {pageNum} of {numPages}
        </span>
        <button onClick={handleNextPage} disabled={pageNum >= numPages}>
          다음 페이지
        </button>
      </div>
    </div>
  );
}

export default App;
