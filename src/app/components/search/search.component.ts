import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pay-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
})
export class SearchComponent {
  payments = [];
  @Input() searchTerm: string = '';
  @Input() statusFilter: string = '';
  @Output() searchChanged: EventEmitter<void> = new EventEmitter<void>();

  onSearchChange() {
    this.searchChanged.emit();
  }
  onSearch(form: any) {
    console.log('Search executed for:', this.searchTerm);
  }
}
