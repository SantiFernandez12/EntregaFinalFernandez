let productos = []

fetch("./js/prendas.json")
    .then(response => response.json())
    .then(data =>{
        prendas = data
        cargarPrendas(prendas)
    })

const containerPrendas = document.querySelector("#container-prendas")
let botonesAgregar =  document.querySelectorAll(".prenda-agregar")
const contador = document.querySelector("#contador")

function cargarPrendas() {
    prendas.forEach(prenda => {

        const div = document.createElement("div");
        div.classList.add("prenda");
        div.innerHTML = `
            <img class="prenda-imagen" src="${prenda.imagen}" alt="">
            <div class="prenda-detalles">
                <h3 class="prenda-titulo">${prenda.titulo}</h3>
                <p class="prenda-precio">$ ${prenda.precio}</p>
                <button class="prenda-agregar" id="${prenda.id}">Comprar</button>
            </div>
        `

        containerPrendas.append(div)
    })
    actualizarBotonesAgregar()
}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".prenda-agregar")

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito)
    })

}

let prendasEnCarrito;

const prendasEnCarritoLS = JSON.parse(localStorage.getItem("prendas-en-carrito"))

if (prendasEnCarritoLS) {
        prendasEnCarrito = prendasEnCarritoLS
        actualizarContador()
    } else {
    prendasEnCarrito = []
}

// prendasEnCarrito = []

function agregarAlCarrito(e) {

    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #083653, #326789)",
        borderRadius: "2rem"
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const prendaAgregado = prendas.find(prenda => prenda.id === idBoton);
    
    if (prendasEnCarrito.some(prenda => prenda.id === idBoton)) {
        const index = prendasEnCarrito.findIndex(prenda => prenda.id === idBoton)
        prendasEnCarrito[index].cantidad++;
    } else {
        prendaAgregado.cantidad = 1
        prendasEnCarrito.push(prendaAgregado)
    }
    actualizarContador()

    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito))

}

function actualizarContador() {
    let nuevoContador = prendasEnCarrito.reduce((acc, prenda)  => acc + prenda.cantidad, 0)
    contador.innerHTML = nuevoContador
}
