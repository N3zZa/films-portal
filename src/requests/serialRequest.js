require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.ALLOHA_TOKEN;

const APISERIALS_URL = `https://api.apbugall.org/?token=${API_TOKEN}&list=serial&order=year&poster=1&description=1&rating_kp=1`;

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
      fetch(APISERIALS_URL).then((response) => {
    return response.json()
}).then(data =>  {
   // просто сохраняю в переменную массив с данными о фильмах
   const filmDataId = data.data.map((film, i) => ({
     id: film.id_kp,
     index: i,
     seasons: film.seasons ? film.seasons : false,
     isSerial: film.seasons ? true : false,
     seasonsCount: film.seasonsCount ? film.seasonsCount : false,
   }));

   // массив с html блоками для информации о фильме
   const itemInfo = data.data.map((elem, index) => {
    
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
                <img class="logo" src="../../../img/ucontv.png" alt="ucontv" />
            </div>
        </div>
        <div class="poster_playerBlock">
            <div class="posterScreenshot" style="background: rgb(34, 34, 34);background-repeat: no-repeat; background-size: 100% 100%;">
            <div class="playImgBlock">
            <img src="/img/playImg.svg" alt="playImg" />
            </div>
            <div class="playtext_block">
                <p>Нажмите "ОК" для воспроизведения</p>
            </div>
            </div>
            <p className="descripText">${
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
            }
            }
         })
        </script>
      </div>
        `;
   });
   // из полученных данных создаю массив с html блоками
    const item = data.data.map((elem, index) => {
      return `
        <div id="serial${index}" class="item serialItem nav-item">
        <div class="filmsItemBg" style="background: url('http://st.kp.yandex.net/images/film_iphone/iphone360_${elem.id_kp}.jpg'); background-repeat:no-repeat;  background-size:cover;background-size: 100% 100%;" >
        </div>
         <div class="text filmsItemText">
        <p>${elem.name.substring(0, 20).replace(/('|")/g, ``)}</p>
        <h1>(${elem.year})</h1>
        </div>
        </div>
        <script type="text/javascript">
            var _elem${
              elem.id_kp.toString() + index
            } = document.getElementById("serial${index}")
            _elem${
              elem.id_kp.toString() + index
            }.addEventListener("click", function (event) {document.location.href = "/filmInfo${
        elem.id_kp.toString() + index
      }"; $$nav.off()});
        </script>
        `;
    });
    resolve([item, itemInfo, filmDataId]) // отдаю массив с подмассивами
   }, 0)
})
   } catch (error) {
        console.log('fetchErrorSerial', error) // обработка ошибки
   }
});

