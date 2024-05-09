using MovieService.Models;

namespace MovieService.Services.MoviesService;

public interface IMoviesService
{
    Task<List<Movie>> GetAllMoviesAsync();
    
    Task<Movie> GetMovieDetailsByIdAsync(int movieId);
    
    Task<Movie> CreateMovieAsync(Movie movie);

    Task<Movie> UpdateMovieAsync(int movieId, Movie movie);

    Task<bool> DeleteMovieAsync(int movieId);
    
    Task<List<Movie>> GetMoviesByActorIdAsync(int actorId);
    
    Task<List<Movie>> GetMoviesByDirectorIdAsync(int directorId);
    
    Task<List<Movie>> GetMoviesByGenreIdAsync(int genreId);
}