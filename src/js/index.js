const $ = selector => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu))
  },
  getLocalStorage() {
    localStorage.getItem('menu')
  }
}

function App() {
  const updateCounter = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `Total ${menuCount}`;
  }

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('Please enter a menu');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = espressoMenuName => {
      return `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
          Edit
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
          Delete
        </button>
      </li>`;
    };
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );
    updateCounter();
    $('#espresso-menu-name').value = '';
  }

  const updateMenuName = e => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenu = prompt('Edit the menu name', $menuName.innerText);
    $menuName.innerText = updatedMenu;
  }

  const removeMenuName = e => {
    if (confirm('Delete this menu?')) {
      e.target.closest('li').remove();
      updateCounter();
    }
  }
  
  $('#espresso-menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#espresso-menu-form').addEventListener("submit", e => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-name').addEventListener("keypress", e => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();