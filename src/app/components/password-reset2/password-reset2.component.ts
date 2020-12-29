import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MIN_LENGTH_PASSWORD } from '../../commons/constants';

@Component({
  selector: 'app-password-reset2',
  templateUrl: './password-reset2.component.html',
  styleUrls: ['./password-reset2.component.scss']
})
export class PasswordReset2Component implements OnInit {

  passwordResetForm: FormGroup;
  validations: any;

  constructor(private formBuilder: FormBuilder,  private router: Router) { }

  ngOnInit(): void {
    const passwordRegex = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.;:,])(?=\\S)[\\S]{${MIN_LENGTH_PASSWORD},}$`;

    this.passwordResetForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('.*[\\S]+')]],
      newPassword: ['', [Validators.required, Validators.minLength(MIN_LENGTH_PASSWORD), Validators.pattern(passwordRegex)]],
      confirmNewPassword: ['', [Validators.required]],
    }, {validators: this.mustMatch('newPassword', 'confirmNewPassword')});

    this.validations = {
      code: {
        requiredMessage: 'Ce champ ne doit pas être vide',
      },
      newPassword: {
        requiredMessage: 'Ce champ ne doit pas être vide',
        minLengthMessage: `Le mot de passe doit contenir au moins ${MIN_LENGTH_PASSWORD} caractères`,
        patternMessage: `Le mot de passe doit contenir uniquement: lettre(s) majuscule(s), lettre(s) minuscule(s), chiffre(s) et caractère(s) spécial(aux)`
      },
      confirmNewPassword: {
        requiredMessage: 'Ce champ ne doit pas être vide',
        mustMatchMessage: 'Le contenu de ce champ doit être le même que celui du champ ci-dessus'
      }
    };
  }


  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  submit(): void {

  }
}
