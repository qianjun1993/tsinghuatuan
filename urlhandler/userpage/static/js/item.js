/**
 * Created by DYT on 2014/12/23.
 */

function clearItems() {
    $('#tbody-Items').html('');
}

var tdMap = {
    'name': 'text',
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

var mycount=0;

var exitem_id=0

function getTd(para) {
    return $('<td class="td-' + para + '"></td>');
}

function initialItems() {
    var i, len;
    mycount=0;
    for (i = 0, len =items.length; i < len; ++i) {
        appendItem(items[i],i);
    }
    $('th').attr("style","width=20%");
    if(mycount>0) {$(".well").hide();}
    else $("table").hide()
}

function appendItem(item,num) {
    if(item["remain_number"] <= 0) return; 
    var tr = $('<tr' + ((' id="'+num+'"')) + '></tr>'), key;
    for (key in tdMap) {
        getTd(key).html(tdActionMap[tdMap[key]](item, key)).appendTo(tr);
    }
     $('#tbody-items').prepend(tr);
    mycount++;
}


clearItems();
initialItems();

