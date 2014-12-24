/**
 * Created by DYT on 2014/12/4.
 */

var xmlhttp = null;

function hideElem(id) {
     document.getElementById(id).setAttribute('style', 'display:none');
}

function showElem(id) {
   document.getElementById(id).setAttribute('style', 'display:block');
}


function showError(groupid, helpid, text) {
    var dom = document.getElementById(helpid);
    dom.innerText = text;
    //dom.removeAttribute('hidden');
    showElem(helpid);
    document.getElementById(groupid).setAttribute('class', 'form-group has-error');
}

function disableOne(id, flag) {
    var dom = document.getElementById(id);
    if (flag) {
        dom.setAttribute('disabled', 'disabled');
    } else {
        dom.removeAttribute('disabled');
    }
}

function disableAll(flag) {
    disableOne('bug', flag);
    disableOne('suggestion', flag);
    disableOne('activity', flag);
    if(flag)
    {
        hideElem("button1");
        hideElem("button2");
        hideElem("button3");
    }
    else
    {   
        showElem("button1");
        showElem("button2");
        showElem("button3");
    }
}

function showLoading(flag) {
    //var dom = document.getElementById('helpLoading');
    if (flag) {
        //dom.removeAttribute('hidden');
        showElem('helpLoading');
        hideElem('helpSubmit');
    } else {
        //dom.setAttribute('hidden', 'hidden');
        hideElem('helpLoading');
    }
}

function readyStateChanged() {
    if (xmlhttp.readyState==4)
    {// 4 = "loaded"
        if (xmlhttp.status==200)
        {// 200 = OK
            var result = xmlhttp.responseText;
            switch (result)
            {
                case 'Success':
                    showElem('successHolder');
                    showLoading(false);
                    return;
                case 'Error':
                default:
                    showError('submitGroup', 'helpSubmit', '出现了奇怪的错误，我们已经记录下来了，请稍后重试。')
                    break;
            }
        }
        else
        {	
            showError('submitGroup', 'helpSubmit', '服务器连接异常，请稍后重试。')
        }
        showLoading(false);
        disableAll(false);
    }
}

function mysubmit(type){
    var text = document.getElementsByTagName("textarea")[type].value;
    if(text == "")
    {   
        showError('submitGroup', 'helpSubmit', '反馈内容不能为空。')
        return;
    }
    disableAll(true);
    showLoading(true);
    var form = document.getElementById('feedbackForm'),
            elems = form.elements,
            url = form.action,
            params = "weixin_id=" + encodeURIComponent(weixin_id) + '&' + "feedback_type="+encodeURIComponent(type),
            i, len;
    params += '&'+"feedback_text="+encodeURIComponent(text);
    params += '&' + elems[0].name + '=' + encodeURIComponent(elems[0].value);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url , true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange=readyStateChanged;
	xmlhttp.send(params);
}


