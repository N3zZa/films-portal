require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APISERIALS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=serial&page=1`;


module.exports = new Promise(function(resolve, reject){
   try {
   setTimeout(() => {
      fetch(APISERIALS_URL).then((response) => {
    return response.json()
}).then(data =>  {
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
    console.log('SERIALS',item)
    resolve(item)
   }, 700)
})
   } catch (error) {
        console.log('fetchErrorSerial', error)
   }
});

