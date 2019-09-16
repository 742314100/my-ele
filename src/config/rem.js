(function (doc,win) {
    var docEl=doc.documentElement,
        resizeEvt='orientationchange' in window ? 'orientationchange' :
            'resize',
        recale=function(){
            var clientWidth=docEl.clientWidth
            if(!clientWidth) return
            docEl.style.fontSize=20*(clientWidth/320)+'px'
        }
        if(!doc.addEventListener) return
        win.addEventListener(resizeEvt,recale,false)
        doc.addEventListener('DOMContentLoaded',recale,false)
})(document,window)











