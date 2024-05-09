using Microsoft.AspNetCore.Mvc;

namespace MovieService.Controllers;

[ApiController]
[Route("directors")]
public class DirectorsController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllDirectors()
    {
        return Ok();
    }
    
    [HttpGet]
    [Route("{directorId}/movies")]
    public async Task<IActionResult> GetAllMoviesForDirector([FromRoute] int directorId)
    {
        return Ok();
    }
}