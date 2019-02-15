
function $(param) {
    var element = '';
    var str = '';
    var res = param.substring(1, 0);

    if(res.localeCompare('#') == 0 || res.localeCompare('.') == 0) {
        str = param.substring(1);
    }

    switch (res) {
        case '#':
            return document.getElementById(str);
        case '.':
            return document.getElementsByClassName(str);
        default:
            return document.getElementById(param);
    }
}
