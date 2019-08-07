document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {'height' : 500, 'width' : 500, 'indicators' : true});
  });

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });