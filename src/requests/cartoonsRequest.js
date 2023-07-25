require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.BAZON_TOKEN;

const APICARTOONS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=film&page=1&cat=мультфильм`;


function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}


module.exports = new Promise(function(resolve, reject){
   try {
   setTimeout(() => {
    sleeper(1500)
      fetch(APICARTOONS_URL).then((response) => {
    console.log('CARTOONS',response)
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
    console.log('CARTOONS',item)
    resolve(item)
   }, 100)
})
   } catch (error) {
        console.log('fetchErrorCartoons', error)
    }
});

