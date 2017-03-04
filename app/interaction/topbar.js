$(document).ready(function() {
  var $userOptions = $('.user-options');
  $('.user-profile-main').click(function() {
      $userOptions.fadeToggle('fast');
      visible = true;

  });

    $(document).mouseup(function (e)
    {

      if (!$userOptions.is(e.target) // if the target of the click isn't the container...
          && $userOptions.has(e.target).length === 0) // ... nor a descendant of the container
      {
          $userOptions.fadeOut('fast');
      }
  });
});
