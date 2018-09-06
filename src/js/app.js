import 'slick-carousel';
import '@fancyapps/fancybox';
var gallery  = 1;
setSlider({
  url: 'https://jsonplaceholder.typicode.com/photos',
  slides: 100,
  sliderBig: '.js-slider-big',
  sliderThumbs: '.js-slider-thumbs',
  
},gallery++);
setSlider({
  url: 'https://jsonplaceholder.typicode.com/photos',
  slides: 150,
  sliderBig: '.js-slider-big1',
  sliderThumbs: '.js-slider-thumbs1',
},gallery++);

setSlider({
  url: 'https://jsonplaceholder.typicode.com/photos',
  slides: 50,
  sliderBig: '.js-slider-big2',
  sliderThumbs: '.js-slider-thumbs2',
},gallery++);

function setSlider(options) {
  var flag = true;
  var defaults = {
    url: '',
    slides: '',
    sliderBig: '',
    sliderThumbs: '',
  };

  $.extend(defaults, options);

  $.each(defaults, function(i, e) {
    if (!e) {
      console.log('Ошибка! Не установлен параметр ' + i);
      flag = false;
      return false;
    }
  });

  if (flag) {
    $.ajax({
      async: false,
      url: defaults.url,
      dataType: 'json',
    }).done(function(data) {
      $.each(data, function(i, e) {
        
        if (i <= defaults.slides - 1) {
          
          var imgBig = '<a href="' + e.url + '" data-fancybox="gallery ' + gallery + '" data-caption="' + e.title + '"><img data-lazy="' + e.url + '" alt="' + e.title + '"></a>';
          var imgThumb = '<img src="' + e.thumbnailUrl + '" alt="' + e.title + '">';
          $(defaults.sliderBig).append(imgBig);
          $(defaults.sliderThumbs).append(imgThumb);
        } else {
          return false;
        }
      });
    });
  }
};


$('.js-slider-big').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  asNavFor: '.js-slider-thumbs',
  lazyLoad: 'ondemand',

});
$('.js-slider-thumbs').slick({
  slidesToShow: 8,
  slidesToScroll: 1,
  asNavFor: '.js-slider-big',
  focusOnSelect: true,
  arrows: false,
});

$('.js-slider-big1').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  asNavFor: '.js-slider-thumbs1',
  lazyLoad: 'ondemand',

});
$('.js-slider-thumbs1').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: '.js-slider-big1',
  focusOnSelect: true,
  arrows: false,
});


$('.js-slider-big2').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  asNavFor: '.js-slider-thumbs2',
  lazyLoad: 'ondemand',

});
$('.js-slider-thumbs2').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.js-slider-big2',
  focusOnSelect: true,
  arrows: false,
});

$('.loader').removeClass('is-active');
