import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup-verif',
  templateUrl: './signup-verif.component.html',
  styleUrls: ['./signup-verif.component.scss'],
})
export class SignupVerifComponent implements OnInit {

  userIdVal: string;
  signupVerificationForm: FormGroup;
  emptyFieldMessage: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupVerificationForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.pattern('.*[\\S]+')]],
      code: ['', [Validators.required, Validators.pattern('.*[\\S]+')]],
    });
    this.emptyFieldMessage = 'Ce champ ne doit pas être vide';
    this.userIdVal = this.authService.user.id;
  }

  submit(): void {
    this.loading = true;
    this.authService
      .signUpActivate(
        this.signupVerificationForm.controls.userId.value,
        this.signupVerificationForm.controls.code.value
      )
      .then((res) => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  }

  resendCode(): void {
    this.loading = true;
    this.authService
      .signUpResendCode(
        this.authService.user.email
      )
      .then((res) => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  }
}
