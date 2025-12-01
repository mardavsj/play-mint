# Play Mint

A static single-page website for hosting HTML games with AdSense integration.

## Project Structure

```
/root
  index.html                 (main card page)
  privacy-policy.html
  ads.txt                    (AdSense ads.txt file)
  /games
     gameTemplate.html       (template for new games)
     NinjaBreakout.html      (sample game page)
     Sudoku.html             (sample game page)
     Tetris.html             (sample game page)
     ...
  /assets
     /css
        style.css           (main stylesheet)
     /js
        main.js             (main JavaScript file)
        imageGenerator.js   (placeholder image generator)
     /images
        (card images - currently using data URIs)
```

## Features

- Responsive grid layout with 35+ game cards
- Each card links to a dedicated game page
- AdSense-ready with placeholder containers
- Mobile-friendly design
- No frameworks - pure HTML, CSS, and JavaScript
- GitHub Pages compatible

## How to Add New Games

1. Copy `games/gameTemplate.html` to `games/[GameName].html`
2. Update the title and h1 text with the game name
3. Replace the placeholder embed script with the actual game embed code
4. Add a new card to `index.html` with the game link and appropriate image

## AdSense Integration

- AdSense script placeholder in `<head>` (uncomment when ready)
- Top and bottom ad containers on index.html
- Top, bottom, left, and right ad containers on each game page
- ads.txt file for AdSense verification

All ad containers are clearly separated from game content to comply with AdSense policies. Vertical ads are hidden on mobile devices for better user experience.