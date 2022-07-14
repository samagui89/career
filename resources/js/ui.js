const ui = {
    init : function(){
        const _this = this,
            allElements = document.getElementsByTagName('*');

        /* 공통페이지 Include */
        Array.prototype.forEach.call(allElements, function(el) {
            let importUrl = el.dataset.importUrl;
            if (importUrl) {    /* Html Include */
                _this.includeFuc.init(el, importUrl);
            };
        });
        /* // 공통페이지 Include */

        //_this.bgGradation.init();   // bg

        //if( document.querySelectorAll('#main-div .specific-class').length )
        // console.log( allElements.indexOf('sec_cont') );
        // console.log( allElements.getElementsByClassName('sec_cont') );
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
    bgGradation : {
        init : function(){
            const _this = this;

            _this.evtHandler();
        },
        evtHandler : function(){
            const _this = this;
            const colors = ["#225ee1", "#28d7bf", "#ac53cf", "#e7a39c"];
            const backgroundColor = "#31AFD4";
            const width = window.innerWidth;
            const height = window.innerHeight;
            const totalFrames = 1000;
            let frameCount = 0;
            let recording = false;
            let recordingStarted = false;
            let frameDelta = 0;

            let s;

            _this.setup(width, height, s, frameCount, frameDelta, totalFrames, backgroundColor, colors);

        },
        setup : function(wid, hei, s, fc, fd, tf, bgc, colors){
            const _this = this;
            canvas = createCanvas(wid, hei, WEBGL);
            noiseSeed(20);
            rectMode(CENTER);
            noStroke();
            
            let vert = document.getElementById('vertShader').innerText;
            let frag = document.getElementById('fragShader').innerText;
            s = createShader(vert, frag);

            _this.draw(wid, hei, s, fc, fd, tf, bgc, colors);
        },
        draw : function(wid, hei, s, fc, fd, tf, bgc, colors){
            fc += 1;
            fd = (2 * Math.PI * (fc % tf)) / tf;

            background(bgc);
            shader(s);
            
            s.setUniform('uResolution',[wid,hei]);
            s.setUniform('uTime',millis()/100);
            s.setUniform('uLowGpu',false);
            s.setUniform('uVeryLowGpu',false);

            s.setUniform('uSpeedColor',20.0);

            s.setUniform('uColor1',hex2rgb(colors[0]));
            s.setUniform('uColor2',hex2rgb(colors[1]));
            s.setUniform('uColor3',hex2rgb(colors[2]));
            s.setUniform('uColor4',hex2rgb(colors[3]));

            rect(0,0,width,height);

            
            const hex2rgb = (hex) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                
                return [ r / 255, g / 255, b / 255 ];
            }
        }
    }
};


document.addEventListener("DOMContentLoaded", function(){
    ui.init();

    const colors = ["#225ee1", "#28d7bf", "#ac53cf", "#e7a39c"];
    const backgroundColor = "#31AFD4";
    const width = window.innerWidth;
    const height = window.innerHeight;
    const totalFrames = 1000;
    let frameCount = 0;
    let recording = false;
    let recordingStarted = false;
    let frameDelta = 0;

    let s;

    function setup() {
    canvas = createCanvas(width, height, WEBGL);
    noiseSeed(20);
    rectMode(CENTER);
    noStroke();
    
    let vert = document.getElementById('vertShader').innerText;
    let frag = document.getElementById('fragShader').innerText;
    s = createShader(vert, frag);
    }

    function draw() {
    frameCount += 1;
    frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

    background(backgroundColor);
    shader(s);
    
    s.setUniform('uResolution',[width,height]);
    s.setUniform('uTime',millis()/100);
    s.setUniform('uLowGpu',false);
    s.setUniform('uVeryLowGpu',false);

    s.setUniform('uSpeedColor',20.0);

    s.setUniform('uColor1',hex2rgb(colors[0]));
    s.setUniform('uColor2',hex2rgb(colors[1]));
    s.setUniform('uColor3',hex2rgb(colors[2]));
    s.setUniform('uColor4',hex2rgb(colors[3]));

    rect(0,0,width,height);
    }

    const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        
        return [ r / 255, g / 255, b / 255 ];
    }
});

