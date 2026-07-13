const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {

    logoutButton.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Logged Out Successfully!");

        window.location.href = "login.html";

    });

}