import Cors from 'cors';

// Inicializa o middleware CORS
const cors = Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: 'https://api.mapmarketplaces.com', // Permite requisições de localhost:3000
    credentials: true, // Permite enviar cookiess
});

// Helper para executar o middleware CORS
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
    res.json({ message: 'CORS enabled!' });
}