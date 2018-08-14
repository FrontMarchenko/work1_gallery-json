import 'slick-carousel';
import 'magnific-popup';

$(document).ready(function() {

  
  function setSlider(url, slides) {
    var imgArr;
    $.ajax({
      async: false,
      url: url,
      dataType: 'json',
    }).done(function(jsonData) {
      imgArr = jsonData;
    });
    var currentIndex;
    $.each(imgArr, function(i, e) {
      if (i <= slides) {
        var imgBig = '<img data-lazy="' + e.url + '" alt="' + e.title + '">';
        var imgThumb = '<img src="' + e.thumbnailUrl + '" alt="' + e.title + '">';
        $('.js-slider-big1').append(imgBig);
        $('.js-slider-thumbs1').append(imgThumb);
      } else {
        currentIndex = i + 1;
        return false;
      }
    });




    $('.js-slider-big1').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      asNavFor: '.js-slider-thumbs1',
      lazyLoad: 'ondemand',
      infinite: false,
    });
    $('.js-slider-thumbs1').slick({
      slidesToShow: slides,
      slidesToScroll: 1,
      asNavFor: '.js-slider-big1',
      focusOnSelect: true,
      infinite: false,
      arrows: false,
    });

    // Popup


    $('.js-slider-thumbs1').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (slick.$slides.length - currentSlide <= slides + 1) {
        $.each(imgArr, function(i, e) {
          if (i >= currentIndex && i <= currentIndex + slides * 2) {
            var imgBig = '<div><div><img style="width: 100%; display: inline-block;" data-lazy="' + e.url + '" alt="' + e.title + '"></div></div>';
            var imgThumb = '<div><div><img style="width: 100%; display: inline-block;" src="' + e.thumbnailUrl + '" alt="' + e.title + '"></div></div>';
            $('.js-slider-big1').slick('slickAdd', imgBig);
            $('.js-slider-thumbs1').slick('slickAdd', imgThumb);
          } else if (i === currentIndex + slides) {
            currentIndex = i + 1;
            return false;
          }
        });
      }
    });
  };


  setSlider('https://jsonplaceholder.typicode.com/photos', 9);
});
