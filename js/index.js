// 페이지 로드가 완료되었을 때 로딩 모달 숨김
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.getElementById('intro').classList.add('hidden');
    }, 1500);
  });



window.addEventListener("wheel", function(e){
    e.preventDefault();
},{passive : true});

var mHtml = $("html");
var page = 1;

mHtml.animate({scrollTop : 0}, 10);

$(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if(page == 4) return;
        page++;
    } else if(e.originalEvent.deltaY < 0) {
        if(page == 1) return;
        page--;
    }
    var posTop = (page-1) * $(window).height();
    mHtml.animate({scrollTop : posTop});
});

// 
$(document).ready(function() {
    $(".gnb li a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var target = $(hash);
            if(target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 800, function(){
                    window.location.hash = hash;
                });
            }
        }
    });
});


// section2 글씨 scroll
$(document).ready(function() {
    // 클래스가 "scroll_on"인 모든 요소를 선택합니다.
    const $counters = $(".scroll_on");
    
    // 노출 비율(%)과 애니메이션 반복 여부(true/false)를 설정합니다.
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const loop = true; // 애니메이션 반복 여부를 설정합니다. (true로 설정할 경우, 요소가 화면에서 사라질 때 다시 숨겨집니다.)

    // 윈도우의 스크롤 이벤트를 모니터링합니다.
    $(window).on('scroll', function() {
        // 각 "scroll_on" 클래스를 가진 요소에 대해 반복합니다.
        $counters.each(function() {
            const $el = $(this);
    
            // 요소의 위치 정보를 가져옵니다.
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const contentHeight = rect.bottom - rect.top; // 요소의 높이
            
            // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
            if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                $el.addClass('active');
            }
            // 요소가 화면에서 완전히 사라졌을 때 처리합니다.
            if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                $el.removeClass('active');
            }
        });
    }).scroll();
});




