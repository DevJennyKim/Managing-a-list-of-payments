import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
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
  @Input() control!: AbstractControl;
  @Input() items: any[] = [];
  @Input() isLoading: boolean = false;

  onSelectChange(event: any) {
    console.log('Selected value: ', event);
  }
}
