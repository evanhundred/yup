## `todo - june 8`

1. create new table for rails backend: biz-photos
   - each business has a respective biz-photos entity
   - each biz entity will get photos attached from user, through yup site

---

### `notes + bugs`

1. nav bar on biz-photos: search should line up with photos a la yelp (see screenshots)

---

#### `todo - june 3`

#### `notes + bugs`

1. _fixed_ resize window - navbar right side collides with left side when sizing window down.

#### `todo - june 1`

business show:

1. _(complete)_ redirect to "/" on incoming invalid business id's
   - compare params number to businesses.length; if too high, load `business not found`
   - **FIXED**: redirect to index. no errors should be presented to the user, because it results from an invalid url, which may result from various circumstances.
   - fetch all businesses, compare count to params number
   - if count is 0 or 1, full array has not yet loaded
   - this will not work at scale, only for small set of entities.
2. fix dead links - enumerated in previous todo's

---

`previous todo's`

<!-- copied from may 15 -->

####`todo - May 15`

`business show:`

1. add photo button - click
   bring to business CRUD page - add photo
   - create simple biz crud landing page
   - 2 options:
     1. yelp.com - separate hash files/folders for each business,
        to intercept user photos
     2. businesses / addPhotos
   - not sure why this is done by yelp. if I implement it simply,
     I can port it over to method 1 if necessary later on.
   - _update_ because user submitted images may be problematic to link with a business, and because associating images with a given business may cause bandwidth issues for that entity: make photo upload a separate component.
   - each container can max out at 50 photos, or a certain
   - when 'add photo' button is clicked, app asks database if container is full
   - if not full, use latest container hash to add photos
   - if full, create new container hash

####`todo - May 12`

1. **SOLVED** (window resize beyond .75% breaks page rendering)
   - adjust css to stop right side of nav bar from shrinking too far
2. reviews count on index splash needs to be centered
3. BusinessShow - scrollIntoView
   - on refresh, don't scroll to top (maintain scroll position)
   - try: location object
4. `BusinessShow` - render dynamic star count in `title card`

---

## ###`previous notes`

1. business show share button links to social
2. business show redirect to home on bad url

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
