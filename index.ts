import app from './src/app';

const PORT = process.env.PORT || 5500;

app.listen(PORT, ()=>{
    console.log(`Сервер запущен на http://localhost:${PORT}`);
})