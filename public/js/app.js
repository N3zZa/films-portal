(function () {
  "use strict";


  window.App = {
    currentScene: null,
    scenes: {},
    isShown: true,

    initialize: function () {
      this.$wrap = $('.wrap');
      var playerUrl = document.getElementById("wrap").getAttribute('data-url');
      var _inited;
      this.scenes.video = {
    init: function () {
           if (playerUrl === '') {
            document.getElementById('no-episodes_text').innerText = 'Нет эпизодов с данной озвучкой'
            console.log('Нет эпизодов')
        } else {
            mb.send('player.enqueue', { url: playerUrl, title: 'Плеер' });
            mb.send('player.play');
            console.log('Плеер запущен')
        }

      _inited = true;
    },

    show: function () {
      if (!_inited) {
        this.init();
      }

    },
      };

      this.setEvents();

      // start navigation
      $$nav.on();
    },

    setEvents: function () {
      this.showContent('video')
    },

    toggleView: function () {
      if (this.isShown) {
        this.$wrap.hide();
      } else {
        this.$wrap.show();
      }
      this.isShown = !this.isShown;
    },
    showContent: function ( scene ) {
      var cur = this.currentScene,
        newScene = this.scenes[scene];

      if ( cur !== newScene ) {
        if ( !newScene ) {
          $$error('Scene ' + scene + ' doesn\'t exist');
        } else {
          if ( cur ) {
            cur.hide();
          }
          newScene.show();
          this.currentScene = newScene;
        }
      }
    }
  };
  
  // main app initialize when smartbox ready
  SB(_.bind(App.initialize, App));
})();