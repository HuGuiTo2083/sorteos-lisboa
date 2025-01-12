document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('contador');
    const btnIncrementar = document.getElementById('incrementar');
    const btnDecrementar = document.getElementById('decrementar');
    const labelPrecio = document.getElementById('precio');
    const success = document.getElementById('dvSuccess');
    const PRECIO_BASE = 98; // Precio base por unidad

      function actualizarPrecio() {
        const cantidad = parseInt(input.value);
        const precioTotal = cantidad * PRECIO_BASE;
        labelPrecio.textContent = `${precioTotal} bs`;
    }


    // Asegurar valor mínimo de 1
    input.addEventListener('change', () => {
        if (input.value < 1) input.value = 1;
    });

    btnIncrementar.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        actualizarPrecio();
    });

    btnDecrementar.addEventListener('click', () => {
        const nuevoValor = parseInt(input.value) - 1;
        if (nuevoValor >= 1) {
            input.value = nuevoValor;
            actualizarPrecio();
        }
    });
    
    // ------------------

    const inputs = document.querySelectorAll('.dvForm input:not(.contador-input)');
    
    // Función para validar email
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Función para validar los campos
    function validarFormulario() {
        let esValido = true;
        let mensajesError = [];

        // Validar cada input
        inputs.forEach(input => {
            let valor = input.value.trim();
            
            // Verificar si está vacío
            if (!valor) {
                esValido = false;
                mensajesError.push(`El campo ${input.placeholder} está vacío`);
            }

            // Validaciones específicas por tipo
            switch(input.type) {
                case 'email':
                    if (valor && !isValidEmail(valor)) {
                        esValido = false;
                        mensajesError.push('El correo electrónico no es válido');
                    }
                    break;
                    
                case 'number':
                    if (input.placeholder.includes('Referencia')) {
                        if (valor.length !== 4) {
                            esValido = false;
                            mensajesError.push('La referencia debe tener 4 números');
                        }
                    }
                    if (input.placeholder.includes('Whatsapp')) {
                        if (valor.length < 8) {
                            esValido = false;
                            mensajesError.push('El número de Whatsapp no es válido');
                        }
                    }
                    break;
            }
        });

        // Mostrar resultado en consola
        if (esValido) {
            success.style.display = 'block'


            inputs.forEach(input => {
                console.log(`${input.placeholder}: ${input.value}`);
            });
            console.log(`Cantidad: ${document.getElementById('contador').value}`);
            console.log(`Precio Total: ${document.getElementById('precio').textContent}`);
        } else {
            console.log('Errores encontrados:');
            mensajesError.forEach(error => console.log(`- ${error}`));
        }

        return esValido;
    }

    // Puedes llamar a esta función cuando necesites validar
    // Por ejemplo, podrías agregar un botón:
  
    const btnValidar = document.getElementById('btPedir');
    
    btnValidar.onclick = validarFormulario;
    
   
    
    // O llamarla directamente:
    // validarFormulario();


});