require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require("axios");
const API_TOKEN = process.env.ALLOHA_TOKEN;

const APISEARCH_URL = `https://api.apbugall.org/?token=${API_TOKEN}&list&poster=1&description=1&rating_kp=1&name=`;

// функция для задержки
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}


module.exports = function (inputText, res) {
  return new Promise(function(resolve, reject){
   try {
    const url = APISEARCH_URL + inputText;
    // Timeout для базона
     setTimeout(() => {
     sleeper(2000)
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const responseData = data.data
          if (responseData) {
            // просто сохраняю в переменную массив с данными о фильмах
            const filmDataId = responseData.map((film, i) => ({
              id: film.id_kp,
              index: i,
              seasons: film.seasons ? film.seasons : false,
              isSerial: film.seasons ? true : false,
              seasonsCount: film.seasonsCount ? film.seasonsCount : false,
            }));
            // массив с html блоками для информации о фильме
            const itemInfo = responseData.map((elem, index) => {
              console.log(elem.id_kp)
              return `
         <div>
            <div id='navbar'>
            <div class="navbar_wrap">
                <div class="posterImg" style="background-image: url('http://st.kp.yandex.net/images/film_iphone/iphone360_${
                  elem.id_kp
                }.jpg');background-repeat: no-repeat; background-size: 100% 100%;" alt="posterimg"></div>
                <h2>${elem.name}</h2>
                <p>Год:${elem.year}</p>
                <p>Жанр:${elem.genre}</p>
            </div>
        </div>
        <div class="poster_playerBlock">
            <div class="posterScreenshot" style="background: rgb(34, 34, 34);background-repeat: no-repeat; background-size: 100% 100%;">
            <div class="playImgBlock">
            <img src="/img/playImg.svg" alt="playImg" />
            </div>
            </div>
            <p>${
              elem.description
                .replace(/[\n\r]+/g, "")
                .replace(/('|")/g, ``)
                .substring(0, 350) + "..."
            } </p>
        </div>
         <script type="text/javascript">
        $(document).keydown(function (e) {
             if (e.keyCode === 13) {
                   if (isPlaylistShow === false) {
                $('#playlistSeasons').show()
                $$nav.on("#listseasons")
                isPlaylistShow = true;
                 ${
                   elem.last_season
                     ? ""
                     : 'document.location.href = "/selectTranslation' +
                       filmDataId[index].id.toString().toString() +
                       index +
                       '"'
                 };
            } 
          }
          if (e.keyCode === 8) {
            document.location.href = '/search'
          }
         })
        </script>
         </div>
        `;
            });
            // из полученных данных создаю массив с html блоками
            const item = responseData.map((elem, index) => {
              return `
        <div id="searchItem${index}" style="background: url('http://st.kp.yandex.net/images/film_iphone/iphone360_${
                elem.id_kp
              }.jpg'); background-repeat:no-repeat;  background-size:cover;" class="item searchItem nav-item">
            <div class="searchText text">
            <p>${elem.name.substring(0, 20)}</p>
            <h1>${elem.year} ${elem.last_season ? "Сериал" : "Фильм"}</h1>
            </div>
        </div>
        <script type="text/javascript">
            var _elem${
              filmDataId[index].id.toString() + index
            } = document.getElementById("searchItem${index}")
            _elem${
              filmDataId[index].id.toString() + index
            }.addEventListener("click", function (event) {document.location.href = "/filmInfo${
                filmDataId[index].id.toString() + index
              }"; $$nav.off()});
        </script>
        `;
            });
            resolve([item, itemInfo, filmDataId]); // отдаю массив с подмассивами
          } else {
            res.render("errorPage.ejs", { errorMessage: "Ничего не найдено" });
          }
        }, 1500);
})
   } catch (error) {
        console.log('fetchErrorSearch', error) // обработка ошибки
    }
});
}

