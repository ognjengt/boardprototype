$(document).ready(function() {
  var $workspaceContent = $('#workspace-content'); //caching
  var firstLoad = true;
  var request;

  $workspaceContent.hide();
  var processing = false;

  page('/boards',boards);

  $('nav ul a').click(function(e) {
     if($(this).children('li').hasClass('active')){
       e.preventDefault();
       return false;
     }
    // nadji trenutni aktivan i zameni ga
    if(!processing) {
      changeActiveLink($(this));
    }


    if(processing) {
      e.preventDefault();
      return false;
    }
    processing = true;
    var route = $(this).attr('href');
    switch(route) {
      case "/boards": page('/boards',boards); break;
      case "/test":   page('/test',test); break;
      case "/test2":  page('/test2',test2); break;
    }
  });

  // Funkcije za page ruter
  function boards() {
      showLoader();
      loadContent('/boards/getAllUserBoards',"boards"); //boards predstavlja script type, ubaciti nove kada se bude drugi palio
      if(firstLoad) { //TODO ovaj firstload prebaciti u svaki , sada menjace se nece biti function test, nego workspaces pa na svaki samo da se zna na loadu sta da se aktivira sa strane
        changeActiveLink($('nav ul a:nth-child(1)'));
        firstLoad = false;
      }
  }

  function test() {
      showLoader();
      loadContent('/boards/test',"test");
  }

  function test2() {
      showLoader();
      loadContent('/boards/test2',"test2");
  }

  // Load content
  function loadContent(url,page) {
    //setTimeout(function(){ //odkomentarisati kada treba za testove
    request = $.ajax({
          url: url,
          success: function(data) {
            $workspaceContent.html(data);
            getScripts(page);
            hideLoader();
            showContent();
            processing = false;
          }
        });
    //},1000)

  }

  // Prikazivanje loadera itd...
  function showContent() {
    $workspaceContent.show();
  }
  function showLoader() {
    $('#workspace').prepend('<div id="loader">Loading ...</div>');
  }

  function hideLoader() {
    $('#loader').velocity('fadeOut', {
      duration:200,
      complete: function() {
        $('#loader').remove();
      }
    }); //ovo menjati u zavisnosti od animacije
  }

  // Getovanje skripti
  function getScripts(page) { // TODO u zavisnosti od prosledjene stranice loadovati odredjene skripte
    if(page === "boards") {
      $.getScript('../../interaction/newBoard.js');
      $.getScript('../../api/boards/createBoard.js');
      //$.getScript('../../js/velocity.js');
    }
  }

  function changeActiveLink(element) {
    $('nav ul a').find('li.active').removeClass('active');
    element.children('li').addClass('active');
  }

  page(); //initialize the router

});
