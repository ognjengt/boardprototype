$(document).ready(function() {
  var $userOptions = $('.user-options');
  var $userProfileMain = $('.user-profile-main');
  var visible = false;
  $userProfileMain.click(function() {
      if(!visible)  {
        $userOptions.show();
        visible = true;
      }
      else {
        $userOptions.hide();
        visible = false;
      }
  });

    $(document).mouseup(function (e)
    {
      if (!$userProfileMain.is(e.target) && $userProfileMain.has(e.target).length === 0) //&& $userOptions.has(e.target).length == 0 ovo dodati ako neces da gasi kad se klikne na neki link
      {
          $userOptions.hide();
          visible = false;
      }
  });
});
