/* const APIANIME_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=all&page=1&cat=аниме`;
const APICOMPILATIONS_URL = `https://bazon.cc/api/json?token=${API_TOKEN}&type=all&page=1`;

const APISEARCH_URL = `https://bazon.cc/api/search?token=${API_TOKEN}&title=`;
 */

module.exports = {
    getPremieres: new Promise(function(resolve, reject){
        require('../requests/premiereRequest').then((elem) => {
            resolve(elem)
        })
    }),
    getFilms: new Promise(function(resolve, reject){
        setTimeout(() => {
            require('../requests/filmRequest').then((elem) => {
            resolve(elem)
        })
        }, 500)
    }),
    getSerials: new Promise(function(resolve, reject){
       setTimeout(() => {
            require('../requests/serialRequest').then((elem) => {
            resolve(elem)
        })
       }, 1000)
    }),
    getCartoons: new Promise(function(resolve, reject){
        setTimeout(() => {
         require('../requests/cartoonsRequest').then((elem) => {
            resolve(elem)
        })
        }, 1500)
    }),
    getChannels: new Promise(function(resolve, reject){
        setTimeout(() => {
         require('../requests/channels').then((elem) => {
            resolve(elem)
        })
        }, 1500)
    })
}