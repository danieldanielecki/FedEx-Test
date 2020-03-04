import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'fedex-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * @constructor
   * @description Creates a new instance of this component.
   * @param  {formBuilder} - an abstraction class object to create a form group control for the contact form.
   */
  constructor(private formBuilder: FormBuilder) {}

  // Create contact form with all required validators.
  public contactForm: FormGroup = this.formBuilder.group({
    formControlFirstName: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required
      ])
    ],
    formControlLastName: [
      '',
      Validators.compose([
        Validators.maxLength(64),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required
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
        control => this.validatePasswords(control, 'password1')
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
   * @param {any} formData - object with submitted contact form data.
   * @returns {void}
   */
  public onSubmit(formData: any): void {
    console.log('form submitted...');
    console.log('firstName: ', formData.formControlFirstName);
    console.log('lastName: ', formData.formControlLastName);
    console.log('email: ', formData.formControlEmail);
    this.contactForm.reset(); // Reset form once user will click "Send".

    // Reset styling for 'required' input fields.
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key).setErrors(null);
    });
  }

  /**
   * @description Perform certain behaviours on button submit of the contact form.
   * @function validatePasswords
   * @param {AbstractControl} control - object of submitted contact form.
   * @param {String} name -
   * @returns {void}
   */
  // TODO: Make out of this comparison to first/last name.
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
  get password1(): AbstractControl {
    return this.contactForm.get('formControlPassword');
  }

  get password2(): AbstractControl {
    return this.contactForm.get('formControlConfirmPassword');
  }
}
