const $ = selector => document.querySelector(selector);

function App() {
  $('#espresso-menu-list').addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      const updatedMenu = prompt('Edit the menu name', $menuName.innerText);
      $menuName.innerText = updatedMenu;
    }
  });

  $('#espresso-menu-form').addEventListener("submit", e => {
    e.preventDefault();
  });

  const addMenu = () => {
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
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `Total ${menuCount}`;
    $('#espresso-menu-name').value = '';
  }

  $('#espresso-menu-submit-button').addEventListener('click', () => {
    addMenu();
  })

  $('#espresso-menu-name').addEventListener("keypress", e => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenu();
  });
}

App();