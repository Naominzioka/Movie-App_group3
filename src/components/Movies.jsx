import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.jsx';
const MoviePlayer = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [data, setData] = useState({ movies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(jsonData => {
                setData(jsonData);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const getArchiveIdentifier = (url) => {
        const match = url.match(/archive\.org\/download\/([^\/]+)/);
        return match ? match[1] : null;
    };

    if (loading || error) {
        return (
            <div className="status-screen">
                <h2>{loading ? 'Loading movies...' : `Error: ${error}`}</h2>
            </div>
        );
    }

    return (
        <main className="container">
            <Header onGoToMovies={() => {
                console.log("Parent received reset signal!");
                setSelectedMovie(null);
            }} />
            {selectedMovie ? (
                <div className="player-view">
                    <button className="back-button" onClick={() => setSelectedMovie(null)}>← Back</button>

                    <div className="video-box">
                        <iframe
                            src={`https://archive.org/embed/${getArchiveIdentifier(selectedMovie["API-URL"])}`}
                            width="100%"
                            height="480"
                            allowFullScreen
                            title={selectedMovie.title}
                        />
                        <p>
                            Source: <a href={selectedMovie["API-URL"]} target="_blank" rel="noreferrer">Archive.org</a>
                        </p>
                    </div>

                    <div className="movie-details">
                        <h2>{selectedMovie.title} ({selectedMovie.year})</h2>
                        <p><strong>Genre:</strong> {selectedMovie.genre}</p>
                        <p>{selectedMovie.description}</p>
                    </div>
                </div>
            ) : (
                <section className="gallery">
                    <h1>Movies</h1>
                    <div className="grid">
                        {data.movies.map((movie) => (
                            <div key={movie.id} className="card" onClick={() => setSelectedMovie(movie)}>
                                <img src={movie.poster} alt={movie.title} />
                                <div className="card-meta">
                                    <h3>{movie.title}</h3>
                                    <span>{movie.rating} ⭐</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default MoviePlayer;