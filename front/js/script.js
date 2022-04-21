//---recuperation de l'API---
async function getItems() {
        try{
                const reponseJSON = await fetch('http://localhost:3000/api/products');
                const reponseJS = await reponseJSON.json();
                console.log(reponseJS, 'objet Javascript')
                return reponseJS;
        }
        catch(error){
                console.log(error, "erreur")
                return(error);
        }
}

getItems();                

//---recuperation donnees API dans le DOM---
async function addItems() {
        const items = await getItems()
             console.log(items,"ok");  
        for (let item of items) {
                //création balise <a>
                let a = document.createElement("a");
                document.querySelector(".items").appendChild(a);
                a.setAttribute("href", `./product.html?id=${item._id}`)
                //création balise <article>
                let article = document.createElement("article");
                a.appendChild(article);
                //création balise <img>
                let img = document.createElement("img");
                article.appendChild(img);
                img.setAttribute("src", item.imageUrl);
                img.setAttribute("alt", item.altTxt);
                //création balise <h3>
                let h3 = document.createElement("h3");
                article.appendChild(h3);
                h3.textContent = item.name;
                h3.classList.add("productName");
                //création balise <p>
                let p = document.createElement("p");
                article.appendChild(p);
                p.textContent = item.description;
                p.classList.add("productDescription");
        };                                           
};

addItems();


/*function createItem (item) {
        //création balise <a>
        let a = document.createElement("a");
        document.querySelector(".items").appendChild(a);
        a.setAttribute("href", `./product.html?id='${item._id}`)
         //création balise <article>
        let article = document.createElement("article");
        a.appendChild(article);
          //création balise <img>
        let img = document.createElement("img");
        article.appendChild(img);
        img.setAttribute("src", item.imageUrl);
        img.setAttribute("alt", item.altTxt);
           //création balise <h3>
        let h3 = document.createElement("h3");
           article.appendChild(h3);
           h3.textContent = item.name;
           h3.classList.add("productName");
           //création balise <p>
        let p = document.createElement("p");
        article.appendChild(p);
        p.textContent = item.description;
        p.classList.add("productDescription");

}

const fakeItem = { 
        colors: [
          "Blue",
          "White",
          "Black"
        ],
        _id: "107fb5b75607497b96722bda5b504926",
        name: "Kanap Sinopé",
        price: 1849,
        imageUrl: "http://localhost:3000/images/kanap01.jpeg",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        altTxt: "Photo d'un canapé bleu, deux places"};

createItem(fakeItem);

/*for (let item of items) {
        //création balise <a>
        let a = document.createElement("a");
        document.querySelector(".items").appendChild(a);
        
         //création balise <article>
        let article = document.createElement("article");
        a.appendChild(article);
          //création balise <img>
        let img = document.createElement("img");
        article.appendChild(img);
           //création balise <h3>
        let h3 = document.createElement("h3");
           article.appendChild(h3);
           //création balise <p>
        let p = document.createElement("p");
        article.appendChild(p);
        }      */     


        

        
    