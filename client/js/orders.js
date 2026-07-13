const user = JSON.parse(localStorage.getItem("user"));

const container = document.getElementById("ordersContainer");

loadOrders();

async function loadOrders(){

const response = await fetch(

`http://localhost:5000/api/orders/${user._id}`

);

const orders = await response.json();

container.innerHTML="";

if(orders.length===0){

container.innerHTML=`

<div class="alert alert-warning">

No Orders Yet

</div>

`;

return;

}

orders.reverse().forEach(order=>{

let products="";

order.items.forEach(item=>{

products+=`

<li>

${item.productId.name}

<span class="badge bg-primary">

Qty ${item.quantity}

</span>

</li>

`;

});

container.innerHTML+=`

<div class="card shadow mb-4">

<div class="card-body">

<div class="d-flex justify-content-between">

<div>

<h5>

Order ID

</h5>

<p class="text-muted">

${order._id}

</p>

</div>

<span class="badge bg-success">

${order.status}

</span>

</div>

<hr>

<h6>

Products

</h6>

<ul>

${products}

</ul>

<hr>

<div class="d-flex justify-content-between">

<strong>

Order Date

</strong>

<span>

${new Date(order.createdAt).toLocaleDateString()}

</span>

</div>

<div class="d-flex justify-content-between mt-2">

<strong>

Total Amount

</strong>

<h4 class="text-primary">

₹${order.totalAmount.toLocaleString("en-IN")}

</h4>

</div>

</div>

</div>

`;

});

}