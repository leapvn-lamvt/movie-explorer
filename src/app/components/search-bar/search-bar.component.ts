import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.search.emit(this.searchQuery);
  }
}
