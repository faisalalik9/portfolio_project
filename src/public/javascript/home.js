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
    $('.project-img-top').fadeIn(300);
  },function(){
    $('.project-img-top').fadeOut(300);
  });
});

$('.project-img-div').click(function(){
  $('.hidden-project').css("transform","translateX(0)");
  // var i = 0;
  // while(i<=1){
  //   i = i + 0.001;
  //   setTimeout(function(){
  //     $('.hidden-project').css("opacity",i);
  //   },1500);
  //
  // }
  $('.hidden-project').fadeTo("slow", 1);
})
