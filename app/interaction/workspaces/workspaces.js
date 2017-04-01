$(document).ready(function() {
   var idCounter = 0;
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
    
    if($('#noWorkspacesMsg').is(':visible')) {//ako postoji poruka da nema boardova, skloni je
      $('#noWorkspacesMsg').hide();
    }
    closePopup("addNewWorkspacePopup");

    $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/workspaces/addWorkspace',
    complete: function(data) {
      console.log(data.responseJSON);
      //!!!!!!!!!!!!!!!!!! TODO dodati more dropdown itd... !!!!!!!!!!!!!!!!!!!!!!

       $('#createdWorkspace'+idCounter).removeClass('loading');// kada se board skroz ucita stavi opacity na 1
       $('#linkToWorkspace'+idCounter).attr("href",data.responseJSON._id);
       $('#createdWorkspace'+idCounter).attr("id",data.responseJSON._id);
      // $('#dropdown-'+idCounter).attr("id","dropdown-"+data.responseJSON._id); //ovo kad se ubace more dropdowni itd...
      $('#processing-modal').hide();
      showInformationModal("success","Completed.","Succesfully created new workspace.");
      setTimeout(function() {
        hideInformationModal("success");
      },3500)
    }

    });
   });



  // //Functions
  function createWorkspace(data) {
    idCounter++;
    if(data.title.length > 40)
      data.title = truncateText(data.title,0,40);
    
    if(data.description.length > 130) {
      data.description = truncateText(data.description,0,130);
    }

    var snippet = `
      <a id="linkToWorkspace${idCounter}">
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="workspace loading" id="createdWorkspace${idCounter}">
            <div class="workspace-back1"></div>
            <div class="workspace-back2"></div>
            <h4><b>${data.title}</b></h4>
            <br>
            <p>${data.description}</p>
          </div>
        </div>
      </a>
    `;
    $('#allWorkspaces').prepend(snippet);
  }
});