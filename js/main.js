// MéTODO FETCH

const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const container = document.getElementsByClassName("container")[0];

function getData() {
    const options = {"method": "GET"}; // Tipo de método que podemos utilizar 
    fetch(URLMain, options)
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
    let row = container.getElementsByClassName("row")[0];
    if (!row) {
        container.innerHTML = '<div class="row"></div>';
        row = container.getElementsByClassName("row")[0];
    }
    
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3";
    row.innerHTML = ""; 
    for (let i = 0; i < prods.length; i++) {
        const product = prods[i];
        row.innerHTML += 
            `<div class="col">
                <div class="card h-100" >
                    <img src="${product.image}" class="card-img-top" style="height:300px; alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Precio:</strong> $${product.price}</li>
                            <li class="list-group-item"><strong>Categoría:</strong> ${product.category}</li>
                            <li class="list-group-item"><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count})</li>
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
                                            ${product.description}
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
            </div>`
    }
}