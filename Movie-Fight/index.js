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

// Create a autocomplete search

const autoCompleteConfig = {
  renderOption: movie => {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
    <img src="${imgSrc}"/>
    <span>${movie.Title} (${movie.Year})</span>
    `;
  },

  inputValue(movie) {
    return movie.Title;
  },

  fetchData: async searchTerm => {
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
  }
};

createAutoComplete({
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
  ...autoCompleteConfig
});

createAutoComplete({
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
  ...autoCompleteConfig
});

// Fetch each single movie info
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'd9835cc5',
      i: movie.imdbID
    }
  });
  // console.log(response.data);
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    // hí ha một lần nữa lại tìm ra sai sót của steve grider một đỉnh kout software engineer, mình cũng đỉnh đấy chứ ^_^!
    // Reset compare color when search for new movie to compare
    const resetLeftSide = document.querySelectorAll(
      '#left-summary .notification'
    );
    resetLeftSide.forEach(item => {
      item.classList.remove('is-warning');
      item.classList.add('is-primary');
    });
    const resetRightSide = document.querySelectorAll(
      '#right-summary .notification'
    );
    resetRightSide.forEach(item => {
      item.classList.remove('is-warning');
      item.classList.add('is-primary');
    });

    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStats, index) => {
    const rightStats = rightSideStats[index];
    // Sướng vl không ngờ ngay cả steven grider còn bị sai sót chỗ này mà mình tìm ra được cũng thông minh đấy chứ
    // Nhưng mà app này còn 1 lỗi nữa là khi search nhiều movie khác nhau màu sắc compare nó vẫn k reset
    const leftSideValue = parseInt(leftStats.dataset.value);
    const rightSideValue = parseInt(rightStats.dataset.value);

    if (leftSideValue > rightSideValue) {
      rightStats.classList.remove('is-primary');
      rightStats.classList.add('is-warning');
    } else {
      leftStats.classList.remove('is-primary');
      leftStats.classList.add('is-warning');
    }
  });
};

// Display movie to the DOM
const movieTemplate = movieDetails => {
  const dollars = parseInt(
    movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );
  const metaScore = parseInt(movieDetails.Metascore);
  const imdbRating = parseFloat(movieDetails.imdbRating);
  const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''));
  const awards = movieDetails.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetails.Poster}" >
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetails.Title}</h1>
        <h4>${movieDetails.Genre}</h4>
        <p>${movieDetails.Plot}</p>
      </div>
    </div>
  </article>

  <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieDetails.Awards}</p>
    <p class="subtitle">Award</p>
  </article>

  <article data-value=${dollars} class="notification is-primary">
    <p class="title">${movieDetails.BoxOffice}</p>
    <p class="subtitle">BoxOffice</p>
  </article>

  <article data-value=${metaScore} class="notification is-primary">
    <p class="title">${movieDetails.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>

  <article data-value=${imdbRating} class="notification is-primary">
    <p class="title">${movieDetails.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>

  <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${movieDetails.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
    `;
};
