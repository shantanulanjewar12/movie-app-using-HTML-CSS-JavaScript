const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to Fetch Movie Details using OMDb API
const getMovieInfo = async (movie) => {
    try {
        // ❌Keep this Api key hidden while uploading or sending the file❌
        const myApiKey = "60cc9b59";
        const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

        const response = await fetch(url); // Use await here

        if (!response.ok) {
            throw new Error("Unable to fetch movie data.");
        }

        const data = await response.json(); // Use await here

        // Check if the movie was found
        if (data.Response === "False") {
            throw new Error(data.Error);
        }

        showMovieData(data);
    } catch (error) {
        showErrorMessage(error.message || "No Movie Found!!!");
    }
}

// Function to Show Movie details on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";  // Clear previous results
    movieContainer.classList.remove('noBackground');

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2> 
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element.trim(); // Trim whitespace
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p> 
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;

    // Creating a div for Movie Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title} Poster"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

// Function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

// Function to handle the form submission
const handleFormSubmission = (e) => {
    e.preventDefault();

    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    } else {
        showErrorMessage("Enter movie name to get movie information.");
    }
}

// Adding Event Listener to Search Form
searchForm.addEventListener('submit', handleFormSubmission);