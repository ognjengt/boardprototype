$(document).ready(function() {
  var $moreButton = $('.more');
  var currentIdActive = -1;

  //Archive
  var $archiveButton = $('.archive-board');
  var $btnConfirmArchive = $('#btnConfirmArchive');
  var $btnCancelArchive = $('#btnCancelArchive');
  var $confirmArchivePopup = $('#confirmArchivePopup');
  var idToArchive = 0;
  //Close modal
  var $successModal = $('#success-modal');
  var $modalCloseBtn = $('.btn-close-modal');
  //Edit board
  var $editButton = $('.edit-board');
  var $editPopup = $('#editPopup');
  var idToEdit = 0;


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
    console.log(idToArchive);
    //ovde logika za archive boarda
  });

  $btnCancelArchive.on('click', function() {
    $confirmArchivePopup.hide();
  });

  $modalCloseBtn.on('click',function() {
    $successModal.velocity("fadeOut",{duration: 200});
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
    closeEditPopup();
  });

  $('#btn-close-dialog-edit').on('click',function() {
    closeEditPopup();
  });

  // ---------- UPDATE BOARD --------------
  $('#editBoardForm').on('submit',function(e) {
    e.preventDefault();
    if (!validateBoardEdit($('#editBoardTitleField'))) return false;

    var updatedBoard = {
      title: $('#editBoardTitleField').val(),
      description: $('#editBoardDescriptionField').val()
    };

    $('#processing-modal').velocity("fadeIn",{duration: 100});
    $editPopup.hide();

    $('#'+idToEdit).addClass('loading');

    $.ajax({
    type: 'POST',
    data: JSON.stringify(updatedBoard),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/boards/update/'+idToEdit,
    complete: function(data) {
      console.log(data.responseJSON);
      $('#processing-modal').hide();
      $('#'+idToEdit).children('.description-wrapper').children('.description').text(data.responseJSON.description);
      $('#'+idToEdit).children('.title-wrapper').html("<h4><b>"+data.responseJSON.title+"</b></h4>")
      $('#'+idToEdit).removeClass('loading');
      $('#success-modal').velocity("fadeIn",{duration: 200});
      setTimeout(function() {
        $('#success-modal').velocity("fadeOut",{duration: 200});
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



// Functions
  function openArchivePopup(id,boardName) {
    idToArchive = isolateID(id);
    $('#nameOfBoardToDelete').text(boardName.childNodes[5].innerText.trim()); //TODO ispraviti, pravi jedan space pre poslednjeg '
    $confirmArchivePopup.show();
  }
  function openEditPopupAndPopulate(id,title,description) {
    idToEdit = isolateID(id);
    console.log(idToEdit);
    $editPopup.show();

    //Populate the editPopup
    $('#editBoardName').text(title);
    $('#editBoardTitleField').val(title);
    $('#editBoardDescriptionField').val(description);

  }

  function isolateID(id) {
    var isolatedID = id.substring(9,id.length);
    return isolatedID;
  }

  function closeEditPopup() {
    $editPopup.hide();
  }

  function validateBoardEdit(object) {
    if (object.val() == "" || object.val() == null) {
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

  // Ova funkcija postoji i u createBoard.js tako da ovo ide u jednu.
  function showInformationModal(type, title, description) {
    
  }
  
  
});
