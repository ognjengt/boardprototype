$(document).ready(function() {

  var $email = $('#emailRegister');
  var $fullName = $('#fullNameRegister');
  var $username = $('#usernameRegister');
  var $password1 = $('#passwordRegister');
  var $password2 = $('#repeatPasswordRegister');

  $email.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $email.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $fullName.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $fullName.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $username.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $username.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $password1.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $password1.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $password2.focus(function() {
    $(this).css("border-color","#0080FF");
  });
  $password2.on('blur',function() {
    $(this).css("border-color","#CCCCCC");
  });

  $('#registerButton').on('click',function(e) {
    var emailVal = validate($email);
    var fullNameVal = validate($fullName);
    var userVal = validate($username);
    var passVal1 = validate($password1);
    var passVal2 = validate($password2);

    if (!emailVal) {
      e.preventDefault();
      return false;
    }
    if (!fullNameVal) {
      e.preventDefault();
      return false;
    }
    if (!userVal) {
      e.preventDefault();
      return false;
    }
    if (!passVal1) {
      e.preventDefault();
      return false;
    }
    if (!passVal2) {
      e.preventDefault();
      return false;
    }
    if ($password1.val() != $password2.val()) {
      e.preventDefault();
      $('#matchPasswords').css("display","block");
      return false;
    }
    registering($(this));
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

  function registering(selector) {
    selector.css('opacity','0.5');
    selector.text("Registering...");
  }
});
