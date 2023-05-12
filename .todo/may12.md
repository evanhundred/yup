## `todo - May 12`

### Open issues

1. window resize beyond .75% breaks page rendering

#### Auth

1. Sign up fails to render error messages and the site breaks when providing validation failing data. Also, input width is not aligned with form submitting buttons.

2. profile button on nav bar opens the dropdown that is out of the screen when the site is opened on 11 inches wide screen.

#### Business Show

1. For visiting 'Website menu', should have it open a new tab instead of replacing current open window.

2. Visiting a show page where business id doesn't exist should display appropriate message (this would be considered as error handling for this feature).

3. You can set cursor css attribute to not-allowed for dead links. (you can follow this for any pages that has inaccessible links)

&nbsp;

### PROCESS

1. signup page error rendering.
   1. after clicking 'x' on errors, errors after that are not rendered
      - FIX -- SignupFormPage & LoginFormPage - setHideErrorBox(true) on handleSubmit
   2. tested signup. site break not reproduced.
   3. 'sign up' button is too narrow
      - FIX -- SignupForm.css - added box-sizing value to input tag
      ```css
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      ```
   4. complete error styling
      1. 'x' box -- FIXED
      2. line spacing for messages
      3. FIXED - `border-radius`

---

`(e) 2023`
