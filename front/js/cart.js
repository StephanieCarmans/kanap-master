//initialisation local storage
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
}

//envois sur le local storage
function getBasket(){
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }else{
        return JSON.parse(basket);
    }
}

//gestion des articles
// **sur page produit appeler la fonction addBasket 
//en addEventListener sur le bouton "ajouter au panier"**
function addBasket (product) {
    let basket = getBasket();
    let foundProduct = basket.find (p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
   }else{
        product.quantity = 1;
        basket.push(product);
    }
    saveBasket(basket);
}

//retirer un produit du panier
//**sur page panier fonction à appeler sur
// le bouton retrait de la ligne produit**/
function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}

//retirer quantité produit du panier
function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find (p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket); 
        }
    }  
}

//fonction quantite de produit dans le panier
function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

//calcul du prix total du panier
function getTotalPrice(){
let basket = getBasket();
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}
