$(document).ready(function() {
  $('#addBoardForm').submit(function(event) {
    event.preventDefault();
    var data={//ovaj data se uzima iz prave forme za dodavanje kad se ona napravi
      type: $('#boardType').val(),
      title: $('#boardTitle').val(),
      description: $('#boardDescription').val(),
      goal: $('#boardGoal').val(),
      team: $('#boardTeam').val(),
      workspace: $('#boardWorkspace').val(),
      pinned: false,
      dateCreated: new Date()
    };

    createBoard(data);
    // TODO mozda ovde pozvati funkciju createBoard, zato sto npr na laptopu treba jedno par sekundi da se to napravi.
    $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/boards/addBoard',
    complete: function(data) {
      console.log(data.responseJSON);
      $('#addPopup').hide();
      $('#pageContent').show();
    }

  });

    });

  function createBoard(data) {
    var grid = document.createElement('div');
    grid.className = 'col-sm-6 col-md-4 col-lg-3';
    var board = document.createElement('div');
    board.className = 'board board-'+data.type;
    var title = document.createElement('h4');
    var bold = document.createElement('b');
    //bold.innerText = data.title;
    bold.textContent = data.title; // da bi radilo na mozili
    title.appendChild(bold);
    //type creationg
    var type = document.createElement('div');
    type.className = 'type-title';
    var h5 = document.createElement('h5');
    var bold2 = document.createElement('b');
    bold2.textContent = data.type;
    h5.appendChild(bold2);
    type.appendChild(h5);
    //description creation
    var description = document.createElement('p');
    description.textContent = data.description;

    board.appendChild(title);
    board.appendChild(type);
    board.appendChild(description);
    grid.appendChild(board);
    $('#allBoards').append(grid);
  }
})
