using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Services.GenresService;
using MovieService.Services.MoviesService;

namespace MovieService.Controllers;

[ApiController]
[Route("genres")]
public class GenresController(IGenresService genresService, IMoviesService moviesService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllGenres()
    {
        List<Genre> genres = await genresService.GetAllGenresAsync();
        return Ok(genres);
    }
    
    [HttpGet]
    [Route("{genreId}/movies")]
    public async Task<IActionResult> GetAllMoviesForGenre([FromRoute] int genreId)
    {
        List<Movie>? movies = await moviesService.GetMoviesByGenreIdAsync(genreId);
        if (movies != null) return Ok(movies);
        return NotFound("No genre with that ID");
    }
}