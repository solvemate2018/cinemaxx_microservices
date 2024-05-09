using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieService.Models;

public class MovieActor
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Movie")]
    public int MovieId { get; set; }
    public Movie Movie { get; set; }

    [Required]
    [ForeignKey("Actor")]
    public int ActorId { get; set; }
    public Actor Actor { get; set; }
}