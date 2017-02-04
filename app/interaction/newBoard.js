$(document).ready(function() {
  var selectedType;
  var typeText = "Choose board type that suits your needs.<br> Whether you are planing a trip, starting a new project, or need to come up with a new idea for your business.";
  var detailsText = "";
  var projectBoardText = "Project board is meant to help the user or a team who is working together, to better organize their time, tasks and to keep track of how the particular project or part of a project is progressing. Interface of this board is presented as a kanban, where user can move around the cards and create ordered lists.";
  var ideaBoardText = "";
  var brainstormBoardText = "";

  $('#btnAddNewBoard').on('click',function() {
    openPopup();
  });

  $('.form-header').on('click',function() {//TODO ovde promeniti samo staviti X-button
    //closePopup();
  });

  $('#btnSubmitNewBoard').on('click',function() {
    closePopup();
  });

  $('.chosen').on('click',function() {
    selectedType = $(this).children('h4').text().trim();
    console.log(selectedType);
    $('#choosingType').velocity("fadeOut",{duration:100});
    $('#boardDetails').velocity("fadeIn",{delay:150});
    $('#boardType').val(selectedType); // postavio getovani value u hidden field
    $('#boardDetailsHeader').text(selectedType+" board details");
    if(selectedType == "Project")
      detailsText = projectBoardText;
    else if(selectedType == "Idea")
      detailsText = ideaBoardText;
    else if(selectedType == "Brainstorm")
        detailsText = brainstormBoardText;
    $('#chooseTypeDescription').text(detailsText);
  })

  $('#btnCancelInput').on('click',function(e){
    e.preventDefault();
    closePopup();
    clearFields();
  })

  function openPopup() {
    $('#addPopup').velocity("fadeIn");
    $('#pageContent').hide();
  }

  function closePopup() {
    $('#addPopup').hide();
    $('#pageContent').show();
    $('#choosingType').show();
    $('#choosingType').velocity({opacity:1});
    $('#boardDetails').hide();
    $('#chooseTypeDescription').html(typeText);
  }

  function clearFields() {
    $('#boardType').val("");
    $('#boardTitle').val("");
    $('#boardDescription').val("");
    $('#boardGoal').val("");
    $('#boardTeam').val("Personal board");
    $('#boardWorkspace').val("No workspace");
  }

});
