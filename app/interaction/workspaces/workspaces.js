$(document).ready(function() {
   var $btnAddNewWorkspace = $('#btnAddNewWorkspace');
   var $addPopupEdit = $('#addPopupEdit');
   var $workspacePageContent = $('#workspacePageContent');
   var $btnCloseWorkspaceAddPopup = $('#btn-close-dialog-workspace-popup');
   var $btnCancelWorkspaceAddPopup = $('#btnCancelNewWorkspace');
   var $addWorkspaceForm = $('#addWorkspaceForm');
  
   $btnAddNewWorkspace.on('click',function() {
      openPopup("addNewWorkspacePopup");
   });

   $btnCloseWorkspaceAddPopup.on('click',function() {
    closePopup("addNewWorkspacePopup");
   });

   $btnCancelWorkspaceAddPopup.on('click',function(e) {
    e.preventDefault();
    closePopup("addNewWorkspacePopup");
   });

   $('#workspaceTitleField').on('focus',function() {
    $(this).css("border-color","#0080FF");
  });
  $('#workspaceTitleField').on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

   //Submit new workspace
   $addWorkspaceForm.on('submit',function(e) {
    e.preventDefault();
    if(!validate($('#workspaceTitleField'))) return false;
    var data = {
      title: $('#workspaceTitleField').val(),
      description: $('#workspaceDescriptionField').val(),
      team: "noteam", // TODO
      dateCreated: new Date(),
      boards: []
    };
    createWorkspace(data);
    clearFields("addNewWorkspacePopup");
    console.log(data);
    //TODO modal
    //TODO skloni poruku no workspaces

    //TODO ajax
   });



  // //Functions
  function createWorkspace(data) {
    //TODO implementation
  }
});