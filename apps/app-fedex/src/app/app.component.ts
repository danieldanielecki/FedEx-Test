import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormGroupDirective
} from '@angular/forms';
import { RegisterService } from './register.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'fedex-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * @constructor
   * @description Creates a new instance of this component.
   * @param {FormBuilder} formBuilder - an abstraction class object to create a form group control for the contact form.
   * @param {RegisterService} registerService - service to perform HTTP POST request.
   */
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  // Create contact form with all required validators.
  public contactForm: FormGroup = this.formBuilder.group({
    formControlFirstName: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
        control => this.checkFirstName(control, 'firstName')
      ])
    ],
    formControlLastName: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
        control => this.checkLastName(control, 'lastName')
      ])
    ],
    formControlEmail: [
      '',
      Validators.compose([
        Validators.email,
        Validators.maxLength(64),
        Validators.minLength(6),
        Validators.required
      ])
    ],
    formControlPassword: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*?[A-Z]).*$'),
        Validators.required,
        control => this.validatePasswords(control, 'password1'),
        control => this.checkFirstName(control, 'firstName'),
        control => this.checkLastName(control, 'lastName')
      ])
    ],
    formControlConfirmPassword: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*?[A-Z]).*$'),
        Validators.required,
        control => this.validatePasswords(control, 'password1')
      ])
    ]
  });

  /**
   * @description Perform certain actions on button submit of the contact form.
   * @function onSubmit
   * @param {FormGroupDirective} formDirective - object used to reset validators.
   * @returns {void}
   */
  public onSubmit(formDirective: FormGroupDirective): void {
    // Execute invisible reCAPTCHA if the traffic is suspicious.
    this.recaptchaV3Service.execute('onSubmit').subscribe(() => {
      // Prepare necessary data for HTTP Post request.
      const dataToBeSend = {
        firstName: this.contactForm.get('formControlFirstName').value,
        lastName: this.contactForm.get('formControlLastName').value,
        email: this.contactForm.get('formControlEmail').value
      };
      const baseURL = 'https://demo-api.now.sh/users';

      // Give a call to registerService to register user.
      this.registerService
        .registerUser(dataToBeSend, baseURL)
        .subscribe(token => {
          console.log(token);
          alert('Success');
        });

      formDirective.resetForm(); // Reset validators, i.e. to workaround #4190 (https://github.com/angular/components/issues/4190).
      this.contactForm.reset(); // Reset form once user will click "Register".
    });
  }

  /**
   * @description Perform certain behaviours on button submit of the contact form.
   * @function validatePasswords
   * @param {AbstractControl} control - object of submitted contact form.
   * @param {String} name -
   * @returns {void}
   */
  private validatePasswords(control: AbstractControl, name: String) {
    if (
      this.contactForm === undefined ||
      this.password1.value === '' ||
      this.password2.value === ''
    ) {
      return null;
    } else if (this.password1.value === this.password2.value) {
      if (
        name === 'formControlPassword' &&
        this.password2.hasError('passwordMismatch')
      ) {
        this.password1.setErrors(null);
        this.password2.updateValueAndValidity();
      } else if (
        name === 'formControlConfirmPassword' &&
        this.password1.hasError('passwordMismatch')
      ) {
        this.password2.setErrors(null);
        this.password1.updateValueAndValidity();
      }
      return null;
    } else {
      return {
        passwordMismatch: { value: 'The provided passwords do not match' }
      };
    }
  }

  private checkFirstName(control: AbstractControl, name: String) {
    if (
      this.contactForm === undefined ||
      this.firstName.value === '' ||
      this.password1.value === '' ||
      this.firstName.value === null ||
      this.password1.value === null
    ) {
      return null;
    } else if (this.password1.value.includes(this.firstName.value)) {
      if (
        name === 'formControlFirstName' &&
        this.password1.hasError('firstNameInPassword')
      ) {
        this.firstName.setErrors(null);
        this.password1.updateValueAndValidity();
      } else if (
        name === 'formControlPassword' &&
        this.firstName.hasError('firstNameInPassword')
      ) {
        this.password1.setErrors(null);
        this.firstName.updateValueAndValidity();
      }

      return {
        firstNameInPassword: { value: 'First name in password' }
      };
    } else {
      return null;
    }
  }

  private checkLastName(control: AbstractControl, name: String) {
    if (
      this.contactForm === undefined ||
      this.lastName.value === '' ||
      this.password1.value === '' ||
      this.lastName.value === null ||
      this.password1.value === null
    ) {
      return null;
    } else if (this.password1.value.includes(this.lastName.value)) {
      if (
        name === 'formControlLastName' &&
        this.password1.hasError('lastNameInPassword')
      ) {
        this.lastName.setErrors(null);
        this.password1.updateValueAndValidity();
      } else if (
        name === 'formControlPassword' &&
        this.lastName.hasError('lastNameInPassword')
      ) {
        this.password1.setErrors(null);
        this.lastName.updateValueAndValidity();
      }

      return {
        lastNameInPassword: { value: 'Last name in password' }
      };
    } else {
      return null;
    }
  }

  get password1(): AbstractControl {
    return this.contactForm.get('formControlPassword');
  }

  get password2(): AbstractControl {
    return this.contactForm.get('formControlConfirmPassword');
  }

  get firstName(): AbstractControl {
    return this.contactForm.get('formControlFirstName');
  }

  get lastName(): AbstractControl {
    return this.contactForm.get('formControlLastName');
  }
}
