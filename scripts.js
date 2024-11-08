// Check for saved theme in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // Toggle Theme Button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        let currentTheme = document.body.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save theme in localStorage
    });

    // Load Movies
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            const movieList = document.querySelector('.movie-list');
            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.description}</p>
                `;
                movieList.appendChild(movieCard);
            });
        });
});
// Sample data for the search functionality (you can extend it)
const searchData = [
    { title: "Mountain Adventure", description: "A thrilling mountain expedition." },
    { title: "Ocean Wonders", description: "Explore the beauty of the ocean." },
    { title: "City Lights", description: "A night tour through the city." },
    { title: "Forest Escape", description: "A peaceful walk in the woods." },
    { title: "Space Journey", description: "Journey through the stars and galaxies." }
];

// Function to perform search and filter results
function performSearch() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery)
    );

    displaySearchResults(filteredResults);
}

// Function to display search results
function displaySearchResults(results) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";  // Clear existing results

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
        results.forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultItem.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.description}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('open-upload-modal');
    const modal = document.getElementById('upload-modal');
    const closeModalButton = document.getElementById('close-modal');
    const uploadIframe = document.getElementById('upload-iframe');

    // Open modal when button is clicked
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal when "x" is clicked
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Listen for upload completion message from upload.html iframe
    window.addEventListener('message', (event) => {
        if (event.data === 'uploadComplete') {
            modal.style.display = 'none';
            alert('Video uploaded successfully!');
        }
    });
});
