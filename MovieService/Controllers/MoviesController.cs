using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Request;
using MovieService.Services.MoviesService;

namespace MovieService.Controllers;

[ApiController]
[Route("movies")]
public class MoviesController(IMoviesService moviesService) : ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetAllMovies()
    {
        List<Movie> movies = await moviesService.GetAllMoviesAsync();
        return Ok(movies);
    }

    [HttpGet]
    [Route("{movieId}")]
    public async Task<IActionResult> GetMovieDetails([FromRoute] int movieId)
    {
        Movie? movie = await moviesService.GetMovieDetailsByIdAsync(movieId);
        if (movie != null) return Ok(movie);
        return NotFound("No movie with that ID");
    }

    [HttpPost]
    public async Task<IActionResult> CreateMovie([FromBody] MovieRequest requestBody)
    {
        Movie? movie = await moviesService.CreateMovieAsync(requestBody);
        if(movie != null)
            return Created();
        return BadRequest();
    }

    //Update if Duration changes
    [HttpPut]
    [Route("{movieId}")]
    public async Task<IActionResult> UpdateMovie([FromRoute] int movieId, [FromBody] MovieRequest requestBody)
    {
        Movie? movie = await moviesService.UpdateMovieAsync(movieId, requestBody);
        if(movie != null)
            return NoContent();
        return BadRequest();
    }
    
    //Needs to publish event
    [HttpDelete]
    [Route("{movieId}")]
    public async Task<IActionResult> DeleteMovie([FromRoute] int movieId)
    {
        if (await moviesService.DeleteMovieAsync(movieId))
        {
            return NoContent();
        }
        else
        {
            return NotFound();
        }
    }
}