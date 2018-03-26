
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
  
  function sendLeadInfo(data) {
    var urlParams = getUrlQueryParams();
    adId = urlParams['id'];
    $.ajax({
      url: "/sendlead", 
      data: {
        "adId": adId,
        "buyerName": data['buyerName'],
        "buyerEmail": data['buyerEmail'],
        "buyerPhone": data['buyerPhone'],
        "buyerMessage": data['buyerMessage']
      },
      success: function(result){
           
        setTimeout(function() {
          location.reload();
          $this.button('reset');
          $('#exampleModal').modal('hide');
          $("#sendMessageLabel").text("Your message has been sent! Seller will contact you shortly.");
        }, 2000);  
      }});
  };

  $('#leadSubmit').on('click', function() {
    $("#MissingLeadData").text("");
    var $this = $(this);
    data = [];
    data['buyerName'] = $("#buyer-name").val();
    data['buyerPhone'] = $("#buyer-phone").val();
    data['buyerEmail'] = $("#buyer-email").val();
    data['buyerMessage'] = $("#message-text").val();

    if (
      data['buyerName'] == '' ||
      data['buyerPhone'] == '' ||
      data['buyerEmail'] == '' ||
      data['buyerMessage'] == ''
   ) {
     $("#MissingLeadData").text("All fields are required.");
   } else {      
      sendLeadInfo(data);
      $this.button('loading');
      
    }
  });

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
  
  // With JQuery
  $("#dataslide").slider();
  $("#dataslide").on("slide", function(slideEvt) {
      $("#minPrice").val(slideEvt.value[0]);
      $("#maxPrice").val(slideEvt.value[1]);
  });
});