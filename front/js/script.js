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


        

        
    