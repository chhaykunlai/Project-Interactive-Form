# Project-Interactive-Form
This project uses  the useful interactivity to a web form

Plugin: jQuery

Scopes:
  - Project includes jQuery and utilizes it in at least some aspect of the form.
  - On page load, the cursor appears in the "Name" field, ready for a user to type.
  - "Your job role" text field appears when user selects "Other" from the Job Role menu.
  - Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
  - When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
  - User cannot select two activities that are at the same time.
  - Total cost of selected activities is calculated and displayed below the list of activities.
  - The "Credit Card" payment option is selected by default.
  - Payment option in the select menu matches the payment option displayed on the page.
  - When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden.
  - Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met:
   	1. Name field isn’t blank.
   	2. Email field contains validly formatted e-mail address: (doesn’t have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com, for example).
   	3. At least one checkbox under "Register for Activities" section must be selected.
   	4. If "Credit Card" is the selected payment option, the three fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-number CVV value.
  - On submission, the form provides an error indication or message for each field that requires validation:
   	1. Name field
   	2. Email field
   	3. “Register for Activities” checkboxes
   	4. Credit Card number, Zip code, and CVV, only if the credit card payment method is selected.
  - When JavaScript is disabled, all form fields and payment information is displayed, including the "Other" field under the "Job Role" section.

Extra credit:
 - “Color” drop down menu is hidden until a T-Shirt design is selected.
 - Form provides at least one error message in real time, before the form is submitted. For example, the error message appears near the email field when the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address.
 - Form provides at least one error message that changes depending on the error. For example, the email field displays a different error message when the email field is empty than it does when the email address is formatted incorrectly. *This is accomplished without the use of HTML5's built-in field validation.
