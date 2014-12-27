
var actionMap = {
    'value': function(dom, value) {
        dom.val(value);
    },
    'text': function(dom, value) {
        dom.text(value);
    },
    
}, keyMap = {
    'name': 'value',
    'pic_url': 'value',
    'total_number': 'value',
    'points': 'value'
}, lockMap = {
    'value': function(dom, lock) {
        dom.prop('disabled', lock);
    },
    'text': function(dom, lock) {
        dom.prop('disabled', lock);
    },
};

var curstatus = 0;

function updateItem(nact) {
    var key, tdate;
    for (key in nact) {
        item[key] = nact[key];
    }
}

function initializeForm(item) {
    var key;
    for (key in keyMap) {
        actionMap[keyMap[key]]($('#input-' + key), item[key]);
    }
    if (!item.id) {
        $('#input-name').val('');
        $('#input-total_number').val(0);
        $('#input-points').val(0);
    }
}

function check_percent(p) {
    if (p > 100.0) {
        return 100.0;
    } else {
        return p;
    }
}

function changeView(id) {
    var opt = ['noscript', 'form', 'processing', 'result'], len = opt.length, i;
    for (i = 0; i < len; ++i) {
        $('#detail-' + opt[i]).hide();
    }
    $('#detail-' + id).show();
}

function showForm() {
    changeView('form');
}

function showProcessing() {
    changeView('processing');
}

function showResult() {
    changeView('result');
}

function setResult(str) {
    $('#resultHolder').text(str);
}

function appendResult(str) {
    var dom = $('#resultHolder');
    dom.text(dom.text() + str + '\r\n');
}

function lockForm() {
    var key;
    for (key in keyMap) {
        lockMap[keyMap[key]]($('#input-' + key), true);
    }
    $('#publishBtn').hide();
    $('#saveBtn').hide();
    $('#resetBtn').hide();
}



function showPublishByStatus(status, linetime) {
    if ((status >= 1) && (new Date() >= getDateByObj(linetime))) {
        $('#publishBtn').hide();
        $('#resetBtn').hide();
    } else {
        $('#resetBtn').show();
        $('#publishBtn').show();
    }
}

function showPubTipsByStatus(status){
    if(status < 1){
        $('#publishBtn').tooltip({'title': '发布后不能修改“物品名称”'});
        $('#saveBtn').tooltip({'title': '暂存后可以“继续修改”'});
    }
}



function beforeSubmit(formData, jqForm, options) {
    var i, len, nameMap = {
        'name': '物品名称',
        'total_number': '物品总数',
        'pic_url': '物品配图',
        'points': '所需积分'
    }, lackArray = [];
    for (i = 0, len = formData.length; i < len; ++i) {
        if (!formData[i].value) {
            lackArray.push(nameMap[formData[i].name]);
        }
    }
    if (lackArray.length > 0) {
        setResult('以下字段是必须的，请补充完整后再提交：\r\n' + lackArray.join('、'));
        $('#continueBtn').click(function() {
            showForm();
        });
        showResult();
        return false;
    }
    if (item.id) {
        formData.push({
            name: 'id',
            required: false,
            type: 'number',
            value: item.id.toString()
        });
    }
    return true;
}

function beforePublish(formData, jqForm, options) {
    if (beforeSubmit(formData, jqForm, options)) {
        showProcessing();
        if (item.id) {
            formData.push({
                name: 'id',
                required: false,
                type: 'number',
                value: item.id.toString()
            });
        }
        formData.push({
            name: 'publish',
            required: false,
            type: 'number',
            value: '1'
        });
        return true;
    } else {
        return false;
    }
}

function submitResponse(data) {
    if (!data.error) {
        updateItem(data.item);
        initializeForm(item);
        appendResult('成功');
    } else {
        appendResult('错误：' + data.error);
    }
    if (data.warning) {
        appendResult('警告：' + data.warning);
    }
    if (data.updateUrl) {
        $('#continueBtn').click(function() {
            window.location.href = data.updateUrl;
        });
    } else {
        $('#continueBtn').click(function() {
            showForm();
        });
    }

}

function submitError(xhr) {
    setResult('ERROR!\r\nStatus:' + xhr.status + ' ' + xhr.statusText + '\r\n\r\nResponseText:\r\n' + (xhr.responseText || '<null>'));
    $('#continueBtn').click(function() {
        showForm();
    });
}

function submitComplete(xhr) {
    showResult();
}


function publishItem() {
    if(!$('#item-form')[0].checkValidity || $('#item-form')[0].checkValidity()){
        showProcessing();
        setResult('');
        var options = {
            dataType: 'json',
            beforeSubmit: beforePublish,
            success: submitResponse,
            error: submitError,
            complete: submitComplete
        };
        $('#item-form').ajaxSubmit(options);
        return false;
    } else {
        $('#saveBtn').click();
    }
    return false;
}

initializeForm(item);
showForm();

$('#item-form').submit(function() {
    showProcessing();
    setResult('');
    var options = {
        dataType: 'json',
        beforeSubmit: beforeSubmit,
        success: submitResponse,
        error: submitError,
        complete: submitComplete
    };
    $(this).ajaxSubmit(options);
    return false;
}).on('reset', function() {
    initializeForm(item);
    return false;
});

$('.form-control').on('focus', function() {var me = $(this); setTimeout(function(){me.select();}, 100)});
