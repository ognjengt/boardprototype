$(document).ready(function() {
  var $username = $('#usernameLogin');
  var $password = $('#passwordLogin');

  $username.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $username.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $password.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $password.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $('#signInButton').on('click',function(e) {
    var userVal = validate($username);
    var passVal = validate($password);

    if (!userVal) {
      e.preventDefault();
      return false;
    }
    else {
      if (!passVal) {
        e.preventDefault();
        return false;
      }
    }
    loggingIn($(this));
  });

  function validate(object) {
    if (object.val() == "" || object.val() == null) {
      object.css("border-color","#e74c3c");
      object.addClass("animated shake");
      setTimeout(function() {
        object.removeClass("animated shake");
      },1000);
      return false;
    }
    else {
      object.css("border-color","none");
      object.removeClass("animated shake");
      return true;
    }
  }

  function loggingIn(selector) {
    selector.css('opacity','0.5');
    selector.text("Signing in...");
  }
});
