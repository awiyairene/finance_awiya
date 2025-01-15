import {Component, inject, OnInit, signal} from '@angular/core';
import {MainSketchComponent} from "../../layouts/main-sketch/main-sketch.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FilterDataComponent} from "../filter-data/filter-data.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {Transaction, TransactionType} from "../../models/transaction";
import {MatDialog} from "@angular/material/dialog";
import {TransactionService} from "../../services/transaction.service";
import {NotifyService} from "../../services/notify.service";
import {SearchFilter} from "../../models/search-filter";
import {filterTransactions, formatDate} from "../../models/utils";
import {EditTransactionComponent} from "../edit-transaction/edit-transaction.component";
import {ModalAlertComponent} from "../../layouts/modal-alert/modal-alert.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    MainSketchComponent,
    CommonModule,
    FormsModule,
    FilterDataComponent,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {

  currentPage = 0;
  pageSize = 10;
  totalRecipes = 0;

  recipes: Transaction[] = [];
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  headers = [
    {key: 'designation', label: 'Désignation'},
    {key: 'createdDate', label: 'Date'},
    {key: 'amount', label: 'Montant'},
    {key: 'author', label: 'Auteur'}
  ];

  dialog = inject(MatDialog);
  transactionService = inject(TransactionService);
  notifyService = inject(NotifyService);
  isLoading = signal<boolean>(false);

  searchFilter: SearchFilter = {
    endDate: null,
    startDate: null,
    searchText: ""
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.isLoading.set(true);
    this.transactionService.searchRecipeTransactions(this.searchFilter).subscribe({
      next: (recipes) => {
        //console.log(recipes);
        if (this.searchFilter.searchText) {
          this.recipes = filterTransactions(this.searchFilter.searchText, recipes);
        } else {
          this.recipes = recipes;
        }
        this.totalRecipes = recipes.length;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.notifyService.openDefault("Récupération des données échouée", "OK");
        this.isLoading.set(false);
      }
    });
  }

  get paginatedRecipes(): Transaction[] {
    const sorted = [...this.recipes].sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Transaction];
      const bValue = b[this.sortColumn as keyof Transaction];

      if (this.sortDirection === 'asc') {
        return this.formatSortKeyValue(aValue).localeCompare(this.formatSortKeyValue(bValue));
      } else {
        return this.formatSortKeyValue(bValue).localeCompare(this.formatSortKeyValue(aValue));
      }
    });

    const start = this.currentPage * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }

  formatSortKeyValue(value: any) {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return "" + value + ""
  }

  get startIndex(): number {
    return this.currentPage * this.pageSize;
  }

  get endIndex(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalRecipes);
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecipes / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i);
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getRecipes();
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.getRecipes();
  }

  customDate(createdDate: Date) {
    return formatDate(createdDate);
  }

  addNewRecipe() {
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      width: "600",
      height: "auto",
      data: {
        type: TransactionType.RECIPE,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          //this.expenses.reverse();
          //this.expenses.push(value as Transaction);
          //this.expenses.reverse();
        }
      }
    });
  }

  updateRecipe(recipe: Transaction) {
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      width: "600",
      height: "auto",
      data: {
        type: TransactionType.RECIPE,
        objectId: recipe.id
      }
    });

    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          const index = this.recipes.findIndex(value1 => value1.id == recipe.id);
          if (index >= 0) {
            //this.expenses[index] = value as Transaction;
          }
        }
      }
    });
  }

  deleteRecipe(recipe: Transaction) {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      width: "600",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.transactionService.deleteTransaction(recipe.id)
            .then(r => {
              this.notifyService.openDefault("Suppression réussie", "OK");
              //const index = this.expenses.findIndex(value1 => value1.id == recipe.id);
              //this.expenses.splice(index, 1);
            })
            .catch(error => {
                console.log(error);
                this.notifyService.openDefault("Suppression échouée", "OK");
              }
            );
        }
      }
    });
  }

}
