
---

## Hướng dẫn cài đặt

### Chú ý, dùng Command Prompt để tránh lỗi, không dùng PowerShell.
### Chú ý, your_path_to_..._folder là thư mục chứa folder trong máy của bạn (dấu ... tức là tên folder).

### 1. Clone dự án về máy:

```bash
git clone: https://github.com/ltminh25/JAVA-OOPS.git 

```
### 2. Cài đặt các gói phụ trợ ngay trong thư mục gốc bằng Command Prompt:
```bash
#bước 1:
    npm install
#bước 2:
    cd web-app
    npm install
    cd..
#bước 3:
    cd server
    npm install
    cd..
```
### 3. Nhập lệnh sau để chạy đồng thời cả frontend và server ngay tại thư mục gốc:
```bash
npm run dev
```