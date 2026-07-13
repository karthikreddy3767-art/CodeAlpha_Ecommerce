const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    const username = document.getElementById("username");

    if (username) {
        username.innerText = `Welcome, ${user.name}`;
    }
}