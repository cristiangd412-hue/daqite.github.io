const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-active');
});

const formularioContacto = document.getElementById('form-contacto');

    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(event) {
            // Frena la recarga por defecto; la validación nativa ya fue aprobada por el navegador
            event.preventDefault(); 

            // Capturamos los elementos para procesar la petición
            const accessKey = document.getElementById('access_key').value;
            const nombreCliente = document.getElementById('nombre').value;
            const emailCliente = document.getElementById('email').value;
            const mensajeCliente = document.getElementById('mensaje').value;

            // Creamos el paquete estructurado exigido por la API externa
            const datosParaEnviar = new FormData();
            datosParaEnviar.append("access_key", accessKey);
            datosParaEnviar.append("name", nombreCliente);
            datosParaEnviar.append("email", emailCliente);
            datosParaEnviar.append("message", mensajeCliente);
            datosParaEnviar.append("subject", "Nueva Consulta de Cliente - Vocaloid");

            // Realizamos la llamada asíncrona hacia internet
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: datosParaEnviar
            })
            .then(function(respuesta) {
                return respuesta.json(); // Convertimos la respuesta cruda del servidor a JSON
            })
            .then(function(resultado) {
                if (resultado.success) {
                    // Notificación en pantalla utilizando el dato capturado dinámicamente
                    alert(`¡Gracias por comunicarte, ${nombreCliente}! \nTu mensaje ha sido enviado directamente a nuestro correo. Te responderemos a la brevedad.`);
                    
                    // Limpieza total del formulario de Bootstrap
                    formularioContacto.reset(); 
                } else {
                    alert("El servidor de correos denegó la operación. Revisa tu Access Key.");
                }
            })
            .catch(function(error) {
                console.error("Error crítico de red:", error);
                alert("No se pudo conectar con el servidor. Por favor, comprueba que estás conectado a internet.");
            });
        });
    }