$(document).ready(function() {
  var selectedType;

  $('#btnAddNewBoard').on('click',function() {
    $('#addPopup').show();
  });

  $('.form-header').on('click',function() {
    $('#addPopup').hide();
    $('#choosingType').show();
    $('#boardDetails').hide();
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
    $('#addPopup').hide();
    $('#choosingType').show();
    $('#boardDetails').hide();
  })
});
