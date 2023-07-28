require("dotenv").config(); // Config file
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const _ = undefined;
// API BAZON_TOKEN
const API_TOKEN = process.env.BAZON_TOKEN;

const IP_APIVIDEOS = '213.109.66.172'

// ССЫЛКА НА АПИ ДЛЯ ЗАПРОСА НА ВИДЕОФАЙЛЫ
const APIVIDEOS_URL = `https://bazon.cc/api/playlist?token=${API_TOKEN}&kp=`


// импортирую все функции из папки requests в методы
// добавил setTimeout'ы для задержки(чтобы базон не блочил)

module.exports = {
    getPremieres: new Promise(function(resolve, reject){
        require('../requests/premiereRequest').then((elem) => {
            resolve(elem)
        })
    }),
    getFilms: new Promise(function(resolve, reject){
        setTimeout(() => {
            require('../requests/filmRequest').then((elem) => {
            resolve(elem)
        })
        }, 500)
    }),
    getSerials: new Promise(function(resolve, reject){
       setTimeout(() => {
            require('../requests/serialRequest').then((elem) => {
            resolve(elem)
        })
       }, 1000)
    }),
    getCartoons: new Promise(function(resolve, reject){
        setTimeout(() => {
         require('../requests/cartoonsRequest').then((elem) => {
            resolve(elem)
        })
        }, 1500)
    }),
    getChannels: new Promise(function(resolve, reject){
        setTimeout(() => {
         require('../requests/channels').then((elem) => {
            resolve(elem)
        })
        }, 1500)
    }),
    getSeasons: (episodes, kinopoisk_id, index, app, isSerial) => {
        try {
        let model = module.exports

        // получение из запроса сезонов и эпизодов
        if (isSerial === '1') { // проверка на сериал
            const seasonsArr = [];
            // из эпизодов создаю htmlblock
            for (let key of Object.keys(episodes)) {
                Object.values(episodes[key]).forEach((_, i) => {
                    const arrElem = 
                    `
                    <li id="season${key}episode${i + 1}" class="channel nav-item"
                        >
                        <p>${key} сезон, ${i + 1} серия</p>
                     </li>
                     <script type="text/javascript">
                        $('#season${key}episode${i + 1}').click(function (e) {
                            window.location = '/selectTranslation${kinopoisk_id + index}&season=${key}&episode=${i + 1}'
                        })
                     </script>
                    `
                    seasonsArr.push(arrElem);
                    model.getTranslations(key, i + 1, kinopoisk_id, index, app, isSerial) // метод получения озвучек(он ниже метода getSeasons)
                })
        }
        fs.writeFileSync('./public/views/elements/filmInfo/seasons&translations.ejs', seasonsArr.join('').toString()) // создаю html элемент с сезонами либо озвучками
        seasonsArr.length = 0 // обнуляю массив
        } else {
            fs.writeFileSync('./public/views/elements/filmInfo/seasons&translations.ejs', '') // создаю пустой htmlэлемент
             model.getTranslations(_, _, kinopoisk_id, index, app, isSerial) // метод получения озвучек(он ниже метода getSeasons)
        }

        } catch (error) {
            console.error('episodesError', {error, episodes: episodes}) // обработка ошибки
        }
    },
    getTranslations: (season, episode, kinopoisk_id, index, app, isSerial) => {
      try {

        let model = module.exports

        // проверка на сериал и если сериал то в url вписывается сезон и серия, если нет -- не вписывается
        const translPageUrl = isSerial === '1' ? '/selectTranslation' + kinopoisk_id + index + `&season=${season}` + `&episode=${episode}` : '/selectTranslation' + kinopoisk_id + index

        // обработка страницы с озвучками
        app.get(translPageUrl, (req, res) => {
                          try {
                            // запрос на получение видеофайлов
                            fetch(APIVIDEOS_URL + `${kinopoisk_id}&ref=&ip=${IP_APIVIDEOS}`, {
                             method: "GET",
                                headers: { "Content-Type": "application/json" },
                            })
                            .then((response) => response.json())
                            .then((jsonResponse) => {
                                console.log(jsonResponse)

                                // создаю блок с озвучками
                                const htmlTranslations = jsonResponse.results.map((translationElem, index) => {
                                    const items = `
                                         <li id="${translationElem.translation + index}" class="channel nav-item"
                                     >
                                        <p>${translationElem.translation}${translationElem.studio !== null ? ', ' + translationElem.studio : ''}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#${translationElem.translation + index}').click(function (e) {
                                     window.location = '/player${kinopoisk_id + index}&season=${season}&episode=${episode}'
                                    })
                                    </script>
                                        `
                                    return items
                                })

                                jsonResponse.results.forEach((elem) => { //перебор массива озвучек и создание страницы для каждой
                                    model.createPlayerPage(app, elem.kinopoisk_id, season, episode, elem.translation)
                                })

                                // создание файла с озвучками
                                fs.writeFileSync('./public/views/elements/filmInfo/seasons&translations.ejs', htmlTranslations.join('').toString())
                                res.render('translationsPage.ejs') // вывод страницы и передаю url при переходе назад
                            })
                          } catch (error) {
                            console.error('videosFetchError', error) // обработка ошибки
                          }
        })
      } catch (error) {
        console.error('translationsError', error) // обработка ошибки
      }
    },
    // метод создания страницы с плеером
    createPlayerPage: (app, kinopoisk_id, season, episode, translation) => {
        app.get("/player=" + kinopoisk_id + `&${season}` + `&${episode}` + `&${encodeURI(translation.replace(/[\(\)\s]/g,""))}`, (req, res) => {
                                const videoPlaylist = elem.playlists
                                console.log(elem)

                                const seasonObj = videoPlaylist[`${season}`]; // получаю сезоны
                                const episodeObj = seasonObj !== undefined ? seasonObj[`${episode}`] : 'no seasons' // проверка на присутствие эпизодов в запросе, если есть то получаю эпизод

                                // ----- ниже делаю проверку на качество видео, чтобы давало лучшее из всех -----
                                const video = episodeObj['1080'] ? episodeObj['1080'] : episodeObj['720'] ? episodeObj['720'] : episodeObj['480']
                                console.log('videoURL', video)
                            
                                res.send(playerPage); // Отправка ответа в виде HTML(setTimeout для того чтобы обновляло данные страницы)
        })
    }
}