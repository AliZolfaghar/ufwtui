#!/usr/bin/env node
const blessed = require('neo-blessed');

// ============================================
// ایجاد صفحه اصلی
// ============================================
const screen = blessed.screen({
  smartCSR: true,
  title: 'Multi List Demo - Task Manager',
  cursor: {
    artificial: true,
    blink: true
  },
  dockBorders: true
});

// ============================================
// تابع سازنده برای ساخت یک Todo List (هر بار یک نمونه جدید)
// ============================================
function createTodoList(title, x, y, items, color = 'cyan') {
  // ساخت باکس والد (هر بار جدید)
  const box = blessed.box({
    parent: screen,
    top: y,
    left: x,
    width: '30%',
    height: '70%',
    border: {
      type: 'line',
      fg: color
    },
    style: {
      border: {
        fg: color
      }
    },
    label: ` {bold}{${color}-fg} ${title} {/${color}-fg}{/bold} `,
    tags: true,
    padding: {
      left: 1,
      right: 1,
      top: 0,
      bottom: 0
    }
  });
  
  // ساخت لیست (هر بار جدید)
  const list = blessed.list({
    parent: box,
    top: 0,
    left: 0,
    width: '100%-2',
    height: '100%-1',
    keys: true,
    vi: true,
    mouse: true,
    style: {
      selected: {
        bg: 'blue',
        fg: 'white',
        bold: true
      },
      item: {
        fg: 'white',
        hover: {
          bg: 'grey'
        }
      }
    },
    items: items.map(item => ` ${item}`)
  });
  
  // برگرداندن هر دو ویجت
  return { box, list };
}

// ============================================
// تابع سازنده برای نوار وضعیت
// ============================================
function createStatusBar() {
  const statusBar = blessed.box({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    style: {
      fg: 'black',
      bg: 'grey',
      bold: true
    },
    content: ' Use Arrow Keys to navigate between lists | q: Quit ',
    tags: true
  });
  
  return statusBar;
}

// ============================================
// دیتای هر لیست
// ============================================
const todoItems = [
  ' Buy groceries',
  ' Write documentation',
  ' Fix bug #123',
  ' Review pull request',
  ' Update dependencies'
];

const doneItems = [
  ' ✓ Learn Node.js',
  ' ✓ Setup project',
  ' ✓ Install dependencies',
  ' ✓ Create repository'
];

const pendingItems = [
  ' ⌛ Deploy to production',
  ' ⌛ Write tests',
  ' ⌛ Optimize performance',
  ' ⌛ Code review'
];

// ============================================
// ساخت سه لیست مجزا (هر کدوم یک نمونه جدید)
// ============================================
const todoList = createTodoList('TODO', '2%', 1, todoItems, 'cyan');
const doneList = createTodoList('DONE', '35%', 1, doneItems, 'green');
const pendingList = createTodoList('PENDING', '68%', 1, pendingItems, 'yellow');

// ============================================
// ساخت نوار وضعیت
// ============================================
const statusBar = createStatusBar();

// ============================================
// مدیریت فوکوس بین لیست‌ها (با Tab)
// ============================================
const lists = [todoList.list, doneList.list, pendingList.list];
let currentListIndex = 0;

// فوکوس روی اولین لیست
todoList.list.focus();

// تابع تغییر فوکوس
function focusNextList() {
  // برداشتن فوکوس از لیست فعلی
  lists[currentListIndex].style.selected = { bg: 'blue' };
  
  // رفتن به لیست بعدی
  currentListIndex = (currentListIndex + 1) % lists.length;
  
  // اعمال فوکوس روی لیست جدید
  lists[currentListIndex].focus();
  
  // تغییر استایل برای نشان دادن فوکوس
  statusBar.setContent(` Focused on: ${currentListIndex === 0 ? 'TODO' : (currentListIndex === 1 ? 'DONE' : 'PENDING')} list | Tab: Switch | q: Quit `);
  screen.render();
}

// ============================================
// کلیدهای میانبر
// ============================================

// خروج با q
screen.key('q', () => {
  process.exit(0);
});

// خروج با Ctrl+C
screen.key('C-c', () => {
  process.exit(0);
});

// تغییر بین لیست‌ها با Tab
screen.key('tab', () => {
  focusNextList();
});

// نمایش پیام هنگام انتخاب آیتم در هر لیست
todoList.list.on('select', (el, index) => {
  statusBar.setContent(` Selected from TODO: "${todoItems[index]}" `);
  setTimeout(() => {
    statusBar.setContent(' Use Arrow Keys to navigate between lists | Tab: Switch lists | q: Quit ');
  }, 2000);
  screen.render();
});

doneList.list.on('select', (el, index) => {
  statusBar.setContent(` Selected from DONE: "${doneItems[index]}" `);
  setTimeout(() => {
    statusBar.setContent(' Use Arrow Keys to navigate between lists | Tab: Switch lists | q: Quit ');
  }, 2000);
  screen.render();
});

pendingList.list.on('select', (el, index) => {
  statusBar.setContent(` Selected from PENDING: "${pendingItems[index]}" `);
  setTimeout(() => {
    statusBar.setContent(' Use Arrow Keys to navigate between lists | Tab: Switch lists | q: Quit ');
  }, 2000);
  screen.render();
});

// ============================================
// رندر اولیه
// ============================================
screen.render();

// ============================================
// پیام در کنسول
// ============================================
console.log('\x1b[32m✓\x1b[0m Multi-List Demo Started!');
console.log('Features:');
console.log('  - 3 independent lists');
console.log('  - Use UP/DOWN arrows to navigate within a list');
console.log('  - Use TAB to switch between lists');
console.log('  - Press ENTER to select an item');
console.log('  - Press Q to quit\n');