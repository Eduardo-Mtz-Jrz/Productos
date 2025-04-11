// MéTODO FETCH

const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const Products = document.getElementById("Products");
const ulMenu = document.getElementById("ulMenu");

function getData(cat) {
    const options = {"method": "GET"}; // Tipo de método que podemos utilizar 
    fetch(URLMain+cat, options)
    .then((response) => {
        console.log(response);
        response.json().then((res) => {
            // console.log(res.length);
            // console.log(res[11].rating);
            createCards(res);
        });
    })
    .catch((err) => {
    main.insertAdjacentHTML("beforeend",
        `<div class="alert alert-danger" role="alert">
            ${err.message}
        </div>`);
    });
}

getData();

function createCards(prods) {    
    Products.innerHTML = "";
    prods.forEach((prod) => {
    Products.insertAdjacentHTML("beforeend", 
        `<div class="col">
            <div class="card h-100">
                <img src="${prod.image}" class="card-img-top" style="height:300px; alt="${prod.title}">
                    <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Precio:</strong> $${prod.price}</li>
                            <li class="list-group-item"><strong>Categoría:</strong> ${prod.category}</li>
                            <li class="list-group-item"><strong>Rating:</strong> ${prod.rating.rate} (${prod.rating.count})</li>
                            <li>
                            <br>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Más Información
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Descripción</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ${prod.description}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`)
             
    });
};

function getCategories() {
    const options = {"method": "GET"}; // Tipo de método que podemos utilizar 
    fetch(URLMain + "categories/", options)
    .then((response) => {
        console.log(response);
        response.json().then((res) => {
            console.log("categories:", res);
            res.forEach((cat) => {
                ulMenu.insertAdjacentHTML("afterbegin", 
                    `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${(cat.replace("'", "%27"))}');">${cat}</a></li>`);
            })   
        });
    })
    .catch((err) => {
    main.insertAdjacentHTML("beforeend",
        `<div class="alert alert-danger" role="alert">
            ${err.message}
        </div>`);
    });
}

getCategories();
getData("");