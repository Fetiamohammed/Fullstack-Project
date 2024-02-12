using Microsoft.EntityFrameworkCore;

namespace BooksAndUsersApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Users = Set<User>();
        }

        public DbSet<User> Users { get; set; }
    }



}
