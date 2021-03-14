export function concatUrl(url, part){
    if(url[url.length -1] === '/') return url + part;
    return url + '/' + part;
}