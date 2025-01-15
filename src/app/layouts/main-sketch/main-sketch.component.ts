import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  viewChild
} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/auth-response";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDrawerMode, MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MediaMatcher} from "@angular/cdk/layout";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MenuItem} from "../../models/menu-item";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-main-sketch',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, RouterLinkActive, MatTooltip
  ],
  templateUrl: './main-sketch.component.html',
  styleUrl: './main-sketch.component.scss'
})
export class MainSketchComponent implements OnDestroy, AfterViewInit, OnChanges {
  authService = inject(AuthService);
  user: User;

  mobileQuery: MediaQueryList;

  menuItems: Array<MenuItem> = [
    {
      name: "Tableau de bord",
      path: "/dashboard"
    },
    {
      name: "Mes Dépenses",
      path: "/expenses"
    },
    {
      name: "Mes recettes",
      path: "/recipes"
    },
  ];

  _mobileQueryListener: () => void;
  mode: MatDrawerMode = "side";

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mode = this.mobileQuery.matches ? 'over' : 'side';

    this.authService.getUser().subscribe({
      next: value => {
        if (value) {
          this.user = value.toJSON() as User;
        }
      }, error: err => {
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  logout() {
    this.authService.logout();
  }

}
