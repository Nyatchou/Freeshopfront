import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import {
  MIN_LENGTH_USERNAME,
  MIN_LENGTH_PASSWORD,
} from '../../commons/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  signupForm: FormGroup;
  validations: any;
  showpassword = false;
  loading = false;

  ngOnInit(): void {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.;:,])(?=\\S)[\\S]{${MIN_LENGTH_PASSWORD},}$`;
    const usernameRegex = `^[\\w]{${MIN_LENGTH_USERNAME},}[\\s]*$`;
    // \[\#\?\!\@\$\%\^\&\*\-\]
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_LENGTH_USERNAME),
          Validators.pattern(usernameRegex),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(regex)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_LENGTH_PASSWORD),
          Validators.pattern(passwordRegex),
        ],
      ],
      sexe: ['', [Validators.required]],
      // dateNaissance: [null, [Validators.required]],
    });

    this.validations = {
      username: {
        requiredMessage: 'Ce champ ne doit pas être vide',
        minLengthMessage: `Ce champ doit contenir au moins ${MIN_LENGTH_USERNAME} caractères`,
        validUsernameMessage: `Ce champ ne doit pas contenir d' espaces, doit comporter uniquement des lettres, ou chiffres ou '_'`,
      },
      email: {
        requiredMessage: 'Ce champ ne doit pas être vide',
        invalidMailMessage: 'Entrez une adresse mail valide',
      },
      firstname: {
        requiredMessage: 'Ce champ ne doit pas être vide',
      },
      lastname: {
        requiredMessage: 'Ce champ ne doit pas être vide',
      },
      password: {
        requiredMessage: 'Ce champ ne doit pas être vide',
        minLengthMessage: `Le mot de passe doit contenir au moins ${MIN_LENGTH_PASSWORD} caractères`,
        patternMessage: `Le mot de passe doit contenir uniquement: lettre(s) majuscule(s), lettre(s) minuscule(s), chiffre(s) et caractère(s) spécial(aux)`,
      },
      sexe: {
        required: this.signupForm.get('sexe').hasError('required'),
        requiredMessage: 'Vous devez choisir un sexe',
      },
      // dateNaissance: {
      //   required: this.signupForm.get('dateNaissance').hasError('required'),
      //   requiredMessage: 'Vous devez sélectionner votre date de naissance',
      // },
    };
  }

  handleDateOpenChange(open: boolean): void {
    if (this.signupForm.get('dateNaissance').value) {
      console.log(this.signupForm.get('date').value.toLocaleDateString());
    }
  }

  togglePasswordVisibility(): void {
    this.showpassword = !this.showpassword;
  }
  // passwordValidator(control: AbstractControl): {[key: string]: boolean} | null {
  //   const passRegex = '#^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{10,}$#';
  // }
  submit(): void {
    this.loading = true;
    this.authService.signUp(
      this.signupForm.controls.username.value,
      this.signupForm.controls.password.value,
      this.signupForm.controls.firstname.value,
      this.signupForm.controls.lastname.value,
      this.signupForm.controls.email.value
    ).then((res) => {
      this.loading = false;
      this.authService.user.id = res.user_id;
    }).catch(() => {
      this.loading = false;
    });
  }

  googleSignup(): void {}

  facebookSignup(): void {}
}
