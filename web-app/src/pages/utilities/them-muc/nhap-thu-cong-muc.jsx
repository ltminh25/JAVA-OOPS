import React, { useState, useRef } from "react";

export default function ManualEntryItem({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isbn13, setIsbn13] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const MAX_IMAGE_BYTES = 20 * 1024 * 1024; // 20MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

  function parseAuthors(input) {
    // The user requested: authors separated by commas, names with spaces may be quoted
    // Example input: Piers Anthony, Gabriel "Garcia Marquez"
    // We'll parse respecting double quotes
    const result = [];
    let current = "";
    let inQuote = false;
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (ch === '"') {
        inQuote = !inQuote;
        current += ch; // keep quotes for clarity if user included them
        continue;
      }
      if (ch === "," && !inQuote) {
        if (current.trim() !== "") result.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    if (current.trim() !== "") result.push(current.trim());
    return result;
  }

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Tiêu đề bắt buộc";

    const parsedAuthors = parseAuthors(authors).filter(Boolean);
    if (parsedAuthors.length === 0) e.authors = "Ít nhất một tác giả";

    if (year && !/^\d{4}$/.test(year)) e.year = "Năm phải theo định dạng YYYY";
    if (month && !(+month >= 1 && +month <= 12)) e.month = "Tháng không hợp lệ";
    if (day && !(+day >= 1 && +day <= 31)) e.day = "Ngày không hợp lệ";

    if (isbn13 && !/^\d{1,13}$/.test(isbn13)) e.isbn13 = "ISBN-13 chỉ gồm tối đa 13 chữ số";
    if (isbn10 && isbn10.length > 12) e.isbn10 = "ISBN-10 tối đa 12 ký tự";

    if (pages && (!Number.isInteger(Number(pages)) || Number(pages) < 0)) e.pages = "Số trang không hợp lệ";
    if (price && isNaN(Number(price))) e.price = "Giá phải là số";

    if (coverFile) {
      if (!ALLOWED_TYPES.includes(coverFile.type)) e.cover = "Chỉ cho phép jpg, png, gif";
      if (coverFile.size > MAX_IMAGE_BYTES) e.cover = "Kích thước tối đa 20MB";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, cover: "Chỉ cho phép jpg, png, gif" }));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrors((prev) => ({ ...prev, cover: "Kích thước tối đa 20MB" }));
      return;
    }
    setCoverFile(file);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.cover;
      return copy;
    });
    const reader = new FileReader();
    reader.onload = (e) => setCoverPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      authors: parseAuthors(authors),
      description: description.trim(),
      publisher: publisher.trim(),
      publishedDate: {
        year: year || null,
        month: month || null,
        day: day || null,
      },
      isbn13: isbn13 || null,
      isbn10: isbn10 || null,
      pages: pages ? Number(pages) : null,
      price: price ? Number(price) : null,
      coverFile,
    };

    if (onSubmit) onSubmit(payload);
    else alert("Đã submit (xem console). Kiểm tra payload trong console.");
    console.log("payload", payload);
  };

  return (
    <div className="book-card-root">
      <style>{`
        .book-card-root{font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;max-width:900px;margin:18px auto;padding:18px;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,0.08);background:#fff}
        .book-card-row{display:flex;gap:12px;align-items:flex-start}
        .book-card-column{flex:1}
        .book-card-side{width:200px}
        label{display:block;font-weight:600;margin-bottom:6px}
        input[type=text], input[type=number], textarea, select{width:100%;padding:8px 10px;border:1px solid #ddd;border-radius:6px}
        textarea{min-height:100px;resize:vertical}
        .small-row{display:flex;gap:8px}
        .small-row input{width:100%}
        .hint{font-size:12px;color:#666;margin-top:6px}
        .error{color:#b00020;font-size:13px;margin-top:6px}
        .actions{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
        .btn{padding:8px 12px;border-radius:8px;border:none;cursor:pointer}
        .btn.primary{background:#1890ff;color:#fff}
        .upload-area{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px;border:1px dashed #ddd;border-radius:8px}
        .cover-preview{width:160px;height:220px;object-fit:cover;border-radius:6px;border:1px solid #eee}
      `}</style>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Tiêu đề</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Tác giả</label>
          <input
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder={'Piers Anthony, Gabriel "Garcia Marquez"'}
          />
          <div className="hint">Phân cách các tác giả bằng dấu phẩy. Họ có khoảng trắng đặt trong dấu ngoặc kép.</div>
          {errors.authors && <div className="error">{errors.authors}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Sự miêu tả</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Nhà xuất bản</label>
          <input value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Ngày xuất bản</label>
          <div className="small-row">
            <input
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <input
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <input
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          <div className="hint">Năm: YYYY, Tháng: MM, Ngày: DD</div>
          {errors.year && <div className="error">{errors.year}</div>}
          {errors.month && <div className="error">{errors.month}</div>}
          {errors.day && <div className="error">{errors.day}</div>}
        </div>

        <div className="book-card-row" style={{ marginBottom: 12 }}>
          <div className="book-card-column">
            <label>ISBN 13</label>
            <input
              value={isbn13}
              onChange={(e) => setIsbn13(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Tối đa 13 chữ số"
            />
            {errors.isbn13 && <div className="error">{errors.isbn13}</div>}
          </div>

          <div style={{ width: 12 }} />

          <div style={{ width: 200 }}>
            <label>ISBN 10</label>
            <input value={isbn10} onChange={(e) => setIsbn10(e.target.value)} placeholder="Tối đa 12 ký tự" />
            {errors.isbn10 && <div className="error">{errors.isbn10}</div>}
          </div>
        </div>

        <div className="book-card-row" style={{ marginBottom: 12 }}>
          <div style={{ width: 200 }}>
            <label>Trang</label>
            <input
              value={pages}
              onChange={(e) => setPages(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Số trang"
            />
            {errors.pages && <div className="error">{errors.pages}</div>}
          </div>

          <div style={{ width: 12 }} />

          <div className="book-card-column">
            <label>Giá (¤)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ví dụ: 199000"
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
        </div>

        <div className="book-card-row" style={{ marginTop: 8 }}>
          <div className="book-card-side">
            <label>Ảnh bìa</label>
            <div className="upload-area">
              {coverPreview ? (
                <img src={coverPreview} alt="preview" className="cover-preview" />
              ) : (
                <div style={{ width: 160, height: 220, display: "grid", placeItems: "center", color: "#999" }}>
                  Không có ảnh
                </div>
              )}

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  style={{ border: "1px solid #ddd" }}
                >
                  Chọn file
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setCoverFile(null);
                    setCoverPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                >
                  Xóa
                </button>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />

              <div className="hint">Tải lên jpg, png, gif. Tối đa 20MB.</div>
              {errors.cover && <div className="error">{errors.cover}</div>}
            </div>
          </div>

          <div className="book-card-column">
            {/* Extra preview or metadata */}
            <div style={{ marginBottom: 8 }}>
              <label>Preview thông tin</label>
              <div style={{ border: "1px solid #f0f0f0", padding: 10, borderRadius: 8 }}>
                <strong>{title || "(Tiêu đề)"}</strong>
                <div style={{ marginTop: 6 }}>{parseAuthors(authors).join(", ") || "(Tác giả)"}</div>
                <div style={{ marginTop: 8, color: "#666" }}>{description ? description.slice(0, 180) : "(Mô tả)"}</div>
              </div>
            </div>

            <div>
              <label>Những thông tin khác</label>
              <div style={{ border: "1px solid #f0f0f0", padding: 10, borderRadius: 8 }}>
                <div>NXB: {publisher || "-"}</div>
                <div>Ngày xuất bản: {year || "-"}{year && month ? `-${month.padStart(2, "0")}` : ""}{year && month && day ? `-${day.padStart(2, "0")}` : ""}</div>
                <div>ISBN13: {isbn13 || "-"}</div>
                <div>ISBN10: {isbn10 || "-"}</div>
                <div>Trang: {pages || "-"} — Giá: {price ? `${price} ¤` : "-"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button type="button" className="btn" onClick={() => {
            // reset
            setTitle("");setAuthors("");setDescription("");setPublisher("");setYear("");setMonth("");setDay("");setIsbn13("");setIsbn10("");setPages("");setPrice("");setCoverFile(null);setCoverPreview(null);setErrors({});
            if (fileRef.current) fileRef.current.value = "";
          }}>Hủy</button>

          <button type="submit" className="btn primary">Lưu</button>
        </div>
      </form>
    </div>
  );
}
