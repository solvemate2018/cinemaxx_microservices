using MovieService.Models;

namespace MovieService.Services.MoviesService;

public class MoviesService : IMoviesService
{
    public Task<List<Movie>> GetAllMoviesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Movie> GetMovieDetailsByIdAsync(int movieId)
    {
        throw new NotImplementedException();
    }

    public Task<Movie> CreateMovieAsync(Movie movie)
    {
        throw new NotImplementedException();
    }

    public Task<Movie> UpdateMovieAsync(int movieId, Movie movie)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteMovieAsync(int movieId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Movie>> GetMoviesByActorIdAsync(int actorId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Movie>> GetMoviesByDirectorIdAsync(int directorId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Movie>> GetMoviesByGenreIdAsync(int genreId)
    {
        throw new NotImplementedException();
    }
}