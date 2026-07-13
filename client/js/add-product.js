const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value,

        price: Number(document.getElementById("price").value),

        image: document.getElementById("image").value,

        description: document.getElementById("description").value

    };

    const response = await fetch("http://locahttps://codealpha-ecommerce-83hy.onrender.comlhost:5000/api/products", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(product)

    });

    if (response.ok) {

        alert("Product Added Successfully!");

        window.location.href = "admin.html";

    } else {

        alert("Failed to add product.");

    }

});