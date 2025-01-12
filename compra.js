document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('contador');
    const btnIncrementar = document.getElementById('incrementar');
    const btnDecrementar = document.getElementById('decrementar');
     console.log("hola")
    // Asegurar valor mínimo de 1
    input.addEventListener('change', () => {
        if (input.value < 1) input.value = 1;
    });

    btnIncrementar.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
    });

    btnDecrementar.addEventListener('click', () => {
        const nuevoValor = parseInt(input.value) - 1;
        if (nuevoValor >= 1) {
            input.value = nuevoValor;
        }
    });
});