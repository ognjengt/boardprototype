$(document).ready(function() {
  $('#testPostForm').submit(function(event) {
    event.preventDefault();
    var data={
      title: $('#testPostIn').val()
    };
    $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/user/addBoard',
    complete: function(data) {
      console.log(data.responseJSON);
    }

  });

    });
})
