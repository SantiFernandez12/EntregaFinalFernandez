const prendasEnCarrito = JSON.parse(localStorage.getItem("prendas-en-carrito"))

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoPrendas = document.querySelector("#carrito-prenda")
const contenedorCarritoOpciones = document.querySelector("#carrito-opciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
const botonVaciar = document.querySelector("#carrito-borrar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-comprar")



// const botonesEliminar = document.querySelectorAll(".carrito-boton-sacar")

function cargarPrendasCarrito() {
    if (prendasEnCarrito && prendasEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoPrendas.classList.remove("disabled")
        contenedorCarritoOpciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
        contenedorCarritoPrendas.innerHTML = ""
    
        prendasEnCarrito.forEach(prenda => {
    
            const div = document.createElement("div")
            div.classList.add("carrito-prenda")
    
            div.innerHTML = `
                <img class="carrito-prenda-imagen" src="${prenda.imagen}" alt="">
                <div class="carrito-prenda-titulo">
                    <p>Titulo</p>
                    <h4>${prenda.titulo}</h4>
                </div>
                <div class="carrito-prendas-cantidad">
                    <p>Cantidad</p>
                    <p>${prenda.cantidad}</p>
                </div>
                <div class="carrito-prendas-precio">
                    <p>Precio</p>
                    <p>${prenda.precio}</p>
                </div>
                <button class="carrito-boton-sacar" id="${prenda.id}"><i class="bi bi-trash3-fill"></i></button>
            `
            contenedorCarritoPrendas.append(div)
    
    
        })
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoPrendas.classList.add("disabled")
        contenedorCarritoOpciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
    }
    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarPrendasCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-boton-sacar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    const prendaEliminado = prendasEnCarrito.find(prenda => prenda.id === idBoton)
    const index = prendasEnCarrito.findIndex(producto => producto.id === idBoton)

    prendasEnCarrito.splice(index, 1)
    cargarPrendasCarrito();

    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    
    prendasEnCarrito.length = 0
    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito))
    cargarPrendasCarrito();

}

function actualizarTotal() {
    const totalCalculado = prendasEnCarrito.reduce((acc, prenda) => acc + (prenda.precio * prenda.cantidad),0);
    total.innerHTML = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    
    prendasEnCarrito.length = 0
    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito))
    cargarPrendasCarrito();

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoPrendas.classList.add("disabled")
    contenedorCarritoOpciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")

}



