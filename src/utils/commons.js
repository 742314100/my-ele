


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



