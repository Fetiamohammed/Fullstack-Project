import { Component } from '@angular/core';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
  quotes: Quote[] = [
    { id: 1, text: '"The only way to do great work is to love what you do." - Steve Jobs', liked: false, expanded: false },
    { id: 2, text: '"Respect is one of the greatest expressions of love." - Miguel Angel Ruiz', liked: false, expanded: false },
    { id: 3, text: '"A real friend is one who walks in when the rest of the world walks out." - Walter Winchell', liked: false, expanded: false },
    { id: 4, text: '"Respect other peoples feelings. It might mean nothing to you, but it could mean everything to them" - Roy T. Bennett', liked: false, expanded: false },
    { id: 5, text: '"Adopt the pace of nature: her secret is patience." - Ralph Waldo Emerson', liked: false, expanded: false }
  ];

  toggleLike(quote: Quote): void {
    quote.liked = !quote.liked;
  }
}
