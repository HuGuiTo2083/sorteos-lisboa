document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('contador');
    const btnIncrementar = document.getElementById('incrementar');
    const btnDecrementar = document.getElementById('decrementar');
    const labelPrecio = document.getElementById('precio');
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
});