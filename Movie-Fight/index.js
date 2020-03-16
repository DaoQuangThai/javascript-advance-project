/*
Một số kiến thức javascript gặp trong project này
async, await
axios
callback
function that return a function
*/

/*
key a8a7684
http://www.omdbapi.com/?i=tt3896198&apikey=a8a7684

output?
Have 2 search input that can search for a moive and give info about that movie

input?
2 input
somehow Connect to data from an api
Tạo cây gợi ý khi search
*/

/*
Một số kiến thức gặp phải khác

1 - function.apply(null, agrs) in cases where you want to use the elements of an array as arguments to a function
it the same when we use function(...arr)

function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// expected output: 6
console.log(sum.apply(null, numbers));
// expected output: 6

2 - callback function
A function is that pass a an argrument to another function

function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);

3 - function that return a function

4- Rest and spread operator
Rest RECIEVE value from a function call => from agrs in to array
Spread GIVE value from a function call => from an array into each agrs

*/

const fetchData = async searchTerm => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'd9835cc5',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  // console.log(response.data);
  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
     <div class="dropdown-menu">
     <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.results');

const onInput = async event => {
  const movies = await fetchData(event.target.value);
  // console.log(movies);

  // remove empty dropdown when no moive data
  // === 0 same as below
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  // reset moive inside every search
  resultWrapper.innerHTML = '';

  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');
    // check if img not found => dont display img
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
    <img src="${imgSrc}"/>
    <span>${movie.Title}</span>
    `;

    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      console.log(movies);

      // using the closure scope of this function. Means everything outside of that arrow function
      // we still have a reffernce to the movie variable
      input.value = movie.Title;
    });
    resultWrapper.appendChild(option);
  }
};

input.addEventListener('input', debounce(onInput, 1000));

// check if user click outside of searchbar, it will dissapear
document.addEventListener('click', event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
