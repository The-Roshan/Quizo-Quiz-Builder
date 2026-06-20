// ==================================================
// Project Name  :  Quizo
// File          :  JS Base
// Version       :  1.0.0
// Author        :  jthemes (https://themeforest.net/user/jthemes)
// ==================================================
(function($) {
  "use strict";
  // back to top - start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('.backtotop').stop(true, true).fadeOut();
    }
  });
  $(function() {
    $(".scroll").on('click', function() {
      $("html,body").animate({
        scrollTop: 0
      }, "slow");
      return false
    })
  });
  // back to top - end
  // --------------------------------------------------


  // colors - start
  // --------------------------------------------------
  $("[data-text-color]").each(function () {
    $(this).css("color", $(this).attr("data-text-color"))
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"))
  });
  
  $('[data-bg-image]').each(function() {
    $(this).css('background-image', 'url('+ $(this).attr('data-bg-image') + ')');
  });
  // colors - end
  // --------------------------------------------------


  // wow animation - start
  // --------------------------------------------------
  function wowAnimation() {
    new WOW({
      offset: 100,
      mobile: true
    }).init()
  }
  wowAnimation();
  // wow animation - end
  // --------------------------------------------------

  
  // masoney grid layout - start
  // --------------------------------------------------
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    }); 
  });
  // masoney grid layout - end
  // --------------------------------------------------


  // isotope filtering - start
  // --------------------------------------------------
  var $element_grid = $(".element_grid");
  $element_grid.imagesLoaded(function () {
    $element_grid.isotope({
    itemSelector: ".element-item",
    layoutMode: "fitRows"
  });
  });
  var filterFns = {

    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },

    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    }
  };

  $(".filters-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    filterValue = filterFns[filterValue] || filterValue;
    $element_grid.isotope({ filter: filterValue });
  });

  $(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".active").removeClass("active");
      $(this).addClass("active");
    });
  });
  // isotope filtering - end
  // --------------------------------------------------


  // slider - start
  // --------------------------------------------------
  $('.slideshow1_slider').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    prevArrow: ".ss1_left_arrow",
    nextArrow: ".ss1_right_arrow",
  });

  $('.slideshow2_slider').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    prevArrow: ".ss2_left_arrow",
    nextArrow: ".ss2_right_arrow",
    responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2
      }
    }
    ]
  });

  $('.slideshow4_slider').slick({
    dots: true,
    speed: 1000,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    prevArrow: ".ss4_left_arrow",
    nextArrow: ".ss4_right_arrow",
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    }
    ]
  });
  // slider - end
  // --------------------------------------------------


})(jQuery);