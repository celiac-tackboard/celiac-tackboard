async function newFormHandler(event) {
    event.preventDefault();

    // need to add these ids in handlebars
    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;

    // make sure this route is correct
    const response = await fetch(`api/posts`, {
        method: "POST",
        body: JSON.stringify({
            title,
            post_url
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("dashboard");
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);