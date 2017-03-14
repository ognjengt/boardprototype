$(document).ready(function() {

  $('.more').on('click',function(e) {
    e.preventDefault();
    $('#dropdown-'+this.parentNode.id).show();
  });
  
});
