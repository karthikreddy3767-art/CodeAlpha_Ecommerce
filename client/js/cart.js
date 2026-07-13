const user = JSON.parse(localStorage.getItem("user"));

const cartDiv = document.getElementById("cartItems");

const subtotal = document.getElementById("subtotal");

const total = document.getElementById("total");

loadCart();

async function loadCart(){

const response = await fetch(

`http://localhoshttps://codealpha-ecommerce-83hy.onrender.comt:5000/api/cart/${user._id}`

);

const cart = await response.json();

cartDiv.innerHTML="";

let grandTotal=0;

if(cart.length===0){

cartDiv.innerHTML=`

<div class="alert alert-warning">

Your cart is empty.

</div>

`;

subtotal.innerHTML="₹0";

total.innerHTML="₹0";

return;

}

cart.forEach(item=>{

grandTotal+=item.productId.price*item.quantity;

cartDiv.innerHTML+=`

<div class="card mb-4">

<div class="row g-0">

<div class="col-md-3">

<img
src="${item.productId.image}"
class="img-fluid rounded-start"
style="height:200px;object-fit:cover;">

</div>

<div class="col-md-9">

<div class="card-body">

<h4>

${item.productId.name}

</h4>

<p>

${item.productId.description}

</p>

<h5 class="text-primary">

₹${item.productId.price.toLocaleString("en-IN")}

</h5>

<div class="mt-3">

<button
class="btn btn-outline-danger"
onclick="changeQuantity('${item._id}','decrease')">

-

</button>

<span class="mx-3">

${item.quantity}

</span>

<button
class="btn btn-outline-success"
onclick="changeQuantity('${item._id}','increase')">

+

</button>

<button
class="btn btn-danger ms-4"
onclick="removeItem('${item._id}')">

<i class="bi bi-trash"></i>

Remove

</button>

</div>

</div>

</div>

</div>

</div>

`;

});

subtotal.innerHTML=`₹${grandTotal.toLocaleString("en-IN")}`;

total.innerHTML=`₹${grandTotal.toLocaleString("en-IN")}`;

}

async function changeQuantity(id,type){

await fetch(

`http://https://codealpha-ecommerce-83hy.onrender.comlocalhost:5000/api/cart/${type}/${id}`,

{

method:"PUT"

}

);

loadCart();

}

async function removeItem(id){

await fetch(

`http://localhohttps://codealpha-ecommerce-83hy.onrender.comst:5000/api/cart/${id}`,

{

method:"DELETE"

}

);

loadCart();

}

async function checkout(){

const response=await fetch(

"http:https://codealpha-ecommerce-83hy.onrender.com//localhost:5000/api/orders",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

userId:user._id

})

}

);

const data=await response.json();

alert(data.message);

window.location.href="orders.html";

}