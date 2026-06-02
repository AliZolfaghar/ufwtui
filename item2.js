const blessed = require('neo-blessed');
const screen = blessed.screen({ smartCSR: true });

// تابع سازنده برای ساخت یک لیست (هر بار یک نمونه جدید برمی‌گرداند)
function createTodoList(title, x, y, items) {
  // هر بار یک باکس جدید می‌سازیم
  const box = blessed.box({
    parent: screen,
    top: y,
    left: x,
    width: '30%',
    height: '50%',
    border: { type: 'line' },
    label: title
  });
  
  // هر بار یک لیست جدید می‌سازیم
  const list = blessed.list({
    parent: box,
    top: 0,
    left: 0,
    width: '100%-2',
    height: '100%-1',
    items: items,
    style: {
      selected: { bg: 'blue' }
    }
  });
  
  return { box, list }; // برگرداندن ویجت‌های جدید
}

// ساخت چندین لیست مستقل
const todoList = createTodoList('To Do', '2%', 0, 
  ['Buy milk', 'Write code', 'Exercise']
);

const doneList = createTodoList('Done', '35%', 0,
  ['Learn Node.js', 'Read book']
);

const pendingList = createTodoList('Pending', '68%', 0,
  ['Review PR', 'Deploy app']
);

screen.render();