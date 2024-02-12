namespace BooksAndUsersApi.Models
{
    public class Book
    {
        public Guid id { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public decimal? Date { get; set; }
    }
}
