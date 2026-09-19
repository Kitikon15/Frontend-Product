# 💻 Frontend - Product Management Dashboard

ระบบ Frontend สำหรับบริหารจัดการข้อมูลสินค้า (Dashboard Web Application) พัฒนาด้วย **React 19**, **Vite**, ตกแต่งสไตล์ด้วย **Tailwind CSS (v4)** ผสาน **DaisyUI (v5)** และใช้ไอคอนจาก **Lucide React** มีการเชื่อมต่อแบบ Full CRUD กับ Backend RESTful API

---

## 🛠️ เทคโนโลยีที่ใช้งาน (Tech Stack)

- **Framework / Library:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite (v8.x)
- **CSS Framework:** Tailwind CSS (v4.x) ควบคู่กับ `@tailwindcss/vite`
- **UI Component Library:** DaisyUI (v5.x)
- **Icons:** Lucide React (`lucide-react`)
- **Linter:** Oxlint (High-performance linter)
- **Architecture:** Client-Side Rendering (CSR) with Modern Hooks (`useState`, `useEffect`)

---

## 📁 โครงสร้างโปรเจกต์ (Directory Structure)

```text
Frontend-Product/
├── .env                  # Environment Variables (VITE_API_URL)
├── .env.example          # ตัวอย่างการตั้งค่า Environment Variables
├── .gitignore            # รายการไฟล์ที่ไม่ต้องการ commit ขึ้น Git
├── .oxlintrc.json        # การตั้งค่าสำหรับ Oxlint
├── index.html            # หน้า HTML หลักของ Single Page Application
├── package.json          # รายการ Packages, Dependencies และคำสั่ง Script
├── vite.config.js        # คอนฟิก Vite และ Plugin สำหรับ React & Tailwind CSS
├── public/               # ไฟล์ Static assets ที่ไม่ต้องผ่านการ build
└── src/
    ├── App.css           # สไตล์ตกแต่งเพิ่มเติม
    ├── App.jsx           # Component หลัก (Dashboard UI, Logic CRUD และเชื่อมต่อ API)
    ├── index.css         # ไฟล์นำเข้า Tailwind CSS v4 และ DaisyUI v5 plugin
    └── main.jsx          # จุด Mount React App ลงใน DOM element (#root)
```

---

## 🏗️ ขั้นตอนการสร้างโปรเจกต์ตั้งแต่เริ่มต้น (Step-by-Step Setup from Scratch)

หากต้องการสร้างโปรเจกต์นี้ใหม่ตั้งแต่คำสั่งแรก ให้ทำตามลำดับขั้นตอนดังนี้:

### 1. สั่งสร้าง React Project ด้วย Vite
```bash
# สร้างโปรเจกต์ React (JavaScript) ผ่าน Vite
npm create vite@latest Frontend-Product -- --template react

# เข้าไปยังโฟลเดอร์ของโปรเจกต์
cd Frontend-Product

# ติดตั้งแพ็กเกจตั้งต้น
npm install
```

### 2. ติดตั้ง Styling และ Component Libraries
```bash
# ติดตั้ง Tailwind CSS v4, Vite Plugin, DaisyUI v5 และ Lucide React
npm install tailwindcss @tailwindcss/vite daisyui lucide-react

# ติดตั้ง Oxlint สำหรับตรวจสอบคุณภาพโค้ด
npm install -D oxlint
```

### 3. ตั้งค่า `vite.config.js`
แก้ไขไฟล์ `vite.config.js` เพื่อเปิดใช้งาน Tailwind CSS Plugin:
```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 4. ตั้งค่า Tailwind CSS และ DaisyUI ใน `src/index.css`
แทนที่โค้ดใน `src/index.css` ด้วย:
```css
@import "tailwindcss";
@plugin "daisyui" {
    themes: dark --prefersdark;
};
```

### 5. ตั้งค่า Scripts ใน `package.json`
ตรวจสอบว่า `package.json` มี scripts ดังนี้:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
```

---

## ⚙️ การตั้งค่า Environment Variables (`.env`)

สร้างไฟล์ `.env` ในโฟลเดอร์หลักของ `Frontend-Product/` โดยคัดลอกจาก `.env.example`:

```bash
cp .env.example .env
```

เนื้อหาภายใน `.env`:
```env
# URL ของ Backend API Server
VITE_API_URL="http://localhost:5000"
```

> [!IMPORTANT]
> ตัวแปรสำหรับ Vite **ต้องขึ้นต้นด้วย `VITE_` เสมอ** จึงจะสามารถเรียกใช้งานผ่าน `import.meta.env.VITE_...` ในโค้ด React ได้

---

## 🌟 ฟีเจอร์และการทำงานของหน้าเว็บ (Key Features)

1. **ดึงรายการสินค้าอัตโนมัติ (Read Products):**
   - ส่ง Request `GET /products` ผ่าน `fetch` ทันทีเมื่อเปิดหน้าเว็บ (`useEffect`)
   - แสดงสถานะ Loading เมื่อกำลังโหลด และแจ้งเตือนข้อผิดพลาด (Error Message) หากเชื่อมต่อ API ไม่ได้

2. **เพิ่มสินค้าใหม่ (Create Product):**
   - มีฟอร์มกรอกชื่อสินค้า (`name`) และราคาสินค้า (`price`)
   - ป้องกันการส่งข้อมูลว่าง พร้อมปุ่มบันทึกพร้อมสถานะโหลด (Disabled ป้องกันกดซ้ำ)
   - ส่ง Request `POST /products`

3. **แก้ไขข้อมูลสินค้า (Update Product):**
   - เมื่อกดปุ่มรูปดินสอ (✏️ Edit) โค้ดจะดึงข้อมูลสินค้านั้นขึ้นมาใส่ในช่องฟอร์มทันที
   - เปลี่ยนปุ่มเป็น "บันทึกการแก้ไข" และมีปุ่ม "ยกเลิก"
   - ส่ง Request `PUT /products/:id` และอัปเดต State หน้าจอทันทีโดยไม่ต้องโหลดหน้าซ้ำ

4. **ลบสินค้า (Delete Product):**
   - เมื่อกดปุ่มถังขยะ (🗑️ Delete) มีกล่องแจ้งเตือนถามยืนยัน (`confirm`)
   - ส่ง Request `DELETE /products/:id` และลบไอเทมออกจาก State ทันที

5. **สถิติและดีไซน์ Dashboard (Modern Glassmorphism Design):**
   - กล่องสรุปจำนวนสินค้าในระบบแบบ Real-time
   - ธีมสี Dark Mode สไตล์หรูหรา (Emerald & Cyan Neon Accent Glow)
   - Responsive Design รองรับการแสดงผลทุกขนาดหน้าจอ (Mobile, Tablet, Desktop)

---

## ▶️ คำสั่งสำหรับรันโปรเจกต์ (Run Commands)

```bash
# 1. รันเซิร์ฟเวอร์สำหรับพัฒนา (Development Server)
npm run dev

# 2. ตรวจสอบโค้ดด้วย Oxlint
npm run lint

# 3. สั่งคอมไพล์โปรเจกต์สำหรับ Production
npm run build

# 4. ทดสอบดูไฟล์ build ที่สร้างขึ้น
npm run preview
```

เปิด Browser แล้วไปที่: **`http://localhost:5173`**

---

## 🔍 การเชื่อมต่อกับ Backend (Integration Checklist)

ก่อนเริ่มใช้งาน Frontend กรุณาตรวจสอบว่า:
- [ ] Backend Server ทำงานอยู่ที่ `http://localhost:5000`
- [ ] Database (Neon PostgreSQL หรือ Docker Container) เชื่อมต่อสำเร็จ
- [ ] Backend เปิดใช้งาน `cors()` แล้ว
