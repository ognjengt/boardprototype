$(document).ready(function() {
  var selectedType;
  var typeText = "Choose board type that suits your needs.<br> Whether you are planing a trip, starting a new project, or need to come up with a new idea for your business.";
  var detailsText = "Ubaciti tekst u zavisnosti koji je board";

  $('#btnAddNewBoard').on('click',function() {
    openPopup();
  });

  $('.form-header').on('click',function() {
    closePopup();
  })

  $('.chosen').on('click',function() {
    selectedType = $(this).text().trim();
    $('#choosingType').hide();
    $('#boardDetails').show();
    $('#boardType').val(selectedType); // postavio getovani value u hidden field
    $('#boardDetailsHeader').text(selectedType+" board details");
    $('#chooseTypeDescription').text(detailsText);
  })

  $('#btnCancelInput').on('click',function(e){
    e.preventDefault();
    closePopup();
  })

  function openPopup() {
    $('#addPopup').fadeIn();
    $('#pageContent').hide();
  }

  function closePopup() {
    $('#addPopup').hide();
    $('#pageContent').show();
    $('#choosingType').show();
    $('#boardDetails').hide();
    $('#chooseTypeDescription').html(typeText);
  }
});
