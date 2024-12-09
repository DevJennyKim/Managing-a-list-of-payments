import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'pay-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: false,
})
export class InputFieldComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() items: any[] = [];
  @Input() isLoading: boolean = false;

  @Output() selectionChange = new EventEmitter<any>();

  onSelectChange(event: any): void {
    const selectedItem = event.target.value;
    this.selectionChange.emit(selectedItem);
    this.control.setValue(selectedItem);
  }
}
