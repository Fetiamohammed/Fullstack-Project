import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './../../models/Books.modal';
import { BooksService } from './../../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  Books: Book[] = [];
  showEditModal = true;
  selectedBook: Book = {
    id: '',
    title: '',
    author: '',
    date: 0,
  };

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.Books = books;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe({
      next: (response: Book) => {
        alert('Book deleted successfully!');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
          this.ngOnInit();
        });
      }
    });
 }
}
// the CRUD logic is done
