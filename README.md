# CINEMA HD

A simple movie and TV show streaming app built with React. Browse classic films and TV shows, watch them online, and save your favorites to a personal list.

## Features

- Browse a collection of classic movies
- Browse classic TV shows
- Watch videos directly in the app
- Search for movies and shows by title
- Add movies and shows to your personal list
- Remove items from your list

## Getting Started

### Prerequisites

Make sure you have these installed on your computer:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Open your terminal and navigate to the project folder:
   ```
   cd movie-app_group3
   ```

2. Install all dependencies:
   ```
   npm install
   ```

### Running the App

Start the development server:
```
npm run dev
```

Open your browser and go to `http://localhost:5173` to see the app.

## How to Use

1. **Browse Movies**: Click on "Movies" in the menu to see all available movies
2. **Browse TV Shows**: Click on "TV Shows" to see all available shows
3. **Search**: Use the search bar at the top to find a specific movie or show
4. **Watch**: Click on any poster to watch the video
5. **Add to List**: Click "+ My List" on any item to save it to your personal list
6. **View My List**: Click "My List" to see all your saved items
7. **Remove from List**: Click the remove button on any item in your list to delete it

## Project Structure

```
src/
  components/
    Header.jsx       - Navigation and search bar
    Movies.jsx       - Movie listing and player
    TVShows.jsx      - TV show listing and player
    MyList.jsx       - Your saved movies and shows
    Search.jsx       - Search input component
    ShowCard.jsx     - Individual movie/show card
  App.jsx           - Main application component
  App.css           - Styling
  main.jsx          - Application entry point
```

## Data

All movies and TV shows are sourced from the archive.org collection. The data is stored in `db.json`.

## Technologies Used

- React - JavaScript library for building the user interface
- Vite - Fast build tool for web development
- Lucide React - Icon library for UI components

## Browser Support

This app works best in modern browsers like Chrome, Firefox, Safari, and Edge.

## Notes

- Videos are embedded from archive.org
- An internet connection is required to stream videos
- Some videos may take time to load depending on your connection speed

## License

This project is open source and available for educational purposes.
