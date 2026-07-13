const params = new URLSearchParams(window.location.search);

const id = params.get("id");

loadProduct();

async function loadProduct() {

    const response = await fetch(`https://codealpha-ecommerce-83hy.onrender.com/api/products`);

    const products = await response.json();

    const product = products.find(p => p._id === id);

    const div = document.getElementById("productDetails");

    div.innerHTML = `

    <div class="col-lg-6">

        <img
        src="${product.image}"
        class="img-fluid rounded shadow">

    </div>

    <div class="col-lg-6">

        <h1>${product.name}</h1>

        <h3 class="text-primary">

        ₹${product.price.toLocaleString("en-IN")}

        </h3>

        <div class="mb-3">

        ⭐⭐⭐⭐⭐

        </div>

        <p>

        ${product.description}

        </p>

        <button
        class="btn btn-success btn-lg"
        onclick="addToCart('${product._id}')">

        Add To Cart

        </button>

    </div>

    `;

}

async function addToCart(productId){

const user=JSON.parse(localStorage.getItem("user"));

await fetch("https://codealpha-ecommerce-83hy.onrender.com/api/cart",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:user._id,
productId

})

});

alert("Added To Cart");

}