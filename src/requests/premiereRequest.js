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
   // из полученных данных создаю массив с html блоками
    const item = data.results.map((elem, index) => {
       return (
        `<div id="premiere${index}" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;" class="item premieresItem nav-item" data-nav_ud="0,0,#film0,0">
            <div class="premieresText text">
            <h1>${elem.info.rus}</h1>
            <h1>${elem.info.year} ${elem.serial === '1' ? 'Сериал' : 'Фильм'}</h1>
            </div>
        </div>
        `
       )
    })
    resolve(item)
   }, 1200)
})
   } catch (error) {
    console.log('fetcherrorPremiere', error) // обработка ошибки
   }
});

