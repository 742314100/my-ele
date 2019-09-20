export const setStore=(name,content)=>{
    if(!name) return
    if(typeof content !== 'string'){
        content=JSON.stringify(content)
    }
    window.localStorage.setItem(name,content)
}

export const getStore=(name)=>{
    if(!name) return
    return window.localStorage.getItem(name)
}

export const removeStore=(name)=>{
    if(!name) return
    return window.localStorage.removeItem(name)
}


export const getUrlConcat =function (data){
    let dataStr=''
    let url=''
    Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+'&'
    })
    if(dataStr !== ''){
        dataStr=dataStr.substr(0,dataStr.lastIndexOf('&'))
        url=url +'?'+dataStr
    }
    return url
}

export const getImgPath = (path) => {
    //传递过来的图片地址需要处理后才能正常使用(path) {
    let suffix;
    if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
    }
    if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
    } else {
        suffix = '.png'
    }
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url
}


