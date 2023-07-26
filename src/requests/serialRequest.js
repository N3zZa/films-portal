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
   // из полученных данных создаю массив с html блоками
    const item = data.results.map((elem, index) => {
       return (
        `<div id="serial${index}" style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;background-size: 100% 100%;" class="item serialItem nav-item" data-nav_ud="#cartoon0,0,none,0">
            <div class="filmText text">
            <h1>${elem.info.rus}</h1>
            <h1>${elem.info.year} ${elem.serial === '1' ? 'Сериал' : 'Фильм'}</h1>
            </div>
        </div>
        `
       )
    })
    resolve(item)
   }, 1100)
})
   } catch (error) {
        console.log('fetchErrorSerial', error) // обработка ошибки
   }
});

