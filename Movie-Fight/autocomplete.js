const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
  <label><b>Search For a item</b></label>
  <input class="input" />
  <div class="dropdown">
     <div class="dropdown-menu">
     <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector('.input');
  const dropdown = root.querySelector('.dropdown');
  const resultWrapper = root.querySelector('.results');

  const onInput = async event => {
    const items = await fetchData(event.target.value);
    // console.log(items);

    // remove empty dropdown when no moive data
    // === 0 same as below
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    // reset moive inside every search
    resultWrapper.innerHTML = '';

    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        // console.log(items);
        // using the closure scope of this function. Means everything outside of that arrow function
        // we still have a reffernce to the item variable
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  // check if user click outside of searchbar, it will dissapear
  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
