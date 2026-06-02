#!/usr/bin/env node
const blessed = require('neo-blessed');

// JSON Data
const data = [
  {
    id: 1,
    title: "Introduction to Terminal Programming",
    content: "Learn the basics of TUI programming and terminal applications...",
    author: "Ali Rezaei",
    date: "2024/03/15",
    tags: ["tutorial", "terminal", "beginner"]
  },
  {
    id: 2,
    title: "Package Management in Node.js",
    content: "Complete guide to npm, yarn, and dependency management in Node.js projects...",
    author: "Sara Mohammadi",
    date: "2024/03/20",
    tags: ["Node.js", "npm", "advanced"]
  },
  {
    id: 3,
    title: "Building Professional TUI with Blessed",
    content: "Learn to build interactive terminal applications with blessed and neo-blessed...",
    author: "Reza Karimi",
    date: "2024/03/25",
    tags: ["TUI", "Blessed", "tutorial"]
  },
  {
    id: 4,
    title: "UI/UX Principles in Terminal",
    content: "Best practices for designing user interfaces in command line environment...",
    author: "Maryam Ahmadi",
    date: "2024/04/01",
    tags: ["UI/UX", "design", "terminal"]
  },
  {
    id: 5,
    title: "Performance Optimization in Node.js",
    content: "Advanced techniques to improve speed and efficiency of Node.js applications...",
    author: "Amir Hosseini",
    date: "2024/04/05",
    tags: ["Node.js", "optimization", "advanced"]
  }
];

// Create main screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'JSON Viewer - TUI App',
  cursor: {
    artificial: true,
    blink: true
  },
  dockBorders: true
});

let selectedIndex = 0;
let items = data;

// Left Panel
const leftBox = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: '38%',
  height: '100%-3',
  border: {
    type: 'line',
    fg: 'cyan'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'cyan'
    }
  },
  label: ' Items List ',
  tags: true,
  padding: {
    left: 1,
    right: 1,
    top: 0,
    bottom: 0
  }
});

// List widget
const list = blessed.list({
  parent: leftBox,
  top: 0,
  left: 0,
  width: '100%-3',
  height: '100%-2',
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
  items: items.map(item => ` > ${item.title}`)
});

list.focus();

// Right Panel
const rightBox = blessed.box({
  parent: screen,
  top: 0,
  left: '40%',
  width: '60%',
  height: '100%-3',
  border: {
    type: 'line',
    fg: 'green'
  },
  style: {
    fg: 'white',
    border: {
      fg: 'green'
    }
  },
  label: ' Details ',
  tags: true,
  padding: {
    left: 2,
    right: 2,
    top: 1,
    bottom: 0
  },
  scrollable: true,
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'grey'
    },
    style: {
      inverse: true
    }
  }
});

// Status Bar
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
  content: ' Arrow Keys: Navigate | Enter: Select | q: Quit | Total: ' + items.length + ' items',
  tags: true
});


// add a button in page 
const saveButton = 



// Update right panel
function updateRightPanel(index) {
  const item = items[index];
  if (!item) return;
  
  let content = '';
  content += 'Title:\n';
  content += '  ' + item.title + '\n\n';
  
  content += 'ID:\n';
  content += '  ' + item.id + '\n\n';
  
  content += 'Author:\n';
  content += '  ' + item.author + '\n\n';
  
  content += 'Date:\n';
  content += '  ' + item.date + '\n\n';
  
  content += 'Tags:\n';
  content += '  ' + item.tags.join(', ') + '\n\n';
  
  content += 'Content:\n';
  content += '  ' + item.content + '\n\n';
  
  content += '----------------------------------------\n';
  content += 'Item ' + (index + 1) + ' of ' + items.length;
  
  rightBox.setContent(content);
}

// List event handlers
list.on('select', (el, index) => {
  selectedIndex = index;
  updateRightPanel(selectedIndex);
  statusBar.setContent(' Selected: "' + items[selectedIndex].title + '" ');
  setTimeout(() => {
    statusBar.setContent(' Arrow Keys: Navigate | Enter: Select | q: Quit | Total: ' + items.length + ' items');
  }, 2000);
  screen.render();
});

list.on('highlight', (el, index) => {
  selectedIndex = index;
  updateRightPanel(selectedIndex);
  screen.render();
});

// Global keyboard shortcuts
screen.key('q', () => {
  process.exit(0);
});

screen.key('C-c', () => {
  process.exit(0);
});

screen.key('enter', () => {
  if (list.focused) {
    const selected = items[selectedIndex];
    if (selected) {
      statusBar.setContent(' Showing details for: "' + selected.title + '" ');
      setTimeout(() => {
        statusBar.setContent(' Arrow Keys: Navigate | Enter: Select | q: Quit | Total: ' + items.length + ' items');
      }, 1500);
      screen.render();
    }
  }
});

screen.on('resize', () => {
  updateRightPanel(selectedIndex);
  screen.render();
});

// Initial render
updateRightPanel(0);
screen.render();

console.log('Application started successfully!');
console.log('Use arrow keys to navigate.');
console.log('Press q to quit.\n');