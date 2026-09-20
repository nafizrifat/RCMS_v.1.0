/*=========================================================================

Template Name: Flame - Personal Parallax Portfolio Template
Author: PhyDev
Author Link: https://themeforest.net/user/phydev;
Version: 1.0
Design and Developed by: PhyDev

NOTE: This is the main javascript file for the template

=========================================================================*/

$(function(){
"use strict";


  var allWindow = $(window),
      top = allWindow.scrollTop(),
      navBar = $(".nav-wrapper");

/*-----------------------------------------------
      Javascript Function for The loader
-----------------------------------------------*/

    var allWindow = $(window),
        preloader = $('.loader-con');

    allWindow.on("load", function() {
        preloader.fadeOut('slow');
        setTimeout(function() { preloader.css("display","none"); },600);
        allWindow.scrollTop(0);
    });

/*-----------------------------------------------------
  Javascript Function To check Aniamtion support
-------------------------------------------------------*/

    var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) { animation = true; }

    if( animation === false ) {
      for( var i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }

/*------------------------------------------------------------------
Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING
-------------------------------------------------------------------*/

    // Define stikyNav Function
      function stikyNav() {

        top = allWindow.scrollTop();

        if ( top >= 100 ) {
          navBar.addClass("nav-sticky");

        } else {
          navBar.removeClass("nav-sticky");
        }

        // SHow Also Scroll up Button
        if ( top >= 1000 ) {
          $('.scroll-up').addClass("show-up-btn");
        } else {
          $('.scroll-up').removeClass("show-up-btn");
        }
      }


    // Select all links with hashes
      $('a.scroll[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(event) {

          // On-page links
          if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {

            // Figure out element to scroll to
            var target = $(this.hash),
                speed= $(this).data("speed") || 800;
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $('html, body').animate({
                scrollTop: target.offset().top
              }, speed);
            }
          }
        });

      $(".scroll-up").on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 900);
      });

/*---------------------------------------------------------------------
  Javascript Function for Hide Navbar Dropdown After Click On Links
-------------------------------------------------------------------*/

      var navLinks = navBar.find(".navbar-collapse ul li a");

      $.each( navLinks, function( i, val ) {

        var navLink = $(this);

          navLink.on('click', function (e) {
            navBar.find(".navbar-collapse").collapse('hide');
          });

      });

/*--------------------------------------------------------------
Javascript Function For Change active Class on navigation bar
----------------------------------------------------------------*/

      var sections = $('.one-page-section'),
          nav_height = navBar.height();

      // Define ChangeClass Function
      function ChangeClass() {

        top = allWindow.scrollTop();

          $.each(sections, function(i,val) {

            var section = $(this),
                section_top = section.offset().top - nav_height,
                bottom = section_top + section.height();

              if (top >= section_top && top <= bottom) {

                var naItems = navBar.find('ul li a');

                $.each(naItems ,function(i,val) {
                  var item = $(this);
                  item.removeClass("active");
                });

                navBar.find('ul a[href="#' + section.attr('id') + '"]').addClass('active');
              }

          });

      } // End of ChangeClass Function

/*---------------------------------------------------
  Javascript Function FOR PARALLAX EFFECT
---------------------------------------------------*/

      // create variables
      var backgrounds = $('.parallax');

      function parallax() {

        // for each of background parallax element
        $.each( backgrounds, function( i, val ) {

          var backgroundObj = $(this),
            backgroundObjTop = backgroundObj.offset().top,
            backgroundHeight = backgroundObj.height();

          // update positions
          top = allWindow.scrollTop();

            var yPos = ((top - backgroundObjTop))/2;

            if ( yPos <= backgroundHeight + backgroundObjTop ) {
              backgroundObj.css({
                backgroundPosition: '50% ' + yPos + 'px'
              });
            }

        });
      };


/*------------------------------------------
  Javascript for initialize text Typer
--------------------------------------------*/

    // initialize text Typer Only in Modern browsers
    //if (animation) {
    //    
    //  var text = $('#home .typer-title'),
    //      textOne = "I'm UI/UX Designer",
    //      textTwo = "Let's Work Together",
    //      textThree = "I Can Create Awesome Stuff";

    //      if (!!$.prototype.typer) {
    //        text.typer([textOne,textTwo,textThree]);
    //      }
    //}

/*-----------------------------------------------------------------
  Javascript Function for Count To
------------------------------------------------------------------*/

    var timerCon = $('.timer-con');

    //Count To function
    function timerFunction() {

      if ( timerCon.length ) {

        if (!timerCon.hasClass("done")) {

          var timerTop = timerCon.offset().top,
          top = allWindow.scrollTop(),
          winH = allWindow.height() - 100;

            if (top >= timerTop - winH) {
              timerCon.addClass("done");

              //initialize count to
               if (!!$.prototype.countTo) {
                $('.timer').countTo({speed:2500,refreshInterval: 50});
               }
              
            }
        }
      }
    } //End timerFunction Fuction

    // add Event listener to window
    allWindow.on('scroll', function() {
      stikyNav();
      ChangeClass();
      parallax();
      timerFunction();
    });

/*-----------------------------------------------------------------
  Javascript Function for PROGRESS BAR LINES  SCRIPT
------------------------------------------------------------------*/

    var linesBtn = $(".skills-init"),
        line = $(".hide-skill-bar");

    //Progress Bars function
    function progressFunction(e) {

        if (!linesBtn.hasClass("done")) {

            linesBtn.addClass("done");
            $.each( line, function( i, val ) {

            var thisLine = $(this),
                barText = thisLine.find(".progress-bar-text"),
                value = parseInt(barText.data("percent"),10),
                progressCont = $(thisLine).closest('.progress-bar-skills').find("p");

              thisLine.css("height", 100 - value + "%");
              progressCont.html(value + "%")

            });
        }
    } //End progressFunction Fuction

    linesBtn.on('shown.bs.tab', progressFunction);
    

/*------------------------------------------------------
  Javascript Function for filtering portfolio items
--------------------------------------------------------*/

  var portfolioItems = $('.work-item'),
      menu = $('#work-list'),
      menuItems = $('.filter'),
      filterItems = function(ev) {

        var target = $(this);
        // Prevent the default link behavior 
        ev.preventDefault();

        // return if already current
        if (target.hasClass("filter-active")) {
          return false;
        }

        // remove current
        var activeLink = menu.find('.filter-active');

            activeLink.removeClass('filter-active');

        // set current
        target.addClass('filter-active');

        $.each( portfolioItems, function( i, val ) {

            var portfolioItem = $(this);

            if ( target.data("filter") === "all" ) {

              portfolioItem.removeClass('filtered');
              setTimeout(function () { portfolioItem.css("display","block"); },500);


            } else if ( !portfolioItem.hasClass( target.data("filter") ) ) {

              portfolioItem.addClass('filtered');
              setTimeout(function() { portfolioItem.css("display","none"); },500);

            } else {

              portfolioItem.removeClass('filtered');
              setTimeout(function () { portfolioItem.css("display","block"); },500);

            }
        });
      };

    $.each( menuItems, function( i, val ) {
      $(this).on("click",filterItems);
    });


/*----------------------------------------------------------------------
 Javascript Function Initialize Particules
-----------------------------------------------------------------------*/

  if ( typeof particlesJS !== "undefined") {

    //Function to convert hex format to a rgb color
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    var particlesColor = $(".main-color").css("color"),
      particlesColorHex = rgb2hex(particlesColor);
      
    particlesJS('particles-js',
    
      {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 600
            }
          },
          "color": {
            "value": particlesColorHex,
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#888"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#888",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 5,
            "direction": "bottom",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 30,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      }

    );
  }

/*-------------------------------------------
 Magnific Popup Portfolio Initializing
-------------------------------------------*/

  if (!!$.prototype.magnificPopup) {

    $('.popup-link').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery:{
          enabled:true
      },
    });

    $('.pf-gallery-popuap').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery:{
          enabled:true
      },  
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
      }
    });
    
  }

/*------------------------------------------------------
  Javascript Function for initialize owl carousel
--------------------------------------------------------*/

  if (!!$.prototype.owlCarousel) {

     function changeDotColor(slider) {
        var mainColor = $('.main-color').css('color'),
            testDot = slider.find('.owl-dot');

        $.each( testDot, function( i, val ) {
          if ($(this).hasClass('active')) {
            $(this).css('background-color',mainColor);
          } else {
            $(this).css('background-color','#fff');
          }
        });
     }
    
    var homeOwl = $('.home-3 .home-carousel');

    homeOwl.owlCarousel({
      mouseDrag: true,
      nav: false,
      dots: false,
      items: 1,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3000,
      loop: true,
      animateOut: 'fade-out',
      animateIn: 'slide-animation',
      responsive: {
        768: {
          dots: true
        }
      }
    });

    changeDotColor(homeOwl);
    // Listen to owl events:
    homeOwl.on('changed.owl.carousel', function(event) {
      changeDotColor(homeOwl);
    });
    
    var testimonialsOwl = $('.testimonials-carousel');

    testimonialsOwl.owlCarousel({
      dots: true,
      items: 1,
      loop: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3000
    });
   
    changeDotColor(testimonialsOwl);
    // Listen to owl events:
    testimonialsOwl.on('changed.owl.carousel', function(event) {
      changeDotColor(testimonialsOwl);
    });


    $(".pf-details-slider").owlCarousel({
      nav: true,
      navText : [
        "<a class='main-color-bg pf-slider-btn ver-center'><i class='fa fa-chevron-left center effect'></i><span></span></a>",
        "<a class='main-color-bg pf-slider-btn ver-center'><i class='fa fa-chevron-right center effect'></i><span></span></a>"
      ],
      items: 1,
      loop: true,
      dots: false
    });

  }

/*------------------------------------------------------------------------
 Javascript Function for Validate and Submit the CONTACT Form Using AJAX
-------------------------------------------------------------------------*/

    // Get the form.
    var form = $('#contact-form'),
        reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
        inputs = $(".input-field");

    function validateForm() {

      if ($(this).is("#email")) {

          var email = $(this).val(),
              res = reg.test(email);

          if (res) {
            $(".email-error").html("");
          } else {
            $(".email-error").html("please enter a valid email.");
            return false;
          }

      } else {

          var target = ($(this).attr("id")),
              targetMessage = $("."+target+"-error");

          if ($(this).val() === "") {

            targetMessage.html("please enter a valid "+target+".");
            return false;

          } else { 
            targetMessage.html(" ");
          }

      }
    } // End ValidateForm Function

    $.each(inputs, function( i, val ) {
      $(this).on("blur", validateForm);
    });

    // Get the messages div.
    var formMessages = $('#form-message');

    // Set up an event listener for the contact form.
    $(form).on('submit',function(event) {

      // Stop the browser from submitting the form.
      event.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
          type: 'POST',
          url: form.attr('action'),
          data: formData
      }).done(function(response) {

        // Make sure that the formMessages div has the 'success' class.
        formMessages.removeClass('error');
        formMessages.addClass('success');

        // Set the message text.
        formMessages.text(response);

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');

      }).fail(function(data) {

          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass('success');
          formMessages.addClass('error');

          // Set the message text.
          if (data.responseText !== '') {
              formMessages.text(data.responseText);
          } else {
              formMessages.text('Sorry! An error occured and your message could not be sent.');
          }

      });
    });

});