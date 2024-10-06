
# codit_test

**코딧의 백엔드 개발자 인턴 과제**

## 프로젝트 개요

이 프로젝트는 PDF 파일을 업로드하고, 업로드된 PDF 파일을 파싱하여 처리하는 백엔드 서버와 클라이언트 애플리케이션을 포함하고 있습니다. 프론트엔드에서는 PDF를 페이징처리하며 뷰잉합니다. PDF 파일을 서버에 전송하고, 서버는 해당 파일을 받아 파싱 후 필요한 데이터를 서버 콘솔로 반환합니다.

## 개발 환경

- **Node**: 20.11.1
- **Express**: 4.21.0
- **React**: 18.3.1
- **Multer**: 파일 업로드를 처리하기 위한 미들웨어
- **pdfjs-dist**: PDF 파일을 처리하기 위한 라이브러리

## 프로젝트 설정 및 실행 방법

### 1. 클론 및 의존성 설치

```bash
git clone https://github.com/dpfprtus/codit_test.git
cd codit_test/client
npm install
cd codit_test/server
npm install
```

### 2. 서버 실행(9000번 포트)

```bash
npm start
```

### 3. 클라이언트 실행(3000번 포트)
```bash
npm start
```
### 4. PDF 파일 업로드
클라이언트 페이지를 통해 PDF 파일 뷰잉 및 업로드

## 파일 업로드 API
### POST /api/upload

- **설명**: PDF 파일을 서버에 업로드합니다.
- **요청 헤더**:
  - `Content-Type`: `multipart/form-data`
- **요청 본문**:
  - `pdf` (파일): 업로드할 PDF 파일

## 개선사항

1. 파싱 로직 구현을 완성하지 못했습니다.
