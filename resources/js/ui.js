const ui = {
    init : function(){
        const _this = this,
            tagHtml = document.getElementsByTagName('html'),
            allElements = document.getElementsByTagName('*');

        /* 초기 실행 */
       //  _this.early(tagHtml);

        /* 공통페이지 Include */
        Array.prototype.forEach.call(allElements, function(el) {
            let importUrl = el.dataset.importUrl;
            if (importUrl) {    /* Html Include */
                _this.includeFuc.init(el, importUrl);
            };
        });
    },
    early : function(tagHtml){
        const _this = this;
        tagHtml.addEventListener("Wheel", _this.scrollEvt.init(event));
    },
    scrollEvt : {
        init : function(event){
            let y = event.deltaY;
        }
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
    ui.init();
});

