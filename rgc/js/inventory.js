function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let inventory = {};

function addItem(item, quantity) {
  if (inventory[item]) {
    inventory[item] += quantity;
  } else {
    inventory[item] = quantity;
  }
}

function removeItem(item, quantity) {
  if (inventory[item]) {
    inventory[item] -= quantity;
    if (inventory[item] <= 0) {
      delete inventory[item];
    }
  }
}

function getItemQuantity(item) {
  return inventory[item] || 0;
}

function getmine() {
  const rimine = random(1, 5);
  const q1 = random(1, 5);
  switch (rimine) {
    case 1:
      addItem('dust', q1);
      msg('got ' + q1 + ' dust');
      break;
    case 2:
      addItem('small rock', q1);
      msg('got ' + q1 + ' small rock');
      break;
    default:
      break;
  }
}

const inventoryList = document.getElementById('inventoryList');

const sellForm = document.getElementById('sellForm');
const itemSelect = document.getElementById('itemSelect');
const quantityInput = document.getElementById('quantityInput');

function displayInventory() {
  inventoryList.innerHTML = '';

  for (let item in inventory) {
    const listItem = document.createElement('li');
    listItem.textContent = `${item}: ${inventory[item]}`;
    inventoryList.appendChild(listItem);
  }

  itemSelect.innerHTML = '';
  for (let item in inventory) {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    itemSelect.appendChild(option);
  }
}

function sellItem(event) {
  event.preventDefault();

  const selectedItem = itemSelect.value;
  const quantity = parseInt(quantityInput.value);

  if (!inventory[selectedItem] || inventory[selectedItem] < quantity) {
    alert('Insufficient quantity!');
    return;
  }

  inventory[selectedItem] -= quantity;

  switch (selectedItem) {
    case 'dust':
      addMoney(quantity * 0.5);
      text();
      break;
    case 'small rock':
      addMoney(quantity * 1);
      text();
      break;
    default:
      break;
  }

  if (inventory[selectedItem] === 0) {
    delete inventory[selectedItem];
  }

  displayInventory();
}

sellForm.addEventListener('submit', sellItem);

function S() {
  const inventoryAsString = JSON.stringify(inventory);
  localStorage.setItem('inventory', inventoryAsString);
}

function l() {
  const inventoryAsString = localStorage.getItem('inventory');
  inventory = JSON.parse(inventoryAsString) || {};
  displayInventory();
}