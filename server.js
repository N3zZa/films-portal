const express = require("express");
const app = express();
const userModel = require("./src/domain/model.js")
const path = require("path");
const fs = require("fs");


app.set('views', path.join(__dirname, '/public/views')); // указываю путь для views
app.use(express.urlencoded({ extended: false })); // для mvc подхода, чтобы все было корректно
app.use(express.static(__dirname + '/public')); // делаю public директорию основной



// чтобы получить html разметку элементов создаю файлы с ними, который с помощью шаблонизатора вывожу на основной странице, также создаю файл с информацией о фильме
userModel.getPremieres.then((data) => {
    fs.writeFileSync('./public/views/elements/premieres.ejs', data[0].join('').toString())

    // создаю страницу с информацией о фильме только тогда, когда перешли на странцу определенного фильма
    data[2].forEach((elem, index) => {
        app.get('/filmInfo' + elem.id + index, (req, res) => {
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfo.ejs', data[1][elem.index].toString())
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfoTranslations.ejs', data[1][elem.index].toString().split('<script')[0])
         userModel.getSeasons(elem.episodes, elem.id,index, app, elem.isSerial)
        res.render('filmInfoPage.ejs')
    })
    })
    
})
userModel.getFilms.then((data) => {
    fs.writeFileSync('./public/views/elements/films.ejs', data[0].join('').toString())

     // создаю страницу с информацией о фильме только тогда, когда перешли на странцу определенного фильма
    data[2].forEach((elem, index) => {
        app.get('/filmInfo' + elem.id + index, (req, res) => {
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfo.ejs', data[1][elem.index].toString())
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfoTranslations.ejs',  data[1][elem.index].toString().split('<script')[0])
         userModel.getSeasons(elem.episodes, elem.id,index, app, elem.isSerial)
        res.render('filmInfoPage.ejs')
    })
    })
})
userModel.getSerials.then((data) => {
    // data = [item, itemInfo, {id, index, episodes}]
    
    fs.writeFileSync('./public/views/elements/serials.ejs', data[0].join('').toString())

     // создаю страницу с информацией о фильме только тогда, когда перешли на странцу определенного фильма
    data[2].forEach((elem, index) => {
        app.get('/filmInfo' + elem.id + index, (req, res) => {
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfo.ejs', data[1][elem.index].toString())
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfoTranslations.ejs',  data[1][elem.index].toString().split('<script')[0])
        userModel.getSeasons(elem.episodes, elem.id,index, app, elem.isSerial)
        res.render('filmInfoPage.ejs')
    })
    })
})
userModel.getCartoons.then((data) => {
    fs.writeFileSync('./public/views/elements/cartoons.ejs', data[0].join('').toString())
    
     // создаю страницу с информацией о фильме только тогда, когда перешли на странцу определенного фильма
    data[2].forEach((elem, index) => {
        app.get('/filmInfo' + elem.id + index, (req, res) => {
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfo.ejs', data[1][elem.index].toString())
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfoTranslations.ejs',  data[1][elem.index].toString().split('<script')[0])
         userModel.getSeasons(elem.episodes, elem.id,index, app, elem.isSerial)
        res.render('filmInfoPage.ejs')
    })
    })
})
userModel.getChannels.then((data) => {
    fs.writeFileSync('./public/views/elements/channels/allChannels.ejs', data.allChannels.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/news.ejs', data.news.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/filmsSerials.ejs', data.filmsSerials.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/sport.ejs', data.sport.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/music.ejs', data.music.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/child.ejs', data.child.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/docum.ejs', data.docum.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/fs.ejs', data.inter.join('').toString())
    fs.writeFileSync('./public/views/elements/channels/channelImages.ejs', `${data.images('sts.jpg').join('').toString()}`)
})

// -----------------------------------------------------------------------------------------------------------------------

// страницы
app.get('/', (req, res) => {
    res.render('mainPage.ejs')
})
app.get('/channels', (req, res) => {
 
    let channelId = "#channel" + req.originalUrl.substring(req.originalUrl.indexOf("?")+1);
    res.render('channelsPage.ejs', {channelId: channelId})
})
app.get('/search', (req, res) => {
    res.render('searchPage.ejs')
})
app.get('/searchItem', (req, resMain) => {
    var name = req.originalUrl.split("?").pop();
    var correctName = name.replace("+", " ");
    // код для форматирования текста с пробелами из url адреса
    let inputText = decodeURIComponent(correctName);
    userModel.createSearchItems(inputText, resMain).then(data => {
     fs.writeFile('./public/views/elements/search/searchItems.ejs', data[0].join('').toString(), function(err) {
        if(err) {
             resMain.render('errorPage.ejs', {errorMessage: 'Ничего не найдено'})
        } else {
             resMain.render('searchedItemsPage.ejs', {inputText: inputText})
        }
     })

     // создаю страницу с информацией о фильме только тогда, когда перешли на странцу определенного фильма
    data[2].forEach((elem, index) => {
        app.get('/filmInfo' + elem.id + index, (req, res) => {
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfo.ejs', data[1][elem.index].toString())
        fs.writeFileSync('./public/views/elements/filmInfo/filmInfoTranslations.ejs',  data[1][elem.index].toString().split('<script')[0])
         userModel.getSeasons(elem.episodes, elem.id,index, app, elem.isSerial)
        res.render('filmInfoPage.ejs')
    })
    })
    })
   
})
app.get('fullHdfilms', (req, res) => {
    userModel.createFullHdList(() => {
        
    })
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`))
module.exports = app
