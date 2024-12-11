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
  @Input() fieldType!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() items: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() tooltip: string = '';

  @Output() selectionChange = new EventEmitter<any>();

  onSelectChange(event: any): void {
    const selectedItem = event.target.value;
    if (this.fieldType === 'country') {
      console.log('Country selected:', selectedItem);
    } else if (this.fieldType === 'state') {
      console.log('State selected:', selectedItem);
    }

    this.selectionChange.emit(selectedItem);
    this.control.setValue(selectedItem);
  }
}
