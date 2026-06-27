# Setup & Installation

Hướng dẫn này dùng để chạy SửViệtAI ở môi trường local, gồm backend Express, frontend Next.js và tuỳ chọn RAG với Qdrant.

## 1. Cấu hình Backend

Di chuyển vào thư mục `server`:

```bash
cd server
```

Cài đặt thư viện:

```bash
npm install
```

Tạo file `.env` từ `server/.env.example` hoặc cấu hình theo mẫu dưới đây:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=800
RAG_EMBEDDING_PROVIDER=local-hash
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
RAG_OCR_PROVIDER=tesseract
OPENAI_OCR_MODEL=gpt-4o-mini
PORT=3001
CLIENT_ORIGINS=http://localhost:3000,http://localhost:5173
RAG_PROVIDER=qdrant
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
QDRANT_COLLECTION=suvietai_history_chunks
RAG_TOP_K=12
RAG_CONTEXT_LIMIT=4
RAG_ENABLE_OCR=false
RAG_ENABLE_OPENAI_OCR=false
TESSERACT_BIN=tesseract
TESSERACT_LANG=vie+eng
TESSERACT_PSM=6
```

Kiểm tra cấu hình backend:

```bash
npm run check
```

Khởi chạy server ở chế độ development:

```bash
npm run dev
```

Server chạy tại `http://localhost:3001`.

Health check: `http://localhost:3001/api/health`.

## 2. Tuỳ chọn: chạy RAG với Qdrant

Chạy Qdrant local:

```bash
docker run -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant
```

Kiểm tra kết nối Qdrant:

```bash
npm run rag:health
```

Chạy dry-run ingestion để tạo report chunk/OCR:

```bash
npm run rag:ingest:dry
```

Nếu các PDF bị đưa vào `manual_review`, cài PyMuPDF rồi chạy lại:

```bash
python -m pip install pymupdf
```

RAG embeddings mặc định dùng local hash embedding, không cần OpenAI API key. Nếu muốn OCR local cho trang scan/image-heavy, cài Tesseract OCR và bật:

```env
RAG_ENABLE_OCR=true
RAG_OCR_PROVIDER=tesseract
TESSERACT_LANG=vie+eng
```

Khi Qdrant đang chạy, index dữ liệu:

```bash
npm run rag:ingest
```

Test retrieval:

```bash
npm run rag:query -- tran_hung_dao "Trận Bạch Đằng năm 1288 diễn ra thế nào?"
```

## 3. Cấu hình Frontend

Di chuyển vào thư mục `client`:

```bash
cd client
```

Cài đặt thư viện:

```bash
npm install
```

Khởi chạy client ở chế độ development:

```bash
npm run dev
```

Client chạy tại `http://localhost:3000`.
