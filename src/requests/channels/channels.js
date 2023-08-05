const channels = (require('./all.json'));
const fs = require("fs");



module.exports = new Promise(function(resolve, reject){
   try {
   // из полученных данных создаю массив с html блоками
   const channelImages = (imgUrl) => channels.map((elem, index) => {
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
    const channel = channels.map((elem, index) => {
       return (
        `<li href="${elem.Link}" id="channel${index + 1}" class="channel nav-item" data-nav_ud="0,0,0,#arrowBack">
            <p>${index + 1}</p>
            <a>${elem.Name}</a>
        </li>
        `
       )
    })
    resolve([channel, channelImages])
   } catch (error) {
    console.log('fetchErrorFilms', error) // обработка ошибки
   }
});

