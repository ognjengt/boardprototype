$(document).ready(function() {
  $('#workspace-content').hide();
  var processing = false;

  page('/boards',boards);

  $('nav ul a').click(function(e) {
     if($(this).children('li').hasClass('active')){
       e.preventDefault();
       return;
     }
    // nadji trenutni aktivan i zameni ga
     $('nav ul a').find('li.active').removeClass('active');
     $(this).children('li').addClass('active');

    if(processing) {
      e.preventDefault();
      return;
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
      loadContent('/boards/allBoards',"boards"); //boards predstavlja script type, ubaciti nove kada se bude drugi palio
  }

  function test() {
      showLoader();
      loadContent('/boards/test',"boards");
  }

  function test2() {
      showLoader();
      loadContent('/boards/test2',"boards");
  }

  // Load content
  function loadContent(url,scriptType) {
    //setTimeout(function(){ //odkomentarisati kada treba za testove
      $('#workspace-content').load(url,function() {
        getScripts(scriptType);
        hideLoader();
        showContent();
        processing = false;
      });
    //},1000)

  }

  // Prikazivanje loadera itd...
  function showContent() {
    $('#workspace-content').velocity("fadeIn",{duration:300});
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

  page(); //initialize the router

});
