$('.img-lrg').hide();

$('.body-section').each(function() {

  var thumbnail = $(this).find('.thumbnail');
  var thumbnails = $(document).find('.img-lrg');

  thumbnail.on("click", function(event) {
    event.preventDefault();
    thumbnails.hide();
    var largeImage = $(this).siblings('.img-lrg');
    largeImage.addClass('open');
    // console.log(largeImage);
    largeImage.show();
  });

  $('.img-lrg').on("click", ".close", function(event) {
    var largeImage = $(this).parent();
    largeImage.hide();
  });

});

document.onkeyup = function (event) {
 if (event.keyCode == 27) {
  $('.open').hide();
 }
};
