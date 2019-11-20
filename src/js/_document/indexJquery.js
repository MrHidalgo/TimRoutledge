

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
	const initOverlayClick = () => {
	  $('#overlay').on('click', (ev) => {
      $('[hamburger-js]').removeClass("is-active").find('.hamburger').removeClass('is-active');
      $('[mobile-block-js]').removeClass("is-open");
      $('html, body').removeClass("is-hideScroll");
    });
  };

	const initPressESC = () => {
    $(document).on('keyup', (ev) => {
      if($(ev.keyCode === 27)) {
        $('[hamburger-js]').removeClass("is-active").find('.hamburger').removeClass('is-active');
        $('[mobile-block-js]').removeClass("is-open");
        $('html, body').removeClass("is-hideScroll");
      }
    });
  };

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

  const initAutoLoadContent = () => {
    let _count = 0;

    function loadMore() {
      const _tmpl = `
        <div>
          <a class="card flex-row" href="#" title="">
            <div class="card-head"><img class="card-img-top" src="img/img-press-1.jpg" alt=""></div>
            <div class="card-body">
              <div class="card-text d-flex">
                <p class="d-flex align-items-center justify-content-center">CQ</p>
              </div>
              <h5 class="card-title">Meet the man responsible for the flashing Spiceworld globe on stage on the new Spice Girls Tour.</h5><i class="icon-font icon-arrow"></i>
            </div>
          </a>
        </div>
        <div>
          <a class="card card--reverse flex-row-reverse" href="#" title="">
            <div class="card-head"><img class="card-img-top" src="img/img-press-2.jpg" alt=""></div>
            <div class="card-body">
              <div class="card-text d-flex">
                <p class="d-flex align-items-center justify-content-center">Evening Standard</p>
              </div>
              <h5 class="card-title">Meet Tim Routledge, the lighting designer behind Stormzy’s incredible Glastonbury set.</h5><i class="icon-font icon-arrow"></i>
            </div>
          </a>
        </div>
      `;

      if(_count <= 1) {
        $("#loadContent").append(_tmpl);
        _count++;
      } else {
        return false;
      }
    }

    function bindScroll() {
      if(_count <= 1) {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - $('#footer').outerHeight(true) - 200) {
          loadMore();
        }
      } else {
        return false;
      }
    }

    $(window).scroll(bindScroll);
  };

  const initMainAnimation = () => {
    const tl = new TimelineMax();

    const _winW = $(window).width(),
      _winH = $(window).height();

    const _header = $('header'),
      _mainOverlay = $('[main-overlay-js]'),
      _mainBoxWrapper = $('[main-boxWrapper-js]'),
      _mainTitle = $('[main-title-js]'),
      _mainSubtitle = $('[main-subtitle-js]'),
      _mainTitleLine = $('[main-title-line-js]'),
      _mainTitleText1 = $('[main-title-text-1-js] span'),
      _mainTitleText2 = $('[main-title-text-2-js] span');

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

    tl
      .to(_header, 0.5, {opacity:1, left: 0, top: 0, ease: Power1.easeInOut})
      .to(_mainBoxWrapper, 0.5, {opacity:1, bottom: 0, ease: Power1.easeInOut}, '-=0.2')
      .to(_mainTitleLine, 0.35, {opacity: 1, width: _titleLineWidth, ease: Power1.easeInOut})
      .staggerTo(_mainTitleText1, 0.65, {opacity: 1, ease: Power1.easeInOut}, 0.065)
      .staggerTo(_mainTitleText2, 0.65, {opacity: 1, ease: Power1.easeInOut}, 0.065, '+=0.75')
      .to(_mainOverlay, 0.5, {opacity: 0, ease: Power1.easeInOut}, '+=0.15')
      .to(_mainTitle, 0.5, {opacity: 0, ease: Power1.easeInOut}, '-=0.25')
      .to(_mainSubtitle, 0.5, {opacity: 1, ease: Power1.easeInOut}, '-=0.15');
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
    initOverlayClick();
    initPressESC();
    initVideo();
    initAutoLoadContent();
    initMainAnimation();
		// ==========================================
  };
  initJquery();
});

