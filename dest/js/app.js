"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - webFontLoader.js;
* - preventBehavior.js;
* - svg4everybody.js;
*
* ============================
* ============================
* */

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

  var btn = document.querySelector("[hamburger-js]"),
      hideScrollContainer = document.querySelectorAll("html, body"),
      mobileContainer = document.querySelector("[mobile-block-js]");

  /**
    * @description
   */
  if (btn) {
    btn.addEventListener("click", function (ev) {
      var elem = ev.currentTarget;

      elem.classList.toggle("is-active");
      elem.querySelector('.hamburger').classList.toggle('is-active');
      mobileContainer.classList.toggle("is-open");

      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });
    });
  }
};

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

  var link = document.querySelectorAll("a");

  link.forEach(function (val, idx) {

    val.addEventListener("click", function (e) {
      if (val.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};

/**
 * @name initStellar
 * @description Stellar.js is a jQuery plugin that provides parallax scrolling effects to any scrolling element.
 *
 * Parallax Elements
 * - data-stellar-ratio="1"
 *
 * Parallax Backgrounds
 * - data-stellar-background-ratio="1"
 */
var initStellar = function initStellar() {
  if ($("[parallax-js]").length) {
    $(function () {
      $.stellar({
        // Set scrolling to be in either one or both directions
        horizontalScrolling: false,
        verticalScrolling: true,

        // Set the global alignment offsets
        horizontalOffset: 0,
        verticalOffset: 0,

        // Refreshes parallax content on window load and resize
        responsive: false,

        // Select which property is used to calculate scroll.
        // Choose 'scroll', 'position', 'margin' or 'transform',
        // or write your own 'scrollProperty' plugin.
        scrollProperty: 'scroll',

        // Select which property is used to position elements.
        // Choose between 'position' or 'transform',
        // or write your own 'positionProperty' plugin.
        positionProperty: 'transform',

        // Enable or disable the two types of parallax
        parallaxBackgrounds: true,
        parallaxElements: true,

        // Hide parallax elements that move outside the viewport
        hideDistantElements: false,

        // Customise how elements are shown and hidden
        hideElement: function hideElement($elem) {
          $elem.hide();
        },
        showElement: function showElement($elem) {
          $elem.show();
        }
      });
    });
  }
};

/**
 * @description Document DOM ready.
 */
$(document).ready(function (ev) {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  var _document = $(document),
      _window = $(window);

  /*
  * =============================================
  * CALLBACK :: start
  * ============================================= */
  var initVideo = function initVideo() {
    var vid = document.getElementById("video");

    if (vid) {
      $('[play-video-js]').on('click', function (ev) {
        var elem = $(ev.currentTarget),
            _vid = elem.prev('#video')[0];

        if (!_vid.paused) {
          _vid.pause();
        } else {
          _vid.play();
          elem.fadeOut(300);
        }
      });

      $(vid).on('click', function (ev) {
        if (!$(ev.currentTarget)[0].paused) {
          $(ev.currentTarget)[0].pause();
          $(ev.currentTarget).siblings('[play-video-js]').fadeIn(300).css({ 'display': 'flex' });
        }
      });
    }
  };

  var initMainAnimation = function initMainAnimation() {
    var tl = new TimelineMax();

    var _winW = $(window).width(),
        _winH = $(window).height();

    var _header = $('header'),
        _mainOverlay = $('[main-overlay-js]'),
        _mainBoxWrapper = $('[main-boxWrapper-js]'),
        _mainTitle = $('[main-title-js]'),
        _mainTitleLine = $('[main-title-line-js]'),
        _mainTitleText = $('[main-title-text-js] span');

    if (_winW > 767) {
      tl.set(_header, {
        transformOrigin: 'center',
        top: 0,
        left: -100
      });
    } else {
      tl.set(_header, {
        transformOrigin: 'center',
        left: 0,
        top: -100
      });
    }

    tl.set(_mainBoxWrapper, {
      transformOrigin: 'center',
      bottom: -100
    });

    var _titleLineWidth = 0,
        _titleOffsetY = 0;

    if (_winW > 1023) {
      _titleLineWidth = 80;
    } else {
      _titleLineWidth = 50;
    }

    if (_winW > 1279 && _winH > 767) {
      _titleOffsetY = '110%';
    } else if (_winW > 1023 && _winH > 767) {
      _titleOffsetY = '100%';
    } else if (_winW < 375 && _winH < 569) {
      _titleOffsetY = '42%';
    } else if (_winW < 424 && _winH < 668) {
      _titleOffsetY = '60%';
    } else {
      _titleOffsetY = '75%';
    }

    tl.to(_header, 0.5, { opacity: 1, left: 0, top: 0, ease: Power1.easeInOut }).to(_mainBoxWrapper, 0.5, { opacity: 1, bottom: 0, ease: Power1.easeInOut }, '-=0.2').to(_mainTitleLine, 0.35, { opacity: 1, width: _titleLineWidth, ease: Power1.easeInOut }).staggerTo(_mainTitleText, 0.75, { opacity: 1, ease: Power1.easeInOut }, 0.035).to(_mainTitle, 0.5, { scale: 0.55, y: _titleOffsetY, transformOrigin: 'left', ease: Power1.easeInOut }).to(_mainOverlay, 0.5, { opacity: 0, ease: Power1.easeInOut }, '-=0.5');
  };
  /*
  * CALLBACK :: end
  * ============================================= */

  /**
   * @description Init all method
   */
  var initJquery = function initJquery() {
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