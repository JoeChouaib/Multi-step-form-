import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  currentStep: number = 1;
  form: FormGroup;
  subscriptionSucceeded: boolean = false;

  constructor(public formservice: FormService, private fb: FormBuilder) {}

  onConfirm() {
    console.log(this.form.value);
    this.subscriptionSucceeded = !this.subscriptionSucceeded;
  }
  onNext() {
    if (this.currentStep !== 4) {
      this.currentStep = this.currentStep + 1;
    } else if (this.currentStep === 4) {
      this.onConfirm();
    }
  }
  onBack() {
    if (this.currentStep > 1) {
      this.currentStep = this.currentStep - 1;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      personalInfoForm: this.fb.group({
        name: [null, [Validators.required, Validators.min(4)]],
        email: [null, [Validators.email, Validators.required]],
        phoneNumber: [null, Validators.required],
      }),
      plansForm: this.fb.group({
        plan: [null, Validators.required],
        checkboxSwitch: [true],
      }),
      onsForm: this.fb.group({
        'Online Service': [null],
        'Larger storage': [null],
        'Customizable profile': [null],
      }),
    });
  }
}
