
  //default value
  $("#selectedtype").val("Truck");
  
  $(".nav.nav-pills li").on("click",function(){
  $(".nav.nav-pills li").removeClass("active");
  $(this).addClass("active");

  //$("#typevalue").html($(this).html());

   $("#selectedtype").val($(this).text());
});

$("#ex2").slider({
              //console.log($('#ex2').val());
});

function simpleTemplating(data) {
  var html = '<ul>';
  $.each(data, function(index, item){
      html += '<li>'+ item +'</li>';
  });
  html += '</ul>';
  return html;
}

$( document ).ready(function() {
  $('#pagination-demo').twbsPagination({
    totalPages: 16,
    visiblePages: 6,
    next: 'Next',
    prev: 'Prev',
    onPageClick: function (event, page) {
        //fetch content and render here
        $('#page-content').text('Page ' + page) + ' content here';
    }
});
});