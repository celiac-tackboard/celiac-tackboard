async function loginFormHandler(event) {
    event.preventDefault();
    // added ids in handlebars
    const username = document.querySelector("#username-login").nodeValue.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        // is this route correct?:
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            // im sending logged in user to homepage, not sure if that is correct
            document.location.replace("/homepage");
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();
    // added ids to handlebars
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
        // is this route correct?:
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            console.log("success");
        } else {
            alert(response.statusText);
        }
    }
}
// ids should be handlebars
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);