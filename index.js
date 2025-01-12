document.addEventListener('DOMContentLoaded', function() {
    const ig = document.getElementById('btInsta')
    const fb = document.getElementById('btFacebook')

    const ms = document.getElementById('btMessage')

    ig.addEventListener('click', () => {
       window.location.href = "https://www.instagram.com"

    })

    fb.addEventListener('click', () => {
   
        window.location.href = "https://www.facebook.com"

    })

    ms.addEventListener('click', () => {
        window.location.href = "https://www.whatsapp.com"

        
    })

    function actualizarContador() {
        // Fecha objetivo: 18 de enero 2025, 5:00 PM
        const fechaObjetivo = new Date('2025-01-18T17:00:00');
        // Fecha actual
        const ahora = new Date();
        
        // Diferencia en milisegundos
        const diferencia = fechaObjetivo - ahora;
        
        // Si ya pasó la fecha
        if (diferencia < 0) {
            document.getElementById('lbconta').innerHTML = "¡Tiempo cumplido!";
            return;
        }
        
        // Cálculo de tiempo restante
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        // Formatear el texto
        const texto = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        
        // Actualizar el label
        document.getElementById('lbconta').innerHTML = texto;
    }
    
    // Actualizar cada segundo
    setInterval(actualizarContador, 1000);
    
    // Primera actualización inmediata
    actualizarContador();


});
