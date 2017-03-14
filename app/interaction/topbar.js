$(document).ready(function() {
  // For user options dropdown
  var $userOptions = $('.user-options');
  var $userProfileMain = $('.user-profile-main');

  // For adding new board,ws,team dialog
  var $addNewDialog = $('.addNewDialog-dropdown');
  var $btnAddNew = $('#btnAddNew-dropdown');

  $userProfileMain.click(function() {
      $userOptions.toggle();
  });

  $btnAddNew.click(function() {
    $addNewDialog.toggle();
  });

    $(document).mouseup(function (e)
    {
      if (!$userProfileMain.is(e.target) && $userProfileMain.has(e.target).length === 0) //&& $userOptions.has(e.target).length == 0 ovo dodati ako neces da gasi kad se klikne na neki link
      {
          $userOptions.hide();
      }

      // za gasenje addnew dialoga gde god da se klikne
      if (!$btnAddNew.is(e.target) && $btnAddNew.has(e.target).length === 0) //&& $userOptions.has(e.target).length == 0 ovo dodati ako neces da gasi kad se klikne na neki link
      {
          $addNewDialog.hide();
      }

  });
});
