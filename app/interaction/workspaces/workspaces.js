$(document).ready(function() {
   var idCounter = 0;
   var $btnAddNewWorkspace = $('#btnAddNewWorkspace');
   var $addPopupWorkspace = $('#addPopupWorkspace');
   var $workspacePageContent = $('#workspacePageContent');
   var $btnCloseWorkspaceAddPopup = $('#btn-close-dialog-workspace-popup');
   var $btnCancelWorkspaceAddPopup = $('#btnCancelNewWorkspace');
   var $addWorkspaceForm = $('#addWorkspaceForm');

   //Modals
   var $modalCloseBtn = $('.btn-close-modal');

   // For multiselect: Every time workspaces are opened, gets all boards from the database and maps it to variable boardArray, then this boardArray will be used to search for boards when adding them to a workspace.

   console.log(boardArray);

  
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

   $modalCloseBtn.on('click',function() {
    hideInformationModal("success");
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
    
    if($('#noWorkspacesMsg').is(':visible')) {//ako postoji poruka da nema workspaceova, skloni je
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

  //  //Multisearch
  //  $("#boardsMultisearch").multisearch({
  //     source: boardArray,
  //     keyAttrs: ['_id'],
  //     searchAttrs: ['title'],
  //     formatPickerItem: function( data ) { return '<li><a>'+data.title+' ('+data.boardType+') '+'</a></li>'; },
  //     formatSelectedItem: function( data ) { return '<a class="label label-default pull-left selectedItem" data-role="selected-item">'+data.title+' ('+data.boardType+') '+'<span class="close pe-7s-close" data-action="remove"></span></a>'; },
  //     minSearchChars: 1,
  //     useAutoWidth: false,
  //     added: function(data,element) { //ovu metodu koristiti za dodavanje u neki objekat koji ce se slati serveru na submit.
  //       console.log(element.data._id);
  //     },
  //     removed: function(data,element) { //ovde samo pozvati metodu koja ce obrisati ovaj dobijeni id iz tog nekog globalnog objekta
  //       console.log(element.data._id);
  //     },
  //     itemselect: function(e) {
  //       e.preventDefault();
  //     },
  //     preventNotFound: true
  //  });

  //  $('#boardsMultisearch input').on('click',function() {
  //    //TODO when input is clicked populate the picker with all of the data.
  //  });

  var boardsToSelect = [];
  boardArray.forEach(function(board) {
    boardsToSelect.push({
      "id": board._id,
      "text": board.title+' ('+board.boardType+' )'
    });
  });

  $('.boardsMultiselect').select2({
    data: boardsToSelect,
    placeholder: "Search for board names you would like to add in this workspace"
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