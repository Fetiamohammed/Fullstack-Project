using BooksAndUsersApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksAndUsersApi.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
            Books = Set<Book>();
        }

        public DbSet<Book> Books { get; set; }
    }
}
