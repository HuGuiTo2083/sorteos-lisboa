document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
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
    // Smooth scroll for buttons
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.payment-methods').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.prize-card, .payment-item').forEach(element => {
        observer.observe(element);
    });


     

    

});

// function copyToClipboard() {
//     // El texto o número a copiar
//     const textToCopy = "123456"; // Puedes cambiar esto por cualquier texto o número
  
//     // Crear un elemento de texto temporalmente para copiarlo
//     const textarea = document.createElement('textarea');
//     textarea.value = textToCopy;
//     document.body.appendChild(textarea);
//     textarea.select(); // Selecciona el contenido
//     document.execCommand('copy'); // Copia al portapapeles
//     document.body.removeChild(textarea); // Elimina el textarea temporal
  
//     // Mostrar mensaje de éxito
//     const statusMessage = document.getElementById('statusMessage');
//     statusMessage.textContent = '¡Texto copiado al portapapeles!';
//     statusMessage.style.color = 'green';
  
//     // Opcional: Limpiar el mensaje después de unos segundos
//     setTimeout(() => {
//       statusMessage.textContent = '';
//     }, 3000);
//   }