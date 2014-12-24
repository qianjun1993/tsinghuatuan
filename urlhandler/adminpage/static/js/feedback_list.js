var info = [{
            id: 0,
			userid: 2000000,
			type: 0,
			context: "information num 0",
			time: "2014-12-1",
			condition: 0
		}];

var not_read=0 
var already_ignore=1
var already_pass=2
var already_punish=3
		
var bug_feedback=0 
var function_advice=1
var activity_feedback=2

var mysearch = {feed_back_state: 'not_read', feed_back_start_time: 'none', feed_back_end_time: 'none', feed_back_type: 'none'};

var change = {feed_back_id: 0000000, feed_back_state: 0};	

var xmlhttp=null;
var nowpage=0;
var myflag=0;
var mycount=20;

$("#content").attr("height","auto");
$("#content").attr("height","auto");
function init(info){
    for(var i=0;i<100;i++)
    {
		var temp = {
            id: i+1,
			userid: 2000000 + (i+1),
			type: (i%3+1),
			context: "information num " + i,
			time: "2014-12-" + (i%31+1),
			condition: (i%2)
		};
        info[i] = temp;
    }
}

function change_time_type(time){
    var char = ["年","月","日","时","分","秒"];
    var changed_time = [];
    var j = 0;
    for(i in time) {
        if(time[i] == '-'){
            changed_time[i] = char[j];
            j++;
        }
        else{
            changed_time[i] = time[i];
        }
    }
    changed_time[changed_time.length] = char[5];
    return (changed_time).join("");
}


function jump_to_pi(pagenum){
    $("#contenttable").children().remove();
    $("#info").children().remove();
    getpage(pagenum);
}

function getpagenum(pagei){
    var pagenum = Math.floor(info["0"] / 20) + 1;
    var prevpage = pagei-1;
    var nextpage = pagei+1;
    nowpage = pagei;
    if(pagei == 1)
        $('#info').append(
            "<li class='disabled'><a href='#topbar'>&laquo;上一页</a></li>"
        );
    else
        $('#info').append(
            "<li><a href='#topbar' onclick='jump_to_pi("+ prevpage +")'>&laquo;上一页</a></li>"
        );
    for(var i=1; i<=pagenum; i++)
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
    if(pagenum == 1 || pagenum == pagei)
    {
        console.log(1);
        $('#info').append(
            "<li class='disabled'><a>下一页&raquo;</a></li>"
            );
    }
    else

        $('#info').append(
            "<li><a href='#topbar' onclick='jump_to_pi("+ nextpage +")'>下一页&raquo;</a></li>"
            );
}

function changeButtonGroup(i, pagei){
	var curnum = ((pagei-1)*20+i).toString();
    var button_group="";
	switch(info[curnum]["checktype"]){
		case not_read:
			button_group = "<div id='info" + (i+(pagei-1)*20)+ "' class='btn-group'><input id='delete' type='button' class='btn btn-info' value='忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' value='采纳' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' value='处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div></li></ul>";
			break;
		case already_ignore:
			button_group = "<div id='info" + (i+(pagei-1)*20)+ "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='已忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' disabled='disabled' value='采纳' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' disabled='disabled' value='处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div>";
			break;
		case already_pass:
			button_group = "<div id='info" + (i+(pagei-1)*20)+ "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' disabled='disabled' value='已采纳' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' disabled='disabled' value='处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div>";
			break;
		case already_punish:
			button_group = "<div id='info" + (i+(pagei-1)*20)+ "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='忽略' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/><input id='pass' type='button' class='btn btn-info' disabled='disabled' value='采纳' data-toggle='modal' data-target='#myPass'onclick='ret_pass(this)'/><input id='punish' type='button' class='btn btn-info' disabled='disabled' value='已处理' data-toggle='modal' data-target='#myPunish' onclick='ret_punish(this)'/></div>";
			break;
		default:
			break;
	}
    var mytype="";
    switch(info[curnum]["ctype"])
    {
        case bug_feedback :
            mytype="Bug";
            break;
        case function_advice:
            mytype="功能";
            break;    
        case activity_feedback:
            mytype="活动";
            break;
        default:
			break;
    }
	$('#contenttable').append(
         "<ul class='list-group'><li id='info_message' class='list-group-item'><span id='student_id'>学生"+ info[curnum]["stu_id"] +"</span><span id='mytype'>  类型：" + mytype + "</span><span id='time'>  时间：    " + change_time_type(info[curnum]["time"]) + "</span></li><li class='list-group-item'>内容：     " + info[curnum]["description"]+ "</li><li class='list-group-item' style='text-align: right'>" + button_group+"</li></ul>"
    );
}


function getpage(pagei){
    if(info["0"] - (pagei-1)*20 <= 20)
    {
        for(var i=0;i<info["0"] - (pagei-1)*20;i++)
        {
           changeButtonGroup( i+1, pagei);
        }
    }
    else
    {
        for(var i=0;i<20; i++)
        {
            changeButtonGroup(i+1, pagei);
        }
    }
    getpagenum(pagei);
    gotoTop(10);
    $('html,body').animate({scrollTop:0},100);
    $('#content').height($('.mycontainer').height());
}

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
		case "已经批阅":
			s_condition = "already_ignore";
			break;
        case "已经采纳":
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
	mysearch = {feed_back_state:   s_condition  , feed_back_start_time:   s_fdate  , feed_back_end_time:   s_tdate  , feed_back_type:   s_type  };
	send_research(); 
}

function ret_delete(obj) {
    var std_id = $(obj).parent().parent().siblings("#info_message").children("#student_id").text();
    $("#del_std_id").text("您是否忽略"+std_id+"所提的建议")
    var text_id = $(obj).parent().attr("id");
    
    if($("#conf_del")) {
        $("#conf_del").attr("id", text_id);
    }
	$("#conf_del").attr("id","");
}

function ret_pass(obj){
    var std_id = $(obj).parent().parent().siblings("#info_message").children("#student_id").text();
    $("#pass_std_id").text("您是否采纳"+std_id+"所提的建议")
    var text_id = $(obj).parent().attr("id");
   
    if($("#conf_pass")) {
        $("#conf_pass").attr("id", text_id);
    }
	
	
}

function ret_punish(obj){
    var std_id = $(obj).parent().parent().siblings("#info_message").children("#student_id").text();
    $("#pnsh_std_id").text("您是否处理"+std_id+"所提的建议")
    var text_id = $(obj).parent().attr("id");
    if($("#conf_pnsh")) {
        $("#conf_pnsh").attr("id", text_id);
    }
}

function conf_del(obj){
    var tag = $(obj).attr("id");
    $(obj).attr("id","conf_del");
    delwait(tag);
}

function conf_pass(obj){
    var tag = $(obj).attr("id"); 
    $(obj).attr("id","conf_pass");
    passwait(tag);
}

function conf_pnsh(obj){
    var tag = $(obj).attr("id");
    $(obj).attr("id","conf_pnsh");
    pnshwait(tag);
}

function delwait(tag)
{
    if(myflag==1)
        return;
    myflag=1;
    var num_of_info = tag.substring(4);
	change = {feed_back_id: info[num_of_info]["id"], feed_back_state: "already_ignore"};
    send_change(tag); 
    $("#"+tag).children("#pass").attr("disabled","disabled");
    $("#"+tag).children("#delete").attr("value","正在忽略");
    $("#"+tag).children("#delete").attr("disabled","disabled");
    $("#"+tag).children("#punish").attr("disabled","disabled");
}

function passwait(tag)
{
    if(myflag==1)
        return;
    myflag=1;
    var num_of_info = tag.substring(4);
    change = {feed_back_id: info[num_of_info]["id"], feed_back_state: "already_pass"};
   send_change(tag); 
   $("#"+tag).children("#pass").attr("disabled","disabled");
    $("#"+tag).children("#pass").attr("value","正在采纳");
    $("#"+tag).children("#delete").attr("disabled","disabled");
    $("#"+tag).children("#punish").attr("disabled","disabled");
}

function pnshwait(tag)
{
    if(myflag==1)
        return;
    myflag=1;
    var num_of_info = tag.substring(4);
    change = {feed_back_id: info[num_of_info]["id"], feed_back_state: "already_punish"};
    send_change(tag); 
    $("#"+tag).children("#pass").attr("disabled","disabled");
    $("#"+tag).children("#punish").attr("value","正在处理");
    $("#"+tag).children("#delete").attr("disabled","disabled");
    $("#"+tag).children("#punish").attr("disabled","disabled");
}

 
function delsuccess(tag)
{
    $("#"+tag).children("#delete").attr("disabled","disabled");
    $("#"+tag).children("#delete").attr("value","已忽略");  
    var num_of_info = tag.substring(4);
    info[num_of_info]["checktype"]=already_ignore;
}

function passsuccess(tag)
{
    $("#"+tag).children("#pass").attr("disabled","disabled");
    $("#"+tag).children("#pass").attr("value","已采纳"); 
    var num_of_info = tag.substring(4);
    info[num_of_info]["checktype"]=already_pass; 
}

function pnshsuccess(tag)
{
    $("#"+tag).children("#punish").attr("disabled","disabled");
    $("#"+tag).children("#punish").attr("value","已处理");
    var num_of_info = tag.substring(4);
    info[num_of_info]["checktype"]=already_punish;  
}

function changeerror(tag)
{
    $("#"+tag).children("#pass").attr("disabled","");
    $("#"+tag).children("#delete").attr("disabled","");
    $("#"+tag).children("#punish").attr("disabled","");
     $("#"+tag).children("#delete").attr("value","忽略");
    $("#"+tag).children("#pass").attr("value","采纳");
    $("#"+tag).children("#punish").attr("value","处理");
}

function delete_all(){
    mycount=0;
    deletenext()
}

function deletenext(){
    if(mycount>20) return;
    var tag = "info"+((nowpage-1)*20+mycount);
    if(check(tag)){
        delwait(tag);
    }
    else 
    {
        mycount++;
        deletenext();
    }
}

function check(tag)
{
    return ($("#"+tag).children("#punish").attr("value")=="处理")&&($("#"+tag).children("#pass").attr("value")=="采纳")&&($("#"+tag).children("#delete").attr("value")=="忽略")
}

function send_research(){
    if(myflag==1)
        return;
    myflag=1;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
    var form = document.getElementById('research'),
            elems = form.elements,
            url = form.action,
            params = elems[0].name + '=' + encodeURIComponent(elems[0].value),
            i, len;
    params += "&post_type=" + encodeURIComponent(0);
	params += "&checktype="+encodeURIComponent(mysearch.feed_back_state)
    params += "&ctype="+encodeURIComponent(mysearch.feed_back_type)
    params += "&feedback_start_time="+encodeURIComponent(mysearch.feed_back_start_time)
    params += "&feedback_end_time="+encodeURIComponent(mysearch.feed_back_end_time)
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			info = eval ("(" + xmlhttp.responseText + ")");
			$("#contenttable").children().remove();
			$("#info").children().remove();
			getpage(1);
            myflag=0;
		}
	}
	xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
}

function send_change(tag){
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var form = document.getElementById('research'),
            elems = form.elements,
            url = form.action,
            params = elems[0].name + '=' + encodeURIComponent(elems[0].value),
            i, len;
    params += "&post_type=" + encodeURIComponent(1);
	params += "&feedback_id="+encodeURIComponent(change.feed_back_id)
    params += "&checktype="+encodeURIComponent(change.feed_back_state)
	xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4)
        {// 4 = "loaded"
            if (xmlhttp.status==200)
            {// 200 = OK
                var result = xmlhttp.responseText;
                myflag=0;
                mycount++;
                switch (result)
                {
                    case 'already_ignore':
                        delsuccess(tag);
                        break;
                    case 'already_pass':
                        passsuccess(tag);
                        break;
                    case 'already_punish':
                        pnshsuccess(tag);
                        break;
                    case 'Error':
                        changeerror(tag);
		        default:
                    break;
                }
                deletenext();
            }
        }
        return;
    }
	xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
}


