## `todo - May 15`

### from may 12

1. **SOLVED** (window resize beyond .75% breaks page rendering)
   - adjust css to stop right side of nav bar from shrinking too far
2. reviews count on index splash needs to be centered
3. BusinessShow - scrollIntoView
   - on refresh, don't scroll to top (maintain scroll position)
   - try: location object
4. `BusinessShow` - render dynamic star count in `title card`

---

1. business show share button links to social
2. business show redirect to home on bad url

&nbsp;

---

#### Auth

1. Sign up fails to render error messages and the site breaks when providing validation failing data. Also, input width is not aligned with form submitting buttons.

2. profile button on nav bar opens the dropdown that is out of the screen when the site is opened on 11 inches wide screen.

#### Business Show

1. For visiting 'Website menu', should have it open a new tab instead of replacing current open window.

2. Visiting a show page where business id doesn't exist should display appropriate message (this would be considered as error handling for this feature).

3. You can set cursor css attribute to not-allowed for dead links. (you can follow this for any pages that has inaccessible links)

## &nbsp;

---

### PROCESS

#### Login + SignUp

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
      1. 'x' box -- **FIXED**
      2. line spacing for messages
         - **FIXED** - add 1px padding
      3. **FIXED** - `border-radius`

#### BusinessShow

0. `Log In` button not showing
   - **FIXED** - conditional css
1. refresh redirects to `/`
2. MenuCard - **FIXED** - 'website menu' link now opens in new window/tab
3. **FIXED** - URL linking to invalid biz redirects to homepage
4. Dead links:
   1. ` ContentNavBar`
      - **FIXED:**&nbsp; `write a review`&nbsp; button scrolls to reviews component

_current branch - fixDeadLinks - 1358.0512_

### index

1. stop nav bar right side from shrinking to avoid collision with search bar
   - **solved:**&nbsp; `min-width` and `justify-content`

---

`(e) 2023`
