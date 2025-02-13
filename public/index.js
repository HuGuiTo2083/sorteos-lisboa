document.addEventListener('DOMContentLoaded', function() {
    const ig = document.getElementById('btInsta')
    const fb = document.getElementById('btFacebook')






    ig.addEventListener('click', () => {
       window.location.href = "https://www.instagram.com/finca_lisboa_ranch?igsh=dXRqbGk3cW9qNnZ6"

    })

    fb.addEventListener('click', () => {
   
        window.location.href = "https://wa.me/+584243131639"

    })

  

    const compra = document.getElementById('btCompra')

    compra.addEventListener('click', ()=>{
        window.location.href= 'compra.html'
    })

    const compra2 = document.getElementById('btCompra2')

    compra2.addEventListener('click', ()=>{
        window.location.href= 'compra.html'
    })

    function actualizarContador() {
        // Fecha objetivo: 21 de marzo 2025, 12:00 AM (medianoche)
        const fechaObjetivo = new Date(2025, 2, 21); // Los meses en JS van de 0 (Enero) a 11 (Diciembre)
        const ahora = new Date();
        
        // Calcular diferencia
        const diferencia = fechaObjetivo - ahora;
        
        // Si ya pasó la fecha
        if (diferencia < 0) {
            document.getElementById('countdown').innerHTML = "¡Tiempo cumplido!";
            return;
        }
        
        // Cálculos de tiempo
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        // Formatear texto
        const texto = `${dias}d ${horas.toString().padStart(2, '0')}h ${minutos.toString().padStart(2, '0')}m ${segundos.toString().padStart(2, '0')}s`;
        
        // Actualizar elemento
        document.getElementById('countdown').innerHTML = texto;
    }
    
    // Actualizar cada segundo
    setInterval(actualizarContador, 1000);
    
    // Ejecutar inmediatamente
    actualizarContador();



});
