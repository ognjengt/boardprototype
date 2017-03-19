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
    clearFields();

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
      $('#success-modal').velocity("fadeIn",{duration: 200});
      setTimeout(function() {
        $('#success-modal').velocity("fadeOut",{duration: 200});
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
    // idCounter++;
    // //link creationg
    // var fullBoard = document.createElement('a');
    // fullBoard.id = "linkToBoard"+idCounter;
    // //board creating
    // var grid = document.createElement('div');
    // grid.className = 'col-sm-6 col-md-4 col-lg-3';
    // var board = document.createElement('div');
    // board.className = 'board board-'+data.type+' loading'; //dodaj loading klasu
    // board.id = "createdBoard"+idCounter;
    // //dodavanje dugmeta za pin
    // var pinButton = document.createElement('div');
    // pinButton.className = 'pin';
    // var pinIcon = document.createElement('i');
    // pinIcon.className = 'pe-7s-pin'; // TODO ovde ubaciti pravu ikonicu kad nadjemo
    // //dodavanje dugmeta za more
    // var moreButton = document.createElement('div');
    // moreButton.className = 'more';
    // var moreIcon = document.createElement('i');
    // moreIcon.className = 'pe-7s-more'; // TODO ovde ubaciti pravu ikonicu kad nadjemo
    // //naslov
    // var title = document.createElement('h4');
    // var bold = document.createElement('b');
    // //bold.innerText = data.title;
    // bold.textContent = data.title; // da bi radilo na mozili
    // title.appendChild(bold);
    // //type creationg
    // var type = document.createElement('div');
    // type.className = 'type-title';
    // var h5 = document.createElement('h5');
    // var bold2 = document.createElement('b');
    // bold2.textContent = data.type;
    // h5.appendChild(bold2);
    // type.appendChild(h5);
    // //description creation
    // var description = document.createElement('p');
    // description.textContent = data.description;
    //
    // pinButton.appendChild(pinIcon);
    // moreButton.appendChild(moreIcon);
    // board.appendChild(pinButton);
    // board.appendChild(moreButton);
    // board.appendChild(title);
    // board.appendChild(type);
    // board.appendChild(description);
    // grid.appendChild(board);
    // fullBoard.appendChild(grid)
    // $('#allBoards').prepend(fullBoard);
  }
 // ova metoda se brise posto postoji jos jedna ista takva u newBoard.js
  function clearFields() {
    $('#boardType').val("");
    $('#boardTitle').val("");
    $('#boardDescription').val("");
    $('#boardTeam').val("Personal board");
    $('#boardWorkspace').val("No workspace");
  }

  function truncateText(element,startIdx,endIdx) {
    var truncated = element.substring(startIdx,endIdx);
    truncated += '...';
    return truncated;
  }

  // function updateBoardNumber() { funkcija za povecavanje broja boardova u sidebaru
  //   numBoards++;
  //   $('#numberOfBoards').text(numBoards);
  // }

  function validate(object) {
    if(object.val() == "" || object.val() == null) {
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

})
