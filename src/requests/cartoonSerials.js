require("dotenv").config(); // Config file
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APICARTOONSERIALS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=serial&page=1&cat=мультфильм&year=${new Date().getFullYear()}`;

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
      sleeper(800);
      fetch(APICARTOONSERIALS_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // просто сохраняю в переменную массив с данными о фильмах
          const filmDataId = data.results.map((film, i) => ({
            id: film.kinopoisk_id,
            index: i,
            episodes: film.episodes,
            isSerial: film.serial,
          }));

          // массив с html блоками для информации о фильме
          const itemInfo = data.results.map((elem, index) => {
            return `
         <div>
         <div id='navbar'>
            <div class="navbar_wrap">
                <div class="posterImg" style="background-image: url('${
                  elem.info.poster
                }');background-repeat: no-repeat; background-size: 100% 100%;" alt="posterimg"></div>
                <h2>${elem.info.rus}</h2>
                <p>Год:${elem.info.year}</p>
                <p>Жанр:${elem.info.genre}</p>
                <img class="logo" src="../../../img/ucontv.png" alt="ucontv" />
            </div>
        </div>
        <div class="poster_playerBlock">
            <div class="posterScreenshot" style="background: rgb(34, 34, 34);background-repeat: no-repeat; background-size: 100% 100%;">
            <div class="playImgBlock">
            <img src="/img/playImg.svg" alt="playImg" />
            </div>
            </div>
            <p>${
              elem.info.description
                .replace(/[\n\r]+/g, "")
                .replace(/('|")/g, ``)
                .substring(0, 350) + "..."
            }</p>
        </div>
        <script type="text/javascript">
         $(document).keydown(function (e) {
            if (e.keyCode === 13) {
                 if (isPlaylistShow === false) {
                $('#playlistSeasons').show()
                $$nav.on("#listseasons")
                isPlaylistShow = true;
            }
            }
         })
        </script>
      </div>
        `;
          });
          // из полученных данных создаю массив с html блоками
          const item = data.results.map((elem, index) => {
            return `
        <div id="cartoonserial${index}" class="item serialItem nav-item">
        <div class="filmsItemBg" style="background: url('${
          elem.info.poster
        }'); background-repeat:no-repeat;  background-size:cover;background-size: 100% 100%;" >
        </div>
         <div class="text filmsItemText">
        <p>${elem.info.rus.substring(0, 20).replace(/('|")/g, ``)}</p>
        <h1>(${elem.info.year})</h1>
        </div>
        </div>
        <script type="text/javascript">
            var _elem${
              elem.kinopoisk_id + index
            } = document.getElementById("cartoonserial${index}")
            _elem${
              elem.kinopoisk_id + index
            }.addEventListener("click", function (event) {document.location.href = "/filmInfo${
              elem.kinopoisk_id + index
            }"; $$nav.off()});
        </script>
        `;
          });
          resolve([item, itemInfo, filmDataId]); // отдаю массив с подмассивами
        }, 1100)
        .catch((error) => {
          console.log(error);
        });
    })
  } catch (error) {
    console.log("fetchErrorSerial", error); // обработка ошибки
  }
});