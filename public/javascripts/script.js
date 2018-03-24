
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
        