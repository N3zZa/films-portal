require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APIPREMIERES_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=all&page=1&year=${new Date().getFullYear()}`;

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
      sleeper(1500)
      fetch(APIPREMIERES_URL).then((response) => {
    return response.json()
}).then(data =>  {
   
   const filmDataId = data.results.map((film, i) => ({id: film.kinopoisk_id, index: i, episodes: film.episodes, isSerial: film.serial}))
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
         ${elem.serial === '1' ? '' : '<script type="text/javascript">$(document).keydown(function (e) {switch (e.key) {case "ArrowUp":document.location.href = "/selectTranslation' + elem.kinopoisk_id + index + '";break;}})</script>'}
        `
       )
    })
    // из полученных данных создаю массив с html блоками
    const item = data.results.map((elem, index) => {
       return (
        `<div id="premiere${index}" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;" class="item premieresItem nav-item" data-nav_ud="0,0,#film0,0">
            <div class="premieresText text">
            <h1>${elem.info.rus}</h1>
            <h1>${elem.info.year} ${elem.serial === '1' ? 'Сериал' : 'Фильм'}</h1>
            </div>
        </div>
        <script type="text/javascript">
            var _elem${elem.kinopoisk_id + index} = document.getElementById("premiere${index}")
            _elem${elem.kinopoisk_id + index}.addEventListener("click", function (event) {document.location.href = "/filmInfo${elem.kinopoisk_id  + index}"; $$nav.off()});
        </script>
        `
       )
    })
    resolve([item, itemInfo, filmDataId])
   }, 1200)
})
   } catch (error) {
    console.log('fetcherrorPremiere', error) // обработка ошибки
   }
});

