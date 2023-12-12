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
      model.createPlayerPage(app, _, _, item, _, index, _, item.id);
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
        app.get("/selectEpisode&" + kinopoisk_id.toString() + index, (req, res) => {
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
                            window.location = '/player${
                              kinopoisk_id.toString() +
                              index.toString() +
                              "&season=" +
                              elem.season_num +
                              "&episode=" +
                              elem.num.substring(1, 3)
                            }'
                            $('.waitingPopup').show();
                        })
                     </script>
                    `;

            seasonsArr.push(arrElem);
            model.createPlayerPage(
              app,
              elem.season_num,
              elem.num,
              _,
              index,
              kinopoisk_id
            );
          });
          arrhtml;

          fs.writeFileSync(
            "./public/views/elements/filmInfo/seasons&translations.ejs",
            seasonsArr.join("").toString()
          ); // создаю html элемент с сезонами либо озвучками
          seasonsArr.length = 0; // обнуляю массив
          res.render("season.ejs", {
            backUrl: `/filmInfo${kinopoisk_id.toString() + index.toString()}`,
          });
        });
       
      } else {
        fs.writeFileSync(
          "./public/views/elements/filmInfo/seasons&translations.ejs",
          ""
        ); // создаю пустой htmlэлемент
        model.createPlayerPage(app, _, _, _, index, kinopoisk_id); 
      }
    } catch (error) {
      console.error("episodesError", { error }); // обработка ошибки
    }
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
    indexFilm,
    kp_id,
  ) => {
     if (elem !== undefined) {
          app.get("/playerFullHd" + kp_id, (req, res) => {
            const videoPlaylist = elem;
            const video = videoPlaylist.videoUrl;
            console.log("episodeObj", video);

            res.render("playerPage.ejs", {
              playerUrl: video,
              backUrl: "/filmInfo" + elem.id + indexFilm,
            }); // Отправка ответа в виде HTML
          });
      
     } else {
      try {
        app.get(
          "/player" +
            kp_id.toString() +
            indexFilm.toString() +
            `&season=${season ? season : "none"}&episode=${
              season ? episode.substring(1,3) : "none"
            }`,
          (req, res) => {
            console.log(
              "2",
              "/player" +
                kp_id.toString() +
                indexFilm.toString() +
                `&season=${season ? season : "none"}&episode=${
                  season ? episode : "none"
                }`
            );
                try {
                  // запрос на получение видеофайлов
                  fetch(APIVIDEOS_URL + `${kp_id}`, {
                    method: "GET",
                    headers: {
                      "X-API-KEY": API_TOKEN,
                      "Content-Type": "application/json",
                    },
                  })
                    .then((response) => response.json())
                    .then((filmresponse) => {
                      let genre = "";
                      const genresArr = filmresponse.genres.forEach(
                        (genreItem) => {
                          genre += genreItem.genre;
                        }
                      );

                      genresArr;
                      const filmValues = {
                        name: filmresponse.nameRu,
                        year: filmresponse.year.toString(),
                        genre: genre,
                        engname:
                          filmresponse.nameOriginal !== null
                            ? filmresponse.nameOriginal
                            : "",
                        season: season ? season.toString() : "",
                        episode: episode ? episode.substring(1, 3) : "",
                      };

                      axios
                        .post(APIVIDEOS_MP4, filmValues)
                        .then(function (data) {
                          return data;
                        })
                        .then((jsonResponse) => {
                          let videosData = jsonResponse.data.Link.videos;
                          const video = videosData["1080p"]
                            ? videosData["1080p"]
                              ? videosData["720p"]
                              : videosData["720p"]
                            : videosData["360p"];
                          // проверка на сезон
                          if (season === undefined) {
                            console.log("videoURL", video);
                            res.render("playerPage.ejs", {
                              playerUrl: video,
                              backUrl: "/filmInfo" + kp_id + indexFilm,
                            }); // Отправка ответа в виде HTML
                          } else {
                            console.log("episodeObj", video);

                            res.render("playerPage.ejs", {
                              playerUrl: video,
                              backUrl: "/filmInfo" + kp_id + indexFilm,
                            }); // Отправка ответа в виде HTML
                          }
                        })
                        .catch(function (error) {
                          res.render("errorPage.ejs", {
                            errorMessage: "Ошибка",
                          }); // вывод страницы с ошибкой
                        });
                    })
                } catch (error) {
                  res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
                }
           
          }
        );
        
      } catch (error) {
        console.error("FetchError", error); // обработка ошибки
        res.render("errorPage.ejs", { errorMessage: "Ошибка" }); // вывод страницы с ошибкой
      }
     }
  
  },
};