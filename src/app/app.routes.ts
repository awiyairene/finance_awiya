import {Routes} from '@angular/router';
import {LoginComponent} from "./authentication/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ExpensesComponent} from "./components/expenses/expenses.component";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {authGuard} from "./guards/auth.guard";
import {AuthEmptyComponent} from "./authentication/auth-empty/auth-empty.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

export const routes: Routes = [
  {
    path: "auth",
    component: AuthEmptyComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "expenses",
    component: ExpensesComponent,
    canActivate: [authGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [authGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
];
