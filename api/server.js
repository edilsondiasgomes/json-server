const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Middleware para adicionar cabeçalhos CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://rentals-frontend-nine.vercel.app'); // Permite a origem específica
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // Tratar requisições OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    next();
});

server.use(middlewares);

// Adicionar reescritor antes do roteador
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

// Porta será configurada pelo Vercel
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});

// Exportar a API do servidor
module.exports = server;
