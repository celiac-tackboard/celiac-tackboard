async function upvoteClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    // make sure these routes are correct
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        bod: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

// make sure these id / elements are correct
document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);