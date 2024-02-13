import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './../models/Books.modal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseApiUrl: string = 'https://booksandusersapi.azurewebsites.net';
  constructor(private http: HttpClient) {}
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseApiUrl + '/api/Books');
  }

  addBook(newBook: Book): Observable<Book> {
    newBook.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Book>(this.baseApiUrl + '/api/Books', newBook);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.baseApiUrl + '/api/Books/' + id);
  }
  editBook(id: string, updateBook: Book): Observable<Book> {
    return this.http.put<Book>(
      `${this.baseApiUrl}/api/Books/${id}`,
      updateBook
    );
  }
  deleteBook(id: string): Observable<Book> {
    const url = `${this.baseApiUrl}/api/Books/${id}`;
    return this.http.delete<Book>(url);
  }
}
// homepage CRUD  logic is done
