require("dotenv").config(); // Config file

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const VIDEOCDN_TOKEN = process.env.VIDEOCDN_TOKEN;

const APIFILMS_URL = `https://videocdn.tv/api/movies?api_token=${VIDEOCDN_TOKEN}&year=${new Date().getFullYear()}`;

// функция для задержки
function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

module.exports = new Promise(function (resolve, reject) {
  try {
    // Timeout для базона
    setTimeout(() => {
      sleeper(1100);
      fetch(APIFILMS_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // просто сохраняю в переменную массив с данными о фильмах
          const filmDataId = data.data.map((film, i) => ({
            id: film.kinopoisk_id,
            index: i,
            episodes: film.episodes,
            isSerial: film.episodes ? "1" : "0",
          }));
          // массив с html блоками для информации о фильме
          const itemInfo = data.data.map((elem, index) => {
            var poster_url = `https://kinopoiskapiunofficial.tech/images/posters/kp/${elem.kinopoisk_id}.jpg`;
            return `
          <div>
            <div id='navbar'>
            <div class="navbar_wrap">
                <div class="posterImg" style="background-image: url('${poster_url}');background-repeat: no-repeat; background-size: 100% 100%;" alt="posterimg"></div>
                <h2>${elem.ru_title}</h2>
                ${
                  elem.released !== null
                    ? `<p>Год:${elem.released.substring(0, 4)}</p>`
                    : ""
                }
                <img class="logo" src="../../../img/ucontv.png" alt="ucontv" />
            </div>
        </div>
        <div class="poster_playerBlock">
            <div class="posterScreenshot" style="background: rgb(34, 34, 34);background-repeat: no-repeat; background-size: 100% 100%;">
            <div class="playImgBlock">
            <img src="/img/playImg.svg" alt="playImg" />
            </div>
            </div>
        </div>
         <script type="text/javascript">
         $(document).keydown(function (e) {
            if (e.keyCode === 13) {
                document.location.href = "/selectQuality&=${
                  elem.kinopoisk_id.toString() + index.toString()
                }";
                $('.waitingPopup').show()
            }
         })
         </script>
         </div>
        `;
          });
          // из полученных данных создаю массив с html блоками
          const item = data.data.map((elem, index) => {
            var poster_url = `https://kinopoiskapiunofficial.tech/images/posters/kp/${elem.kinopoisk_id}.jpg`;
            return `
        <div id="film${index}" class="filmsItem item nav-item">
        <div class="filmsItemBg" style="background: url('${poster_url}'); background-repeat:no-repeat;background-cover: cover;background-size: 100% 100%;" >
        </div>
        <div class="text filmsItemText">
        <p class="filmItemTexth1">${elem.ru_title.substring(0, 20)}</p>
        </div>
        </div>
        <script type="text/javascript">
            var _elem${
              elem.kinopoisk_id + index
            } = document.getElementById("film${index}")
            _elem${
              elem.kinopoisk_id + index
            }.addEventListener("click", function (event) {document.location.href = "/filmInfo${
              elem.kinopoisk_id.toString() + index.toString()
            }"; $$nav.off()});
        </script>
        `;
          });
          resolve([item, itemInfo, filmDataId]); // отдаю массив с подмассивами
        }, 1100)
        .catch((error) => {
          console.log(error);
        });
    });
  } catch (error) {
    console.log("fetchErrorFilms", error); // обработка ошибки
  }
});
