$(document).ready(function(){
   $('.sidenav').sidenav();
 });

 $(document).ready(function(){
    $('.parallax').parallax();
  });

$(document).ready(function(){
    $('.carousel').carousel();
  });

$(document).ready(function(){
  $('.modal').modal();
});

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
