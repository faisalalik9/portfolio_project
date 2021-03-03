function fadein(){
  $('.li-items').fadeIn(3000);
  $('.nav-list').animate({
    width: "100%"
  },{
    duration: 1000,
       specialEasing: {
           width: 'linear'
       }
  });

  $('.hidden').fadeIn(1000).removeClass('hidden');

}
var a = 1;
$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  if (scroll >= 150) {
    $('nav').addClass("navb");
  }
  if(scroll >= 1600){

    // setTimeout(function(){
    //     $('.projects-count h3').text("2");
    //   },1000);
    //
    //   setTimeout(function(){
    //     $('.projects-count h3').text("3");
    //   },1500);
    //   setTimeout(function(){
    //     $('.projects-count h3').text("4");
    //   },2000);
    //   setTimeout(function(){
    //     $('.projects-count h3').text("5");
    //   },2500);


    // $({ Counter: 1 }).animate({
    //   Counter: $('.projects-count h3').text()
    // }, {
    //   duration: 4000,
    //   easing: 'swing',
    //   step: function() {
    //     $('.projects-count h3').text(Math.ceil(this.Counter));
    //   }
    // });



    $('.projects-count').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },
        {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);

          }
        });
    });
    a = 1;

  }

});




$('.me').mouseover(function(){
  $(this).attr("src","/assets/colorme.jpeg");
  $(this).css("opacity","1");
});

$('.me').mouseleave(function(){
  $(this).attr("src","/assets/me.jpeg");
  $(this).css("opacity","0.6");
});


$(document).ready(function(){
 $('.skill-rating').click(function(){

   $(this).parent().siblings('.toggle-skill-text').toggleClass("hidden-skill-txt");
 });
});


$(function(){
  $('.project-img-top').fadeOut(300);
  $('.project-img-div').hover(function(){
    $(this).children('.project-img-top').fadeIn(300);
  },function(){
    $(this).children('.project-img-top').fadeOut(300);
  });
});

$('.project-img-div').click(function(){
  $(this).parent().css("background","white");
  $(this).addClass('height-min');
  $(this).siblings(".toggle-project-width").css("display","block");
  $(this).parent().parent().css("display","block");
  $('.project-img-bg').css("height","auto");
  $(this).parent().css("box-shadow", "0 8px 32px 0 rgba( 126, 140, 161, 0.27 )");
  $(this).siblings('.hidden-project').animate({
    width: "66.66%"
  },{
    duration: 800,
       specialEasing: {
           width: 'linear'
       }
  });
  // $('.hidden-project').css("width","903.94px");
  $(this).siblings(".toggle-project-width").fadeTo("slow",1);
  $(this).siblings('.hidden-project').fadeTo("slow", 1);
});


$('.toggle-project-width').click(function(){
  $(this).siblings('.hidden-project').animate({
    width: "0"
  },{
    duration: 800,
       specialEasing: {
           width: 'linear'
       }
  });
  $(this).siblings('.project-img-div').removeClass("height-min");
  $(this).css("display","none");
  $(this).parent().css("box-shadow", "none");
  $(this).parent().parent().css("display","flex");
  $('.project-img-bg').css("height","100%");
  $(this).parent().css("background","none");

});

$('.star-1-b').mouseover(function(){
  $('.star-1-a').css(
    "display","block");
});
$('.star-1-b').click(function(){

  $('.star-1-a').addClass("show");
  $('#star-value').val("1");
});
$('.star-1-b').mouseleave(function(){
  $('.star-1-a').css(
    "display","none");
});


$('.star-2-b').mouseover(function(){
  $('.star-1-a').css(
    "display","block");
    $('.star-2-a').css(
      "display","block");
});
$('.star-2-b').mouseleave(function(){
  $('.star-1-a').css(
    "display","none");
    $('.star-2-a').css(
      "display","none");
});
$('.star-2-b').click(function(){
  $('.star-1-a').addClass("show");
    $('.star-2-a').addClass("show");
    $('#star-value').val("2");
});



$('.star-3-b').mouseover(function(){
  $('.star-1-a').css(
    "display","block");
    $('.star-2-a').css(
      "display","block");
      $('.star-3-a').css(
        "display","block");
});
$('.star-3-b').mouseleave(function(){
  $('.star-1-a').css(
    "display","none");
    $('.star-2-a').css(
      "display","none");
      $('.star-3-a').css(
        "display","none");
});
$('.star-3-b').click(function(){
  $('.star-1-a').addClass("show");
    $('.star-2-a').addClass("show");
      $('.star-3-a').addClass("show");
      $('#star-value').val("3");
});



$('.star-4-b').mouseover(function(){
  $('.star-1-a').css(
    "display","block");
    $('.star-2-a').css(
      "display","block");
      $('.star-3-a').css(
        "display","block");
        $('.star-4-a').css(
          "display","block");
});
$('.star-4-b').mouseleave(function(){
  $('.star-1-a').css(
    "display","none");
    $('.star-2-a').css(
      "display","none");
      $('.star-3-a').css(
        "display","none");
        $('.star-4-a').css(
          "display","none");
});
$('.star-4-b').click(function(){
  $('.star-1-a').addClass("show");
    $('.star-2-a').addClass("show");
      $('.star-3-a').addClass("show");
        $('.star-4-a').addClass("show");
        $('#star-value').val("4");
});


$('.star-5-b').mouseover(function(){
  $('.star-1-a').css(
    "display","block");
    $('.star-2-a').css(
      "display","block");
      $('.star-3-a').css(
        "display","block");
        $('.star-4-a').css(
          "display","block");
          $('.star-5-a').css(
            "display","block");
});
$('.star-5-b').mouseleave(function(){
  $('.star-1-a').css(
    "display","none");
    $('.star-2-a').css(
      "display","none");
      $('.star-3-a').css(
        "display","none");
        $('.star-4-a').css(
          "display","none");
          $('.star-5-a').css(
            "display","none");
});
$('.star-5-b').click(function(){
  $('.star-1-a').addClass("show");
    $('.star-2-a').addClass("show");
      $('.star-3-a').addClass("show");
        $('.star-4-a').addClass("show");
          $('.star-5-a').addClass("show");
          $('#star-value').val("5");
});
