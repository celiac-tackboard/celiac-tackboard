function getCityPosts(event) {
  event.preventDefault();
  const city = event.target.outerText;
  let city_id = 0;

  switch (city) {
    case "Madison":
      city_id = 1;
      break;
    case "Milwaukee":
      city_id = 2;
      break;
    case "Kenosha":
      city_id = 3;
      break;
    case "Beloit":
      city_id = 4;
      break;
    default:
      break;
  }

  //fetch request
  document.location.replace(`/location/${city_id}`);
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
