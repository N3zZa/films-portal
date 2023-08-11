require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APISEARCH_URL = `https://bazon.cc/api/search?token=${API_TOKEN}&title=`;

// функция для задержки
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}


module.exports = function (inputText, res) {
  return new Promise(function(resolve, reject){
   try {
    // Timeout для базона
     setTimeout(() => {
     sleeper(2000)
      fetch(APISEARCH_URL + inputText).then((response) => {
    return response.json()
}).then(data =>  {
  if (data.results) {
    // просто сохраняю в переменную массив с данными о фильмах
  const filmDataId = data.results.map((film, i) => ({id: film.kinopoisk_id, index: i, episodes: film.episodes, isSerial: film.serial}))
  // массив с html блоками для информации о фильме
   const itemInfo = data.results.map((elem, index) => {
       return (
        `
         <div>
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
            <div class="posterScreenshot" style="background: rgb(70, 70, 70);background-repeat: no-repeat; background-size: 100% 100%;">
            <div class="playImgBlock">
            <img src="/img/playImg.svg" alt="playImg" />
            </div>
            </div>
            <p>${elem.info.description.replace(/[\n\r]+/g, "").replace(/('|")/g, ``).substring(0,350) + '...'}</p>
        </div>
         <script type="text/javascript">
        $(document).keydown(function (e) {
            if (e.keyCode === 38) {
                   if (isPlaylistShow === false) {
                $('#playlistSeasons').show()
                $$nav.on("#listseasons")
                isPlaylistShow = true;
                 ${elem.serial === '1' ? '' : 'document.location.href = "/selectTranslation' + elem.kinopoisk_id + index + '"'};
            }
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
        `
        <div id="searchItem${index}" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;" class="item searchItem nav-item">
            <div class="searchText text">
            <h1>${elem.info.rus}</h1>
            <h1>${elem.info.year} ${elem.serial === '1' ? 'Сериал' : 'Фильм'}</h1>
            </div>
        </div>
        <script type="text/javascript">
            var _elem${elem.kinopoisk_id + index} = document.getElementById("searchItem${index}")
            _elem${elem.kinopoisk_id + index}.addEventListener("click", function (event) {document.location.href = "/filmInfo${elem.kinopoisk_id + index}"; $$nav.off()});
        </script>
        `
       )
    })
    resolve([item, itemInfo, filmDataId]) // отдаю массив с подмассивами
  } else {
    res.render('errorPage.ejs', {errorMessage: 'Ничего не найдено'})
  }
   }, 1500)
})
   } catch (error) {
        console.log('fetchErrorSearch', error) // обработка ошибки
    }
});
}

