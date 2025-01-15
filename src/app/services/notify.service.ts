import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private _snackBar = inject(MatSnackBar);

  constructor() {
  }

  openDefault(message: string, action: string) {
    this._snackBar.open(message, action,
      {
        duration: 5000
      }
    );
  }

}
