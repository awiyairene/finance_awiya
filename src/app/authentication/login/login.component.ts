import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginTemplate} from "../../models/LoginTemplate";
import {AuthService} from "../../services/auth.service";
import {LaddaModule} from "angular2-ladda";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../models/auth-response";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup;
  authData: LoginTemplate = new LoginTemplate();
  isLoading = signal<boolean>(false);

  constructor() {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.login(this.authData).subscribe({
        next: (value) => {
          //console.log(value);
          this.isLoading.set(false);
        }, error: err => {
          console.error("LOGIN_FAILED", err);
          this.isLoading.set(false);
        }
      })
    } else {
      console.log('Form not valid');
    }
  }

}
