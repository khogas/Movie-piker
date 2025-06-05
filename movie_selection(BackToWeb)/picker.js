document.addEventListener('DOMContentLoaded', function() {
  const pickButton = document.getElementById('pickMovie');
  const goBackButton = document.getElementById('goBack');
  const resultContainer = document.getElementById('result');
  const genreFiltersContainer = document.getElementById('genreFilters');
  
  
  const urlParams = new URLSearchParams(window.location.search);
  const moviesData = urlParams.get('movies');
  let movies = [];
  
  try {
    movies = JSON.parse(decodeURIComponent(moviesData));
  } catch (e) {
    console.error('Error parsing movies data:', e);
    resultContainer.innerHTML = '<p>Error loading movies. Please go back and try again.</p>';
    resultContainer.style.display = 'block';
    return;
  }
  
  
  const allGenres = [];
  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre);
      }
    });
  });
  
  
  allGenres.forEach(genre => {
    const button = document.createElement('button');
    button.className = 'genre-filter';
    button.textContent = genre;
    button.addEventListener('click', function() {
      this.classList.toggle('selected');
    });
    genreFiltersContainer.appendChild(button);
  });
  
  
  pickButton.addEventListener('click', function() {
    const selectedGenreButtons = document.querySelectorAll('.genre-filter.selected');
    let filteredMovies = [...movies];
    
    
    if (selectedGenreButtons.length > 0) {
      const selectedGenres = Array.from(selectedGenreButtons).map(btn => btn.textContent);
      filteredMovies = movies.filter(movie => 
        movie.genres.some(genre => selectedGenres.includes(genre))
      );
    }
    
    if (filteredMovies.length === 0) {
      resultContainer.innerHTML = '<p>No movies match your selected genres!</p>';
      resultContainer.style.display = 'block';
      return;
    }
    
    
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const selectedMovie = filteredMovies[randomIndex];
    
    
    resultContainer.innerHTML = `
      <h2>Your Movie Is:</h2>
      <p><strong>${selectedMovie.name}</strong></p>
      <p>Genres: ${selectedMovie.genres.join(', ')}</p>
    `;
    resultContainer.style.display = 'block';
  });
  
 
  goBackButton.addEventListener('click', function() {
    window.location.href = 'index.html';
  });
});