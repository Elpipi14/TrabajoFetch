let carrito = [];
let contenedorCarrito = document.getElementById(`listcar`)
let vaciarCarrito = document.getElementById(`vaciar`)
let contadorCarrito = document.getElementById("contador")
let precioTotal = document.getElementById(`preciototal`)

//localstorage json
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        subCarrito()
    }
})

//funcion de agregar los productos para que aparezca en menu desplegable
function agregarAlCarrito(productos) {

    let enCarrito = carrito.find(prod => prod.id == productos.id);
    //condicional para no repetir productos y sumar en si mismo
    if (!enCarrito) {
        carrito.push({...productos, cantidad: 1 })
    } else {
        let carritoFiltrado = carrito.filter(prod => prod.id != productos.id)
        carrito = [
            ...carritoFiltrado,
            {...enCarrito, cantidad: enCarrito.cantidad + 1 }
        ]
    }
    subCarrito()
}

const subCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
            const div = document.createElement(`div`)
            div.className = (`menu__carrito`)
            div.innerHTML = `
        <img src=${prod.img} class='img__art1' alt="">

              <p>
               ${prod.nombre}
             </p>

              <p>
                Precio: $${prod.precio}
              </p>

              <p>
                Cantidad: <span>${prod.cantidad}</span>
              </p>

              <button onclick="eliminarDelCarrito(${prod.id})" class="boton__eliminar"><i class="fa fa-trash-alt"></button>
        `
            contenedorCarrito.appendChild(div)

        })
        //contador carrito
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)

    cantidadtotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
        //contador carrito cantidad total de productos que hay en la compra

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
        //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
        //empezando en 0.

    //Evento libreria finalizar sweetalert
    let botonFin = document.getElementById(`fin`)
    botonFin.onclick = eventoDos

    function eventoDos() {
        Swal.fire({
            icon: 'success',
            title: 'Finalizo su Compra!',
            text: 'Proceder al Pago',
            footer: '<a href="">Necesitas Ayuda?</a>'
        })
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


//Eliminar por producto
eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    subCarrito()
}

//vaciar con evento sweetAlert
let vaciar = document.getElementById(`vaciar`)
vaciar.onclick = eventoTres

function eventoTres() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro de Eliminar los productos?',
        text: "¡No podrás revertir esto!",
        icon: 'Cuidado',
        showCancelButton: true,
        confirmButtonText: '¡Sí, Eliminar!',
        cancelButtonText: 'No, Eliminar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            subCarrito()
            swalWithBootstrapButtons.fire(
                'Eliminar!',
                'Su productos se han eliminado del carrito.',
                'Con Exito'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tus Productos Estan Guardado! :)',
                ''
            )
        }
    })
}