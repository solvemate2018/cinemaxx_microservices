using Microsoft.AspNetCore.Mvc;

namespace MovieService.Controllers;

[ApiController]
[Route("actors")]
public class ActorsController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllActors()
    {
        return Ok();
    }
    
    [HttpGet]
    [Route("{actorId}/movies")]
    public async Task<IActionResult> GetAllMoviesForActor([FromRoute] int actorId)
    {
        return Ok();
    }
}