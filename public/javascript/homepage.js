async function getCityPosts(event) {
  event.preventDefault();
  console.log(event.target.outerText);
  const city = event.target.outerText;

  //fetch request
  const postsRequest = await fetch(
    "api/posts?" + new URLSearchParams({ city })
  );

  const cityRequest = await fetch("/submit");

  console.log(await postsRequest.json());
  console.log(await cityRequest.json());
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
