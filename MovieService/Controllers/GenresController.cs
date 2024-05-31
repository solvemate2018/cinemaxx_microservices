using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Services.GenresService;
using MovieService.Services.MoviesService;
using Serilog.Core;

namespace MovieService.Controllers;

[ApiController]
[Route("genres")]
public class GenresController(IGenresService genresService, IMoviesService moviesService, Logger logger, ActivitySource activitySource) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllGenres()
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all genres.");
            return Ok(await genresService.GetAllGenresAsync());
        }
    }
    
    [HttpGet]
    [Route("{genreId}/movies")]
    public async Task<IActionResult> GetAllMoviesForGenre([FromRoute] int genreId)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all movies for genre: {}.", genreId);
            List<Movie>? movies = await moviesService.GetMoviesByGenreIdAsync(genreId);
            if (movies != null) return Ok(movies);
            return NotFound("No genre with that ID");
        }
    }
}