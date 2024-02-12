using BooksAndUsersApi.Data;
using BooksAndUsersApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace BooksAndUsersApi.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BooksController : Controller
    {
        private readonly BookDbContext _bookDbContext;

        public BooksController(BookDbContext bookDbContext)
        {
            this._bookDbContext = bookDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookDbContext.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            var book = await _bookDbContext.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            book.id = Guid.NewGuid();
            await _bookDbContext.Books.AddAsync(book);
            await _bookDbContext.SaveChangesAsync();
            return Ok(book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBook(Guid id, [FromBody] Book updatedBook)
        {
            var existingBook = await _bookDbContext.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }


            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Date = updatedBook.Date;

            _bookDbContext.Update(existingBook);
            await _bookDbContext.SaveChangesAsync();

            return Ok(existingBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            var existingBook = await _bookDbContext.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _bookDbContext.Books.Remove(existingBook);
            await _bookDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
