$(document).ready(function() {
  //cache
  var $toggleSidebar = $('#toggleSidebar');
  var $sidebar = $('#sidebar');
  var $spreaded = $('#spreaded');
  var $collapsed = $('#collapsed');
  var $workspace = $('#workspace');

  var collapsed = false;
  $toggleSidebar.on('click',function() {
    if($sidebar.width() == 250) {
      collapsed = true;
      $spreaded.velocity("fadeOut",{duration:100});
      $collapsed.delay(200).velocity("fadeIn",{duration:100});
      $sidebar.css("width","80px");
      $workspace.css("margin-left","-120px");
    }
    else {
      collapsed = false;
      $collapsed.velocity("fadeOut",{duration:100});
      $spreaded.delay(200).velocity("fadeIn",{duration:100});
      $sidebar.css("width","250px");
      $workspace.css("margin-left","0");
    }

  })
})
