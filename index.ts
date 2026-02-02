import app from './src/app';

const PORT = process.env.PORT || 5500;

const server = app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

server.on('error', (err) => {
    console.error(`Ошибка при запуске сервера: ${err.message}`);
});
