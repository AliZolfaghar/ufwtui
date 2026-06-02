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

// ✅ درست: تابع سازنده (factory function)
function Button(screen, text, callback) {
  const btn = blessed.button({
    parent: screen,
    content: text,
    // ... options
    // color
    
  });
  
  btn.on('press', callback);
  return btn; // برگرداندن نمونه جدید
}

// استفاده - هر بار یک دکمه جدید ساخته می‌شود
const btn1 = Button(screen, 'Save', () => console.log('Saved'));
const btn2 = Button(screen, 'Delete', () => console.log('Deleted'));
const btn3 = Button(screen, 'Cancel', () => console.log('Cancelled'));