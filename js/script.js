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

function copyToClipboard(text) {
   const elem = document.createElement('textarea');
   elem.value = text;
   document.body.appendChild(elem);
   elem.select();
   document.execCommand('copy');
   document.body.removeChild(elem);
}
