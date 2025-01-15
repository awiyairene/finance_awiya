import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.scss'
})
export class ModalAlertComponent {
  title = 'Confirmation';
  message = 'Êtes-vous sûr de vouloir effectuer cette action ?';

  dialogRef = inject(MatDialogRef<ModalAlertComponent>)

  closeModal() {
    this.dialogRef.close();
  }

  confirmAction() {
    this.dialogRef.close(true);
  }
}
