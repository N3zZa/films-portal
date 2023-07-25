require("dotenv").config(); // Config file

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_TOKEN = process.env.BAZON_TOKEN;

const APIFILMS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=film&page=1&year=${new Date().getFullYear()}`;

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}


module.exports = new Promise(function(resolve, reject){
   try {
   // Timeout для базона
   setTimeout(() => {
      sleeper(1100)
      fetch(APIFILMS_URL).then((response) => {
         console.log('films',response)
    return response.json()
}).then(data =>  {
   // из полученных данных создаю массив с html блоками
    const item = data.results.map((elem) => {
       return (
        `<div style="background: url('${elem.info.poster}'); background-repeat:no-repeat;  background-size:cover;" class="premieresItem nav-item">
            <div class="filmText">
            <h1>${elem.info.rus}</h1>
            <h1>${elem.info.year} ${elem.serial === '1' ? 'Сериал' : 'Фильм'}</h1>
            </div>
        </div>
        `
       )
    })
    console.log('FILMS',item)
    resolve(item)
   }, 500)
})
   } catch (error) {
    console.log('fetchErrorFilms', error)
   }
});

