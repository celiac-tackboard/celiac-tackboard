// Set up star ratings
var starRatingEl = document.getElementById('star-rating');
var starRating = new Starry(starRatingEl);

let rating;
// element that displays the rating
let ratingTextEl = document.querySelector('#rating-text');
const clearRatingBtn = document.querySelector('#clear-rating-button');
const submitPostBtn = document.querySelector('#submit-post-button');

changeRatingHandler = () => ratingTextEl.textContent = `${starRating.getCurrentRating()}`;

clearRatingHandler = () => ratingTextEl.textContent = '';

async function newFormHandler(event) {
    event.preventDefault();
    // assign the values of form to variables
    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    let post_url = document.querySelector('input[name="post_url"]').value;
    // takes html of ratingTextEl and parses into an integer to use in db
    rating = parseInt(ratingTextEl.innerHTML)
    const location_id = document.querySelector('select[name="location"]').value;
    // if rating is falsy set rating to null
    if (!rating) {
        rating = null
    }
    // if post_url is empty set value to null
    if (post_url === '') {
        post_url = null;
    }
    console.log(`rating = ${rating}`);
    // fetch request to api
        const response = await fetch(`api/posts`, {
        method: "POST",
        body: JSON.stringify({
            title,
            description,
            post_url,
            rating,
            location_id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("/profile-page");
    } else {
        alert(response.statusText);
    }
}

starRatingEl.addEventListener("click", changeRatingHandler);

clearRatingBtn.addEventListener("click", clearRatingHandler);

document.querySelector(".new-submit-form").addEventListener("submit", newFormHandler);