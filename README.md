# To-Do List App (Pastel Pink & Lavender Theme)

เว็บแอปพลิเคชันแบบ Full-stack จัดการรายการสิ่งที่ต้องทำ พัฒนาด้วย Express.js และ Vanilla JS

## การติดตั้งและการใช้งาน
1. ติดตั้ง Dependencies: `npm install`
2. เริ่มต้นระบบ: `node server.js`
3. เข้าใช้งานผ่านเบราว์เซอร์: `http://localhost:3000`

## REST API Endpoints
- `GET /api/tasks` - ดึงข้อมูลทั้งหมด (รองรับ `?category=...`)
- `GET /api/tasks/:id` - ดึงข้อมูลตาม ID
- `POST /api/tasks` - เพิ่มรายการใหม่
- `PATCH /api/tasks/:id` - แก้ไขข้อมูล
- `DELETE /api/tasks/:id` - ลบรายการ