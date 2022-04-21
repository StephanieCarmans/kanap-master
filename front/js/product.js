//---lien page accueuil et page produit par ID produit---
let str = window.location.href;
let url = new URL(str);
let productID = url.searchParams.get("id");
console.log(productID);


//---recupération des donnees produits de l'API---
function  getProduct() {
    fetch(`http://localhost:3000/api/products/${productID}`)
    .then((data) => {
        //console.log(res.json());
        return data.json();
    })

        //---recuperation donnees API dans le DOM---
        .then(async function (promise){
        data = await promise;
        console.log(data);
        if (data){
            collect(data);
            }
        })
    .catch(() => {
        console.log("erreur");
        return "erreur";
    })
}
getProduct();

//---affichages des donnees dans le DOM--
function collect (data) {
    //création balise <img>    
    let img = document.createElement("img"); 
    document.querySelector(".item__img").appendChild(img);
    img.setAttribute("src", data.imageUrl)
    img.setAttribute("alt", data.altTxt); 
    //creation contenu <h1>
    let h1 = document.getElementById('title');
    h1.textContent = data.name;
    //création balise <span>
    let span = document.getElementById('price');
    span.textContent = data.price;
    //création balise <p>
    let p = document.getElementById('description');
    p.textContent = data.description;
    //création du choix de la couleur
    for (let colors of data.colors) { 
        let option = document.createElement("option");
        document.querySelector('#colors').appendChild(option);
        //option.setAttribute("value", colors);
        option.textContent = colors;
}
}

