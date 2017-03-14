$(document).ready(function() {
  var $moreButton = $('.more');
  var currentIdActive = 0;
  $moreButton.click(function(e) {
    e.preventDefault();
    if($('#dropdown-'+this.parentNode.id).is(':visible')) {
      $('#dropdown-'+currentIdActive).hide();
    }
    else {
      $('#dropdown-'+currentIdActive).hide();
      $('#dropdown-'+this.parentNode.id).show();
      currentIdActive = this.parentNode.id;
    }

  });

  $('.more-dropdown').click(function(e) {
    e.preventDefault();
  });

  $(document).mouseup(function (e)
  {
    if (!$moreButton.is(e.target) && $moreButton.has(e.target).length === 0)
    {
        $('#dropdown-'+currentIdActive).hide();
    }

});

});
