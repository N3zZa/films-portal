require("dotenv").config(); // Config file
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require("axios");
const _ = undefined;
const API_TOKEN = "a3f15ddc-3330-43e1-a014-a18a1a7c4910";

// ССЫЛКА НА АПИ ДЛЯ ЗАПРОСА НА ВИДЕОФАЙЛЫ
const APIVIDEOS_URL = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`;
const APIVIDEOS_MP4 = `http://127.0.0.1:8000/api/link/`;




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
    require("../requests/premiereRequest").then((elem) => {
      resolve(elem);
    });
  }),

  // фильмы
  getFilms: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/filmRequest").then((elem) => {
        resolve(elem);
      });
    }, 500);
  }),
  // сериалы
  getSerials: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/serialRequest").then((elem) => {
        resolve(elem);
      });
    }, 1000);
  }),
  // каналы
  getChannels: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/channels/channels").then((elem) => {
        resolve(elem);
      });
    }, 1200);
  }),
  // аниме
  getAnime: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/animeRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 1500);
  }),

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
  // метод получения сезонов
  getSeasons: (episodes, kinopoisk_id, index, app, isSerial) => {
    try {
      let model = module.exports;
      // получение из запроса сезонов и эпизодов
      if (isSerial === "1") {
        // проверка на сериал
        const seasonsArr = [];
        // из эпизодов создаю htmlblock
        const sortedSeasons = episodes.sort(function (a, b) {
          if (a.season_num === b.season_num) {
            return parseFloat(
              Number(a.num.substring(1, 3)) -
                parseFloat(Number(b.num.substring(1, 3)))
            );
          }
        });

        const arrhtml = sortedSeasons.map((elem, i) => {
          const arrElem = `
                    <li id="season${elem.season_num}episode${
            elem.num
          }" class="channel nav-item"
                        >
                        <p>${elem.season_num} сезон, ${elem.num.substring(
            1,
            3
          )} серия</p>
                     </li>
                     <script type="text/javascript">
                        $('#season${elem.season_num}episode${
            elem.num
          }').click(function (e) {
                            window.location = '/selectQuality&=${
                              kinopoisk_id.toString() + index.toString()
                            }'
                            $('.waitingPopup').show();
                        })
                     </script>
                    `;

          seasonsArr.push(arrElem);
          model.getQualities(
            elem.season_num,
            elem.num,
            kinopoisk_id,
            index,
            app,
            isSerial
          ); // метод получения озвучек(он ниже метода getSeasons)
        });
        arrhtml;

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
        model.getQualities(_, _, kinopoisk_id, index, app, isSerial); // метод получения озвучек(он ниже метода getSeasons)
      }
    } catch (error) {
      console.error("episodesError", { error }); // обработка ошибки
    }
  },
  // метод получения качества видео(в методе getTranslations я его получаю и передаю в этот метод)
  getQualities: (season, episode, kinopoisk_id, indexFilm, app, isSerial) => {
    let model = module.exports;
    const qualiryPageUrl = `/selectQuality&=${
      kinopoisk_id.toString() + indexFilm.toString()
    }`;
    app.get(qualiryPageUrl, (req, res) => {
      try {
        try {
          // запрос на получение видеофайлов
          fetch(APIVIDEOS_URL + `${kinopoisk_id}`, {
            method: "GET",
            headers: {
              "X-API-KEY": API_TOKEN,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((filmresponse) => {
              let genre = "";
              const genresArr = filmresponse.genres.forEach((genreItem) => {
                genre += genreItem.genre;
              });
              genresArr;
              const filmValues = {
                name: filmresponse.nameRu,
                year: filmresponse.year.toString(),
                genre: genre,
                engname:
                  filmresponse.nameOriginal !== null
                    ? filmresponse.nameOriginal
                    : "",
                season: season ? season : "",
                episode: episode ? episode.substring(1, 3) : "",
              };
              axios
                .post(APIVIDEOS_MP4, filmValues)
                .then(function (data) {
                  return data;
                })
                .then((jsonResponse) => {
                  try {
                    // создаю блок с озвучками
                    let videosData = jsonResponse.data.Link.videos;
                    var qualityArr = Object.keys(videosData);
                    function json2array() {
                      // получаю ниже качество по проверке на сериал
                      if (isSerial === "1") {
                        // для сериала
                        const objKeysQuality = qualityArr;

                        // создаю html блок с качеством
                        const qualityItems = objKeysQuality.map(
                          (quality, i) => {
                            // проверка на качество
                            if (quality === "Нет эпизодов с данной озвучкой") {
                              // блок с 'Нет эпизодов с данной озвучкой'
                              const qualityItem = `
                                         <li id="quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }${quality}" class="channel nav-item"
                                     >
                                        <p class="noEpisodesText">${quality}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }${quality}').click(function (e) {
                                     window.location = '${translPageUrl}';
                                    })
                                    $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }2160').removeClass('nav-item')
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id + indexFilm
                                                }';
                                            break;
                                        }
                                    })
                                    </script>
                                        `;
                              return [qualityItem, quality]; // отдаю качество
                            } else {
                              const qualityItem = `
                                         <li id="quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }${quality}" class="channel nav-item"
                                     >
                                        <p>${quality}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }${quality}').click(function (e) {
                                     window.location = '/player${
                                       kinopoisk_id.toString() + i.toString()
                                     }&season=${
                                season ? season : "none"
                              }&episode=${
                                season ? episode : "none"
                              }&quality=${quality}'
                                    })
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id.toString() +
                                                  indexFilm.toString()
                                                }';
                                            break;
                                        }
                                    })
                                    if ( $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }2160') !== undefined) {
                                         $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }2160').removeClass('nav-item')
                                        $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }2160').addClass('lockQuality')
                                        $('#quality${kinopoisk_id}${
                                season ? season + episode + indexFilm : ""
                              }2160').append('<img src="/img/lock.png" alt="lock">')
                                        $('.blockedQualities').hide()
                                    }
                                    </script>
                                        `;
                              return [qualityItem, quality];
                            }
                          }
                        );
                        const arrQualitiesHtml = [];
                        let poppedItem;
                        try {
                          // делаю так, потому что я закинул в массив 2 элемента: объект с html и просто строку с качеством, здесь удаляю строку с качеством чтобы получить только html и создать файл с ними
                          qualityItems.forEach((qualityItem) => {
                            if (qualityItem.length === 2) {
                              poppedItem = qualityItem.pop();
                              arrQualitiesHtml.push(qualityItem);
                            } else {
                              arrQualitiesHtml.push(qualityItem);
                            }
                          });
                        } finally {
                          // создаю файл с html блоками качеств
                          fs.writeFileSync(
                            "./public/views/elements/filmInfo/quality.ejs",
                            arrQualitiesHtml.join("").toString()
                          );
                          res.render("qualityPage.ejs"); // рендер страницы с качествами
                        }
                      } else {
                        // для фильма
                        const qualityObj = qualityArr;

                        const qualityItems = qualityObj.map((quality, i) => {
                          const qualityItem = `
                                         <li id="quality${kinopoisk_id}${
                            season ? season + episode + i : ""
                          }${quality}" class="channel nav-item"
                                     >
                                        <p>${quality}</p>
                                    </li>
                                    <script type="text/javascript">
                                    $('#quality${kinopoisk_id}${
                            season ? season + episode + i : ""
                          }${quality}').click(function (e) {
                                     window.location = '/player${
                                       kinopoisk_id.toString() + i.toString()
                                     }&season=${
                            season ? season : "none"
                          }&episode=${
                            season ? episode : "none"
                          }&quality=${quality}'
                                    })
                                     $(document).keydown(function (e) {
                                         switch (e.keyCode) {
                                            case 8:
                                                document.location.href = '/filmInfo${
                                                  kinopoisk_id.toString() +
                                                  indexFilm.toString()
                                                }';
                                            break;
                                        }
                                    })
                                     if ( $('#quality${kinopoisk_id}${
                            season ? season + episode + i : ""
                          }2160') !== undefined) {
                                         $('#quality${kinopoisk_id}${
                            season ? season + episode + i : ""
                          }2160').removeClass('nav-item')
                                        $('#quality${kinopoisk_id}${
                            season ? season + episode + i : ""
                          }2160').addClass('lockQuality')
                                        $('#quality${kinopoisk_id}${
                            season ? season + episode + i : ""
                          }2160').append('<img src="/img/lock.png" alt="lock">')
                                        $('.blockedQualities').hide()
                                    }
                                    </script>
                                        `;
                          return qualityItem;
                        });
                        const arrQualitiesHtml = [];
                        let poppedItem;
                        try {
                          // делаю так, потому что я закинул в массив 2 элемента: объект с html и просто строку с качеством, здесь удаляю строку с качеством чтобы получить только html и создать файл с ними
                          qualityItems.forEach((qualityItem) => {
                            if (qualityItem.length === 2) {
                              poppedItem = qualityItem.pop();
                              arrQualitiesHtml.push(qualityItem);
                            } else {
                              arrQualitiesHtml.push(qualityItem);
                            }
                          });
                        } finally {
                          // создаю файл с html блоками качеств
                          fs.writeFileSync(
                            "./public/views/elements/filmInfo/quality.ejs",
                            arrQualitiesHtml.join("").toString()
                          );
                          res.render("qualityPage.ejs"); // рендер страницы с качествами
                        }
                      }
                    }
                    qualityArr.forEach((elem, i) => {
                      //перебор массива качеств и создание страницы для каждой
                      model.createPlayerPage(
                        app,
                        season,
                        episode,
                        videosData,
                        i,
                        indexFilm,
                        elem,
                        kinopoisk_id
                      );
                    });
                    json2array();
                  } catch (error) {
                    console.error("getQualitiesFetchError", error); // обработка ошибки
                    res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
                  }
                });
            })
            .catch(function (error) {});
        } catch (error) {
          console.error(
            "getQualitiesAppError",
            error,
            `запрос:${jsonResponse}`
          ); // обработка ошибки
          res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
        }
      } catch (error) {
        console.error("getQualitiesFetchError", error); // обработка ошибки
        res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
      }
    });
  },
  // создание страницы с фильмами по названию, которое ввел в поиске
  createSearchItems: (inputText, res) => {
    return new Promise(function (resolve, reject) {
      // запрос на поиск фильмов
      const searchRequestModel = require("../requests/search/searchRequest");
      searchRequestModel(inputText, res).then((elem) => {
        resolve(elem);
      });
    });
  },
  // метод создания страницы с плеером
  createPlayerPage: (
    app,
    season,
    episode,
    elem,
    indexQulity,
    indexFilm,
    quality,
    kp_id
  ) => {
    app.get(
      "/player" +
        kp_id +
        indexQulity +
        `&season=${season ? season : "none"}&episode=${
          season ? episode : "none"
        }&quality=${quality}`,
      (req, res) => {
        // проверка на сезон
        if (season === undefined) {
          const videoPlaylist = elem;

          const video = videoPlaylist[`${quality}`]; // получаю качество видео, которое выбрал пользователь
          console.log("videoURL", video);
          res.render("playerPage.ejs", {
            playerUrl: video,
            backUrl: "/filmInfo" + elem.kinopoisk_id + indexFilm,
          }); // Отправка ответа в виде HTML
        } else {
          const videoPlaylist = elem;
          const video = videoPlaylist[`${quality}`];
          console.log("episodeObj", video);

          res.render("playerPage.ejs", {
            playerUrl: video,
            backUrl: "/filmInfo" + elem.kinopoisk_id + indexFilm,
          }); // Отправка ответа в виде HTML
        }
      }
    );
  },
};