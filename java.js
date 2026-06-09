const cajaBienvenida = document.getElementById("mensaje-bienvenida");
cajaBienvenida.textContent = "¡Bienvenido a mi sitio Web VOCALOID!";
const cajaFecha = document.getElementById("fecha-header");
const hoy = new Date();
cajaFecha.textContent = "Hoy es: " + hoy.toLocaleDateString('es-AR');