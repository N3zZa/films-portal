require("dotenv").config(); // Config file
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const VIDEOCDN_TOKEN = process.env.VIDEOCDN_TOKEN;

const APISEARCH_URL = `https://videocdn.tv/api/short?api_token=${VIDEOCDN_TOKEN}&title=`;

// функция для задержки
function sleeper(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

module.exports = function (inputText, res) {
  return new Promise(function (resolve, reject) {
    try {
      // Timeout для базона
      setTimeout(() => {
        sleeper(500);
        fetch(APISEARCH_URL + inputText)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.data) {
              const result = data.data.slice(0, 50);
              // просто сохраняю в переменную массив с данными о фильмах
              const filmDataId = result.map((film, i) => ({
                id: film.kp_id,
                index: i,
                episodes: film.episodes,
                isSerial: film.episodes ? "1" : "0",
              }));
              // массив с html блоками для информации о фильме
              const itemInfo = result.map((elem, index) => {
                console.log(elem)
                var poster_url = `https://kinopoiskapiunofficial.tech/images/posters/kp/${elem.kp_id}.jpg`;
                return `
         <div>
            <div id='navbar'>
            <div class="navbar_wrap">
                <div class="posterImg" style="background-image: url('${poster_url}');background-repeat: no-repeat; background-size: 100% 100%;" alt="posterimg"></div>
                <h2>${elem.title}</h2>
                ${
                  elem.released
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
                $('.waitingPopup').show()

                  if (document.location.href.includes('filmInfo')) {
                  ${
                    elem.episodes
                      ? `document.location.href = "/selectEpisode&${
                          elem.kp_id.toString() + index.toString()
                        }";`
                      : `document.location.href = "/player${
                          elem.kp_id.toString() + index.toString()
                        }&season=none&episode=none";
                    `
                  };
                } else {
                  return false
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
              const item = result.map((elem, index) => {
                var poster_url = `https://kinopoiskapiunofficial.tech/images/posters/kp/${elem.kp_id}.jpg`;
                return `
        <div id="searchItem${index}" style="background: url('${poster_url}'); background-repeat:no-repeat;  background-size:cover;" class="item searchItem nav-item">
            <div class="searchText text">
            <p>${elem.title.substring(0, 20)}</p>
            </div>
        </div>
        <script type="text/javascript">
            var _elem${
              elem.kp_id + index
            } = document.getElementById("searchItem${index}")
            _elem${
              elem.kp_id + index
            }.addEventListener("click", function (event) {document.location.href = "/filmInfo${
                  elem.kp_id.toString() + index.toString()
                }"; $$nav.off()});
        </script>
        `;
              });
              resolve([item, itemInfo, filmDataId]); // отдаю массив с подмассивами
            } else {
              res.render("errorPage.ejs", {
                errorMessage: "Ничего не найдено",
              });
            }
          }, 1500);
      });
    } catch (error) {
      console.log("fetchErrorSearch", error); // обработка ошибки
    }
  });
};
