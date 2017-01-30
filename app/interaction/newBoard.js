$(document).ready(function() {
  var selectedType;

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
  })

  $('#btnCancelInput').on('click',function(e){
    e.preventDefault();
    closePopup();
  })

  function openPopup() {
    $('#addPopup').show();
    $('#workspace').hide();
  }

  function closePopup() {
    $('#addPopup').hide();
    $('#workspace').show();
    $('#choosingType').show();
    $('#boardDetails').hide();
  }
});
