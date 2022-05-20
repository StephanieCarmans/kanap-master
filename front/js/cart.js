//---Initialisation local storage---
let cartProducts = JSON.parse(localStorage.getItem("product"));
//console.log(cartProducts, "produits ok");

//---Récupèration du prix dans l'api---
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => {
    if (cartProducts) {
      for (p of cartProducts) {
        //console.table(data);
        //console.table(cartProducts);
        const product = data.find((d) => d._id === p.idProduit);
        if (product) {
          p.price = product.price;
          //console.log(typeof p.price, "valeurs")
          //console.log(p.price, "valeurs")
        }
        
      }
    }
    getMyItems();
    totalItems();
    changeQuantity()
    removeItem()
    getForm()
    orderForm()
  })
  .catch((error) => console.error(error));

//---Affichage du panier vide ou du panier plein---
function getMyItems() {
  //---Message si le panier est vide---
  if (cartProducts === null || cartProducts.length === 0) {
    let emptyCart = document.createElement("article");
    document.querySelector("#cart__items").appendChild(emptyCart);
    emptyCart.textContent = "Votre panier est actuellement vide. Vous n'avez aucune commande en cours.";
    
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
  //console.log(totalQuantity, "reçu")

  //---Calcul du Prix---
  let totalPrice = 0;

  for (let index = 0; index < itemsQuantity.length; index++) {
    totalPrice += itemsQuantity[index].valueAsNumber * cartProducts[index].price;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.textContent = totalPrice;
  console.log(totalPrice, "prix addition")
}


//---Modifier la quantité des produits---
function changeQuantity() {
  const modifQuantity = document.querySelectorAll(".itemQuantity");

  for (let index = 0; index < modifQuantity.length; index++) {
    modifQuantity[index].addEventListener("change", function (event) {
      event.preventDefault();
      cartProducts[index].quantity = event.target.value;
      //---Si quantité saisie n'est pas correcte---
      if (cartProducts[index].quantity == 0 || cartProducts[index].quantity > 100
      ) {
        alert('Merci de sélectionner une quantité comprise entre 1 et 100');
        location.reload();
      //---Mise à jour de la quantité en plus ou en moins---  
      } else {
        localStorage.setItem("product", JSON.stringify(cartProducts));
        totalItems();        
      }
    });
  }
}


//---Supprimer un produit---
function removeItem() {
  const moveItem = document.querySelectorAll(".deleteItem");
  for (let index = 0; index < moveItem.length; index++) {
    moveItem[index].addEventListener("click", (event) => {
      event.preventDefault();
      //---Confirmer la suppression de la ligne article---//
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${cartProducts[index].quantity} ${cartProducts[index].nom} couleur ${cartProducts[index].color} ?`)) {
        let idMoveItem = cartProducts[index].idProduit;
        let colorMoveItem = cartProducts[index].color;
        cartProducts = cartProducts.filter((element) =>
          element.idProduit !== idMoveItem || element.color !== colorMoveItem);
        localStorage.setItem("product", JSON.stringify(cartProducts));
        location.reload();
      }
    });
  }
}

//----------------Début du Formulaire--------//

//---Regex-----//
let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç '-]+$");
let emailRegex = new RegExp("^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9_.-]+[.]{1}[a-z]+$");
let adresseRegex = new RegExp("^[0-9a-zA-Zàâäéèêëïîôöùûüç ,]+$");

//---Travail sur le formulaire------//
function getForm() {  
  //---Ecoute du prénom---
  let firstName = document.getElementById("firstName");
  firstName.addEventListener("input", function () {
    if (nameRegex.test(firstName.value) === false) {
      document.getElementById("firstNameErrorMsg").textContent = "Format du prénom incorrect";
      //console.log(firstName.value, "non reconue");
    } else {
      document.getElementById("firstNameErrorMsg").textContent = "";
      //console.log(firstName.value, "reconue");
    }
  });

  //---Ecoute du nom et validation de son format---
  let lastName = document.getElementById("lastName");
  lastName.addEventListener("input", function () {
    if (nameRegex.test(lastName.value) === false) {
      document.getElementById("lastNameErrorMsg").textContent = "Format du nom incorrect";
      //console.log(lastName.value, "non reconue")
    } else {
      document.getElementById("lastNameErrorMsg").textContent = "";
      //console.log(lastName.value, "reconue");
    }
  });

  //---Ecoute de l'adresse et validation de son format---
  let adress = document.getElementById("address");
  adress.addEventListener("input", function () {
    if (adresseRegex.test(adress.value) === false) {
      document.getElementById("addressErrorMsg").textContent = "Format de l'adresse incorrect";
      //console.log(adress.value, "non reconue");
    } else {
      document.getElementById("addressErrorMsg").textContent = "";
      //console.log(adress.value, "reconue");
    }
  });

  //---Ecoute du champs ville et validation de son format---
  let city = document.getElementById("city");
  city.addEventListener("input", function () {
    if (nameRegex.test(city.value) === false) {
      document.getElementById("cityErrorMsg").textContent = "Format de la ville incorrecte";
      //console.log(city.value, "non reconue");
    } else {
      document.getElementById("cityErrorMsg").textContent = "";
      //console.log(city.value, "reconue");
    }
  });

  //---Ecoute du champs email et validation de son format---
  let email = document.getElementById("email");
  email.addEventListener("input", function () {
    if (emailRegex.test(email.value) === false) {
      document.getElementById("emailErrorMsg").textContent = "Format de l'email incorrect";
      //console.log(email.value, "non reconue");
    } else {
      document.getElementById("emailErrorMsg").textContent = "";
      //console.log(email.value, "reconue");
    }
  });
}



//---Event sur bouton "Commander!"" pour confirmer la commande sur le Local storage
function orderForm() {
  const orderButton = document.getElementById("order");

 //---Ecoute du click commander--- 
  orderButton.addEventListener("click", (event) => {
    event.preventDefault();

    //---Message si panier vide pour éviter de valider une commande vide---
    if (cartProducts === null || cartProducts.length === 0) {
      window.confirm("Votre panier est actuellement vide. Vous n'avez aucune commande en cours. Cliquez sur OK pour revenir à l'accueil");
      return(window.location.href ="index.html");  

    //---Message si formulaire incomplet pour éviter de valider une commande sans informations client---
    } if (!nameRegex.test(firstName.value) || !nameRegex.test(lastName.value) || !adresseRegex.test(address.value)|| !nameRegex.test(city.value)|| !emailRegex.test(email.value)) {
        alert("Merci de remplir correctement tous les champs du formulaire");
        return(alert);
    } else {
      //--- Produit(s) dans panier et formulaire ok---
      //création d'un tableau pour recuperer les ID produits
      let productId = [];
      for (let index = 0; index < cartProducts.length; index++) {
        productId.push(cartProducts[index].idProduit);
      }

      //creation  de l'objet contact avec les infos remplis dans le formulaire et insertion du tableau productId
      let myOrder = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productId,
      };
      //console.table(myOrder);

      //---Postage des infos sur API avec POST---//
      //---Appel de l'API pour post les informations order---
      const postOptions = fetch("http://localhost:3000/api/products/order" , {
        method: "POST",
        body : JSON.stringify(myOrder),
        headers:  {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        });
        //console.log(postOptions)
        postOptions.then(async(response) => {
          try{
            //console.log(response);
            const data = await response.json();
            //console.log(data);
            const orderId = data.orderId;
            //console.log(orderId, "numéro de commande")
            //---Envoie vers la page de de confirmation---
           window.location.href = `confirmation.html?orderId=${orderId}. Merci pour votre commande.`;
            //---Suppression du localStorage---
            let removeStorage = window.localStorage;
            removeStorage.clear();
          }
          catch (e){
            console.log(e);
          }
        })
        

      }
  });
}
  



