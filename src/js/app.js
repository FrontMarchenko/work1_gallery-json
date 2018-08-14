import '@fancyapps/fancybox';

$('.fancybox').fancybox({
  helpers : {
    overlay : {
      css : {
        'background' : 'rgba(58, 42, 45, 0.95)'
      }
    }
  }
});






import 'slick-carousel';
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
        $('.slider-big1').append(imgBig);
        $('.slider-thumbs1').append(imgThumb);
      } else {
        currentIndex = i + 1;
        return false;
      }
    });




    $('.slider-big1').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      asNavFor: '.slider-thumbs1',
      lazyLoad: 'ondemand',
      infinite: false,
    });
    $('.slider-thumbs1').slick({
      slidesToShow: slides,
      slidesToScroll: 1,
      asNavFor: '.slider-big1',
      focusOnSelect: true,
      infinite: false,
      arrows: false,
    });


    $('.slider-thumbs1').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (slick.$slides.length - currentSlide <= slides + 1) {
        $.each(imgArr, function(i, e) {
          if (i >= currentIndex && i <= currentIndex + slides * 2) {
            var imgBig = '<div><div><img style="width: 100%; display: inline-block;" data-lazy="' + e.url + '" alt="' + e.title + '"></div></div>';
            var imgThumb = '<div><div><img style="width: 100%; display: inline-block;" src="' + e.thumbnailUrl + '" alt="' + e.title + '"></div></div>';
            $('.slider-big1').slick('slickAdd', imgBig);
            $('.slider-thumbs1').slick('slickAdd', imgThumb);
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
