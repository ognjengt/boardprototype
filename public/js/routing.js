//Global scope: these variables are needed in files such as workspaces.js for populating the boards array, in boards.js to populate teams and workspaces, and so on...
var boardArray = {};
var workspaceArray = {};


$(document).ready(function() {
  var $workspaceContent = $('#workspace-content'); //caching
  var firstLoad = true;
  var request;

  $workspaceContent.hide();
  var processing = false;

  page('/boards',boards);
  page('/workspaces',workspaces);

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
      case "/workspaces": page('/workspaces',workspaces); break;
      case "/test":   page('/test',test); break;
      case "/test2":  page('/test2',test2); break;
    }
  });

  // Funkcije za page ruter
  function boards() {
      changeActiveLink($('nav ul a:nth-child(1)'));
      changeCollapsedActive(1);
      showLoader();
      var apiEndpoints = ['/workspaces/getWorkspaces'];
      var objectsToMap = ["workspaceArray"];
      loadContent('/boards/sparender',"boards",apiEndpoints,objectsToMap); //boards predstavlja script type, ubaciti nove kada se bude drugi palio
      if(firstLoad) { //TODO ovaj firstload prebaciti u svaki , sada menjace se nece biti function test, nego workspaces pa na svaki samo da se zna na loadu sta da se aktivira sa strane
        changeActiveLink($('nav ul a:nth-child(1)'));
        firstLoad = false;
      }
  }

  function workspaces() {
    changeActiveLink($('nav ul a:nth-child(2)'));
    changeCollapsedActive(2);
    showLoader();
    var apiEndpoints = ['/boards/getBoards'];
    var objectsToMap = ["boardArray"];
    loadContent('/workspaces/sparender',"workspaces",apiEndpoints,objectsToMap);
  }

  function test() {
      changeActiveLink($('nav ul a:nth-child(6)'));
      changeCollapsedActive(6);
      showLoader();
      loadContent('/boards/test',"test");
  }

  function test2() {
      changeActiveLink($('nav ul a:nth-child(7)'));
      changeCollapsedActive(7);
      showLoader();
      loadContent('/boards/test2',"test2");
  }

  // Load content
  function loadContent(url,page,apiEndpoints,objectsToMap) {
    if (apiEndpoints[0]) { //ako postoji bar jedan endpoint ka kom gadja prodji kroz niz
      var i =0;
      apiEndpoints.forEach(function(endpoint) {

        //setTimeout(function() { //for testing purposes
        $.ajax({
          type: 'GET',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          url: endpoint,
          complete: function(data) {
            if(objectsToMap[i] == "boardArray") boardArray = data.responseJSON; // jedan nacin workarounda, da se prosledjuju stringovi i na osnovu stringa ucitava se u odredjeni array
            else if(objectsToMap[i] == "workspaceArray") workspaceArray = data.responseJSON;
            i++;
            
            if(i == apiEndpoints.length) {
              //setTimeout(function(){ //odkomentarisati kada treba za testove
              renderView(page,url);
              //},1000)
            }
          }
        });
      //}, 3000);
      
      })
    }
    else { // samo getuj page
      //setTimeout(function(){ //odkomentarisati kada treba za testove
    renderView(page,url);
    //},1000)
    }
    

  } // end function loadContent

  function renderView(page,url) {
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
      $.getScript('../../interaction/bootstrap-select-activate.js');
      $.getScript('../../interaction/boards/newBoard.js');
      $.getScript('../../interaction/boards/boards.js');
      $.getScript('../../api/boards/createBoard.js');
      $('.selectpicker').selectpicker('render');
      //$.getScript('../../js/velocity.js');
    }
    else if(page === "workspaces") {
      $.getScript('../../interaction/workspaces/workspaces.js');
    }
  }

  function changeActiveLink(element) {
    //for spreaded
    $('nav ul a').find('li.active').removeClass('active');
    element.children('li').addClass('active');
  }
  function changeCollapsedActive(elementIndex) {
    $('#collapsed ul a').find('li.active-small').removeClass('active-small');
    $('#collapsed ul a:nth-child('+elementIndex+')').children('li').addClass('active-small');
  }

  page(); //initialize the router

});
