// TODO eventualno uraditi caching svih $jquery objekata
// ------------------- Modal windows -------------------
// Fires up the modal and shows the passed title and description
function showInformationModal(type, title, description) {
    $('#'+type+'-modal').velocity("fadeIn",{duration: 200});
    $('#'+type+'-modal').children('.right-part').children('h4').text(title);
    $('#'+type+'-modal').children('.right-part').children('p').text(description);
  }
  // Closes the passed modal type
function hideInformationModal(type) {
    $('#'+type+'-modal').velocity("fadeOut",{duration: 200});
  }

  // ------------------- Validate functions -------------------
  // Validates if the object passed is null or empty string
  function validate(object) {
    if(object.val() == "" || object.val() == null) {
      object.css("border-color","#e74c3c");
      object.addClass("animated shake");
      setTimeout(function() {
        object.removeClass("animated shake");
      },1000);
      return false;
    }
    object.css("border-color","none");
    object.removeClass("animated shake");
    return true;
  }

 // ------------------- Truncate text -------------------
 // Trims down the passed text from given indexes and adds '...' at the end
  function truncateText(element,startIdx,endIdx) {
    var truncated = element.substring(startIdx,endIdx);
    truncated += '...';
    return truncated;
  }

 // ------------------- Input and screen clears and closings -------------------
 // Clears all of the input fields for the command specified. eg "addNewBoardPopup" will clear all of the input fields in the popup of adding a new board
function clearFields(command) {
  if(command == "addNewBoardPopup") {
    $('#boardType').val("");
    $('#boardTitle').val("");
    $('#boardDescription').val("");
    $('#boardTeam').val("Personal board");
    $('#boardWorkspace').val("No workspace");
  }
  else if(command == "addNewWorkspacePopup") {
    $('#workspaceTitleField').val("");
    $('#workspaceDescriptionField').val("");
    $('#workspaceBoardsField').val(""); // ovo ce se verovatno menjati
  }
    
}
// Will close the popup provided
function closePopup(popup) {
  var typeText = "Choose board type that suits your needs.<br> Whether you are planing a trip, starting a new project, or need to come up with a new idea for your business."; // for closing board.
  if (popup == "addNewBoardPopup") {
    $('#addPopup').hide();
    $('#pageContent').show();
    $('#choosingType').show();
    $('#choosingType').velocity({opacity:1});
    $('#boardDetails').hide();
    $('#chooseTypeDescription').html(typeText);
    $('#boardTitle').css("border-color","#ccc");
  }
  else if(popup == "addNewWorkspacePopup") {
    $('#addPopupEdit').hide();
    $('#workspacePageContent').show();
  }
  else if(popup == "editBoardPopup") {
    $('#editPopup').hide();
  }
  else if(popup == "archiveBoardPopup") {
    $('#confirmArchivePopup').hide();
  }
    
}

 // ------------------- Input and screen prompts (Shows the screen or popup to a user) -------------------
  function openPopup(popup) {
    if (popup == "addNewBoardPopup") {
      $('#addPopup').velocity("fadeIn");
      $('#pageContent').hide();
    }
    else if(popup == "addNewWorkspacePopup") {
      $('#addPopupEdit').velocity("fadeIn");
      $('#workspacePageContent').hide();
    }
    else if(popup == "editBoardPopup") {
      $('#editPopup').show();
    }
    else if(popup == "archiveBoardPopup") {
      $('#confirmArchivePopup').show();
    }
  }