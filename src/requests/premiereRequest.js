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
   // просто сохраняю в переменную массив с данными о фильмах
   const filmDataId = data.results.map((film, i) => ({id: film.kinopoisk_id, index: i, episodes: film.episodes, isSerial: film.serial}))
   // массив с html блоками для информации о фильме
   const itemInfo = data.results.map((elem, index) => {
       return (
        `
         <div>
            <div id='filmInfo'>
            <div class="posterImg"
                style="background-image: url('${elem.info.poster}');background-repeat: no-repeat; background-size: 100% 100%;"
                alt="posterimg"></div> 
            <div class="textinfo">
                <div class="textInfo_inner">
                    <h4 class="actorsText">Актеры:${elem.info.actors.replace(/('|")/g, ``)}</h4>
                    <p>Страна:${elem.info.country}</p>
                    <p>Год:${elem.info.year}</p>
                    <p>Режиссер:${elem.info.director.replace(/('|")/g, ``)}</p>
                </div>
                <h2>${elem.info.rus.replace(/('|")/g, ``)}</h2>
            </div>
        </div>
        <p class="film_descr">${elem.info.description.replace(/[\n\r]+/g, "").replace(/('|")/g, ``).substring(0,350) + '...'}</p>
        <navbar class="filmInfo_navbar">
            <!-- <div class="nav-logo"><img src="" alt=""></div> -->
            <div class="navbar_menu navigation-items">
                <div id="backBtn" class="nav_backbtn nav-item">
                    <img width="40" height="40" src="/img/arrowback.svg" alt="arrowback">
                    <h1>Назад</h1>
                </div>
                <div id="watchBtn" class="nav_watchbtn nav-item">
                    <h1>Смотреть</h1>
                </div>
            </div>
        </navbar>
         <script type="text/javascript">
          $('#backBtn').click(function() {
            document.location.href = "/";
        })
        $('#watchBtn').click(function() {
             if (isPlaylistShow === false) {
                $('#playlistSeasons').show()
                $$nav.on("#listseasons")
                isPlaylistShow = true;
                ${elem.serial === '1' ? '' : 'document.location.href = "/selectTranslation' + elem.kinopoisk_id + index + '"'};
            }
        })
        </script>
         </div>
        `
       )
    })
    // из полученных данных создаю массив с html блоками
    const item = data.results.map((elem, index) => {
       return (
        `<div id="premiere${index}" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;" class="item premieresItem nav-item"data-nav_ud="0,0,0,0">
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
    resolve([item, itemInfo, filmDataId]) // отдаю массив с подмассивами
   }, 1200)
})
   } catch (error) {
    console.log('fetcherrorPremiere', error) // обработка ошибки
   }
});

