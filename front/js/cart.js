//---Initialisation local storage---
let cartProducts = JSON.parse(localStorage.getItem("product"));
console.log(cartProducts, "produits ok");

function getItems() {
    //---Affichage si panier vide---
    if (cartProducts === null || cartProducts.length === 0) {
      let emptyCart = document.createElement("article");
      document.querySelector("#cart__items").appendChild(emptyCart);
      emptyCart.textContent = "Votre panier est vide";
    }else{
        //---Création des balises---
        for (let products of cartProducts) {
            //création balise <article>
            let article = document.createElement("article");
            document.querySelector("#cart__items").appendChild(article);
            article.classList.add("cart__item");
            article.setAttribute("data-id", products.idProduit);
            article.setAttribute("data-color", products.color);
            //création balise <div> pour l'image
            let divImage = document.createElement("div");
            article.appendChild(divImage);
            divImage.classList.add("cart__item__img");
            //création balise <img>   
            let img = document.createElement("img");
            divImage.appendChild(img);
            img.setAttribute("src", products.imageUrl);
            img.setAttribute("alt", products.altTxt);
           //création balise <div> "cart__item__content"
            let divContent = document.createElement("div");
            article.appendChild(divContent);
            divContent.classList.add("cart__item__content");
            //création balise <div> "cart__item__content__description"
            let divDescription = document.createElement("div");
            divContent.appendChild(divDescription);
            divDescription.classList.add("cart__item__content__description");
            //création balise <h2> nom produit
            let title = document.createElement("h2");
            divDescription.appendChild(title);
            title.textContent = products.nom;
            //création balise <p> couleur
            let pColor = document.createElement("p");
            divDescription.appendChild(pColor);
            pColor.textContent = products.color;
            //création balise <p> prix
           let pPrice = document.createElement("p");
           divDescription.appendChild(pPrice);
           pPrice.textContent = products.price + " €";
            //création balise <div> "cart__item__content__settings"
            let divSetting = document.createElement("div");
            divContent.appendChild(divSetting);
            divSetting.classList.add("cart__item__content__settings");
            //création balise <div> "cart__item__content__settings__quantity"
            let divSettingQuantity = document.createElement("div");
            divSetting.appendChild(divSettingQuantity);
            divSettingQuantity.classList.add("cart__item__content__settings__quantity");
            //création balise <p> quantité
            let pQuantity = document.createElement("p");
            divSettingQuantity.appendChild(pQuantity);
            pQuantity.textContent = "Qté : ";
            //création balise <imput> quantité
            let inputQuantity = document.createElement("input");
            divSettingQuantity.appendChild(inputQuantity);
            inputQuantity.value = products.quantity;
            inputQuantity.classList.add("itemQuantity");
            inputQuantity.setAttribute("type", "number");
            inputQuantity.setAttribute("min", "1");
            inputQuantity.setAttribute("max", "100");
            inputQuantity.setAttribute("name", "itemQuantity");
            //création balise <div> "cart__item__content__settings__delete"
            let divDelete = document.createElement("div");
            divSetting.appendChild(divDelete);
            divDelete.classList.add("cart__item__content__settings__delete");
            //création balise <p> "deleteItem"
            let pDelete = document.createElement("p");
            divDelete.appendChild(pDelete);
            pDelete.classList.add("deleteItem");
            pDelete.textContent = "supprimer";
        }
    }
}

getItems()

//---Calcul de la quantité total et du prix total des articles---
function totalItems() {
  //---Calcul de la quantité---
  let itemsQuantity = document.getElementsByClassName("itemQuantity");

  let totalQuantity = 0;

  for (let index = 0; index < itemsQuantity.length; index++) {
    totalQuantity += itemsQuantity[index].valueAsNumber;
  }
  let totalQuantityItems = document.getElementById("totalQuantity");
  totalQuantityItems.textContent = totalQuantity;
  console.log(totalQuantity, "reçu")

  //---Calcul du Prix---
  let totalPrice = 0;
  for (let index = 0; index < itemsQuantity.length; index++) {
    totalPrice += itemsQuantity[index].valueAsNumber * cartProducts[index].price;
  }
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.textContent = totalPrice;
  console.log(totalPrice, "prix addition")
}
totalItems();

//---Modifier la quantité des produits---
function changeQuantity() {
  const modifQuantity = document.querySelectorAll(".itemQuantity");

  for (let index = 0; index < modifQuantity.length; index++) {
    modifQuantity[index].addEventListener('change', function (event) {
      event.preventDefault();

      cartProducts[index].quantity = event.target.value;

      if (
        cartProducts[index].quantity == 0 ||
        cartProducts[index].quantity > 100
      ) {
        alert('Merci de sélectionner une quantité comprise entre 1 et 100');
        location.reload();
      } else {
        localStorage.setItem("product", JSON.stringify(cartProducts));
        totalItems();
        
      }
    });
  }
}
changeQuantity()

//---Supprimer un produit---
function removeItem() {
  const moveItem = document.querySelectorAll('.deleteItem');
  for (let index = 0; index < moveItem.length; index++) {
    moveItem[index].addEventListener('click', (event) => {
      event.preventDefault();
      //---Confirmer la suppression de la ligne article---//
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer ${cartProducts[index].quantity} ${cartProducts[index].nom} couleur ${cartProducts[index].color} ?`
        )
      ) {
        let idMoveItem = cartProducts[index].idProduit;
        let colorMoveItem = cartProducts[index].color;

        cartProducts = cartProducts.filter(
          (element) =>
            element.idProduit !== idMoveItem || element.color !== colorMoveItem
        );
        localStorage.setItem('product', JSON.stringify(cartProducts));
        location.reload();
      }
    });
  }
}

removeItem()


//----------------Début du Formulaire--------//

//---Regex-----//

//---Travail sur le formulaire------//

//---Postage des infos sur API avec POST---//




//--------------------------------------
//appeler toutes mes fonctions à la fin









/* --------------------------------------------------------------------
------------------ tuto panier --------------------------------

function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
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
for
//retirer un produit du panier
//**sur page panier fonction à appeler sur
// le bouton retrait de la ligne produit**/
/*function removeFromBasket(product){
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
}*/


   