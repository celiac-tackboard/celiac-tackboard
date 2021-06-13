//redirects to profile-page/comments
viewUserCommentsRedirect = () => document.location.replace('/profile-page/comments');

document.querySelector('#view-user-comments-button').addEventListener('click', viewUserCommentsRedirect);