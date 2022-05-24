//---Lien page accueuil et page produit par ID produit---
let str = window.location.href;
let url = new URL(str);
let productID = url.searchParams.get("id");
//console.log(productID);


//---Création de constantes pour les options couleurs et quantité---
const selectAColor = document. querySelector("#colors");
const selectAQuantity = document.querySelector("#quantity");


//---Récupération des données produits de l'API---
function  getProduct(productID) {
    fetch(`http://localhost:3000/api/products/${productID}`)
        .then((data) => {
            //console.log(res.json());
            return data.json();
        })
        //---Récupération données API dans le DOM---
        .then(function (promise){
            data = promise;
            //console.log(data);
            if (data){
                collect(data);
            }
        })
        .catch(() => {
            console.log("erreur");
            return "erreur";
        })
}
getProduct(productID);

//---Affichages des donnees dans le DOM---
function collect (data) {
    //création balise <img>    
    let img = document.createElement("img"); 
    document.querySelector(".item__img").appendChild(img);
    img.setAttribute("src", data.imageUrl);
    img.setAttribute("alt", data.altTxt); 
    //creation balise <h1>
    let h1 = document.getElementById("title");
    h1.textContent = data.name;
    //création balise <span>
    let span = document.getElementById("price");
    span.textContent = data.price;
    //création balise <p>
    let p = document.getElementById("description");
    p.textContent = data.description;
    //création du choix de la couleur
    for (let colors of data.colors) { 
        let option = document.createElement("option");
        document.querySelector("#colors").appendChild(option);
        option.setAttribute("value", colors);
        option.textContent = colors;
    }
 addToCart(data);
}


function addToCart(data){
    const btnCart = document.querySelector("#addToCart");

    //---Ecoute du bouton avec options sur la couleur et la quantité---
    btnCart.addEventListener("click", (event) => {    
    console.log(event, "ok");

    //---Récupération du choix de couleur et de quantité---
    let colorSelect = selectAColor.value;
    let quantitySelect = selectAQuantity.value;
    //console.log(colorSelect, "ok");
    //console.log(quantitySelect, "ok");

    //---Cas où utilisateur selectionne une couleur et une quantité---
    let productOptions = {
        idProduit: productID,
        color: colorSelect,
        quantity: Number(quantitySelect),
        nom: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        imgAlt: data.altTxt,
    };
    //console.log(productOptions);    

    //---Cas où utilisateur oublie de selectionner une quantité et/ou une couleur---
    if (quantitySelect <= 0 || quantitySelect > 100 || colorSelect == null || colorSelect == "") {
        alert("Merci de remplir les champs quantité et/ou couleur.")
        //---Alors faire un message de rappel de selection---
        return (alert);
    }

    //---Initialisation du localStorage---
    let cartProducts = JSON.parse(localStorage.getItem("product"));

    //---Message d'ajout au panier avec redirection possible sur la page panier---
    const cartOk =() => {
        let confirmation = window.confirm(`Votre commande de ${quantitySelect} ${data.name} ${colorSelect} est ajoutée au panier
        Pour consulter votre panier, cliquez sur OK`);
        if (confirmation) {
            window.location.href ="cart.html";
            console.log(window.location.href, "page cart");
        }
    }
    //---Importation dans le localStorage---
    //---Si on ajoute au moins 1 article en plus (id identique + couleur identique)---
    if (cartProducts) {
        let isProductFound = false
            for (let index = 0; index < cartProducts.length; index++) {
                if (cartProducts[index].idProduit === productID  && cartProducts[index].color === colorSelect) {
                    cartProducts[index].quantity += productOptions.quantity
                    isProductFound = true
                    //console.log("produit trouve")
                }
                
            }
            //---ajout d'un nouvel article (id identique + couleur différente)---
            if(isProductFound === false) {
                cartProducts.push(productOptions);
            }
            localStorage.setItem("product", JSON.stringify(cartProducts));
            //console.log(cartProducts, "panier sauvegardé");
            cartOk();

    //---local storage vide---        
    } else {
        cartProducts =[];
        cartProducts.push(productOptions);
        localStorage.setItem("product", JSON.stringify(cartProducts));
        console.log(cartProducts, "vide");
        cartOk();
        }
        });
    }  

    
