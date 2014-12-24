//消息数组
var info = [{
            id: 0,
            userid: 2000000,
            type: "",
            context: "information num 0",
            time: "2014-12-1",
            condition: "not_read"
        }];

//查询的发送报        
var search = "{feed_back_state: none, feed_back_start_time: none, feed_back_end_time: none, feed_back_type: none}";

//修改的发送报
var change = "{feed_back_id: 0000000, feed_back_state: 0}";    

//测试用init
function init(info){
    var s_condition = "";
    for(var i=0;i<100;i++)
    {    
        switch(i%4){
            case 0 :
                s_condition = "not_read";
                break;
            case 1:
                s_condition = "already_ignore";
                break;
            case 2:
                s_condition = "already_pass";
                break;
            case 3:
                s_condition = "already_punish";
                break;
            default:
                break;
        }
        var temp = {
            id: i+1,
            userid: 2000000 + (i+1),
            type: (i%3+1),
            context: "information num " + i,
            time: "2014-12-" + (i%31+1),
            condition: s_condition
        };
        info[i] = temp;
    }
}

//跳转到第X页
function jump_to_pi(pagenum){
    $("#content").children().remove();
    $("#info").children().remove();
    getpage(pagenum);
}

//获取页面页脚按钮
function getpagenum(pagei){
    var pagenum = info.length / 20 + 1;
    var prevpage = pagei-1;
    var nextpage = pagei+1;
    if(pagei == 1)
        $('#info').append(
            "<li class='disabled'><a href='#topbar'>&laquo;上一页</a></li>"
        );
    else
        $('#info').append(
            "<li><a href='#topbar' onclick='jump_to_pi("+ prevpage +")'>&laquo;上一页</a></li>"
        );
    for(var i=1; i<pagenum; i++)
    {
        if(i==pagei)
            $('#info').append(
                "<li onclick='jump_to_pi(" + i + ")' id='page" + i + "'><a style='background-color: darkgrey' href='#topbar'>" + i + "<span class='sr-only'>(current)</span></a></li> "
            );
        else
            $('#info').append(
                "<li onclick='jump_to_pi(" + i + ")' id='page" + i + "'><a href='#topbar'>" + i + "<span class='sr-only'>(current)</span></a></li> "
            );
    }
    if(pagenum == 1 || pagenum == pagei+1)
        $('#info').append(
            "<li class='disabled'><a>下一页&raquo;</a></li>"
            );
    else
        $('#info').append(
            "<li><a href='#topbar' onclick='jump_to_pi("+ nextpage +")'>下一页&raquo;</a></li>"
            );
}

//更新按钮组的函数
function changeButtonGroup(button_group, i, pagei){
    var curnum = (pagei-1)*20+i;
    switch(info[curnum].condition){
        case "not_read":
            button_group = "<div id='info" + i + "' class='btn-group'><input id='delete' type='button' class='btn btn-info' value='忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' value='通过' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' value='处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div></li></ul>";
            break;
        case "already_ignore":
            button_group = "<div id='info" + i + "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='已忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' disabled='disabled' value='通过' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' disabled='disabled' value='处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div></li></ul>";
            break;
        case "already_pass":
            button_group = "<div id='info" + i + "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' disabled='disabled' value='已通过' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' disabled='disabled' value='处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div></li></ul>";
            break;
        case "already_punish":
            button_group = "<div id='info" + i + "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' disabled='disabled' value='通过' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' disabled='disabled' value='已处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div></li></ul>";
            break;
        default:
            break;
    }
    $('#content').append(
        "<ul class='list-group'><li id='student_id' class='list-group-item'>学号："+ info[curnum].userid +"</li><li class='list-group-item'>类型：" + info[curnum].type + "</li><li class='list-group-item'>内容：     " + info[curnum].context + "</li><li class='list-group-item'>时间：    " + info[curnum].time + "</li><li class='list-group-item' style='text-align: right'>" + button_group
    );
}

//获取当前页面内容
function getpage(pagei){
    //init(info);
    var button_group = "";
    if(info.length - (pagei-1)*20 <= 20)
        for(var i=0;i<info.length - (pagei-1)*20;i++)
        {
            changeButtonGroup(button_group, i, pagei);
        }
    else
        for(var i=0;i<20; i++)
        {
            changeButtonGroup(button_group, i, pagei);
        }
    getpagenum(pagei);
    gotoTop(10);
    $('html,body').animate({scrollTop:0},100);
}

//回到顶部
function gotoTop(min_height){
    var gotoTop_html = '<div id="gotoTop"><span class="glyphicon glyphicon-arrow-up"> 返回顶部</span></div>';
    $("#topbar").append(gotoTop_html);
    $("#gotoTop").click(
        function(){$('html,body').animate({scrollTop:0},700);
    }).hover(
        function(){$(this).addClass("hover");},
        function(){$(this).removeClass("hover");
    });
    min_height ? min_height = min_height : min_height = 600;
    $(window).scroll(function(){
        var s = $(window).scrollTop();
        if( s > min_height){
            $("#gotoTop").fadeIn(100);
        }else{
            $("#gotoTop").fadeOut(200);
        };
    });
}

//查询按钮执行
function ret_info(){
    var message = $("#message_type");
    var condition = $("#read_or_not");
    var $fromDate = $("#fromDate");
    var $toDate = $("#toDate");
    
    var s_type = "-1";
    switch(message.val()){
        case "请选择查询类别" : 
            s_type = "none";
            break;
        case "Bug反馈" :
            s_type = "bug_feedback";
            break;
        case "功能建议" :
            s_type = "function_advice";
            break;
        case "活动反馈" :
            s_type = "activity_feedback";
            break;
        default :
            break;
    }
    var s_condition = "-1";
    switch(condition.val()){
        case "全部":
            s_condition = "none";
            break;
        case "尚未批阅":
            s_condition = "not_read";
            break;
        case "已经忽略":
            s_condition = "already_ignore";
            break;
        case "已经通过":
            s_condition = "already_pass";
            break;
        case "已经处理":
            s_condition = "already_punish";
            break;
        default:
            break;
    }
    var s_fdate = "-1";
    switch(fromDate.value){
        case "" : 
            s_fdate = "none";
            break;
        default :
            s_fdate = fromDate.value + " 00:00:00";
            break;
    }
    var s_tdate = "-1";
    switch(toDate.value){
        case "" : 
            s_tdate = "none";
            break;
        default :
            s_tdate = toDate.value + " 00:00:00";
            break;
    }
    if(s_fdate > s_tdate){
        alert("起始日期应当小于结束日期");
        return;
    }
    search = "{feed_back_state: " + s_condition + ", feed_back_start_time: " + s_fdate + ", feed_back_end_time: " + s_tdate + ", feed_back_type: " + s_type + "}";
    //send_research(); 发送部分
}

//忽略按钮
function ret_delete(obj) {
    var std_id = $(obj).parent().parent().siblings("#student_id").text();
    $("#del_std_id").text(std_id)
    var text_id = $(obj).parent().attr("id");
    var temp_text_id = "text_" + text_id;
    $(obj).parent().attr("id",temp_text_id);
    if($("#conf_del")) {
        $("#conf_del").attr("id", text_id);
    }
    
    //adding
    var num_of_info = Number(text_id.substring(4));
    change = "{feed_back_id: " + info[num_of_info].id + " feed_back_state: 0}";    
    //send_change(); 发送部分
}

//通过按钮
function ret_pass(obj){
    var std_id = $(obj).parent().parent().siblings("#student_id").text();
    $("#pass_std_id").text(std_id)
    var text_id = $(obj).parent().attr("id");
    var temp_text_id = "text_" + text_id;
    $(obj).parent().attr("id",temp_text_id);
    if($("#conf_pass")) {
        $("#conf_pass").attr("id", text_id);
    }
    
    //adding
    var num_of_info = Number(text_id.substring(4));
    change = "{feed_back_id: " + info[num_of_info].id + " feed_back_state: 1}";    
    //send_change(); 发送部分
}

//处理按钮
function ret_punish(obj){
    var std_id = $(obj).parent().parent().siblings("#student_id").text();
    $("#pnsh_std_id").text(std_id)
    var text_id = $(obj).parent().attr("id");
    var temp_text_id = "text_" + text_id;
    $(obj).parent().attr("id",temp_text_id);
    if($("#conf_pnsh")) {
        $("#conf_pnsh").attr("id", text_id);
    }
    
    //adding
    var num_of_info = Number(text_id.substring(4));
    change = "{feed_back_id: " + info[num_of_info].id + " feed_back_state: 2}";    
    //send_change(); 发送部分
}

//消息框3个按钮的更新函数
function conf_del(obj){
    var del = $(obj).attr("id");
    del = "#text_" + del;
    $(del).children("#delete").attr("disabled","disabled");
    $(del).children("#delete").attr("value","已忽略");
    $(obj).attr("id","conf_del");
    $(del).children("#pass").attr("disabled","disabled");
    $(del).children("#punish").attr("disabled","disabled");
}
function conf_pass(obj){
    var pass = $(obj).attr("id");
    pass = "#text_" + pass;
    $(pass).children("#pass").attr("disabled","disabled");
    $(pass).children("#pass").attr("value","已通过");
    $(obj).attr("id","conf_pass");
    $(pass).children("#delete").attr("disabled","disabled");
    $(pass).children("#punish").attr("disabled","disabled");

}
function conf_pnsh(obj){
    var pnsh = $(obj).attr("id");
    pnsh = "#text_" + pnsh;
    $(pnsh).children("#punish").attr("disabled","disabled");
    $(pnsh).children("#punish").attr("value","已处理");
    $(obj).attr("id","conf_pnsh");
    $(pnsh).children("#pass").attr("disabled","disabled");
    $(pnsh).children("#delete").attr("disabled","disabled");
}

//忽略全部按钮的函数
function delete_all(){
    $("#content #delete").attr("disabled","disabled");
    $("#content #delete").attr("value","已忽略");
    $("#content #pass").attr("disabled","disabled");
    $("#content #punish").attr("disabled","disabled");
}

//发送查询数据报
function send_research(){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            info = eval ("(" + xmlhttp.responseText + ")");
            $("#content").children().remove();
            $("#info").children().remove();
            getpage(1);
        }
    }
    xmlhttp.open("POST",url,true);//未指明url????
    xmlhttp.send(search);
}

//发送更改数据报
function send_change(){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            
        }
    }
    xmlhttp.open("POST",url,true);//未指明url????
    xmlhttp.send(change);
}
