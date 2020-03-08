import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { RegisterService } from './register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fedex-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * @class
 */
export class AppComponent implements OnInit {
  /**
   * @constructs
   * @description Creates a new instance of this component.
   * @param {FormBuilder} formBuilder - an abstraction class object to create a form group control for the contact form.
   * @param {RegisterService} registerService - service to perform HTTP POST request.
   */
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  public contactForm: FormGroup; // Declare variable to handle the form elements with required validators.

  ngOnInit() {
    // Create contact form with all required validators.
    this.contactForm = this.formBuilder.group(
      {
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
            Validators.required
          ])
        ],
        formControlConfirmPassword: [
          '',
          Validators.compose([
            Validators.maxLength(64),
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*?[A-Z]).*$'),
            Validators.required
          ])
        ]
      },
      {
        validator: [
          this.validatePasswords(
            'formControlPassword',
            'formControlConfirmPassword'
          ),
          this.validateNamesInPasswords(
            'formControlFirstName',
            'formControlLastName',
            'formControlPassword'
          )
        ]
      }
    );
  }

  /**
   * @access public
   * @async
   * @description Perform certain actions on button submit of the contact form.
   * @function onSubmit
   * @param {FormGroupDirective} formDirective - object used to reset validators.
   * @returns {void}
   */
  public onSubmit(formDirective: FormGroupDirective): void {
    const baseURL = 'https://demo-api.now.sh/users';
    const dataToBeSend = {
      firstName: this.contactForm.get('formControlFirstName').value,
      lastName: this.contactForm.get('formControlLastName').value,
      email: this.contactForm.get('formControlEmail').value
    };
    // Give a call to registerService to register user.
    this.registerService.registerUser(dataToBeSend, baseURL).subscribe(() => {
      Swal.fire('Success', 'You have successfuly registered!', 'success');
      formDirective.resetForm(); // Reset validators, i.e. to workaround #4190 (https://github.com/angular/components/issues/4190).
      this.contactForm.reset(); // Reset form once user will click "Register".
    });
  }

  /**
   * @access private
   * @description Validate if passwords are different.
   * @function validatePasswords
   * @param {string} passwordControlName - reference to formControlPassword of the contactForm.
   * @param {string} confirmPasswordControlName - reference to formControlConfirmPassword of the contactForm.
   * @returns {(formGroup: FormGroup) => void}
   */

  private validatePasswords(
    passwordControlName: string,
    confirmPasswordControlName: string
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      // Get values of desired controls of the form.
      const passwordControl = formGroup.controls[passwordControlName];
      const confirmPasswordControl =
        formGroup.controls[confirmPasswordControlName];

      if (
        // Don't show the error if any different error occured in password confirmation.
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return; // Different validator shown an error, therefore return.
      }

      // Check if password and password confirmation are different.
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true }); // Password and confirm password are different, therefore show passwordMismatch error.
      } else {
        confirmPasswordControl.setErrors(null); // Password and confirm password are the same, therefore don't display any error.
      }
    };
  }

  /**
   * @access private
   * @description Validate if first or last name are included in password or password confirmation.
   * @function validateNamesInPasswords
   * @param {string} firstNameControName - reference to formControlFirstName of the contactForm.
   * @param {string} lastNameControName - reference to formControlLastName of the contactForm.
   * @param {string} passwordControlName - reference to formControlPassword of the contactForm.
   * @param {string} confirmPasswordControlName - reference to formControlConfirmPassword of the contactForm.
   * @returns {(formGroup: FormGroup) => void}
   */
  private validateNamesInPasswords(
    firstNameControName: string,
    lastNameControName: string,
    passwordControlName: string
  ): (formGroup: FormGroup) => void {
    {
      return (formGroup: FormGroup) => {
        // Get values of desired controls of the form.
        const firstNameControl = formGroup.controls[firstNameControName];
        const lastNameControl = formGroup.controls[lastNameControName];
        const passwordControl = formGroup.controls[passwordControlName];

        if (
          // Don't show the error if any different error occured in password.
          passwordControl.errors &&
          !passwordControl.errors.namesInPassword
        ) {
          return; // Different validator shown an error, therefore return.
        }

        // Cases with catching empty first and/or last name and comparing it to password are below in the if/else blocks.
        if (firstNameControl.value === '' && lastNameControl.value === '') {
          passwordControl.setErrors(null); // For empty values of first and last name don't show any error.
        }
        // Only first name has a value.
        else if (
          firstNameControl.value !== '' &&
          lastNameControl.value === ''
        ) {
          // Check if first name contains password.
          if (
            passwordControl.value
              .toLowerCase()
              .includes(firstNameControl.value.toLowerCase())
          ) {
            passwordControl.setErrors({ namesInPassword: true }); // First name contains password, therefore show namesInPassword error.
          }
          // All other cases when only first name has a value.
          else {
            passwordControl.setErrors(null); // First name doesn't contains password, therefore don't show any error.
          }
        }
        // Only last name has a value.
        else if (
          firstNameControl.value === '' &&
          lastNameControl.value !== ''
        ) {
          // Check if last name contains password.
          if (
            passwordControl.value
              .toLowerCase()
              .includes(lastNameControl.value.toLowerCase())
          ) {
            passwordControl.setErrors({ namesInPassword: true }); // Last name contains password, therefore show namesInPassword error.
          }
          // All other cases when only last name has a value.
          else {
            passwordControl.setErrors(null); // Last name doesn't contains password, therefore don't show any error.
          }
        }
        // First and last name have values.
        else if (
          firstNameControl.value !== '' &&
          lastNameControl.value !== ''
        ) {
          // Check if first or last name contains password.
          if (
            passwordControl.value
              .toLowerCase()
              .includes(firstNameControl.value.toLowerCase()) ||
            passwordControl.value
              .toLowerCase()
              .includes(lastNameControl.value.toLowerCase())
          ) {
            passwordControl.setErrors({ namesInPassword: true }); // First or last name contains password, therefore show namesInPassword error.
          }
          // All other cases when first and last name have values.
          else {
            passwordControl.setErrors(null); // First or last name don't contain password, therefore don't show any error.
          }
        }
        // All other cases.
        else {
          passwordControl.setErrors(null); // By default don't show any error.
        }
      };
    }
  }
}
