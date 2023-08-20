const allChannels = (require('./all.json'));
const news = (require('./news.json'));
const filmsSerials = (require('./films.json'));
const sport = (require('./sport.json'));
const music = (require('./music.json'));
const child = (require('./child.json'));
const docum = (require('./documentary.json'));
const inter = (require('./inter.json'));
const fs = require("fs");

const channels = []
 const allChannelsValues = allChannels.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const newsValues = news.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const filmsSerialsValues = filmsSerials.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const sportValues = sport.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const musicValues = music.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const childValues = child.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const documValues = docum.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    const interValues = inter.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
})
module.exports = new Promise(function(resolve, reject){
   try {
   // из полученных данных создаю массив с html блоками
   const channelImages = (imgUrl) => allChannels.map((elem, index) => {
       return (
        `<div style="background: url('/img/channels/${imgUrl}'); background-repeat:no-repeat;  background-size:cover;" id="channel${index + 1}" class="channel nav-item">
            <p class="channelName">${elem.Name}</p>
        </div>
        <script type="text/javascript">
             var _channel${index + 1} = document.getElementById("channel${index + 1}")
            _channel${index + 1}.addEventListener("click", function (event) {document.location.href = "/channels?${index + 1}"; $$nav.off()});
        </script>
        `
       )
    })
    let sendData = {allChannels: allChannelsValues, images: channelImages, news: newsValues, filmsSerials: filmsSerialsValues,sport: sportValues,music: musicValues,child: childValues,docum: documValues,inter: interValues,}
    resolve(sendData)
   } catch (error) {
    console.log('fetchErrorFilms', error) // обработка ошибки
   }
});

