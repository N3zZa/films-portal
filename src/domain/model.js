// импортирую запросы фильмов
const fetchDataPremieres = require('../requests/premiereRequest')
const fetchDataCartoons = require('../requests/cartoonsRequest')
const fetchDataFilms = require('../requests/filmRequest')
const fetchDataSerials = require('../requests/serialRequest')
/* const APIANIME_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=all&page=1&cat=аниме`;
const APICOMPILATIONS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=all&page=1`;

const APISEARCH_URL = `https://bazon.cc/api/search?token=${API_TOKEN}&title=`;
 */
module.exports = {
    getPremieres: new Promise(function(resolve, reject){
        fetchDataPremieres.then((elem) => {
            resolve(elem)
        })
    }),
    getFilms: new Promise(function(resolve, reject){
            fetchDataFilms.then((elem) => {
            resolve(elem)
        })
    }),
    getSerials: new Promise(function(resolve, reject){
            fetchDataSerials.then((elem) => {
            resolve(elem)
        })
    }),
    getCartoons: new Promise(function(resolve, reject){
         fetchDataCartoons.then((elem) => {
            resolve(elem)
        })
    })
}