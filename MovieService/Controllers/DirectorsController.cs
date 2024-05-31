using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Services.DirectorsService;
using MovieService.Services.MoviesService;

using Serilog.Core;

namespace MovieService.Controllers;

[ApiController]
[Route("directors")]
public class DirectorsController(IDirectorsService directorsService, IMoviesService moviesService, Logger logger, ActivitySource activitySource) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllDirectors()
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all directors.");
            return Ok(await directorsService.GetAllDirectorsAsync());
        }
    }
    
    [HttpGet]
    [Route("{directorId}/movies")]
    public async Task<IActionResult> GetAllMoviesForDirector([FromRoute] int directorId)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all movies for director: {}.", directorId);
            List<Movie>? movies = await moviesService.GetMoviesByDirectorIdAsync(directorId);
            if (movies != null) return Ok(movies);
            return NotFound("No director with that ID");
        }
    }
}