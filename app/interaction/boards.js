$(document).ready(function() {
  var $moreButton = $('.more');
  var currentIdActive = 0;
  $moreButton.click(function(e) {
    $('#dropdown-'+currentIdActive).hide();
    e.preventDefault();
    $('#dropdown-'+this.parentNode.id).toggle();
    currentIdActive = this.parentNode.id;
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
