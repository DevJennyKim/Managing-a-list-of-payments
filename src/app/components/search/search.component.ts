import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() statusFilterChange: EventEmitter<string> =
    new EventEmitter<string>();

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm);
    console.log('searchTerm: ', this.searchTerm);
  }
  onStatusChange() {
    this.statusFilterChange.emit(this.statusFilter);
    console.log('statusFilter: ', this.statusFilter);
  }
}
