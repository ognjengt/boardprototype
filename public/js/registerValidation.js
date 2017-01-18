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
    }
    if (!fullNameVal) {
      e.preventDefault();
    }
    if (!userVal) {
      e.preventDefault();
    }
    if (!passVal1) {
      e.preventDefault();
    }
    if (!passVal2) {
      e.preventDefault();
    }
    if ($password1.val() != $password2.val()) {
      e.preventDefault();
      $('#matchPasswords').css("display","block");
    }
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
});
