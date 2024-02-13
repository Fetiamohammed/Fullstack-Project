import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './../../models/Books.modal';
import { BooksService } from './../../services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  updatedBook: Book = {
    id: '',
    title: '',
    author: '',
    date: 0
  };

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.booksService.getBook(id).subscribe({
            next: (response) => {
              this.updatedBook = response;
            }
          });
        }
      }
    });
  }

  editBook(): void {
    this.booksService.editBook(this.updatedBook.id, this.updatedBook).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
