using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Request;
using MovieService.Services.MoviesService;
using Serilog.Core;

namespace MovieService.Controllers;

[ApiController]
[Route("movies")]
public class MoviesController(IMoviesService moviesService, Logger logger, ActivitySource activitySource) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllMovies()
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all movies.");
            return Ok(await moviesService.GetAllMoviesAsync());
        }
    }

    [HttpGet]
    [Route("{movieId}")]
    public async Task<IActionResult> GetMovieDetails([FromRoute] int movieId)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting movie details for movie: {}.", movieId);
            Movie? movie = await moviesService.GetMovieDetailsByIdAsync(movieId);
            if (movie != null) return Ok(movie);
            return NotFound("No movie with that ID");
        }
    }

    
    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> CreateMovie([FromBody] MovieRequest requestBody)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Admin is adding new movie: {}.", requestBody.Title);
            Movie? movie = await moviesService.CreateMovieAsync(requestBody);
            if (movie != null)
                return Created();
            return BadRequest();
        }
    }

    //Update if Duration changes
    [HttpPut]
    [Route("{movieId}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> UpdateMovie([FromRoute] int movieId, [FromBody] MovieRequest requestBody)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Admin is updating movie: {}.", movieId);
            Movie? movie = await moviesService.UpdateMovieAsync(movieId, requestBody);
            if (movie != null)
                return NoContent();
            return BadRequest();
        }
    }
    
    //Needs to publish event
    [HttpDelete]
    [Route("{movieId}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> DeleteMovie([FromRoute] int movieId)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Admin is deleting movie: {}.", movieId);
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
}