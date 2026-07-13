const container = document.getElementById("adminProducts");

loadProducts();

async function loadProducts() {

    const response = await fetch("http://localhost:5000/api/products");

    const products = await response.json();

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

        <div class="col-lg-4 mb-4">

            <div class="card h-100 shadow">

                <img
                src="${product.image}"
                class="card-img-top"
                style="height:250px;object-fit:cover;">

                <div class="card-body">

                    <h5>${product.name}</h5>

                    <p>${product.description}</p>

                    <h4 class="text-primary">

                        ₹${product.price.toLocaleString("en-IN")}

                    </h4>

                    <button
                    class="btn btn-warning w-100 mb-2"
                    onclick="editProduct('${product._id}')">

                    <i class="bi bi-pencil"></i>

                    Edit

                    </button>

                    <button
                    class="btn btn-danger w-100"
                    onclick="deleteProduct('${product._id}')">

                    <i class="bi bi-trash"></i>

                    Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {

        method: "DELETE"

    });

    loadProducts();

}

function editProduct(id) {

    window.location.href = `edit-product.html?id=${id}`;

}