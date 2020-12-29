import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset1',
  templateUrl: './password-reset1.component.html',
  styleUrls: ['./password-reset1.component.scss']
})
export class PasswordReset1Component implements OnInit {

  emailForm: FormGroup;
  emailValidation: any;
  constructor(private formBuilder: FormBuilder,  private router: Router) { }

  ngOnInit(): void {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(regex)]]
    });
    this.emailValidation = {
      requiredMessage: 'Ce champ ne doit pas être vide',
      invalidMailMessage: 'Entrez une adresse mail valide',
    };
  }
  submit(): void {

  }

}
