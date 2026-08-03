function MovieCard({movie}) {
    
    function onFavoriteClick () {
        alert("clicked");
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movie.url} alt={movie.title} />
                <div className="movie-overlay">
                    <button onClick={onFavoriteClick}> ♥️</button>
                </div>                
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-date">{movie.release_date}</p>
            </div>
        </div>
    )
}

export default MovieCard;