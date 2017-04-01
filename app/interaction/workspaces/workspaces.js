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

    showInformationModal("processing", "Creating workspace...", "Just a second.");
    
    if($('#noWorkspacesMsg').is(':visible')) {
      $('#noWorkspacesMsg').hide();
    }

    //TODO ajax
  //   $.ajax({
  //   type: 'POST',
  //   data: JSON.stringify(data),
  //   contentType: 'application/json; charset=utf-8',
  //   dataType: 'json',
  //   url: '/workspaces/addWorkspace',
  //   complete: function(data) {
  //     console.log(data.responseJSON);
  //     // $('#linkToBoard'+idCounter).attr("href",data.responseJSON._id);
  //     // $('#createdBoard'+idCounter).attr("id",data.responseJSON._id);
  //     // $('#dropdown-'+idCounter).attr("id","dropdown-"+data.responseJSON._id);
  //     $('#processing-modal').hide();
  //     showInformationModal("success","Completed.","Succesfully created new board.");
  //     setTimeout(function() {
  //       hideInformationModal("success");
  //     },3500)
  //   }

  // });
  
   });



  // //Functions
  function createWorkspace(data) {
    //TODO implementation
  }
});