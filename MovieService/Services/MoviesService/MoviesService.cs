using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Models;
using MovieService.Request;

namespace MovieService.Services.MoviesService;

public class MoviesService(MovieServiceDbContext dbContext) : IMoviesService
{
    public async Task<List<Movie>> GetAllMoviesAsync()
    {
        return await dbContext.Movies.ToListAsync();
    }

    public async Task<Movie?> GetMovieDetailsByIdAsync(int movieId)
    {
        var movie = await dbContext.Movies
            .Include(m => m.Genre)
            .Include(m => m.Director)
            .Include(m => m.Actors)
            .FirstOrDefaultAsync(m => m.Id == movieId);
        return movie;
    }

    public async Task<Movie?> CreateMovieAsync(MovieRequest requestData)
    {
        var genre = await dbContext.Genres.FindAsync(requestData.GenreId);
        var actors = await dbContext.Actors.Where(a => requestData.ActorIds.Contains(a.Id)).ToListAsync();
        var director = await dbContext.Directors.FindAsync(requestData.DirectorId);

        if (genre == null || actors.Count != requestData.ActorIds.Length || director == null)
        {
            return null;
        }
        
        Movie movie = new Movie
        {
            Title = requestData.Title, 
            Description = requestData.Description, 
            ReleaseDate = requestData.ReleaseDate, 
            Duration = requestData.Duration,
            GenreId = requestData.GenreId,
            DirectorId = requestData.DirectorId,
            Actors = actors,
        };
        
        var movieResult = await dbContext.Movies.AddAsync(movie);
        
        await dbContext.SaveChangesAsync();

        return movieResult.Entity;
    }

    public async Task<Movie?> UpdateMovieAsync(int movieId, MovieRequest requestData)
    {
        var genre = await dbContext.Genres.FindAsync(requestData.GenreId);
        var actors = await dbContext.Actors.Where(a => requestData.ActorIds.Contains(a.Id)).ToListAsync();
        var director = await dbContext.Directors.FindAsync(requestData.DirectorId);
        var movie = await dbContext.Movies.FindAsync(movieId);
        
        if (genre == null || actors.Count != requestData.ActorIds.Length || director == null || movie == null)
        {
            return null;
        }
        
        movie.Title = requestData.Title;
        movie.Description = requestData.Description;
        movie.ReleaseDate = requestData.ReleaseDate;
        movie.Duration = requestData.Duration;
        movie.GenreId = requestData.GenreId;
        movie.DirectorId = requestData.DirectorId;
        
        var existingMovieActors = await dbContext.MovieActors.Where(ma => ma.MovieId == movie.Id).ToListAsync();
        dbContext.MovieActors.RemoveRange(existingMovieActors);
        
        foreach (var actor in actors)
        {
            dbContext.MovieActors.Add(new MovieActor { MovieId = movie.Id, ActorId = actor.Id });
        }
        
        await dbContext.SaveChangesAsync();

        return movie;
    }

    public async Task<bool> DeleteMovieAsync(int movieId)
    {
        Movie? movie = await dbContext.Movies.FindAsync(movieId);
        if (movie != null)
            return false;
        dbContext.Remove(movie);
        await dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<List<Movie>?> GetMoviesByActorIdAsync(int actorId)
    {
        var actor = await dbContext.Directors.FindAsync(actorId);

        if (actor == null)
            return null;

        return await dbContext.Movies.Where(m => m.Actors.Any(a => a.Id == actorId)).ToListAsync();
    }

    public async Task<List<Movie>?> GetMoviesByDirectorIdAsync(int directorId)
    {
        var director = await dbContext.Directors.FindAsync(directorId);

        if (director == null)
            return null;

        return await dbContext.Movies.Where(m => m.DirectorId == directorId).ToListAsync();
    }

    public async Task<List<Movie>?> GetMoviesByGenreIdAsync(int genreId)
    {
        var genre = await dbContext.Genres.FindAsync(genreId);

        if (genre == null)
            return null;

        return await dbContext.Movies.Where(m => m.GenreId == genreId).ToListAsync();
    }
}