document.addEventListener('DOMContentLoaded', function() {
    const ig = document.getElementById('btInsta')
    const fb = document.getElementById('btFacebook')

    const ms = document.getElementById('btMessage')





    ig.addEventListener('click', () => {
       window.location.href = "https://www.instagram.com/aleautos1?igsh=a2hwYTF4aHo5endk"

    })

    fb.addEventListener('click', () => {
   
        window.location.href = "https://wa.me/+5804121360306"

    })

    ms.addEventListener('click', () => {
        this.lastChild.window.location.href = "mailto:Boxandlabel2@gmail.com"

        
    })

    const compra = document.getElementById('btCompra')

    compra.addEventListener('click', ()=>{
        window.location.href= 'compra.html'
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

    const slides = document.querySelectorAll('.slide1');
    let currentSlide = 0;
    
    function showSlide(n) {
      slides[currentSlide].classList.remove('active1');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active1');
    }
    
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    setInterval(nextSlide, 3000); // Cambio de imagen cada 5 segundos


    const slides2 = document.querySelectorAll('.slide12');
    let currentSlide2 = 0;
    
    function showSlide2(n) {
      slides2[currentSlide2].classList.remove('active12');
      currentSlide2 = (n + slides2.length) % slides2.length;
      slides2[currentSlide2].classList.add('active12');
    }
    
    function nextSlide2() {
      showSlide2(currentSlide2 + 1);
    }
    
    setInterval(nextSlide2, 3000); // Cambio de imagen cada 5 segundos


    const slides23 = document.querySelectorAll('.slide123');
    let currentSlide23 = 0;
    
    function showSlide23(n) {
      slides23[currentSlide23].classList.remove('active123');
      currentSlide23 = (n + slides23.length) % slides23.length;
      slides23[currentSlide23].classList.add('active123');
    }
    
    function nextSlide23() {
      showSlide23(currentSlide2 + 1);
    }
    
    setInterval(nextSlide23, 3000); // Cambio de imagen cada 5 segundos



});
