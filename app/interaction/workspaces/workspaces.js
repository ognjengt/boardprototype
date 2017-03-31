$(document).ready(function() {
   var $btnAddNewWorkspace = $('#btnAddNewWorkspace');
   var $addPopupEdit = $('#addPopupEdit');
   var $workspacePageContent = $('#workspacePageContent');
  
   $btnAddNewWorkspace.on('click',function() {
      openNewWorkspacePopup();
   })

  // //Functions
  function openNewWorkspacePopup() {
    $addPopupEdit.velocity("fadeIn");
    $workspacePageContent.hide();
  }
});