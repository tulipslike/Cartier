$(function(){
  //전역 변수 선언
  var sp = 1000,
      easing = 'easeOutBounce',
      index = 0,
      $modal = $('#modal');
  
  $('article')
  .on('mouseenter', function(){
    var $this = $(this),
        $video = $this.find('video'),
        movie = $video.get(0);
        
    $this.stop().animate({
      width: 20 + '%'
    }, sp, function(){
      $this.find('h4')
      .stop().animate({right: 10}, sp*0.5)
      .delay(sp*3)
      .animate({right: -200}, sp*0.5);
      
      $this.find('h4 + p')
      .stop().animate({right: 10}, sp*0.8)
      .delay(sp*3)
      .animate({right: -200}, sp*0.5)
    });
    
    //비디오 요소 보임
    $video.stop().animate({opacity: 1}, sp);
    
    //동영상 재생 + 시작 시간(초)
    movie.currentTime = 0;
    movie.play();
  })
  .on('mouseleave', function(){
    var $this = $(this),
        $video = $this.find('video'),
        movie = $video.get(0);
    
    $(this).stop().animate({
      width: 12 + '%'
    }, sp);
    
    $this.find('h4, h4 + p')
      .stop().animate({right: -200}, sp*0.5)
    
    $video.stop().animate({opacity: 0}, sp);
    movie.pause();
    
  })
  .on('click', function(){
    
    index = $(this).index();
    
    var $vid = $modal.find('.vid'),
        $video = $vid.find('video'),
        movie = $video.eq(index).get(0);
    
    //모달 나타내기!
    $modal.slideDown(sp, easing);
    
    //실제 동영상을 처음부터 재생하기
    movie.currentTime = 0;
    movie.play();
    
    $video.eq(index)
    .css({display: 'block', zIndex: 1})
    .prop({muted: false, controls: true})
    
  })
  
  //닫기 버튼
  $modal.on('click', '.close-btn', function(){
    //모달 페이드 아웃
    $modal.fadeOut();
    //비디오 숨김 + 소리 끔
    $modal.find('video')
    .css({display: 'none', zIndex: 0})
    .prop({muted: true});
    
    //동영상 멈춤
    var movie = $modal.find('video').eq(index).get(0);
    movie.pause();
  });
  
});












