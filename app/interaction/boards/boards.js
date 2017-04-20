$(document).ready(function() {
  var $moreButton = $('.more');
  var currentIdActive = -1;

  //Archive
  var $archiveButton = $('.archive-board');
  var $btnConfirmArchive = $('#btnConfirmArchive');
  var $btnCancelArchive = $('#btnCancelArchive');
  //Close modal
  var $successModal = $('#success-modal');
  var $modalCloseBtn = $('.btn-close-modal');
  //Edit board
  var $editButton = $('.edit-board');
  var selectedBoardId = 0;
  //Add board to workspace
  var $btnAddBoardToWorkspaces = $('.add-board-to-workspaces');
  var $btnCancelBoardToWorkspaces = $('#btnCancelBoardToWorkspaces');

  console.log(workspaceArray);

  $('#workspace').on('click', '.more', function(e) {
    handleMoreDropdown(e,this);
  });

  $('#workspace').on('click', '.more-dropdown', function(e) {
    e.preventDefault();
  });

  $(document).on('mouseup',function (e)
  {
    if (!$moreButton.is(e.target) && $moreButton.has(e.target).length === 0)
    {
        $('#dropdown-'+currentIdActive).hide();
    }
  });

  function handleMoreDropdown(e, element) {
    e.preventDefault();

    //console.log(currentIdActive);
    if($('#dropdown-'+element.parentNode.id).is(':visible')) {
      //console.log('Vec je visible i hajdujem '+element.parentNode.id);
      $('#dropdown-'+currentIdActive).hide();
    }
    else {
      //console.log('Nije visible i pozivam ga '+element.parentNode.id);
      $('#dropdown-'+currentIdActive).hide();
      $('#dropdown-'+element.parentNode.id).show();
      currentIdActive = element.parentNode.id;
    }
  }

  //Archive board
  $archiveButton.on('click',function() {
    openArchivePopup(this.parentNode.parentNode.id,this.parentNode.parentNode.parentNode);
  });

  $btnConfirmArchive.on('click',function() {
    console.log(selectedBoardId);
    //ovde logika za archive boarda
  });

  $btnCancelArchive.on('click', function() {
    closePopup("archiveBoardPopup");
  });

  $modalCloseBtn.on('click',function() {
    hideInformationModal("success");
  });

  //Edit
  $editButton.on('click',function() { //TODO uzeti iz baze od ovog boarda workspace i tim, mozda cak i description i type, da se ne bakcem sa htmlom ovde 
    var boardId = this.parentNode.parentNode.id;
    var boardTitle = $(this).parent().parent().parent().children('.title-wrapper').text().trim();
    var boardDescription = $(this).parent().parent().parent().children('.description-wrapper').text().trim();
    openEditPopupAndPopulate(boardId,boardTitle,boardDescription);
  });

  $('#btnCancelBoardEdit').on('click',function(e) {
    e.preventDefault();
    closePopup("editBoardPopup");
  });

  $('#btn-close-dialog-edit').on('click',function() {
    closePopup("editBoardPopup");
  });

  // ---------- UPDATE BOARD --------------
  $('#editBoardForm').on('submit',function(e) {
    e.preventDefault();
    if (!validate($('#editBoardTitleField'))) return false;

    var updatedBoard = {
      title: $('#editBoardTitleField').val(),
      description: $('#editBoardDescriptionField').val()
    };

    showInformationModal("processing", "Updating board...", "Just a second.");
    closePopup("editBoardPopup");

    $('#'+selectedBoardId).addClass('loading');

    $.ajax({
    type: 'POST',
    data: JSON.stringify(updatedBoard),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/boards/update/'+selectedBoardId,
    complete: function(data) {
      console.log(data.responseJSON);
      $('#processing-modal').hide();
      $('#'+selectedBoardId).children('.description-wrapper').children('.description').text(data.responseJSON.description);
      $('#'+selectedBoardId).children('.title-wrapper').html("<h4><b>"+data.responseJSON.title+"</b></h4>")
      $('#'+selectedBoardId).removeClass('loading');
      showInformationModal("success","Completed.","Board updated successfully.");
      setTimeout(function() {
        hideInformationModal("success");
      },3500)
    }

    });

  });

  // To return field border color back to normal
  $('#editBoardTitleField').on('focus',function() {
    $(this).css("border-color","#0080FF");
  });
  $('#editBoardTitleField').on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  // Add board to workspace functionality
  $btnAddBoardToWorkspaces.on('click',function(e) {
    e.preventDefault();
    var boardId = this.parentNode.parentNode.id;
    var boardTitle = $(this).parent().parent().parent().children('.title-wrapper').text().trim();
    openAddBoardToWorkspacesPopupAndPopulate(boardId,boardTitle);
  });

  $btnCancelBoardToWorkspaces.on('click',function(e) {
    e.preventDefault();
    $('.workspacesMultiselect').val([]).trigger("change");
    closePopup("addBoardToWorkspaces");
  });


  // Instanciranje workspacesToSelect objekta da bi sadrzao formu kakva treba za select2 a to je da ima id i text
  var workspacesToSelect = [];
  workspaceArray.forEach(function(workspace) {
    workspacesToSelect.push({
      "id": workspace._id,
      "text": workspace.title
    });
  });

  // Multiselect
  $('.workspacesMultiselect').select2({
    data: workspacesToSelect,
    placeholder: 'Search for workspaces, you would like to add this board to.',
    closeOnSelect: true,
    allowClear: true
  });

  // ----------------- ADD BOARD TO WORKSPACES ------------------
  $('#addBoardToWorkspacesForm').on('submit',function(e) {
    e.preventDefault();
    // check if input ok
    if($('.workspacesMultiselect').val() == null) {
      console.log("Popunite input u koje workspaceove zelite da dodate");
      return false;
      // Ovde logika da se zacrveni input itd...
    }
    // get value from input
    var workspacesToPopulate = {
      boardId: selectedBoardId,
      workspaces: $('.workspacesMultiselect').val()
    }

    // Fire up processing modal
    showInformationModal("processing", "Populating workspaces...", "Just a second.");
    closePopup("addBoardToWorkspaces");
    // ajax call
    //TODO/NOTE mozda ovde proveriti da li taj workspace sadrzi taj board, posto imam workspaceArray promenljivu, i onda ako neki od workspaceova koji je naveden sadrzi taj odredjeni board, da se ne da korisniku da se submituje.
    $.ajax({
    type: 'POST',
    data: JSON.stringify(workspacesToPopulate),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/workspaces/populateWithBoard',
    complete: function(data) {
      console.log(data.responseJSON);
      $('#processing-modal').hide();
      showInformationModal("success","Completed.","Workspaces populated succesfully.");
      setTimeout(function() {
        hideInformationModal("success");
      },3500)
      $('.workspacesMultiselect').val([]).trigger("change");
    }

  });
  
  });

// ----------------- PINNING --------------------
  $('.pin').on('click',function(e) {
    e.preventDefault();
    var boardId = this.parentNode.id;
    console.log();
    var boardTitle = $(this).parent().children('.title-wrapper').text().trim();
    var boardDescription = $(this).parent().children('.description-wrapper').text().trim();
    var boardType = $(this).parent().children('.type-wrapper').text().trim();
    
    var data = {
      boardId: boardId
    }
    // send ajax request to the db, and change the pinned field of this board to !pinned.
    $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/boards/pin/'+boardId,
    complete: function(data) {
      console.log(data.responseJSON);
      console.log("Uspeo");
    }

  });

  // Ako ne postoji boardGroup-pinned id, pravim ga i pravim unutra i group title, i board-row i dodajem ovaj board, a sklanjam ga iz allBoards
  var pinnedBoardsGroup = $('#boardGroup-pinned').length;
  if(pinnedBoardsGroup == 0) { //element ne postoji, napraviti podlogu za pinned boards
    var pinnedBoardGroupUI = `
    <div class="boardGroup" id="boardGroup-pinned">
      <div class="group-title">
        <h5><b>Pinned</b></h5>
      </div>

      <div class="row board-row" id="pinnedBoardsRow">
          
      </div>
    </div>
    `;
    $('.main-content').prepend(pinnedBoardGroupUI);
  }

  var boardSnippet = `
    <a href="${boardId}">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="board board-${boardType}" id="${boardId}">
            <div class="pin"><i class="pe-7s-pin"></i></div>
            <div class="more"><i class="pe-7s-more"></i></div>
            <div class="title-wrapper">
              <h4><b>${boardTitle}</b></h4>
            </div>
            <div class="type-wrapper">
              <div class="type-title"><h5><b>${boardType}</b></h5></div>
            </div>
            <div class="description-wrapper">
              <p class="description">${boardDescription}</p>
            </div>


            <div class="more-dropdown" id="dropdown-${boardId}">
              <ul>
                <li class="edit-board"><i class="pe-7s-pen"></i> Edit</li>
                <li class="add-board-to-workspaces"><i class="pe-7s-albums"></i> Add to workspaces</li>
                <li><i class="pe-7s-users"></i> Add to team</li>
                <hr>
                <li class="archive-board"><i class="pe-7s-trash"></i> Archive</li>
              </ul>
            </div>

          </div>
        </div>
      </a>
  `;
  $('#pinnedBoardsRow').prepend(boardSnippet);
  $('#allBoards').children('a[href='+boardId+']').remove();
  
  });




// Functions
  function openArchivePopup(id,boardName) {
    selectedBoardId = isolateID(id);
    $('#nameOfBoardToDelete').text(boardName.childNodes[5].innerText.trim());
    openPopup("archiveBoardPopup");
  }

  function openEditPopupAndPopulate(id,title,description) {
    selectedBoardId = isolateID(id);
    console.log(selectedBoardId);
    openPopup("editBoardPopup");

    //Populate the editPopup
    $('#editBoardName').text(title);
    $('#editBoardTitleField').val(title);
    $('#editBoardDescriptionField').val(description);

  }

  function openAddBoardToWorkspacesPopupAndPopulate(id,title) {
    selectedBoardId = isolateID(id);
    console.log(selectedBoardId);
    openPopup("addBoardToWorkspaces");

    //Populate the addBoardToWorkspacesPopup
    $('#boardToAddName').text(title);
  }

  function isolateID(id) {
    var isolatedID = id.substring(9,id.length);
    return isolatedID;
  }
  
  
});
