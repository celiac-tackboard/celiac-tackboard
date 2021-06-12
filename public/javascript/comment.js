async function commentFormHandler(event) {
    event.preventDefault();
    
    // make sure these ids are in handlebars
    const comment_text = document.querySelector('textarea[name="comment-text"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if (comment_text) {
        // make sure this route is correct
        const response = await fetch('/api/comments', {
            method: 'POST',
            // make sure these ids are correct
            body: JSON.stringify({
                post_id,
                comment_text
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
}

// make sure these id / elements are correct
document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);