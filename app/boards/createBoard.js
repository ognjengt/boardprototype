$(document).ready(function() {
  $('#testPostForm').submit(function(event) {
    event.preventDefault();
    var data={//ovaj data se uzima iz prave forme za dodavanje kad se ona napravi
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
      createBoard(data.responseJSON);
    }

  });

    });

  function createBoard(data) {
    var grid = document.createElement('div');
    grid.className = 'col-sm-6 col-md-4 col-lg-3';
    var board = document.createElement('div');
    board.className = 'board board-blue';
    var title = document.createElement('h4');
    var bold = document.createElement('b');
    bold.innerText = data.title;
    title.appendChild(bold);
    //ovde dodati type | workspace i description, kada se odradi bas pravi

    board.appendChild(title);
    grid.appendChild(board);
    $('#allBoards').append(grid);
  }
})
