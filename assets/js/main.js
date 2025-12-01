// Main JavaScript file for the game website

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Search functionality with dropdown suggestions
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Store game data for quick searching
    const gameData = Array.from(gameCards).map(card => {
        return {
            element: card,
            title: card.querySelector('h3').textContent.toLowerCase(),
            category: card.querySelector('p').textContent.toLowerCase(),
            titleOriginal: card.querySelector('h3').textContent,
            categoryOriginal: card.querySelector('p').textContent,
            link: card.getAttribute('data-game-link'),
            image: card.querySelector('img') ? card.querySelector('img').src : ''
        };
    });
    
    if (searchForm && searchInput && searchDropdown) {
        // Handle form submission (Enter key or button click)
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // Hide dropdown
            searchDropdown.classList.remove('show');
            
            if (searchTerm === '') {
                // Show all games if search is empty
                gameCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter games based on search term
            gameCards.forEach(card => {
                const gameTitle = card.querySelector('h3').textContent.toLowerCase();
                const gameCategory = card.querySelector('p').textContent.toLowerCase();
                
                if (gameTitle.includes(searchTerm) || gameCategory.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Handle input changes for dropdown suggestions
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all games and hide dropdown
                gameCards.forEach(card => {
                    card.style.display = 'block';
                });
                searchDropdown.classList.remove('show');
                return;
            }
            
            // Filter games for dropdown
            const filteredGames = gameData.filter(game => 
                game.title.includes(searchTerm) || game.category.includes(searchTerm)
            );
            
            // Update dropdown
            updateSearchDropdown(filteredGames, searchTerm);
            
            // Show dropdown if there are results
            if (filteredGames.length > 0) {
                searchDropdown.classList.add('show');
            } else {
                searchDropdown.classList.remove('show');
            }
        });
        
        // Handle keyboard navigation
        searchInput.addEventListener('keydown', function(e) {
            const dropdownItems = searchDropdown.querySelectorAll('.search-result');
            
            if (dropdownItems.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    // Focus on the first item when arrow down is pressed
                    dropdownItems[0].focus();
                } else if (e.key === 'Escape') {
                    searchDropdown.classList.remove('show');
                    searchInput.focus();
                }
            }
        });
        
        // Handle navigation within dropdown items
        searchDropdown.addEventListener('keydown', function(e) {
            const dropdownItems = searchDropdown.querySelectorAll('.search-result');
            
            if (dropdownItems.length > 0) {
                const currentIndex = Array.from(dropdownItems).findIndex(item => item === document.activeElement);
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % dropdownItems.length;
                    dropdownItems[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + dropdownItems.length) % dropdownItems.length;
                    dropdownItems[prevIndex].focus();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (currentIndex >= 0 && currentIndex < dropdownItems.length) {
                        const link = dropdownItems[currentIndex].getAttribute('data-link');
                        if (link) {
                            window.location.href = link;
                        }
                    }
                } else if (e.key === 'Escape') {
                    searchDropdown.classList.remove('show');
                    searchInput.focus();
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target)) {
                searchDropdown.classList.remove('show');
            }
        });
    }
    
    // Function to update search dropdown with results
    function updateSearchDropdown(games, searchTerm) {
        if (games.length === 0) {
            searchDropdown.innerHTML = '<div class="no-results">No games found</div>';
            return;
        }
        
        let dropdownHTML = '';
        games.slice(0, 8).forEach(game => { // Limit to 8 results
            const highlightedTitle = highlightText(game.titleOriginal, searchTerm);
            const highlightedCategory = highlightText(game.categoryOriginal, searchTerm);
            
            dropdownHTML += `
                <div class="search-result" tabindex="0" data-link="${game.link}">
                    ${game.image ? `<img src="${game.image}" alt="${game.titleOriginal}" class="search-result-img">` : ''}
                    <div class="search-result-content">
                        <div class="search-result-title">${highlightedTitle}</div>
                        <div class="search-result-category">${highlightedCategory}</div>
                    </div>
                </div>
            `;
        });
        
        searchDropdown.innerHTML = dropdownHTML;
        
        // Add click event listeners to search results
        searchDropdown.querySelectorAll('.search-result').forEach(result => {
            result.addEventListener('click', function() {
                const link = this.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            });
            
            result.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const link = this.getAttribute('data-link');
                    if (link) {
                        window.location.href = link;
                    }
                }
            });
        });
    }
    
    // Function to highlight search terms in text
    function highlightText(text, term) {
        if (!term) return text;
        
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }
});

// Function to create a game card with responsive images
function createGameCard(gameName, gameLink, category) {
    // Convert game name to lowercase and replace spaces with hyphens for directory name
    const gameDirName = gameName.toLowerCase().replace(/\s+/g, '-');
    
    // Create filename-friendly version without spaces
    const fileName = gameName.toLowerCase().replace(/\s+/g, '');
    
    // Special case for Sudoku to match the actual file naming
    const imageFileName = gameName === 'Sudoku' ? 'sudokuclassic' : fileName;
    
    // Create the HTML structure for the game card with responsive images
    const gameCardHTML = `
        <div class="game-card" data-game-link="${gameLink}">
            <picture>
                <source media="(min-width: 1200px)" srcset="assets/images/games/${gameDirName}/800x450/${imageFileName}800450.webp">
                <source media="(min-width: 992px)" srcset="assets/images/games/${gameDirName}/500x300/${imageFileName}500300.webp">
                <source media="(min-width: 768px)" srcset="assets/images/games/${gameDirName}/300x200/${imageFileName}300200.webp">
                <img src="assets/images/games/${gameDirName}/200x200/${imageFileName}200.webp" alt="${gameName}">
            </picture>
            <div class="game-card-content">
                <h3>${gameName}</h3>
                <p>${category}</p>
            </div>
        </div>`;
    
    return gameCardHTML;
}

// Simple function to handle any dynamic interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameLink = this.getAttribute('data-game-link');
            if (gameLink) {
                window.location.href = gameLink;
            }
        });
    });
    
    // Log that the site is ready
    console.log('Game website loaded successfully!');
});

// Function to add a new game card to the grid
document.addEventListener('DOMContentLoaded', function() {
    // Example of how to use the createGameCard function
    // Uncomment the following lines to add a new game card dynamically
    
    /*
    const gameGrid = document.querySelector('.game-grid');
    const newGameCard = createGameCard('New Game', 'games/new-game.html', 'Action & Adventure');
    gameGrid.insertAdjacentHTML('beforeend', newGameCard);
    
    // Reattach event listeners to new cards
    const newCards = document.querySelectorAll('.game-card');
    newCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameLink = this.getAttribute('data-game-link');
            if (gameLink) {
                window.location.href = gameLink;
            }
        });
    });
    */
});

// Fullscreen API implementation
function toggleFullscreen() {
    var elem = document.getElementById("gameContainer");
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        // Exited fullscreen
    }
}