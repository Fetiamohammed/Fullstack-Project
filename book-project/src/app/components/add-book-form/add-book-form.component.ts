import { BooksService } from './../../services/books.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './../../models/Books.modal';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent {
  newBook: Book = {
    id:'',
    title:'',
    author:'',
    date: 0
  }
  constructor(private booksService: BooksService, private router: Router){}
  addBook(){
    this.booksService.addBook(this.newBook)
    .subscribe({
      next: (book)=> {
        this.router.navigate(['home']);
      },
      error: (response) =>{
        console.log(response);
      }
    });
  }
}
//Adding books is done
