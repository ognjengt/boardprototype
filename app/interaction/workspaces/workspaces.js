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
      title: $('#workspaceTitleField'),
      description: $('#workspaceDescriptionField'),
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
  // function clearFields() {
  //   $('#workspaceTitleField').val("");
  //   $('#workspaceDescriptionField').val("");
  //   $('#workspaceBoardsField').val(""); // ovo ce se verovatno menjati
  // }
  // function openNewWorkspacePopup() {
  //   $addPopupEdit.velocity("fadeIn");
  //   $workspacePageContent.hide();
  // }
  // function closeNewWorkspacePopup() {
  //   $addPopupEdit.hide();
  //   $workspacePageContent.show();
  // }
  // function validate(object) {
  //   if(object.val() == "" || object.val() == null) {
  //     object.css("border-color","#e74c3c");
  //     object.addClass("animated shake");
  //     setTimeout(function() {
  //       object.removeClass("animated shake");
  //     },1000);
  //     return false;
  //   }
  //   object.css("border-color","none");
  //   object.removeClass("animated shake");
  //   return true;
  // }
  //Modal Functions
  // function showInformationModal(type, title, description) {
  //   $('#'+type+'-modal').velocity("fadeIn",{duration: 200});
  //   $('#'+type+'-modal').children('.right-part').children('h4').text(title);
  //   $('#'+type+'-modal').children('.right-part').children('p').text(description);
  // }
  // function hideInformationModal(type) {
  //   $('#'+type+'-modal').velocity("fadeOut",{duration: 200});
  // }
});