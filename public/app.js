const API_URL = '/api/tasks';

// 1. ดึงข้อมูลรายการ (GET)
async function fetchTasks() {
  const category = document.getElementById('filter-category').value;
  let url = API_URL;
  if (category) url += `?category=${category}`;

  const res = await fetch(url);
  const tasks = await res.json();

  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <span class="badge">${task.category}</span>
        <span class="task-title ${task.done ? 'completed' : ''}" onclick="toggleDone(${task.id}, ${!task.done})">
          ${task.title}
        </span>
      </div>
      <div class="action-group">
        <button class="btn-edit" onclick="editTask(${task.id}, '${task.title}')">แก้ไข</button>
        <button class="btn-del" onclick="deleteTask(${task.id})">ลบ</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// 2. เพิ่มรายการใหม่ (POST)
document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, category })
  });

  if (res.ok) {
    document.getElementById('title').value = '';
    fetchTasks();
  }
});

// 3. สลับสถานะทำเสร็จ/ยังไม่เสร็จ (PATCH)
async function toggleDone(id, done) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done })
  });
  fetchTasks();
}

// 4. แก้ไขชื่อรายการ (PATCH)
async function editTask(id, currentTitle) {
  const newTitle = prompt('แก้ไขชื่อรายการ:', currentTitle);
  if (newTitle && newTitle.trim() !== '') {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle })
    });
    fetchTasks();
  }
}

// 5. ลบรายการ (DELETE)
async function deleteTask(id) {
  if (confirm('ต้องการลบรายการนี้ใช่หรือไม่?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  }
}

// โหลดข้อมูลทันทีเมื่อเปิดหน้าเว็บ
fetchTasks();