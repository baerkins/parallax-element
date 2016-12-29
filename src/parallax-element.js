/*!
 * parallax-element.js
 * jQuery plugin to add parallax effect to individual elements
 * @author  Shaun M. Baer
 * @url     https://github.com/iamhexcoder/parallax-element
 * @license MIT
 */
(function( $, window, document, undefined ) { $.fn.parallaxElement = function(options) {

  /*! requestAnimationFrame Polyfill via Paul Irish: https://gist.github.com/paulirish/1579671 */
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame  = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame   = window[vendors[x]+'CancelAnimationFrame'] ||
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                 timeToCall);
        lastTime = currTime + timeToCall;

        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }

  }());
  /*! end requestAnimationFrame Polyfill */

  // Set default Options
  var defaults = {

    defaultSpeed:  0.2,   // Integer - Default speed if `data-speed` is not present
    useOffset:     true,  // Boolean - Whether or not to start animations below bottom of viewport
    defaultOffset: 200,   // Distance before element appears to start animation
    disableMobile: false, // Boolean - allow function to run on mobile devices
    minWidth:      false  // Integer - minimum width the function should fire

  };

  var opts = $.extend( {}, defaults, options );

  /**
   * Return false on function if is mobile and disableMobile is set to true
   */
  if( opts.disableMobile && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    return false;

  }


  // Window Vars
  var windowYOffset = window.pageYOffset;
  var winHeight     = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  var winWidth      = "innerWidth" in window ? window.innerWidth : document.documentElement.clientWidth;
  var navToggle     = $('#filter-toggle');
  var winBottom     = (windowYOffset + winHeight);
  var body          = document.body;
  var html          = document.documentElement;
  var docHeight     = Math.max( body.scrollHeight, body.offsetHeight,
                      html.clientHeight, html.scrollHeight, html.offsetHeight );




  /**
   * Recalc variables when the window is resized
   *
   */
  $(window).on('resize', function(){
    winHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    winWidth  = window.innerWidth;
    docHeight = Math.max( body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
  });


  /**
   * Run the functions needed to update translate on element
   * @param  {object} el object to run function on.
   *
   */
  function runScrollElement(el) {

    var thisTop = el.offset().top;

    /**
     * If the element is below the viewport, return false, as all others
     * after should be below as well.
     *
     */
    if( opts.useOffset && thisTop - opts.defaultOffset > ( winBottom ) ) {

      return false;

    }


    /**
     * If the element is within the viewport, get the speed and
     * adjust translate relative to top of el.
     *
     * speed variable made opposite of magnitude, so a negative number
     * scrolls _slower_, and a positive number scrolls _faster_.
     *
     * scrollThrough variable moves element relative to page placement
     *
     */
    var speed = el.attr('data-speed') ? ( el.attr('data-speed') * -1 ) : ( opts.defaultSpeed * -1 );
    var val;


    /**
     * Add `start-zero` class to element to have it start at zero
     *
     * Otherwise, adjust the position so when el is in the middle of
     * the viewport, it will be where is should be.
     *
     */
    if(el.hasClass('scroll-start-zero')) {

      val = ( windowYOffset * speed );

    } else {

      val = ( ( windowYOffset - thisTop ) + ( winHeight / 2 ) ) * speed;

    }

    if(val > docHeight) {

      val = docHeight;

    }

    /**
     * Set the CSS Style
     *
     */
    var styleVal = 'translate3d( 0px, ' + val + 'px, 0px)';

    el.css({
      "-webkit-transform": styleVal,
      "-moz-transform": styleVal,
      "-ms-transform": styleVal,
      "-o-transform": styleVal,
      "transform": styleVal
    });

  }


  /**
   * Run the jewels
   *
   */
  var scrollEls = [];

  // Create object with all elements
  this.each( function(i) {

    scrollEls.push( $(this) );

  });

  // Fire event on load
  window.addEventListener("load", function(){

    if ( opts.minWidth && opts.minWidth > winWidth ) {

      $(this).removeAttr('style');

      return false;

    }

    $.each(scrollEls, function(i, el) {

      windowYOffset = window.pageYOffset;
      winBottom     = (windowYOffset + winHeight);

      runScrollElement(el);

    });

  });

  // Fire a single scroll event listener
  return document.addEventListener('scroll', function(){

    if( opts.minWidth && opts.minWidth > winWidth ) {

      $(this).removeAttr('style');

      return false;

    }

    $.each(scrollEls, function(i, el) {

      // Update Vars
      windowYOffset = window.pageYOffset;
      winBottom     = (windowYOffset + winHeight);

      // Run the scroll function when an animation frame is available
      window.requestAnimationFrame( function() {

        runScrollElement(el);

      });

    });

  });

}; }( jQuery, window, document ));