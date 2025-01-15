import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LaddaModule} from "angular2-ladda";

@Component({
  selector: 'app-form-sketch-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LaddaModule,
  ],
  templateUrl: './form-sketch-popup.component.html',
  styleUrl: './form-sketch-popup.component.scss'
})
export class FormSketchPopupComponent {
  @Input() isLoading : boolean = false;
  @Input() formGroup : FormGroup;
  @Input() title = 'Popup Title';
  @Input() actionText = 'Submit';
  @Output() close = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();

  closePopup() {
    this.close.emit();
  }

  submitForm() {
    this.submit.emit();
  }
}
