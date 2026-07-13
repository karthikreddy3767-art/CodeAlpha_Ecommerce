const id = new URLSearchParams(window.location.search).get("id");

const form = document.getElementById("editForm");

loadProduct();

async function loadProduct() {

    const response = await fetch("httphttps://codealpha-ecommerce-83hy.onrender.com://https://codealpha-ecommerce-83hy.onrender.com/api/products");

    const products = await response.json();

    const product = products.find(p => p._id === id);

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("image").value = product.image;
    document.getElementById("description").value = product.description;

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const updatedProduct = {

        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        image: document.getElementById("image").value,
        description: document.getElementById("description").value

    };

    const response = await fetch(

        `https://codealpha-ecommerce-83hy.onrender.com/api/products/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(updatedProduct)

        }

    );

    if (response.ok) {

        alert("Product Updated Successfully!");

        window.location.href = "admin.html";

    } else {

        alert("Update Failed");

    }

});