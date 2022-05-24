//---Récupération du lien et de l'orderId---
let request = window.location.search;
let urlParams = new URLSearchParams(request);
let orderId = urlParams.get("orderId");

//---Insertion de l'orderId dans l'HTML---
let orderNumber = document.querySelector("#orderId");
orderNumber.textContent = orderId;


