$(document).ready(function() {
  var $moreButton = $('.more');
  var currentIdActive = -1;
  // $moreButton.click(function(e) {
  //   handleMoreDropdown(e, this);
  // });

  $('#workspace').on('click', '.more', function(e) {
    handleMoreDropdown(e,this);
  });

  $('#workspace').on('click', '.more-dropdown', function(e) {
    e.preventDefault();
  });

  $(document).on('mouseup','document',function (e)
  {
    if (!$moreButton.is(e.target) && $moreButton.has(e.target).length === 0)
    {
        $('#dropdown-'+currentIdActive).hide();
    }

  });

  function handleMoreDropdown(e, element) {
    e.preventDefault();
    if($('#dropdown-'+element.parentNode.id).is(':visible')) {
      $('#dropdown-'+currentIdActive).hide();
    }
    else {
      $('#dropdown-'+currentIdActive).hide();
      $('#dropdown-'+element.parentNode.id).show();
      currentIdActive = element.parentNode.id;
    }
  }

});
