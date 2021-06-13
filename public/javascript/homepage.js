function getCityPosts(event) {
  event.preventDefault();
  console.log(event.target.outerText);
  const city = event.target.outerText;

  //fetch request
  document.location.replace(`/location/${city}`);
}

document.addEventListener(
  "click",
  function (event) {
    if (event.target.matches(".button")) {
      // Run your code to open a modal
      getCityPosts(event);
    }
  },
  false
);
