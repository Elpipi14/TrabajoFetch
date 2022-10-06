let articulos = [];

class productos {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }

    // Se agrego secion de articulos al html //Libreria Toastigy Agregar productos
    listaArticulos() {
        const lista = `
        <div id="tienda" class="card col-md">
            <img src=${this.img} class='img__art' alt="">
                
                    <h2 class="product__price fw-regular">
                        $ ${this.precio}
                    </h2>
                    <p class="div__p">
                        <a href="#!" class="text-dark">${this.nombre}</a>
                    </p>
                    <div class="div__start">
                        <i class="fa-solid fa-star filed-star"></i>
                        <i class="fa-solid fa-star filed-star"></i>
                        <i class="fa-solid fa-star filed-star"></i>
                        <i class="fa-solid fa-star filed-star"></i>
                    </div>
                    <div id="carrito">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <button id=${this.id} class="add btn btn-primary">Agregar al carrito</button>
                    </div>
                
            </div>  
        `

        const conteiner = document.getElementById(`list__art`);
        conteiner.innerHTML += lista

    }

    agregarEvento() {
        const btnCarrito = document.getElementById(this.id);

        const prodAgregar = articulos.find(prod => prod.id == this.id)
        btnCarrito.addEventListener('click', () => agregarAlCarrito(prodAgregar))
    }

}

let espPro = new productos(`1`, "Espirales Progresivos <br> x 4", 18000, `./img/espiralesProgre.jpg`);
let susFija = new productos(`2`, "Suspension Fija <br> Rally", 35000, `./img/suspFija.jpg`);
let susRegC = new productos(`3`, "Suspension Regulable completa", 75000, `./img/suspRegcompleta.jpg`);
let susRegD = new productos(`4`, "Suspension Regulable delantera", 35000, `./img/suspRegDel.jpg`);
let susNeu68 = new productos(`5`, "Suspension Neumatica 6.0 8mm", 225000, `./img/airRideBlack10-6.0.jpg`);
let susNeu610 = new productos(`6`, "Suspension Neumatica 6.0 10mm", 255000, `./img/airRideBlack8-6.0.jpg`);
let susNeu78 = new productos(`7`, "Suspension Neumatica 7.0 8mm", 300000, `./img/airRideBlack8-7.0.jpg`);
let susNeu710 = new productos(`8`, "Suspension Neumatica 7.0 10mm", 360000, `./img/airRideBlack10-7.0.jpg`);

articulos.push(espPro, susFija, susRegC, susRegD, susNeu68, susNeu610, susNeu78, susNeu710);

//se hizo foreach para recorrer el array de articulos para interactuar mediante dom a cada producto creado
articulos.forEach(e => { e.listaArticulos() })
articulos.forEach(e => { e.agregarEvento() })

//Libreria Toastigy Agregar productos
let botonAgregar = document.querySelector("#list__art")
botonAgregar.onclick = eventoUno

function eventoUno() {
    Toastify({
        text: "Se a Agregado al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00c399, #96c93d)",
        },
    }).showToast();
}