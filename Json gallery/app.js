import 'slick-carousel';
import '@fancyapps/fancybox';

setSlider('https://jsonplaceholder.typicode.com/photos', 200);

function setSlider(url, slides) {
  $.ajax({
    async: false,
    url: url,
    dataType: 'json',
  }).done(function(data) {
    $.each(data, function(i, e) {
      if (i <= slides - 1) {
        var imgBig = '<a href="' + e.url + '" data-fancybox="gallery" data-caption="' + e.title + '"><img data-lazy="' + e.url + '" alt="' + e.title + '"></a>';
        var imgThumb = '<img src="' + e.thumbnailUrl + '" alt="' + e.title + '">';
        $('.js-slider-big').append(imgBig);
        $('.js-slider-thumbs').append(imgThumb);
      } else {
        return false;
      }
    });
  });


  $('.js-slider-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.js-slider-thumbs',
    lazyLoad: 'ondemand',
   
  });
  $('.js-slider-thumbs').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.js-slider-big',
    focusOnSelect: true,
    arrows: false,
    
  });


  $('.loader').removeClass('is-active');

};
