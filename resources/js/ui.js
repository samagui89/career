const ui = {
    init : function(){
        const _this = this,
            _tagHtml = document.getElementsByTagName("html");

        // 공통페이지 Include
        /* Array.prototype.forEach.call(allElements, function(el) {
            let importUrl = el.dataset.importUrl;
            if (importUrl) {    // Html Include
                _this.includeFuc.init(el, importUrl);
            };
        }); */

        // init evt
        //  _this.early(_tagHtml);
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
    early : function(_tagHtml){
        let _this = this,
            _st = 0,
            sth = 0,
            sct = 0;

        // 초기화
        _st = document.getElementsByClassName("content"),
        sth = Math.ceil((document.getElementsByClassName("selected_section")[0].offsetHeight - window.innerHeight) / 100);
        _st[0].style.transform = "translate3d(0px, 0px, 0px)";
        
        // 스크롤 이벤트
        _tagHtml[0].addEventListener("wheel", (event) => {
            if( Math.sign(event.deltaY) > 0 && sct < sth ){
                sct ++;
                _st[0].style.transform = "translate3d(0px, "+ sct * -100 +"px, 0px)";
            }else if ( Math.sign(event.deltaY) < 0 && sct > 0 ){
                sct --;
                _st[0].style.transform = "translate3d(0px, "+ sct * -100 +"px, 0px)";
            };
        });

        console.log(_tagHtml);
    },
    navClick : {
        init : function(_this, _val){
            let _activeEle = document.getElementsByClassName("selected"),
                _selectedEle = document.querySelectorAll("[data-section='" +_val+ "']"),
                _targetEle = document.getElementsByClassName("selected_section"),
                opacity = 0,
                intervalId = 0;

            intervalId = setInterval( function(){
                opacity = Number(window.getComputedStyle(_targetEle[0]).getPropertyValue("opacity"));
                if(opacity>0){
                    opacity = opacity-0.1;
                    _targetEle[0].style.opacity=opacity;
                } else {
                    clearInterval(intervalId);
                    _targetEle[0].classList.remove('selected_section');
                    _selectedEle[0].classList.add('selected_section');
                    //ui.init();
                    setTimeout(function(){
                        intervalId = setInterval( function(){
                            opacity = Number(window.getComputedStyle(_selectedEle[0]).getPropertyValue("opacity"));
                            if(opacity<1){
                                opacity = opacity+0.1;
                                _selectedEle[0].style.opacity=opacity;
                            } else {
                                clearInterval(intervalId);
                            };
                        }, 50);

                    }, 500);
                }
            }, 50);
            

            _activeEle[0].classList.remove("selected");
            _this.parentElement.classList.add("selected");

        }
    }
};

document.addEventListener("DOMContentLoaded", function(){
    ui.init();
});