import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Transaction, TransactionType} from "../models/transaction";
import {map, Observable} from "rxjs";
import {StatsReport} from "../models/stats-report";
import {SearchFilter} from "../models/search-filter";
import {ChartData} from "../models/chart-data";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private collectionName = 'transactions';

  constructor(private firestore: AngularFirestore) {
  }

  createTransaction(transaction: Transaction): Promise<void> {
    const id = this.firestore.createId();
    transaction.id = id;
    const transactionObject = { ...transaction };
    return this.firestore.collection(this.collectionName).doc(id).set(JSON.parse(JSON.stringify(transactionObject)));
  }

  getTransaction(id: string): Observable<Transaction> {
    return this.firestore.collection<Transaction>(this.collectionName).doc(id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Transaction;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  getStatsReport(): Observable<StatsReport> {
    return this.getTransactions().pipe(
      map(transactions => {
        const stats: StatsReport = {
          expensesCount: 0,
          recipesCount: 0,
          expensesTotalAmount: 0,
          recipesTotalAmount: 0
        };

        transactions.forEach(transaction => {
          if (transaction.type === TransactionType.EXPENSE) {
            stats.expensesCount++;
            stats.expensesTotalAmount += transaction.amount;
          } else if (transaction.type === TransactionType.RECIPE) {
            stats.recipesCount++;
            stats.recipesTotalAmount += transaction.amount;
          }
        });

        return stats;
      })
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.firestore.collection<Transaction>(this.collectionName).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Transaction;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  searchExpenseTransactions(searchFilter: SearchFilter): Observable<Transaction[]> {
    return this.firestore.collection<Transaction>(
      this.collectionName,
      (ref) => {
        let query = ref.where('type', '==', TransactionType.EXPENSE).orderBy('createdDate', 'desc');
        if (searchFilter.startDate) {
          query = query.where('createdDate', '>=', searchFilter.startDate);
        }
        if (searchFilter.endDate) {
          query = query.where('createdDate', '<=', searchFilter.endDate);
        }
        return query;
      }
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Transaction;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  searchRecipeTransactions(searchFilter: SearchFilter): Observable<Transaction[]> {
    return this.firestore.collection<Transaction>(this.collectionName,
      (ref) => {
        let query = ref.where('type', '==', TransactionType.RECIPE).orderBy('createdDate', 'desc');
        if (searchFilter.startDate) {
          query = query.where('createdDate', '>=', searchFilter.startDate);
        }
        if (searchFilter.endDate) {
          query = query.where('createdDate', '<=', searchFilter.endDate);
        }
        return query;
      }
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Transaction;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  updateTransaction(transaction: Transaction): Promise<void> {
    const transactionObject = { ...transaction };
    return this.firestore.collection(this.collectionName).doc(transaction.id).update(transactionObject);
  }

  deleteTransaction(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }


  // Charts Data Services
  // Fonction pour obtenir les données sur un intervalle d'une semaine
  getWeeklyData(): Observable<ChartData> {
    return this.getTransactions().pipe(
      map(transactions => {
        const result = {
          xLabels: [],
          expensesCountData: [],
          recipesCountData: [],
          expensesAmountData: [],
          recipesAmountData: []
        };

        const daysOfWeek = Array.from({ length: 7 }, (v, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000));

        daysOfWeek.forEach(date => {
          const dateString = `${date.getDate()} - ${date.toLocaleString('default', { month: 'short' })}`;
          result.xLabels.unshift(dateString);

          const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE && new Date(t.createdDate).toDateString() === date.toDateString());
          const recipes = transactions.filter(t => t.type === TransactionType.RECIPE && new Date(t.createdDate).toDateString() === date.toDateString());

          result.expensesCountData.unshift(expenses.length);
          result.recipesCountData.unshift(recipes.length);

          result.expensesAmountData.unshift(expenses.reduce((sum, t) => sum + t.amount, 0));
          result.recipesAmountData.unshift(recipes.reduce((sum, t) => sum + t.amount, 0));
        });

        return result;
      })
    );
  }

  // Fonction pour obtenir les données sur un intervalle d'un mois
  getMonthlyData(): Observable<ChartData> {
    return this.getTransactions().pipe(
      map(transactions => {
        const result = {
          xLabels: [],
          expensesCountData: [],
          recipesCountData: [],
          expensesAmountData: [],
          recipesAmountData: []
        };

        const daysOfMonth = Array.from({ length: 30 }, (v, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000));

        daysOfMonth.forEach(date => {
          const dateString = `${date.getDate()} - ${date.toLocaleString('default', { month: 'short' })}`;
          result.xLabels.unshift(dateString);

          const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE && new Date(t.createdDate).toDateString() === date.toDateString());
          const recipes = transactions.filter(t => t.type === TransactionType.RECIPE && new Date(t.createdDate).toDateString() === date.toDateString());

          result.expensesCountData.unshift(expenses.length);
          result.recipesCountData.unshift(recipes.length);

          result.expensesAmountData.unshift(expenses.reduce((sum, t) => sum + t.amount, 0));
          result.recipesAmountData.unshift(recipes.reduce((sum, t) => sum + t.amount, 0));
        });

        return result;
      })
    );
  }

  // Fonction pour obtenir les données sur un intervalle de trois mois
  getQuarterlyData(): Observable<ChartData> {
    return this.getTransactions().pipe(
      map(transactions => {
        const result = {
          xLabels: [],
          expensesCountData: [],
          recipesCountData: [],
          expensesAmountData: [],
          recipesAmountData: []
        };

        const weeksOfQuarter = Array.from({ length: 12 }, (v, i) => {
          const startOfWeek = new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 6);
          return { startOfWeek, endOfWeek };
        });

        weeksOfQuarter.forEach(week => {
          const weekString = `${week.startOfWeek.getDate()} - ${week.endOfWeek.getDate()} ${week.startOfWeek.toLocaleString('default', { month: 'short' })}`;
          result.xLabels.unshift(weekString);

          const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE && new Date(t.createdDate) >= week.startOfWeek && new Date(t.createdDate) <= week.endOfWeek);
          const recipes = transactions.filter(t => t.type === TransactionType.RECIPE && new Date(t.createdDate) >= week.startOfWeek && new Date(t.createdDate) <= week.endOfWeek);

          result.expensesCountData.unshift(expenses.length);
          result.recipesCountData.unshift(recipes.length);

          result.expensesAmountData.unshift(expenses.reduce((sum, t) => sum + t.amount, 0));
          result.recipesAmountData.unshift(recipes.reduce((sum, t) => sum + t.amount, 0));
        });

        return result;
      })
    );
  }

}
