import {ChangeDetectionStrategy, Component, Inject, inject, OnInit, signal} from '@angular/core';
import {FormSketchPopupComponent} from "../../layouts/form-sketch-popup/form-sketch-popup.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Transaction, TransactionType} from "../../models/transaction";
import {TransactionService} from "../../services/transaction.service";
import {NotifyService} from "../../services/notify.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [
    FormSketchPopupComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTransactionComponent implements OnInit {

  dialogRef = inject(MatDialogRef<EditTransactionComponent>);
  transactionService = inject(TransactionService);
  notifyService = inject(NotifyService);
  formBuilder = inject(FormBuilder);

  transaction: Transaction;
  formGroup: FormGroup;
  popupTitle = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,) {
    //this.notifyService.openDefault("Open Snack Bar", "OK");

    if (this.dialogData.type) {
      if (this.dialogData.objectId) {
        this.popupTitle.set((this.dialogData.type as TransactionType) == TransactionType.EXPENSE ? 'Modification de la Dépense' : 'Modification de la Recette');
        this.getTransaction(this.dialogData.objectId);
      } else {
        this.popupTitle.set((this.dialogData.type as TransactionType) == TransactionType.EXPENSE ? 'Nouvelle Dépense' : 'Nouvelle Recette');
        this.transaction = new Transaction();
        this.transaction.type = this.dialogData.type;
        this.transaction.designation = '';
        this.transaction.createdDate = null;
        this.transaction.amount = 0;
        this.transaction.author = '';
        this.transaction.media = '';
      }
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group(
      {
        designation: this.formBuilder.control('', [Validators.required]),
        createdDate: this.formBuilder.control([Validators.required]),
        amount: this.formBuilder.control([Validators.required, Validators.min(1)]),
        author: this.formBuilder.control('', [Validators.required]),
        media: this.formBuilder.control('')
      }
    )
  }

  get formControls() {
    return this.formGroup.controls;
  }

  getTransaction(id: any) {
    this.isLoading.set(true);
    this.transactionService.getTransaction(id).subscribe(
      {
        next: transaction => {
          this.transaction = transaction;
          this.formGroup.patchValue(transaction);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.notifyService.openDefault('Récupération de la transaction échouée', "OK");
          this.isLoading.set(false);
        }
      }
    );
  }

  handleSubmit() {
    if (!this.formGroup.valid) {
      this.notifyService.openDefault("Veuillez remplir les champs requis", "OK");
      return;
    }
    if (this.transaction.amount == 0) {
      this.notifyService.openDefault("Veuillez saisir un montant spécifique", "OK");
      return;
    }

    //console.log(this.transaction);

    if (this.transaction.id) {
      this.updateTransaction();
    } else {
      this.createTransaction();
    }
  }

  createTransaction() {
    this.isLoading.set(true);
    this.transactionService.createTransaction(this.transaction).then(
      (value) => {
        console.log("createTransaction".toUpperCase(), value);
        this.notifyService.openDefault((this.transaction.type == TransactionType.EXPENSE ? "Dépense" : "Recette") + " créée avec succès", "OK");
        this.dialogRef.close(this.transaction);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 3000);
      }
    ).catch(
      (error) => {
        console.log(error);
        this.notifyService.openDefault("Création de la " + (this.transaction.type == TransactionType.EXPENSE ? "Dépense" : "Recette") + " échouée", "OK");
        this.isLoading.set(false);
      }
    );
  }

  updateTransaction() {
    this.isLoading.set(true);
    this.transactionService.updateTransaction(this.transaction).then(
      () => {
        this.notifyService.openDefault((this.transaction.type == TransactionType.EXPENSE ? "Dépense" : "Recette") + " modifiée avec succès", "OK");
        this.dialogRef.close(this.transaction);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 3000);
      }
    ).catch(
      (error) => {
        console.log(error);
        this.notifyService.openDefault("Modification de la " + (this.transaction.type == TransactionType.EXPENSE ? "Dépense" : "Recette") + " échouée", "OK");
        this.isLoading.set(false);
      }
    );
  }

  closePopup() {
    this.dialogRef.close();
  }
}
