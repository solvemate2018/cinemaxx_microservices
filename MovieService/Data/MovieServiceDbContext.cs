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
        ConfigureEntities(modelBuilder);
        SeedData(modelBuilder);
    }

    private void ConfigureEntities(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MovieActor>()
            .HasKey(ma => new { ma.MovieId, ma.ActorId });

        modelBuilder.Entity<Movie>()
            .HasMany(m => m.Actors)
            .WithMany()
            .UsingEntity<MovieActor>();

        modelBuilder.Entity<Movie>()
            .HasOne<Director>(m => m.Director)
            .WithMany()
            .HasForeignKey(m => m.DirectorId);
        
        modelBuilder.Entity<Movie>()
            .HasOne<Genre>(m => m.Genre)
            .WithMany()
            .HasForeignKey(m => m.GenreId);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Actor>().HasData(InitialData.GetActors());
        modelBuilder.Entity<Director>().HasData(InitialData.GetDirectors());
        modelBuilder.Entity<Genre>().HasData(InitialData.GetGenres());
        modelBuilder.Entity<Movie>().HasData(InitialData.GetMovies());
        modelBuilder.Entity<MovieActor>().HasData(InitialData.GetMovieActors());
    }
}