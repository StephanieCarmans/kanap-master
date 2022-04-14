async function enAttente () {
        const reponseJSON = await fetch('http://localhost:3000/api/products');
        const reponseJS = await reponseJSON.json();
        console.log(reponseJS, 'objet Javascript');
}

enAttente();