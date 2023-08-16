require("dotenv").config(); // Config file
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const _ = undefined;
// API BAZON_TOKEN
const API_TOKEN = process.env.BAZON_TOKEN;

const IP_APIVIDEOS = '178.121.7.223'

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
         require('../requests/channels/channels').then((elem) => {
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
                                // создаю блок с озвучками
                                const htmlData = jsonResponse.results.map((translationElem, i) => {
                                    const htmlForTransl = `
                                         <li id="transl${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}" class="channel nav-item"
                                     >
                                        <p>${translationElem.translation}${translationElem.studio !== null ? ', ' + translationElem.studio : ''}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#transl${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}').click(function (e) {
                                     window.location = '/selectQuality&=${kinopoisk_id  + index}&season=${season ? season : 'none'}&episode=${season ? episode : 'none'}&transl=${encodeURI(translationElem.translation.replace(/[\(\)\s]/g,""))}'
                                    })
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${kinopoisk_id + index}';
                                            break;
                                        }
                                    })
                                    </script>
                                        ` 
                                    if (isSerial === '1') {


                                    const qualityObj = translationElem.playlists;
                                    const qualitySeason = qualityObj[`${season}`];
                                    const qualityEpisode = qualitySeason[`${episode}`] ? qualitySeason[`${episode}`] : {'Нет эпизодов с данной озвучкой': 'Нет эпизодов с данной озвучкой'}; ;
                                    const objKeysQuality = Object.keys(qualityEpisode)

                                    const qualityItems = objKeysQuality.map(quality => {
                                        if (quality === 'Нет эпизодов с данной озвучкой') {
                                             const qualityItem = `
                                         <li id="quality${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}${quality}" class="channel nav-item"
                                     >
                                        <p>${quality}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#quality${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}${quality}').click(function (e) {
                                     window.location = '${translPageUrl}';
                                    })
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${kinopoisk_id + index}';
                                            break;
                                        }
                                    })
                                    </script>
                                        ` 
                                        return [qualityItem, quality]
                                        } else {
                                             const qualityItem = `
                                         <li id="quality${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}${quality}" class="channel nav-item"
                                     >
                                        <p>${quality}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#quality${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}${quality}').click(function (e) {
                                     window.location = '/player${kinopoisk_id  + index}&season=${season ? season : 'none'}&episode=${season ? episode : 'none'}&transl=${encodeURI(translationElem.translation.replace(/[\(\)\s]/g,""))}&quality=${quality}'
                                    })
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${kinopoisk_id + index}';
                                            break;
                                        }
                                    })
                                    </script>
                                        ` 
                                        return [qualityItem, quality]
                                        }
                                   
                                        
                                    })
                                    model.getQualities(season, episode, translationElem, index, app, qualityItems)
                                    } else {
                                    const qualityObj = Object.keys(translationElem.playlists)
                                   const qualityItems = qualityObj.map(quality => {
                                    const qualityItem = `
                                         <li id="quality${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}${quality}" class="channel nav-item"
                                     >
                                        <p>${quality}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#quality${kinopoisk_id}${season ? season + episode + index : ''}${translationElem.translation.replace(/[\(\)\s]/g,"")}${quality}').click(function (e) {
                                     window.location = '/player${kinopoisk_id  + index}&season=${season ? season : 'none'}&episode=${season ? episode : 'none'}&transl=${encodeURI(translationElem.translation.replace(/[\(\)\s]/g,""))}&quality=${quality}'
                                    })
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${kinopoisk_id + index}';
                                            break;
                                        }
                                    })
                                    </script>
                                        ` 
                                        return [qualityItem, quality]
                                    })
                                    model.getQualities(season, episode, translationElem, index, app, qualityItems)
                                    }
                                    
                                    
                                    return htmlForTransl
                                })
                                

                                // создание файла с озвучками
                                fs.writeFileSync('./public/views/elements/filmInfo/seasons&translations.ejs', htmlData.join('').toString())
                                res.render('translationsPage.ejs') // вывод страницы и передаю url при переходе назад
                            })
                          } catch (error) {
                            console.error('getTranslationsFetchError', error) // обработка ошибки
                            res.render('errorsPage.ejs') // вывод страницы с ошибкой
                          }
        })
      } catch (error) {
        console.error('translationsError', error) // обработка ошибки
      }
    },
    getQualities: (season, episode, translationElem, index, app, qualityItems) => {
          let model = module.exports
             app.get(`/selectQuality&=${translationElem.kinopoisk_id  + index}&season=${season ? season : 'none'}&episode=${season ? episode : 'none'}&transl=${encodeURI(translationElem.translation.replace(/[\(\)\s]/g,""))}`, (req, res) => {
                try {
                    qualityItems.forEach((elem) => { //перебор массива озвучек и создание страницы для каждой
                        model.createPlayerPage(app, season, episode, translationElem, index, elem[1])
                    })
                     const arrQualitiesHtml = []
                         qualityItems.forEach(qualityItem => {
                         qualityItem.pop()
                          arrQualitiesHtml.push(qualityItem)
                     })
                     fs.writeFileSync('./public/views/elements/filmInfo/quality.ejs', arrQualitiesHtml.join('').toString())
                    res.render('qualityPage.ejs')
                     arrQualitiesHtml.length = 0
                } catch (error) {
                    console.error('getQualitiesFetchError', error) // обработка ошибки
                    res.render('errorsPage.ejs') // вывод страницы с ошибкой
                }
            })
       
    },
    createSearchItems: (inputText, res) => {
        return new Promise(function(resolve, reject){
             // запрос на поиск фильмов
        const searchRequestModel = require('../requests/search/searchRequest');
        setTimeout(() => {
         searchRequestModel(inputText, res).then((elem) => {
            resolve(elem)
        })
        }, 1500)
        })
    },
    createFullHdList: () => {
        const fullHdfilms = ['','','', '', '', '', '', '', '', '', '']

        

    },
    // метод создания страницы с плеером
    createPlayerPage: (app, season, episode, elem, index, quality) => {
        app.get("/player" + elem.kinopoisk_id  + index + `&season=${season ? season : 'none'}&episode=${season ? episode : 'none'}&transl=${encodeURI(elem.translation.replace(/[\(\)\s]/g,""))}&quality=${quality}`, (req, res) => {
            if (season === undefined) {
            const videoPlaylist = elem.playlists
            // ----- ниже делаю проверку на качество видео, чтобы давало лучшее из всех -----
            const video = videoPlaylist['1080'] ? videoPlaylist['1080'] : videoPlaylist['720'] ? videoPlaylist['720'] : videoPlaylist['480']
            console.log('videoURL', video)
            res.render('playerPage.ejs', {playerUrl: video, backUrl: '/filmInfo' + elem.kinopoisk_id + index}); // Отправка ответа в виде HTML(setTimeout для того чтобы обновляло данные страницы)
            } else {
                 const videoPlaylist = elem.playlists
                                const seasonObj = videoPlaylist[`${season}`]; // получаю сезоны
                                console.log('seasonObj',seasonObj)
                                const episodeObj = seasonObj !== undefined ? seasonObj[`${episode}`] : 'no seasons' // проверка на присутствие эпизодов в запросе, если есть то получаю эпизод
                                console.log('episodeObj',episodeObj)

                                // ----- ниже делаю проверку на качество видео, чтобы давало лучшее из всех -----
                                const video = episodeObj['1080'] ? episodeObj['1080'] : episodeObj['720'] ? episodeObj['720'] : episodeObj['480']
                                console.log('videoURL', video)  
                            
                                res.render('playerPage.ejs', {playerUrl: video, backUrl: '/filmInfo' + elem.kinopoisk_id + index}); // Отправка ответа в виде HTML(setTimeout для того чтобы обновляло данные страницы)
            }
                               
        })
    }
}