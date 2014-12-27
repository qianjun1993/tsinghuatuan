/**
 * Created by DYT on 2014/12/23.
 */

function clearItems() {
    $('#tbody-Items').html('');
}

var tdMap = {
    'name': 'text',
    'remain_number': 'text',
    'points': 'text',
    'pic_url':'link'
}, tdActionMap = {
    'text': function(act, key) {
        return act[key];
    },
    'link': function(act, key) {
        var link = act[key], result = [], i, len;
        
        result.push('<a href=' + link + '><span class="glyphicon glyphicon-"> 查看图片 </span></a>');
        
        return result.join('<br/>');
    }
};

var exitem_id=0

function getTd(para) {
    return $('<td class="td-' + para + '"></td>');
}

function initialItems() {
    var i, len;
    for (i = 0, len =items.length; i < len; ++i) {
        appendItem(items[i],i);
    }
    $('th').attr("style","width=20%");
}

function appendItem(item,num) {
    if(item["remain_number"] <= 0) return; 
    var tr = $('<tr' + ((' id="'+num+'"')) + '></tr>'), key;
    for (key in tdMap) {
        getTd(key).html(tdActionMap[tdMap[key]](item, key)).appendTo(tr);
    }
    if(item["points"] < mypoint)
    {
        getTd(key).html('<a id="' + num + '" class="btn btn-primary" style="padding:6px" data-toggle="modal" data-target="#myPrs" onclick="get_id(this)" role="button">兑换</a>').appendTo(tr);
        $('#tbody-items').append(tr);
    }
     $('#tbody-items').prepend(tr);
}


clearItems();
initialItems();


function get_id(obj){
    $("#alert_area").children().remove();
    exitem_id =$(obj).attr("id");
    console.log(exitem_id);
}

function get_prs(obj){
    var form = document.getElementById('validationForm'),
            elems = form.elements,
            url = form.action,
            params = "weixin_id=" + encodeURIComponent(myweixin_id);
    params += '&' + elems[0].name + '=' + encodeURIComponent(elems[0].value);
    params += '&itemid=' + encodeURIComponent(items[exitem_id]["id"]);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url , true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = readyStateChanged;
    xmlhttp.send(params);
    append_waiting("兑换中,请稍等")   
}

function readyStateChanged() {
    if (xmlhttp.readyState==4)
    {// 4 = "loaded"
        if (xmlhttp.status==200)
        {// 200 = OK
            var result = xmlhttp.responseText;
            console.log( result);
            switch (result)
            {
                case "Success":
                    append_warning("兑换成功");
                    break;
                default:
                    append_warning("兑换失败，请稍后再试");
                    break;
            }
        }
        else
        {
            append_warning("兑换失败，请稍后再试");
        }
    }
}

function append_waiting(str){
    fade_warning();
    $("#alert_area").append(
        '<div class="navbar-fixed-top" id="myWarning" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">提示</h4></div><div class="modal-body"><h4>'+ str +'</h4></div></div></div></div>'
    );
}


function append_warning(str){
    fade_warning();
    $("#alert_area").append(
        '<div class="navbar-fixed-top" id="myWarning" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" onclick="fade_warning()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">提示</h4></div><div class="modal-body"><h4>'+ str +'</h4></div><div class="modal-footer"><button type="button" class="btn btn-default" onclick="location.reload()">确定</button></div></div></div></div>'
    );
}

function fade_warning(){
    $("#alert_area").children().remove();
}

