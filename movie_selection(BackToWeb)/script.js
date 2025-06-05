let movies = [];

const submitButton = document.getElementById("submit");
const movieInput = document.getElementById("movieName");
const customAlert = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");
const alertOK = document.getElementById("alertOK");

function toggleDropdown() {
  const genreSelector = document.querySelector('.genre-selector');
  genreSelector.classList.toggle('active');
}

document.addEventListener('click', function(e) {
  const genreSelector = document.querySelector('.genre-selector');
  if (!genreSelector.contains(e.target)) {
    genreSelector.classList.remove('active');
  }
});

function updateSelectedText() {
  const checkboxes = document.querySelectorAll('.options-container input[type="checkbox"]:checked');
  const selectedText = document.querySelector('.selected-text');
  
  if (checkboxes.length === 0) {
    selectedText.textContent = 'Select genres...';
    return;
  }
  
  const selectedValues = Array.from(checkboxes).map(cb => cb.value);
  selectedText.innerHTML = selectedValues.join(', ') + 
    `<span class="selected-count">${checkboxes.length}</span>`;
}

document.querySelectorAll('.options-container input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateSelectedText);
});

function addGenre() {
  const input = document.getElementById('newGenre');
  const genre = input.value.trim();
  
  if (!genre) {
    alert('Please enter a genre name');
    return;
  }
  
  const optionsContainer = document.querySelector('.options-container');
  const genreId = genre.toLowerCase().replace(/\s+/g, '-');
  
  if (document.getElementById(genreId)) {
    alert('This genre already exists!');
    return;
  }
  
  const optionDiv = document.createElement('div');
  optionDiv.className = 'option';
  optionDiv.innerHTML = `
    <input type="checkbox" id="${genreId}" value="${genre}">
    <label for="${genreId}">${genre}</label>
  `;
  
  optionsContainer.appendChild(optionDiv);
  optionDiv.querySelector('input').addEventListener('change', updateSelectedText);
  input.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
  updateSelectedText();
});

submitButton.addEventListener("click", function() {
  const movieName = movieInput.value.trim();
  const selectedGenres = [];
  
  
  document.querySelectorAll('.options-container input[type="checkbox"]:checked').forEach(checkbox => {
    selectedGenres.push(checkbox.value);
    checkbox.checked = false; 
  });
  
  if (movieName) {
    if (selectedGenres.length > 0) {
      movies.push({
        name: movieName,
        genres: selectedGenres
      });
      movieInput.value = "";
      updateSelectedText(); 
      
      console.log("Movies array:", movies);
    } else {
      alertMessage.textContent = "Chunky says: Please select at least one genre!";
      customAlert.style.display = "block";
    }
  }
  else {
    alertMessage.textContent = "Chunky says: Please enter a movie name!";
    customAlert.style.display = "block";
  }
});

alertOK.addEventListener("click", function() {
  customAlert.style.display = "none";
});

const finishButton = document.getElementById("finish");

finishButton.addEventListener("click", function() {
if (movies.length < 2) {
    alertMessage.textContent = "Chunky says: Please add some movies first!";
    customAlert.style.display = "block";
    return;
}
  
 
  console.log("All saved movies:", movies);
  

});


finishButton.addEventListener("click", function() {
  if (movies.length < 1) {
    alertMessage.textContent = "Chunky says: Please add some movies first!";
    customAlert.style.display = "block";
    return;
  }
  

  const moviesEncoded = encodeURIComponent(JSON.stringify(movies));
  

  window.location.href = `picker.html?movies=${moviesEncoded}`;
});