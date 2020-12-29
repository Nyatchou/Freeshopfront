import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  validations: any;
  showPassword = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/[^\s]+/)]],
      password: ['', [Validators.required, Validators.pattern(/[^\s]+/)]],
    });
    this.validations = {
      username: {
        requiredMessage: 'Ce champ ne doit pas être vide',
      },
      password: {
        requiredMessage: 'Ce champ ne doit pas être vide',
      },
    };
  }
  // passwordValidator(control: AbstractControl): {[key: string]: boolean} | null {
  //   const passRegex = '#^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{10,}$#';
  // }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  submit(): void {
    this.loading = true;
    this.authService.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).then((response) => {
      this.authService.setTokens(response.access, response.refresh);
      this.loading = false;
      this.router.navigate(['/']);
    }).catch((err) => {
      this.authService.errors = err;
      this.loading = false;
    });
  }

  googleLogin(): void {}

  facebookLogin(): void {}
}
