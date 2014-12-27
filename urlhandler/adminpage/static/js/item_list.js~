/**
 * Created with PyCharm.
 * User: Epsirom
 * Date: 13-12-3
 * Time: 下午11:12
 */

function clearItems() {
    $('#tbody-Items').html('');
}

function wrapTwoDigit(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}


function getTd(para) {
    return $('<td class="td-' + para + '"></td>');
}

function expand_long_text(dom) {
    var newhtml = '', par = $(dom).parent(), refdata = par.text();
    dom = $(dom);
    refdata = refdata.substring(0, refdata.length - 3);
    newhtml = dom.attr('ref-data') + ' <a style="cursor:pointer;" ref-data="' + refdata + '" ref-hint="' + dom.text() + '" onclick="expand_long_text(this);">' + dom.attr('ref-hint') + '</a>';
    par.html(newhtml);
}

var duringbook = new Array,beforeact = new Array, duringact = new Array;

var tdMap = {
    'name': 'text',
    'total_number':'text',
    'remain_number': 'text',
    'points': 'text'
}, tdActionMap = {
    'text': function(act, key) {
        return act[key];
    }
};

function getDateByObj(obj) {
    return obj;
}



function appendItem(item) {
    var tr = $('<tr' + ((' id="'+item.id+'"')) + '></tr>'), key;
    for (key in tdMap) {
        getTd(key).html(tdActionMap[tdMap[key]](item, key)).appendTo(tr);
    }
    $('#tbody-items').append(tr);
}

function initialItems() {
    var i, len;
    for (i = 0, len =items.length; i < len; ++i) {
        appendItem(items[i]);
    }
}

clearItems();
initialItems();
