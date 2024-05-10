using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Services.DirectorsService;
using MovieService.Services.MoviesService;

namespace MovieService.Controllers;

[ApiController]
[Route("directors")]
public class DirectorsController(IDirectorsService directorsService, IMoviesService moviesService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllDirectors()
    {
        List<Director> directors = await directorsService.GetAllDirectorsAsync();
        return Ok(directors);
    }
    
    [HttpGet]
    [Route("{directorId}/movies")]
    public async Task<IActionResult> GetAllMoviesForDirector([FromRoute] int directorId)
    {
        List<Movie>? movies = await moviesService.GetMoviesByDirectorIdAsync(directorId);
        if (movies != null) return Ok(movies);
        return NotFound("No director with that ID");
    }
}