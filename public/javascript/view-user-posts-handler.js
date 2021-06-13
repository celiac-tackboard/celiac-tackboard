//redirects to /profile-page
viewUserPostsRedirect = () => document.location.replace('/profile-page');

document.querySelector('#view-user-posts-button').addEventListener('click', viewUserPostsRedirect);