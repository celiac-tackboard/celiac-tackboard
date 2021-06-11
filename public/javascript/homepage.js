function getCityPosts(event) {
  console.log(event.target.outerText);
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
