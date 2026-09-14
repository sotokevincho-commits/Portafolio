// Atrapamos la tarjeta de correo y el texto que está adentro
const tarjetaCorreo = document.getElementById('btn-copiar-correo');
const textoCorreo = document.getElementById('texto-correo');

// Escuchamos el clic en la tarjeta
tarjetaCorreo.addEventListener('click', () => {
    // Copiamos tu correo al portapapeles del sistema
    navigator.clipboard.writeText('sotokevincho@gmail.com').then(() => {
        // Cambiamos el texto para darle confirmación visual al usuario
        textoCorreo.innerHTML = '¡Correo copiado al portapapeles!';
        
        // Después de 2.5 segundos, regresamos el texto a la normalidad
        setTimeout(() => {
            textoCorreo.innerHTML = '🔗 Copiar dirección de correo <span class="fs-5">→</span>';
        }, 2500);
    }).catch(err => {
        console.error('Error al copiar el correo: ', err);
    });
});