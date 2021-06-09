async function newFormHandler(event) {
    event.preventDefault();
    console.log('event fired');
    // need to add these ids in handlebars
    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    let post_url = document.querySelector('input[name="post_url"]').value;
    let rating = document.querySelector('select[name="rating"]').value;
    const location_id = document.querySelector('select[name="location"]').value;
    // if rating is empty set value to null
    if (rating === '') {
        rating = null
    }
    
    // if post_url is empty set value to null
    if (post_url === '') {
        post_url = null;
    }
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
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new-submit-form").addEventListener("submit", newFormHandler);