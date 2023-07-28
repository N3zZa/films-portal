require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APICARTOONS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=film&page=1&cat=мультфильм`;

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
     sleeper(2000)
      fetch(APICARTOONS_URL).then((response) => {
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
        `
        <div id="cartoon${index}" class="cartoonsItem item nav-item" data-nav_ud="#channelBtn_inner,0,#serial0,0">
          <div class="filmsItemBg" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;background-size: 100% 100%;" >
        </div>
         <div class="text filmsItemText">
        <h1>${elem.info.rus.substring(0,33)}</h1>
        <h1>(${elem.info.year})</h1>
        </div>
        </div>
        <script type="text/javascript">
            var _elem${elem.kinopoisk_id + index} = document.getElementById("cartoon${index}")
            _elem${elem.kinopoisk_id + index}.addEventListener("click", function (event) {document.location.href = "/filmInfo${elem.kinopoisk_id + index}"; $$nav.off()});
        </script>
        `
       )
    })
    resolve([item, itemInfo, filmDataId])
   }, 1500)
})
   } catch (error) {
        console.log('fetchErrorCartoons', error) // обработка ошибки
    }
});

