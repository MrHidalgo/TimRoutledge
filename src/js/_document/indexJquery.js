

/**
 * @description Document DOM ready.
 */
$(document).ready((ev) => {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  const _document = $(document),
    _window = $(window);


	/*
	* =============================================
	* CALLBACK :: start
	* ============================================= */
  const initVideo = () => {
    const vid = document.getElementById("video");

    if (vid) {
      $('[play-video-js]').on('click', (ev) => {
        const elem = $(ev.currentTarget);

        if (!vid.paused) {
          vid.pause();
        } else {
          vid.play();
          elem.fadeOut(300);
        }
      });

      $(vid).on('click', () => {
        if (!vid.paused) {
          vid.pause();
          $('[play-video-js]').fadeIn(300);
        }
      });
    }
  };
	/*
	* CALLBACK :: end
	* ============================================= */



  /**
   * @description Init all method
   */
  const initJquery = () => {
    // default
    initPreventBehavior();
		// ==========================================

    // lib
    initHamburger();
		// ==========================================

    // callback
    initVideo();
		// ==========================================
  };
  initJquery();
});

