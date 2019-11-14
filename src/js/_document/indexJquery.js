

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
        const elem = $(ev.currentTarget),
          _vid = elem.prev('#video')[0];

        if (!_vid.paused) {
          _vid.pause();
        } else {
          _vid.play();
          elem.fadeOut(300);
        }
      });

      $(vid).on('click', (ev) => {
        if (!$(ev.currentTarget)[0].paused) {
          $(ev.currentTarget)[0].pause();
          $(ev.currentTarget).siblings('[play-video-js]').fadeIn(300).css({'display':'flex'});
        }
      });
    }
  };

  const initMainAnimation = () => {
    const tl = new TimelineMax();

    const _winW = $(window).width(),
      _winH = $(window).height();

    const _header = $('header'),
      _mainOverlay = $('[main-overlay-js]'),
      _mainBoxWrapper = $('[main-boxWrapper-js]'),
      _mainTitle = $('[main-title-js]'),
      _mainTitleLine = $('[main-title-line-js]'),
      _mainTitleText = $('[main-title-text-js] span');

    if(_winW > 767) {
      tl.set(
        _header, {
          transformOrigin: 'center',
          top: 0,
          left: -100
        }
      );
    } else {
      tl.set(
        _header, {
          transformOrigin: 'center',
          left: 0,
          top: -100
        }
      );
    }

    tl.set(
      _mainBoxWrapper, {
        transformOrigin: 'center',
        bottom: -100
      }
    );


    let _titleLineWidth = 0,
      _titleOffsetY = 0;

    if(_winW > 1023) {
      _titleLineWidth = 80;
    } else {
      _titleLineWidth = 50
    }

    if(_winW > 1279 && _winH > 767) {
      _titleOffsetY = '110%';
    } else if(_winW > 1023 && _winH > 767) {
      _titleOffsetY = '105%';
    } else if(_winW < 375 && _winH < 569) {
      _titleOffsetY = '42%';
    } else if(_winW < 424 && _winH < 668) {
      _titleOffsetY = '60%';
    } else {
      _titleOffsetY = '75%';
    }

    tl
      .to(_header, 0.5, {opacity:1, left: 0, top: 0, ease: Power1.easeInOut})
      .to(_mainBoxWrapper, 0.5, {opacity:1, bottom: 0, ease: Power1.easeInOut}, '-=0.2')
      .to(_mainTitleLine, 0.35, {opacity: 1, width: _titleLineWidth, ease: Power1.easeInOut})
      .staggerTo(_mainTitleText, 0.75, {opacity: 1, ease: Power1.easeInOut}, 0.035)
      .to(_mainTitle, 0.5, {scale: 0.55, y:_titleOffsetY, transformOrigin: 'left', ease: Power1.easeInOut})
      .to(_mainOverlay, 0.5, {opacity: 0, ease: Power1.easeInOut}, '-=0.5');
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
    initStellar();
		// ==========================================

    // callback
    initVideo();
    initMainAnimation();
		// ==========================================
  };
  initJquery();
});

