const express = require("express");
const app = express();
const userModel = require("./src/domain/model.js")
const path = require("path");
const fs = require("fs");


app.set('views', path.join(__dirname, '/public/views')); // указываю путь для views
app.use(express.urlencoded({ extended: false })); // для mvc подхода, чтобы все было корректно
app.use(express.static(__dirname + '/public')); // делаю public директорию основной


// чтобы получить html разметку элементов создаю файл с ними, который с помощью шаблонизатора вывожу на основной странице
userModel.getPremieres.then((data) => {
    fs.writeFileSync('./public/views/elements/premieres.ejs', data.join('').toString())
})
userModel.getFilms.then((data) => {
    fs.writeFileSync('./public/views/elements/films.ejs', data.join('').toString())
})
userModel.getSerials.then((data) => {
    fs.writeFileSync('./public/views/elements/serials.ejs', data.join('').toString())
})
userModel.getCartoons.then((data) => {
    fs.writeFileSync('./public/views/elements/cartoons.ejs', data.join('').toString())
})
userModel.getChannels.then((data) => {
    fs.writeFileSync('./public/views/elements/channels.ejs', data.join('').toString())
})
// -----------------------------------------------------------------------------------------------------------------------

// страницы
app.get('/', (req, res) => {
    res.render('mainPage.ejs')
})
app.get('/channels', (req, res) => {
    res.render('channelsPage.ejs')
})

const port = process.env.PORT || 3000;
app.listen(port)
module.exports = app
console.log(`Server is listening on port ${port}`);