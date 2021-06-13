// //// Handles Redirect to submit post page from profile-page \\\\ \\

// redirects to submit page
toSubmitPostRedirectHandler = () => document.location.replace('/submit');

document.querySelector('#submit-post-input').addEventListener('click', toSubmitPostRedirectHandler);