require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APISERIALS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=serial&page=1`;

// функция для задержки
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

module.exports = new Promise(function(resolve, reject){
   try {
      // Timeout для базона
      setTimeout(() => {
      sleeper(800)
      fetch(APISERIALS_URL).then((response) => {
    return response.json()
}).then(data =>  {
   const filmDataId = data.results.map((film, i) => ({id: film.kinopoisk_id, index: i}))
   const itemInfo = data.results.map((elem, index) => {
       return (
        `
         <div id='navbar'>
            <div class="navbar_wrap">
                <div class="posterImg" style="background-image: url('${elem.info.poster}');background-repeat: no-repeat; background-size: 100% 100%;" alt="posterimg"></div>
                <h2>${elem.info.rus}</h2>
                <p>Год:${elem.info.year}</p>
                <p>Жанр:${elem.info.genre}</p>
                <p>Режиссер:${elem.info.director}</p>
            </div>
        </div>
        <div class="poster_playerBlock">
            <div class="posterScreenshot" style="background-image: url('${elem.info.screenshot}');background-repeat: no-repeat; background-size: 100% 100%;">
            </div>
            <p>${elem.info.description.replace(/[\n\r]+/g, "").replace(/('|")/g, ``).substring(0,350) + '...'}</p>
        </div>
        <script type="text/javascript">
            var _playerBtn${elem.kinopoisk_id + index} = document.getElementById("playerRedirectBtn${index}")
            _playerBtn${elem.kinopoisk_id + index}.addEventListener("click", function (event) {document.location.href = "/player"; $$nav.off()});
        </script>
        `
       )
    })
   // из полученных данных создаю массив с html блоками
    const item = data.results.map((elem, index) => {
       return (
        `
        <div class="item serialItem nav-item" data-nav_ud="#cartoon0,0,none,0">
        <div class="filmsItemBg" id="serial${index}" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;background-size: 100% 100%;" >
        </div>
         <div class="text filmsItemText">
        <h1>${elem.info.rus.substring(0,33)}</h1>
        <h1>(${elem.info.year})</h1>
        </div>
        </div>
        <script type="text/javascript">
            var _elem${elem.kinopoisk_id + index} = document.getElementById("serial${index}")
            _elem${elem.kinopoisk_id + index}.addEventListener("click", function (event) {document.location.href = "/filmInfo${elem.kinopoisk_id}"; $$nav.off()});
        </script>
        `
       )
    })
    resolve([item, itemInfo, filmDataId])
   }, 1100)
})
   } catch (error) {
        console.log('fetchErrorSerial', error) // обработка ошибки
   }
});

