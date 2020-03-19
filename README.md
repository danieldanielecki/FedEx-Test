# Special note for this branch

This branch purpose is only to showcase improved code coverage by adding the 2 lines of unit tests and to mention what could have been improved from unit testing. The improvements to be done have been questioned on the Stack Overflow and are as follows:

- Untested 3 lines of code due to [TypeError: Cannot read property 'reset' of null for formDirective: FormGroupDirective](https://stackoverflow.com/questions/60739506/typeerror-cannot-read-property-reset-of-null-angular-unit-testing-formdirec)
- Throw an error to CoreModule if it would be imported more than once, but then the problem is [how to unit test this](https://stackoverflow.com/questions/60721866/angular-unit-testing-coremodule)?
- [Angular Unit Testing HTTP Error Interceptors catchError/ErrorEvent/Error](https://stackoverflow.com/questions/60578944/angular-unit-testing-http-error-interceptors-catcherror-errorevent-error)

# FedexTest

This is a test application for FedEx frontend case:

## Requirements

1. :white_check_mark: SPA form
2. :white_check_mark: First name, last name, e-mail and password
3. :white_check_mark: All these fields are required
4. :white_check_mark: Password validation:

- :white_check_mark: Minimum 8 characters
- :white_check_mark: Should have lower and uppercase letters
- :white_check_mark: Shouldn't contain user's first or last name

5. :white_check_mark: Email validation (using Angular's validator and minor custom checks)
6. :white_check_mark: Send a POST request to [https://demo-api.now.sh/users](https://demo-api.now.sh/users) in a JSON such as

```
{
  firstName: "Thomas",
  lastName: "Shelby",
  email: "thomas@shelby.co.uk"
}
```

## Tools to use

1. :white_check_mark: Latest Angular and TypeScript
2. :white_check_mark: UX/UI based on a CSS Framework (using latest Angular Material)
3. :white_check_mark: Don't bother about old borwsers
4. :white_check_mark: Solution is available on GitLab, here

## Review criteria

- Correctness – Is it production-ready application? Does the application do what was asked? If not, does the README explain why it is missing and/or different?
- Code quality – Are there any code smells? Is the coding style consistent with the Angular style guide?
- Testing - Is your logic covered with unit or integration tests?
- UX – Is the web interface understandable and pleasing to use?
- Documentation – Is there a README covering how to build and run your project?
- Technical choices – Are choices of libraries, architecture etc. appropriate for the task?

## How to run

Assuming that you have installed `Node.js` and `npm` on your machine please do the following commands in the terminal to run this application locally:

1. `git clone https://gitlab.com/danieldanielecki/fedex-test.git` please remember about the default `master` branch. The other branches I'm leaving you for investigation
2. `npm install`
3. `npm run serve` or `ng serve` or if you're using Docker `docker-compose -f "docker-compose.yml" up -d --build`
4. Visit `localhost:4200` in your preferred browser (please don't use Internet Explorer)

## About

The application generally contains what was required, on top of this there are several additions:

1. GitFlow, as wrote the `feature` branches I'm leaving only for the reason to show it, in real projects after every merge to the `develop` branch the `feature` branches should be removed.
2. Automated deployment to Firebase, which consits of these (automated) steps:

- Build
- Test
  - Known vulnerabilities using `audit-ci` (`Vulnerabilities`) - that's the reason why **not** `yarn`, in most cases you can fix these simply `npm audit fix`. Unfortunately, for this case during the day of deployment one of unfeasible to fix packages got something and therefore there are something like 15 medium vulnerabilities within this app deployed.
  - Style formatting (`Quality` in pipelines) - to keep track of consitent code
  - Static Code Application Security Testing (`SAST` in pipelines) - basically linting
  - Unit Testing (`Unit` in pipelines) - using `Jest`, code coverage around 90%
  - End-to-End Testing (`E2E` in pielines) - using `Cypress`, several sample test cases
- Staging - deployment to staging environment [https://fedex-staging.firebaseapp.com](https://fedex-staging.firebaseapp.com)
- Mozilla Observatory to check security on the staging environment. This is just a showcase how to include this in the pipeline, to do so Server Side Rendering (SSR) with (for example) Firebase Cloud Functions is required, within this deadline it wasn't possible.
- Production - deployment to production environment [https://fedex-production.firebaseapp.com](https://fedex-production.firebaseapp.com)
- Mozilla Observatory to check security on the staging environment. This is just a showcase how to include this in the pipeline, to do so Server Side Rendering (SSR) with (for example) Firebase Cloud Functions is required, within this deadline it wasn't possible.

3. `Docker`
4. Monorepository `Nx`
5. Application architecture to distinguish between `CoreModule`, `SharedModule` and other (`FeatureModule`'s)
6. Responsive Web Design using `Angular Grid Layout` (`CSS Flexbox` + `CSS Grid Layout`)
7. `ARIA` tested `ChromeVox`
8. `SweetAlert`'s for user information
9. `JSDoc` for documentation of the core logic
10. Accessibility plugin `Agastya`
11. Progressive Web Application

## Lighthouse results

- Performance 80/100
- Accessibility 100/100
- Best Practices 100/100
- SEO 73/100
- Progressive Web App :white_check_mark:

## Missing (additions)

What could have been improved:

1. Server Side Rendering (SSR), e.g. using Angular Universal + Cloud Functions + NestJS
2. Content Security Policy (SSR is requirement to do so)
3. TypeScript's Strict Security Compiler Rules
4. reCAPTCHA
5. Working on Lighthouse results
6. Working on Mozilla Observatory/Security Headers results (SSR is requirement to do so)
