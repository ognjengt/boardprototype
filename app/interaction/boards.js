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

  //Delete board
  $archiveButton.on('click',function() {
    openArchivePopup(this.parentNode.parentNode.id,this.parentNode.parentNode.parentNode);
  });

  function openArchivePopup(id,boardName) {
    var isolatedID = id.substring(9,id.length);
    idToArchive = isolatedID;
    $('#nameOfBoardToDelete').text("'"+boardName.childNodes[5].innerText+"'"); //TODO ispraviti, pravi jedan space pre poslednjeg '
    $confirmArchivePopup.show();
  }

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

  
});
