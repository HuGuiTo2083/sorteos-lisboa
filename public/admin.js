document.addEventListener('DOMContentLoaded', () => {
    const btPedidos = document.getElementById('btPedidos')
    const btRegistros = document.getElementById('btRegistros')
    const btGanador = document.getElementById('btGanador')
    const contenPed = document.getElementById('contenedorPedidos')
    const contenReg = document.getElementById('contenedorRegistros')
    const contenGan = document.getElementById('contenedorGanador')

    btPedidos.addEventListener('click', () => {
        contenPed.style.display = 'grid';
        contenReg.style.display = 'none';
        contenGan.style.display = 'none';
        console.log('pedidos')
    })

    btRegistros.addEventListener('click', () => {
        contenPed.style.display = 'none';
        contenReg.style.display = 'flex';
        contenGan.style.display = 'none';
        console.log('registros')

    })

    btGanador.addEventListener('click', () => {
        contenPed.style.display = 'none';
        contenReg.style.display = 'none';
        contenGan.style.display = 'block';
        console.log('ganador')

    })


    const consultar = document.getElementById('btConsult')
    consultar.addEventListener('click', async () => {
        const correo= document.getElementById('inCorreo').value
        const ref = document.getElementById('inRef').value
        const tick = document.getElementById('inTicket').value

        try {
            const response = await fetch(`/api/consulta?correo=${correo}&tick=${tick}&ref=${ref}`);

            const pedidos = await response.json()
            //total, tickets, client;
            console.log(pedidos)
            console.log(pedidos.client)
             const contenedor = document.getElementById('contenedorConsultas');
             contenedor.innerHTML = '';
             const clientes = pedidos.client
             if (Array.isArray(clientes)) {
                clientes.forEach(pedido =>{
                    const divPedido = document.createElement('div');
                    //console.log('aprobado: ' , pedido.pedido_aprobado)
                    //    console.log(pedido.pedido_referencias)
                    divPedido.className = 'divConsu';
                    contenedor.appendChild(divPedido);
    
        
                 })
             }
             else{
                const divPedido = document.createElement('div');
                    //console.log('aprobado: ' , pedido.pedido_aprobado)
                    //    console.log(pedido.pedido_referencias)
                    divPedido.className = 'divConsu';
                    contenedor.appendChild(divPedido);
    
             }
            
            // pedidos.forEach(pedido => {
            //     const divPedido = document.createElement('div');
            //     // console.log('aprobado: ' , pedido.pedido_aprobado)
            //     console.log(pedido.pedido_referencias)
            //     divPedido.className = `dvPedido ${pedido.pedido_aprobado ? 'aprobado' : 'pendiente'}`;

            //     divPedido.innerHTML = `
            //     <h3>Pedido #${pedido.pedido_referencias}</h3>
            //     <p><strong>Cliente:</strong> ${pedido.pedido_nombre} ${pedido.pedido_apellido}</p>
            //     <p><strong>Correo:</strong> ${pedido.pedido_correo}</p>
            //     <p><strong>Número:</strong> ${pedido.pedido_numero}</p>
            //     <p><strong>Precio Total:</strong> $${pedido.pedido_precio_total} USD</p>
            //     <p><strong>No. de Boletos:</strong> ${pedido.pedido_boletos} </p>
            //     <button 
            //         class="btnAprobar" 
            //         onclick="aprobarPedido('${pedido.pedido_referencias}')"
            //         ${pedido.pedido_aprobado ? 'disabled' : ''}
            //     >
            //          ${pedido.pedido_aprobado ? 'Aprobado' : 'Aprobar'}
            //     </button>
            //     <button 
            //         class="btnCancelar" 
            //         onclick="cancelarPedido('${pedido.pedido_referencias}', '${pedido.pedido_correo}')"
            //     >
            //         X
            //     </button>
            // `;

            //     contenedor.appendChild(divPedido);
            // });
        } catch (error) {
            console.error('Error al cargar:', error);
        }

    })


    cargarPedidos()
});

async function cargarPedidos() {
    console.log("h3")
    try {
        const response = await fetch('/api/pedidos');

        const pedidos = await response.json();
        console.log(pedidos)
        const contenedor = document.getElementById('contenedorPedidos');
        contenedor.innerHTML = '';

        pedidos.forEach(pedido => {
            const divPedido = document.createElement('div');
            // console.log('aprobado: ' , pedido.pedido_aprobado)
            console.log(pedido.pedido_referencias)
            divPedido.className = `dvPedido ${pedido.pedido_aprobado ? 'aprobado' : 'pendiente'}`;

            divPedido.innerHTML = `
                <h3>Pedido #${pedido.pedido_referencias}</h3>
                <p><strong>Cliente:</strong> ${pedido.pedido_nombre} ${pedido.pedido_apellido}</p>
                <p><strong>Correo:</strong> ${pedido.pedido_correo}</p>
                <p><strong>Número:</strong> ${pedido.pedido_numero}</p>
                <p><strong>Precio Total:</strong> $${pedido.pedido_precio_total} USD</p>
                <p><strong>No. de Boletos:</strong> ${pedido.pedido_boletos} </p>
                <button 
                    class="btnAprobar" 
                    onclick="aprobarPedido('${pedido.pedido_referencias}')"
                    ${pedido.pedido_aprobado ? 'disabled' : ''}
                >
                     ${pedido.pedido_aprobado ? 'Aprobado' : 'Aprobar'}
                </button>
                <button 
                    class="btnCancelar" 
                    onclick="cancelarPedido('${pedido.pedido_referencias}', '${pedido.pedido_correo}')"
                >
                    X
                </button>
            `;

            contenedor.appendChild(divPedido);
        });
    } catch (error) {
        console.error('Error al cargar los pedidos:', error);
    }
}

async function aprobarPedido(referencia) {
    console.log('la referencia pasada es: ', referencia)
    try {
        const response = await fetch(`/api/pedidos/${referencia}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();  // <--- Esperamos la promesa aquí
        console.log('Data recibida:', data);
        if (response.ok) {
            // Recargar los pedidos para mostrar los cambios
            cargarPedidos();
        } else {
            console.log('respons: ', response)
            console.error('Error al aprobar el pedido');
        }
    } catch (error) {
        console.error('Error xd:', error);
    }
}

async function cancelarPedido(referencia, correo) {
    console.log('la referencia pasada es: ', referencia)
    console.log('el correo pasado es: ', correo)



    try {
        const response = await fetch(`/api/pedidos/${referencia}/${correo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();  // <--- Esperamos la promesa aquí
        console.log('Data recibida:', data);
        if (response.ok) {
            // Recargar los pedidos para mostrar los cambios
            cargarPedidos();
        } else {
            console.log('respons: ', response)
            console.error('Error al aprobar el pedido');
        }
    } catch (error) {
        console.error('Error xd:', error);
    }



}
