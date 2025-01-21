// server.js
import express from 'express';
import { promises as fs } from 'fs';
import * as fsSync from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();


class GitHubSync {
    constructor(owner, repo) {
      this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      this.owner = owner;
      this.repo = repo;
    }
  
    async updateJsonFile(path, content) {
      try {
        // Primero obtener el archivo actual y su SHA
        const currentFile = await this.octokit.repos.getContent({
          owner: this.owner,
          repo: this.repo,
          path: path,
        });
  
        // Crear el commit con el nuevo contenido
        const response = await this.octokit.repos.createOrUpdateFileContents({
          owner: this.owner,
          repo: this.repo,
          path: path,
          message: 'Actualización automática del JSON',
          content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
          sha: currentFile.data.sha,
          branch: 'master' // o 'master' según tu rama principal
        });
  
        return response.data;
      } catch (error) {
        console.error('Error al actualizar el archivo:', error);
        throw error;
      }
    }
  }

  // Ejemplo de uso en tu aplicación:
const sync = new GitHubSync(
        'HuGuiTo2083',
    'rifa-moto'
  );

  // Función para usar cuando modificas tu JSON
  async function actualizarJSON(archivo, nuevosDatos) {
    try {
        console.log('Intentando actualizar en GitHub:', archivo);
        console.log('Datos a actualizar:', nuevosDatos);
        
        await sync.updateJsonFile(archivo, nuevosDatos);
        console.log('✅ JSON actualizado exitosamente en GitHub');
    } catch (error) {
        console.error('❌ Error detallado al actualizar en GitHub:', error.message);
        console.error('Stack:', error.stack);
    }
}
// Ruta al archivo de tickets
const ticketsPath = path.join(__dirname, 'tickets.json');

// Función para leer tickets existentes
async function leerTickets() {
    try {
        // Verificar si el archivo existe
        if (!fsSync.existsSync(ticketsPath)) {
            // Si no existe, crear un archivo con un array vacío
            await fs.writeFile(ticketsPath, JSON.stringify([], null, 2));
            return [];
        }
        const data = await fs.readFile(ticketsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer tickets:', error);
        return []; // Retorna array vacío en caso de error
    }
}

// Función para generar números aleatorios únicos
async function generarNumerosBoletosUnicos(cantidad) {
    const tickets = await leerTickets();
    const numerosExistentes = new Set(tickets.map(t => t.numero));
    const numerosGenerados = new Set();
    
    while (numerosGenerados.size < cantidad) {
        const numeroAleatorio = Math.floor(Math.random() * 10000) + 1;
        if (!numerosExistentes.has(numeroAleatorio) && !numerosGenerados.has(numeroAleatorio)) {
            numerosGenerados.add(numeroAleatorio);
        }
    }
    
    return Array.from(numerosGenerados);
}

// Función para guardar nuevos tickets
async function guardarTickets(nuevosTickets) {
    const tickets = await leerTickets();
    tickets.push(...nuevosTickets);
    await fs.writeFile(ticketsPath, JSON.stringify(tickets, null, 2));
    await actualizarJSON('tickets.json', tickets);
}




// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'autosalex95@gmail.com', // Tu correo Gmail
        pass: 'mbxu ehuc hgrs kiks' // Contraseña de aplicación de Gmail
    }
});

// Define la ruta del archivo aquí, al inicio
const pedidosPath = path.join(__dirname, 'pedidos.json');

// Middleware para parsear JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static('public'));


// Ruta para obtener todos los pedidos
app.get('/api/pedidos', async (req, res) => {
    try {
        const pedidosPath = path.join(__dirname, 'pedidos.json');
        const data = await fs.readFile(pedidosPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error al leer pedidos:', error);
        res.status(500).json({ error: 'Error al leer los pedidos' });
    }
});

// Actualiza la ruta PUT
app.put('/api/pedidos/:referencia', async (req, res) => {
    try {
        const referencia = parseInt(req.params.referencia);
        const data = await fs.readFile(pedidosPath, 'utf8');
        const pedidos = JSON.parse(data);
        
        const pedidoIndex = pedidos.findIndex(p => p.referencias === referencia);
        if (pedidoIndex !== -1) {
            pedidos[pedidoIndex].aprobado = true;
            await fs.writeFile(pedidosPath, JSON.stringify(pedidos, null, 2));
            await actualizarJSON('pedidos.json', pedidos);
            // Generar números de boletos
            const pedido = pedidos[pedidoIndex];
            const numerosGenerados = await generarNumerosBoletosUnicos(pedido.boletos);
            
            // Guardar los nuevos tickets
            const nuevosTickets = numerosGenerados.map(numero => ({
                numero,
                referencia: pedido.referencias,
                propietario: `${pedido.nombre} ${pedido.apellido}`,
                correo: pedido.correo,
                fechaCompra: new Date().toISOString()
            }));
            
            await guardarTickets(nuevosTickets);

            // Enviar correo de confirmación
            const mailOptions = {
                from: 'autosalex95@gmail.com',
                to: pedido.correo,
                subject: '¡Tu pedido ha sido aprobado!',
                html: `
                    <h1>¡Pedido Aprobado!</h1>
                    <p>Hola ${pedido.nombre} ${pedido.apellido},</p>
                    <p>Nos complace informarte que tu pedido con referencia #${pedido.referencias} ha sido aprobado.</p>
                    <h2>Detalles del pedido:</h2>
                    <ul>
                        <li>Número de boletos: ${pedido.boletos}</li>
                        <li>Precio total: $${pedido.precioTotal}</li>
                        <li>Número de contacto: ${pedido.numero}</li>
                    </ul>
                    <h2>Tus números de boletos son:</h2>
                    <ul>
                        ${numerosGenerados.map(numero => 
                            `<li>Boleto #${numero}</li>`
                        ).join('')}
                    </ul>
                    <p>¡Gracias por tu compra y mucha suerte!</p>
                `
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Correo enviado correctamente');
            } catch (emailError) {
                console.error('Error al enviar correo:', emailError);
            }

            res.json({ 
                success: true, 
                tickets: numerosGenerados 
            });
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar pedido:', error);
        res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
});

// Ruta para guardar pedidos
app.post('/api/pedidos', async (req, res) => {
    console.log("2aa")
    try {
        let pedidos = [];
        
        // Verificar si el archivo existe
        if (fsSync.existsSync(pedidosPath)) {
            const contenido = await fs.readFile(pedidosPath, 'utf8');
            try {
                pedidos = JSON.parse(contenido);
            } catch (parseError) {
                console.error('Error al parsear JSON:', parseError);
                pedidos = []; // Si hay error al parsear, comenzamos con array vacío
            }
        }

        // Verificar que pedidos sea un array
        if (!Array.isArray(pedidos)) {
            pedidos = [];
        }

        // Añadir el nuevo pedido
        pedidos.push(req.body);

        // Guardar el archivo actualizado
        await fs.writeFile(pedidosPath, JSON.stringify(pedidos, null, 2), 'utf8');
        console.log('Archivo guardado localmente, intentando sincronizar con GitHub...');
        await actualizarJSON('pedidos.json', pedidos);
        console.log('Proceso completo');
        res.json({ success: true, message: 'Pedido guardado correctamente' });
    } catch (error) {
        console.error('Error específico:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al guardar el pedido',
            error: error.message 
        });
    }
});

// app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
// });

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});