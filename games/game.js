    document.addEventListener('DOMContentLoaded', function() {
      const fullscreenButton = document.getElementById('fullscreenButton');
      const gameIframe = document.getElementById('gameIframe');
      const topnav = document.querySelector('.topnav');
      const sidebar = document.getElementById('sidebar');
      const rightAd = document.getElementById('right-ad-placeholder');
      const infoAndMoreGames = document.querySelector('.info-and-more-games-container');
      const bottomAd = document.getElementById('bottom-ad-placeholder');

      function toggleFullscreen() {
        if (!document.fullscreenElement) {
          if (gameIframe.requestFullscreen) {
            gameIframe.requestFullscreen();
          } else if (gameIframe.mozRequestFullScreen) {
            gameIframe.mozRequestFullScreen();
          } else if (gameIframe.webkitRequestFullscreen) {
            gameIframe.webkitRequestFullscreen();
          } else if (gameIframe.msRequestFullscreen) {
            gameIframe.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }

      function onFullscreenChange() {
        if (document.fullscreenElement) {
          fullscreenButton.innerHTML = '&#x2923; Exit Fullscreen';
          topnav.classList.add('hide-on-fullscreen');
          sidebar.classList.add('hide-on-fullscreen');
          rightAd.classList.add('hide-on-fullscreen');
          infoAndMoreGames.classList.add('hide-on-fullscreen');
          bottomAd.classList.add('hide-on-fullscreen');
        } else {
          fullscreenButton.innerHTML = '&#x2922; Fullscreen';
          topnav.classList.remove('hide-on-fullscreen');
          sidebar.classList.remove('hide-on-fullscreen');
          rightAd.classList.remove('hide-on-fullscreen');
          infoAndMoreGames.classList.remove('hide-on-fullscreen');
          bottomAd.classList.remove('hide-on-fullscreen');
        }
      }

      fullscreenButton.addEventListener('click', toggleFullscreen);

      document.addEventListener('fullscreenchange', onFullscreenChange);
      document.addEventListener('mozfullscreenchange', onFullscreenChange);
      document.addEventListener('webkitfullscreenchange', onFullscreenChange);
      document.addEventListener('msfullscreenchange', onFullscreenChange);

      window.toggleSidebar = function() {
        sidebar.classList.toggle('open');
      };

      document.addEventListener('click', function(event) {
          if (sidebar.classList.contains('open') &&
              !sidebar.contains(event.target) &&
              !event.target.classList.contains('hamburger') &&
              !event.target.closest('.hamburger')) {
              sidebar.classList.remove('open');
          }
      });

      function adjustMainContentMargin() {
          const rootStyles = getComputedStyle(document.documentElement);
          const topnavHeight = rootStyles.getPropertyValue('--topnav-height');

          if (window.innerWidth > 900) {
              document.querySelector('.main-content').style.marginLeft = '200px';
              document.querySelector('.main-content').style.marginRight = '200px';
              document.body.style.paddingTop = topnavHeight;
              sidebar.style.left = '0';
              sidebar.classList.remove('open');
              sidebar.style.transform = 'translateX(0)';

              rightAd.style.display = 'flex';
          } else {
              document.querySelector('.main-content').style.marginLeft = '0';
              document.querySelector('.main-content').style.marginRight = '0';
              document.body.style.paddingTop = topnavHeight;
              sidebar.style.left = '-250px';

              rightAd.style.display = 'none';
          }
      }

      window.addEventListener('resize', adjustMainContentMargin);
      adjustMainContentMargin();
    });
  