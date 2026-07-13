let allProducts = [];

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const cartCount = document.getElementById("cartCount");

const user = JSON.parse(localStorage.getItem("user"));

showLoader();
loadProducts();

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products");

        allProducts = await response.json();

        displayProducts(allProducts);

        updateCartCount();

    } catch (err) {

        console.log(err);

    }

    hideLoader();
}

function displayProducts(products) {

    productsContainer.innerHTML = "";

    if (products.length === 0) {

        productsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    No Products Found
                </div>
            </div>
        `;

        return;
    }

    products.forEach(product => {

        productsContainer.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="card h-100 shadow">

                <img
                    src="${product.image}"
                    class="card-img-top"
                    style="height:250px;object-fit:cover;">

                <div class="card-body d-flex flex-column">

                    <h5>${product.name}</h5>

                    <p>${product.description}</p>

                    <div class="mb-2">
                        ⭐⭐⭐⭐⭐
                    </div>

                    <h4 class="text-primary">
                        ₹${product.price.toLocaleString("en-IN")}
                    </h4>

                    <a
                        href="product.html?id=${product._id}"
                        class="btn btn-outline-primary mb-2">

                        View Details

                    </a>

                    <button
                        class="btn btn-primary mt-auto"
                        onclick="addToCart('${product._id}')">

                        <i class="bi bi-cart-plus"></i>
                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

searchInput.addEventListener("keyup", () => {

    const keyword = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);

});

async function addToCart(productId) {

    if (!user) {

        alert("Please Login First");

        window.location.href = "login.html";

        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/cart", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                userId: user._id,

                productId

            })

        });

        if (response.ok) {

            alert("Product Added Successfully");

            updateCartCount();

        }

    } catch (err) {

        console.log(err);

    }

}

async function updateCartCount() {

    if (!user) {

        cartCount.innerHTML = "0";

        return;

    }

    const response = await fetch(
        `http://localhost:5000/api/cart/${user._id}`
    );

    const cart = await response.json();

    cartCount.innerHTML = cart.length;

}

function showLoader() {

    if (loader)
        loader.style.display = "block";

}

function hideLoader() {

    if (loader)
        loader.style.display = "none";

}