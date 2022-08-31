const e = {
    init : function(){
        const _this = this,
            tagHtml = document.getElementsByTagName('html'),
            allElements = document.getElementsByTagName('*');

        // 공통페이지 Include
        Array.prototype.forEach.call(allElements, function(el) {
            let importUrl = el.dataset.importUrl;
            if (importUrl) {    // Html Include
                _this.includeFuc.init(el, importUrl);
            };
        });

        // 초기 실행
        _this.early(tagHtml);
    },
    early : function(tagHtml){
        const _this = this,
            _st = document.getElementsByClassName('content'),
            sth = Math.ceil((document.getElementsByClassName('active_section')[0].offsetHeight - window.innerHeight) / 100);
        let sct = 0;

        // 스크롤 이벤트
        tagHtml[0].addEventListener("wheel", (event) => {
            if( Math.sign(event.deltaY) > 0 && sct < sth ){
                sct ++;
                _st[0].style.transform = "translate3d(0px, "+ sct * -100 +"px, 0px)";
            }else if ( Math.sign(event.deltaY) < 0 && sct > 0 ){
                sct --;
                _st[0].style.transform = "translate3d(0px, "+ sct * -100 +"px, 0px)";
            };
        });
    },
    includeFuc : {
        /* 공통페이지 Include */
        init : function(el, importUrl){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', importUrl, true);
            xhttp.send();
        }
    },
};

document.addEventListener("DOMContentLoaded", function(){
    e.init();
});

