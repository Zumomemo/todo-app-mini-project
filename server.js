const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ข้อมูลจำลอง (Mock Data)
let tasks = [
  { id: 1, title: 'ทบทวนบทเรียน Express.js', category: 'study', done: false },
  { id: 2, title: 'ซื้ออุปกรณ์เครื่องเขียน', category: 'personal', done: true }
];

// 1. GET /api/tasks (ดึงข้อมูลทั้งหมด + รองรับ Query String ?category=... หรือ ?done=...)
app.get('/api/tasks', (req, res) => {
  let result = [...tasks];
  const { category, done } = req.query;

  if (category) {
    result = result.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }
  if (done !== undefined) {
    const isDone = done === 'true';
    result = result.filter(t => t.done === isDone);
  }

  res.status(200).json(result);
});

// 2. GET /api/tasks/:id (ดึงข้อมูลรายตัว + 404 ถ้าไม่พบ)
app.get('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'ไม่พบรายการที่ระบุ' });
  }
  res.status(200).json(task);
});

// 3. POST /api/tasks (เพิ่มข้อมูลใหม่ + ตรวจสอบความถูกต้อง 400 หรือ 201)
app.post('/api/tasks', (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    category,
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. PATCH /api/tasks/:id (แก้ไขข้อมูล + 404 ถ้าไม่พบ)
app.patch('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'ไม่พบรายการที่ระบุ' });
  }

  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.category !== undefined) task.category = req.body.category;
  if (req.body.done !== undefined) task.done = req.body.done;

  res.status(200).json(task);
});

// 5. DELETE /api/tasks/:id (ลบรายการ + 204 เมื่อสำเร็จ)
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการที่ระบุ' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});