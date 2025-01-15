import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-empty',
  standalone: true,
  imports: [],
  templateUrl: './auth-empty.component.html',
  styleUrl: './auth-empty.component.scss'
})
export class AuthEmptyComponent {

  router = inject(Router);

  constructor() {
    //this.router.navigate(['/login']);
  }

}
