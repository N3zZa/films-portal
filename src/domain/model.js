require("dotenv").config(); // Config file
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const _ = undefined;
// API BAZON_TOKEN
const API_TOKEN = process.env.ALLOHA_TOKEN;
const ALLOHAVIDEO_TOKEN = process.env.ALLOHAVIDEO_TOKEN;

const yourIp = "178.121.37.82"; // ваш айпи



// ССЫЛКА НА АПИ ДЛЯ ЗАПРОСА НА ВИДЕОФАЙЛЫ
const APIFILM_URL = `https://api.apbugall.org/?token=${API_TOKEN}&`;
const APIVIDEO_URL = `https://away.as.newplayjj.com:9443/link_file.php?secret_token=${ALLOHAVIDEO_TOKEN}&ip=${yourIp}&`;



 // ваши фильмы
        const fullHdfilms = [
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '1',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '2',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '3',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '4',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '5',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '6',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '7',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '8',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '9',
            }, 
            {
                title: 'Трансформеры: Восхождение Звероботов',
                videoUrl: 'http://172.16.0.10/films/Transformers.Rise.of.the.Beasts.2023.mkv',
                imageUrl: 'https://i.ibb.co/ky1mzbT/147681.jpg',
                id: '10',
            }]


// импортирую все функции из папки requests в методы
// добавил setTimeout'ы для задержки(чтобы базон не блочил)
module.exports = {
  // премьеры
  getPremieres: new Promise(function (resolve, reject) {
    require("../requests/premiereRequest.js").then((elem) => {
      resolve(elem);
    });
  }),
  // фильмы
  getFilms: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/filmRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 0);
  }),
  // сериалы
  getSerials: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/serialRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 100);
  }),
  // аниме
  getAnime: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/animeRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 200);
  }),
  // каналы
  getChannels: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/channels/channels.js").then((elem) => {
        resolve(elem);
      });
    }, 300);
  }),
  // метод получения сезонов
  getSeasons: (seasons, kinopoisk_id, index, app, isSerial, seasonsCount) => {
    try {
      let model = module.exports;
      // получение из запроса сезонов и эпизодов
      if (isSerial) {
        // проверка на сериал
        const seasonsArr = [];
        // из эпизодов создаю htmlblock
        for (let key of Object.keys(seasons)) {
          Object.keys(seasons[key].episodes).forEach((episode, i) => {
            const arrElem = `
                    <li id="season${key}episode${episode}" class="channel nav-item"
                        >
                        <p>${key} сезон, ${episode} серия</p>
                     </li>
                     <script type="text/javascript">
                        $('#season${key}episode${episode}').click(function (e) {
                            window.location = '/selectTranslation${
                              kinopoisk_id.toString() + index
                            }&season=${key}&episode=${episode}'
                        })
                     </script>
                    `;
            seasonsArr.push(arrElem);
            model.getTranslations(
              key,
              episode,
              kinopoisk_id,
              index,
              app,
              isSerial
            ); // метод получения озвучек(он ниже метода getSeasons)
          });
        }
        fs.writeFileSync(
          "./public/views/elements/filmInfo/seasons&translations.ejs",
          seasonsArr.join("").toString()
        ); // создаю html элемент с сезонами либо озвучками
        seasonsArr.length = 0; // обнуляю массив
      } else {
        fs.writeFileSync(
          "./public/views/elements/filmInfo/seasons&translations.ejs",
          ""
        ); // создаю пустой htmlэлемент
        model.getTranslations(_, _, kinopoisk_id, index, app, isSerial); // метод получения озвучек(он ниже метода getSeasons)
      }
    } catch (error) {
      console.error("episodesError", error); // обработка ошибки
    }
  },
  // метод получения озвучек(также здесь платный запрос на видеофайлы и получение качества видео для передачи его в метод getQualities)
  getTranslations: (season, episode, kinopoisk_id, index, app, isSerial) => {
    try {
      let model = module.exports;

      // проверка на сериал и если сериал то в url вписывается сезон и серия, если нет -- не вписывается
      const translPageUrl = isSerial
        ? "/selectTranslation" +
          kinopoisk_id.toString() +
          index +
          `&season=${season}` +
          `&episode=${episode}`
        : "/selectTranslation" + kinopoisk_id.toString() + index;

      // обработка страницы с озвучками
      app.get(translPageUrl, (req, res) => {
        try {
          // запрос на получение данных о фильме
          fetch(
            APIFILM_URL +
              `${
                typeof kinopoisk_id === "number"
                  ? `kp=${kinopoisk_id}`
                  : `name=${kinopoisk_id}`
              }`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          )
            .then((response) => response.json())
            .then((jsonResponse) => {
              try {
                // создаю блок с озвучками
                const filmItem = jsonResponse.data;
                const filmEpisode = season
                  ? filmItem.seasons[season].episodes[episode]
                  : filmItem.translation_iframe;
                const htmlForTransl = [];
                // с помощью replace(/\s/g, "") убираю пробелы
                if (season === undefined) {
                   for (let key of Object.keys(filmEpisode)) {
                    if (filmEpisode[key].name === 'Не требуется') {
                      console.log(filmEpisode);
                      const htmlElem = `
                                         <li id="transl${kinopoisk_id}${
                        season ? season + episode + index : ""
                      }${filmEpisode[key].quality.replace(
                        /\s/g,
                        ""
                      )}" class="channel nav-item"
                                     >
                                        <p>Начать просмотр</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#transl${kinopoisk_id}${
                        season ? season + episode + index : ""
                      }${filmEpisode[key].quality.replace(
                        /\s/g,
                        ""
                      )}').click(function (e) {
                                     window.location = '/player${
                                       kinopoisk_id.toString() + index
                                     }&season=${
                        season ? season : "none"
                      }&episode=${
                        episode ? episode : "none"
                      }&quality=${filmEpisode[key].quality.replace(/\s/g, "")}'
                                    })
                                    
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id.toString() +
                                                  index
                                                }';
                                            break;
                                        }
                                    })
                                    </script>
                                        `;
                      htmlForTransl.push(htmlElem);
                      model.createPlayerPage(
                        app,
                        season,
                        episode,
                        filmEpisode[key],
                        kinopoisk_id,
                        index,
                        key
                      );
                    } else {
                      console.log(filmEpisode);
                      const htmlElem = `
                                         <li id="transl${kinopoisk_id}${
                        season ? season + episode + index : ""
                      }${filmEpisode[key].quality.replace(
                        /\s/g,
                        ""
                      )}" class="channel nav-item"
                                     >
                                        <p>${filmEpisode[key].name}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#transl${kinopoisk_id}${
                        season ? season + episode + index : ""
                      }${filmEpisode[key].quality.replace(
                        /\s/g,
                        ""
                      )}').click(function (e) {
                                     window.location = '/player${
                                       kinopoisk_id.toString() + index
                                     }&season=${
                        season ? season : "none"
                      }&episode=${
                        episode ? episode : "none"
                      }&quality=${filmEpisode[key].quality.replace(/\s/g, "")}'
                                    })
                                    
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id.toString() +
                                                  index
                                                }';
                                            break;
                                        }
                                    })
                                    </script>
                                        `;
                      htmlForTransl.push(htmlElem);
                      model.createPlayerPage(
                        app,
                        season,
                        episode,
                        filmEpisode[key],
                        kinopoisk_id,
                        index,
                        key
                      );
                    }
                   }
                } else {
                  for (let key of Object.keys(filmEpisode.translation)) {
                    const transl = filmEpisode.translation[key].translation;
                    if (transl === 'Не требуется') {
                      const htmlElem = `
                                         <li id="transl${kinopoisk_id}${
                        season ? season + episode + index : ""
                      }${transl.replace(/\s/g, "")}" class="channel nav-item"
                                     >
                                        <p>Начать просмотр</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#transl${kinopoisk_id}${
                        season ? season + episode + index : ""
                      }${transl.replace(/\s/g, "")}').click(function (e) {
                                     window.location = '/player${
                                       kinopoisk_id.toString() + index
                                     }&season=${
                        season ? season : "none"
                      }&episode=${
                        episode ? episode : "none"
                      }&quality=${transl.replace(/\s/g, "")}'
                                    })
                                    
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id.toString() +
                                                  index
                                                }';
                                            break;
                                        }
                                    })
                                    </script>
                                        `;
                                         htmlForTransl.push(htmlElem);
                                         model.createPlayerPage(
                                           app,
                                           season,
                                           episode,
                                           filmEpisode.translation[key],
                                           kinopoisk_id,
                                           index,
                                           key
                                         );
                    } else {
 const htmlElem = `
                                         <li id="transl${kinopoisk_id}${
   season ? season + episode + index : ""
 }${transl.replace(/\s/g, "")}" class="channel nav-item"
                                     >
                                        <p>${transl}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#transl${kinopoisk_id}${
   season ? season + episode + index : ""
 }${transl.replace(/\s/g, "")}').click(function (e) {
                                     window.location = '/player${
                                       kinopoisk_id.toString() + index
                                     }&season=${
   season ? season : "none"
 }&episode=${episode ? episode : "none"}&quality=${transl.replace(/\s/g, "")}'
                                    })
                                    
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id.toString() +
                                                  index
                                                }';
                                            break;
                                        }
                                    })
                                    </script>
                                        `;
 htmlForTransl.push(htmlElem);
 model.createPlayerPage(
   app,
   season,
   episode,
   filmEpisode.translation[key],
   kinopoisk_id,
   index,
   key
 );
                    }
                   
                  }

                }
                // создание файла с озвучками
                fs.writeFileSync(
                  "./public/views/elements/filmInfo/seasons&translations.ejs",
                  htmlForTransl.join("").toString()
                );
                res.render("translationsPage.ejs"); // вывод страницы и передаю url при переходе назад
               
              } catch (error) {
                console.error("getTranslationsFetchError", error); // обработка ошибки
                res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
              }
            });
        } catch (error) {
          console.error("getTranslationsAppError", error); // обработка ошибки
          res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
        }
      });
    } catch (error) {
      console.error("translationsError", error); // обработка ошибки
    }
  },
  // создание страницы с фильмами по названию, которое ввел в поиске
  createSearchItems: (inputText, res) => {
    return new Promise(function (resolve, reject) {
      // запрос на поиск фильмов
      const searchRequestModel = require("../requests/search/searchRequest.js");
      searchRequestModel(inputText, res).then((elem) => {
        resolve(elem);
      });
    });
  },
  // метод получение fullhd фильмов(они находятся в начале файла)
  createFullHdList: (app) => {
    let model = module.exports;

    // создаю html блоки для выбора фильмов на странице fullhdFilms
    var fullHdFilmsItem = fullHdfilms.map((item, index) => {
      model.createPlayerPage(app, _, _, item, index, _, _);
      return `
            <li data-imageId="image${item.id}" href="${item.videoUrl}" id="fullhdFilm${item.id}" class="channel nav-item">
                <a>${item.title}</a>
            </li>
            <div id="image${item.id}" class="fullHdFilmPoster hidden" style="background: url('${item.imageUrl}'); background-repeat:no-repeat;background-cover: cover;background-size: 100% 100%;" >
            </div>
            <script type="text/javascript">
            var fullHdfilm${item.id} = document.getElementById('fullhdFilm${item.id}');
             fullHdfilm${item.id}.addEventListener("click", function (event) {document.location.href = "/playerFullHd${item.id}"; $$nav.off()});
            </script>
            `;
    });

    // создаю файл с html элементами
    fs.writeFileSync(
      "./public/views/elements/fullHdFilms/fullHdFilms.ejs",
      fullHdFilmsItem.join("").toString()
    );
    app.get("/fullHdFilms", (req, res) => {
      res.render("fullHdFilms.ejs"); // рендер страницы фулл хд фильмов
    });
  },
  // метод создания страницы с плеером
  createPlayerPage: (
    app,
    season,
    episode,
    elem,
    kp_id,
    indexFilm,
    translationId
  ) => {
    // проверка title для fullhdfilms, если ее нет, то фильм с базона
    if (elem.title !== undefined) {
      app.get(`/playerFullHd${elem.id}`, (req, res) => {
        res.render("playerPage.ejs", {
          playerUrl: elem.videoUrl,
          backUrl: "/fullHdFilms",
        }); // Отправка ответа в виде HTML(также передаю ссылку при клике назад и конечно ссылку на видеофайл)
      });
    } else {
      
      app.get(
        `/player${kp_id.toString() + indexFilm}&season=${
          season ? season : "none"
        }&episode=${episode ? episode : "none"}&quality=${
          elem.translation
            ? encodeURI(elem.translation.replace(/\s/g, ""))
            : elem.quality.replace(/\s/g, "")
        }`,
        (req, res) => {
          fetch(
            APIVIDEO_URL +
              `${
                typeof kp_id === "number" ? `kp=${kp_id}` : `name=${kp_id}`
              }${season ? `&season=${season}&episode=${episode}` : ''}&translation=${translationId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          )
            .then((response) => response.json())
            .then((responseData) => {
              const videoString = responseData.data.playlist_file;
              var a = videoString.split("https://")[1];
              
              var b = a.split('.m3u8')[0]
              var video = "https://" + b + ".m3u8"
              // проверка на сезон
              if (season === undefined) {
                console.log(responseData)
                
                console.log("videoURL", video);
                res.render("playerPage.ejs", {
                  playerUrl: video,
                  backUrl: "/filmInfo" + kp_id + indexFilm,
                }); // Отправка ответа в виде HTML
              } else {
                
                console.log("videoURL", video);

                res.render("playerPage.ejs", {
                  playerUrl: video,
                  backUrl: "/filmInfo" + kp_id + indexFilm,
                }); // Отправка ответа в виде HTML
              }
            });
        }
      );
    }
  },
};