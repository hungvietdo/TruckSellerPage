
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

function getUrlQueryParams() {
  var queryParameters = {}, queryString = location.search.substring(1),
  re = /([^&=]+)=([^&]*)/g, m;
  while (m = re.exec(queryString)) {
    queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return queryParameters;

}

function reloadpage(page) {
  var urlParams = getUrlQueryParams();
  urlParams['page'] = page;
  location.search = $.param(urlParams);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

$( document ).ready(function() {

  var urlParams = getUrlQueryParams();

  if (typeof urlParams['page'] == 'undefined') {
    document.cookie = "page=1";
  }

  $('#pagination-demo').twbsPagination({
    totalPages: 16,
    visiblePages: 6,
    next: 'Next',
    prev: 'Prev',
    initiateStartPageClick:false,
    startPage:parseInt(getCookie('page')),
    onPageClick: function (event, page) {
      document.cookie = "page="+page;
      reloadpage(page);
    }
  });
  
});