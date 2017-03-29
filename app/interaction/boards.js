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

  $editButton.on('click',function() { //TODO uzeti iz baze od ovog boarda workspace i tim, mozda cak i description i type, da se ne bakcem sa htmlom ovde 
    openEditPopupAndPopulate(this.parentNode.parentNode.id);
  });


// Functions
  function openArchivePopup(id,boardName) {
    idToArchive = isolateID(id);
    $('#nameOfBoardToDelete').text("'"+boardName.childNodes[5].innerText+"'"); //TODO ispraviti, pravi jedan space pre poslednjeg '
    $confirmArchivePopup.show();
  }
  function openEditPopupAndPopulate(id) {
    idToEdit = isolateID(id);
    console.log(idToEdit);
    $editPopup.velocity("fadeIn");
    $('#pageContent').hide();
  }

  function isolateID(id) {
    var isolatedID = id.substring(9,id.length);
    return isolatedID;
  }

  
  
});
