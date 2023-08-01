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
          console.log('playerUrl',playerUrl);
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
      var backUrl = document.getElementById("wrap").getAttribute('data-backUrl');
      $$log('backUrl', backUrl)
     $(document).keydown(function(e){

			var key = config.app.keys[config.app.mode][e.keyCode];

			switch(key){
				case'left':
          var mbStatusDuration = mb.get('player:media.duration')
          $$log('duration', mbStatusDuration)
          var mbStatus = mb.get('player:state');
          $$log('state',mbStatus);
           if (mbStatusDuration > 5) {
            mb.send('player.seek', {delta:mbStatusDuration - 5})
          }
				break;
				case'right':
        var mbStatusDuration = mb.get('player:media.duration')
          $$log('duration', mbStatusDuration)
          var mbStatus = mb.get('player:state');
          $$log('state',mbStatus);
          mb.send('player.seek', {delta:mbStatusDuration + 5})
				break;
				case'ok':
            mb.send('player.pause')
				break;
				case 'mute':
          var muteStatus = mb.get('player:mute');
          $$log('mutestatus',muteStatus)
          if (muteStatus === false) {
            mb.send('player.mute')
          }
					break;
				case 'volup':
          mb.send('player.volume_up')
				break;	
				case 'voldown':
          mb.send('player.volume_down')
				break;	
				case 'back':
          mb.send('player.stop');
          window.location = backUrl;
				break;	
			}

		});
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