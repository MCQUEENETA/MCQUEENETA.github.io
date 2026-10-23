// Carrito de compras de La McQueeneta
let carrito = [];

// Usa el formato internacional: código de país + número, sin +, espacios ni guiones.
// Este es el número que aparecía en tu archivo; cámbialo si no es el correcto.
const telefonoWhatsApp = "525661593571";

function agregar(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    if (carrito.length === 0) {
        const vacio = document.createElement("li");
        vacio.textContent = "Tu carrito está vacío.";
        lista.appendChild(vacio);
    } else {
        carrito.forEach((producto, indice) => {
            const elemento = document.createElement("li");
            elemento.appendChild(document.createTextNode(
                `${producto.nombre} - $${producto.precio} MXN `
            ));

            const eliminar = document.createElement("button");
            eliminar.type = "button";
            eliminar.textContent = "Quitar";
            eliminar.style.marginLeft = "10px";
            eliminar.style.cursor = "pointer";
            eliminar.onclick = function () {
                carrito.splice(indice, 1);
                actualizarCarrito();
            };

            elemento.appendChild(eliminar);
            lista.appendChild(elemento);
        });
    }

    const suma = carrito.reduce((acumulado, producto) => acumulado + producto.precio, 0);
    totalElemento.textContent = suma;
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function enviarWhatsApp(evento) {
    // Permite usar la función desde un botón o desde un enlace.
    if (evento) evento.preventDefault();

    if (carrito.length === 0) {
        alert("¡Agrega algún snack a tu pedido!");
        return;
    }

    let mensaje = "¡Hola! Quiero hacer este pedido:\n";
    let total = 0;

    carrito.forEach((producto) => {
        mensaje += `• ${producto.nombre} - $${producto.precio} MXN\n`;
        total += producto.precio;
    });

    mensaje += `\nTotal: $${total} MXN`;
    mensaje += "\n¿Me pueden confirmar mi pedido?";

    const url = "https://wa.me/" + telefonoWhatsApp + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank", "noopener,noreferrer");
}

// Muestra el carrito vacío al cargar la página.
document.addEventListener("DOMContentLoaded", actualizarCarrito);
