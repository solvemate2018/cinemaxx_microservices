using Microsoft.EntityFrameworkCore;
using MovieService.Models;

namespace MovieService.Data;

public class MovieServiceDbContext : DbContext
{
    public virtual DbSet<Movie> Movies { get; set; }
    public virtual DbSet<Genre> Genres { get; set; }
    public virtual DbSet<Actor> Actors { get; set; }
    public virtual DbSet<Director> Directors { get; set; }
    public virtual DbSet<MovieActor> MovieActors { get; set; }
    
    public MovieServiceDbContext(DbContextOptions<MovieServiceDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovieActor>()
            .HasKey(ma => new { ma.MovieId, ma.ActorId });
        
        modelBuilder.Entity<MovieActor>()
            .HasOne(ma => ma.Movie)
            .WithMany(m => m.MovieActors)
            .HasForeignKey(ma => ma.MovieId);
        
        modelBuilder.Entity<MovieActor>()
            .HasOne(ma => ma.Actor)
            .WithMany(a => a.MovieActors)
            .HasForeignKey(ma => ma.ActorId);

        modelBuilder.Entity<Movie>()
            .HasOne<Director>(m => m.Director)
            .WithMany(d => d.Movies)
            .HasForeignKey(m => m.DirectorId);
        
        modelBuilder.Entity<Movie>()
            .HasOne<Genre>(m => m.Genre)
            .WithMany(g => g.Movies)
            .HasForeignKey(m => m.GenreId);
    }
}