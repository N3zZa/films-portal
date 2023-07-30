(function () {
  "use strict";


  window.App = {
    currentScene: null,
    scenes: {},
    isShown: true,

    initialize: function () {
      this.$wrap = $('.wrap');
      var _inited;


      this.scenes.video = {
    init: function () {
      var playerUrl = document.getElementById("wrap").getAttribute('data-url');
          console.log('playerUrl',playerUrl);
           if (playerUrl === '') {
            document.getElementById('no-episodes_text').innerText = 'Нет эпизодов с данной озвучкой'
            console.log('Нет эпизодов')
        } else {
            Player.play({
                url: playerUrl,
                type: "hls"
            });
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
      $(document.body).on({
        // on keyboard 'd' by default
        'nav_key:blue': _.bind(this.toggleView, this),

        // remote events
        'nav_key:stop': function () {
          Player.stop();
        },
        'nav_key:pause': function () {
          Player.togglePause();
        },
        'nav_key:exit': function(){
          SB.exit();
        }
      });

      // toggling background when player start/stop
      Player.on('ready', function () {
        $$log('player ready');
      });
      Player.on('stop', function () {
        $$log('player stop');
      });


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