$(document).ready(function() {
  var idCounter = 0;
  // var numBoards = parseInt(document.getElementById('numberOfBoards').innerText); obrisati ako stvarno ne treba
  $('#addBoardForm').submit(function(event) {
    event.preventDefault();
    if(!validate($('#boardTitle'))) return false;
    var data={
      type: $('#boardType').val(),
      title: $('#boardTitle').val(),
      description: $('#boardDescription').val(),
      team: $('#boardTeam').val(),
      workspace: $('#boardWorkspace').val(),
      pinned: false,
      dateCreated: new Date()
    };
    createBoard(data);
    clearFields("addNewBoardPopup");
    showInformationModal("processing", "Creating board...", "Just a second.");

    if($('#noBoardsMsg').is(':visible')) {//ako postoji poruka da nema boardova, skloni je
      $('#noBoardsMsg').hide();
    }

    $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/boards/addBoard',
    complete: function(data) {
      console.log(data.responseJSON);
      $('#createdBoard'+idCounter).removeClass('loading');// kada se board skroz ucita stavi opacity na 1
      $('#linkToBoard'+idCounter).attr("href",data.responseJSON._id);
      $('#createdBoard'+idCounter).attr("id",data.responseJSON._id);
      $('#dropdown-'+idCounter).attr("id","dropdown-"+data.responseJSON._id);
      $('#processing-modal').hide();
      showInformationModal("success","Completed.","Succesfully created new board.");
      setTimeout(function() {
        hideInformationModal("success");
      },3500)
    }

    });

    });

  function createBoard(data) {
    idCounter++;
    if(data.title.length > 40)
      data.title = truncateText(data.title,0,40);

    if(data.description.length > 73)
      data.description = truncateText(data.description,0,73);

    var snippet = "<a id='linkToBoard"+idCounter+"'>"+"<div class='col-sm-6 col-md-4 col-lg-3'>"+"<div class='board board-"+data.type+" loading' id='createdBoard"+idCounter+"'>"+"<div class='pin'><i class='pe-7s-pin'></i></div>"+"<div class='more'><i class='pe-7s-more'></i></div>"+"<div class='title-wrapper'><h4><b>"+data.title+"</b></h4></div>"+"<div class='type-wrapper'><div class='type-title'><h5><b>"+data.type+"</b></h5></div></div>"+"<div class='description-wrapper'><p class='description'>"+data.description+"</p></div>"+"<div class='more-dropdown' id='dropdown-"+idCounter+"'>"+"<ul><li><i class='pe-7s-pen'></i> Edit</li><li><i class='pe-7s-albums'></i> Add to workspace</li><li><i class='pe-7s-users'></i> Add to team</li><hr><li id='archive-board'><i class='pe-7s-trash'></i> Archive</li></ul></div></div></div></a>";

    $('#allBoards').prepend(snippet);
  }

  // function updateBoardNumber() { funkcija za povecavanje broja boardova u sidebaru
  //   numBoards++;
  //   $('#numberOfBoards').text(numBoards);
  // }

})
