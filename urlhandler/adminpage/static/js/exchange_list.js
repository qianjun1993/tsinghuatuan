var info = [{
	stu_id: "20000000",
	item_name: "雨伞",
	checktype: 0,
	id: "1111"
	}];
	
var not_send = 0;
var already_send = 1;

var mysearch = {exchange_stu_id:"none", exchange_checktype:"0"};

var change = {exchange_id:"none"};

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
            stu_id: (2000000+i),
			item_name: "雨伞",
			checktype: (i%2),
			id: "1111"
		};
        info[i] = temp;
    }
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
		case not_send:
			button_group = "<div id='info" + (i+(pagei-1)*20)+ "' class='btn-group'><input id='delete' type='button' class='btn btn-info' value='确认发放' data-toggle='modal' data-target='#myDelete' onclick='ret_delete(this)'/></div>"//</li></ul>";
			break;
		case already_send:
			button_group = "<div id='info" + (i+(pagei-1)*20)+ "' class='btn-group'><input id='delete' type='button' class='btn btn-info' disabled='disabled' value='已发放' data-toggle='modal' data-target='#myDelete'/></div>";
			break;
		default:
			break;
	}
	$('#contenttable').append(
         "<ul class='list-group'><li id='info_message' class='list-group-item'><span id='student_id'>学生"+ info[curnum]["stu_id"] + "</span><span id='item_id'>奖品：     " + info[curnum]["name"]+ "</span><span id='button_id' style='text-align: right'>" + button_group+"</li></ul>"
    );
}


function getpage(pagei){
    if(info["0"]==0)
    {
        $('#contenttable').append("<ul class='list-group'><li id='tips' class='list-group-item'>目前尚没有未处理的兑换消息"+"</li></ul>")
        $('.mycontainer').height($('.col-xs-10').height());
        $('#content').height($('.mycontainer').height());
        return;
    }
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
    $('.mycontainer').height($('.col-xs-10').height());
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
    var stu_id = $("#stu_id")[0];
    var send_or_not = $("#send_or_not")[0];
	
	var exchange_stu_id = stu_id.value;
	if(exchange_stu_id == "")
		exchange_stu_id = "none";
	var exchange_checktype = "-1";
	switch(send_or_not.value){
		case "全部" : 
			exchange_checktype = "-1";
			break;
		case "尚未领取" : 
			exchange_checktype = "0";
			break;
		case "已经领取" : 
			exchange_checktype = "1";
			break;
		default :
			exchange_checktype = "-1";
			break;
	}
	
	
	mysearch = {exchange_stu_id:exchange_stu_id, exchange_checktype:exchange_checktype};
	send_research(); 
}

function ret_delete(obj) {
    var std_id = $(obj).parent().parent().siblings("#info_message").children("#student_id").text();
    $("#get_std_id").text("您是否确认已给"+std_id+"发送了奖品")
    var text_id = $(obj).parent().attr("id");
    
    if($("#conf_del")) {
        $("#conf_del").attr("id", text_id);
    }
	$("#conf_del").attr("id","");
}

function conf_del(obj){
    var tag = $(obj).attr("id");
    $(obj).attr("id","conf_del");
    delwait(tag);
}

function delwait(tag)
{
    if(myflag==1)
        return;
    myflag=1;
    var num_of_info = tag.substring(4);
	change = {exchange_id:info[num_of_info]["id"]};
    send_change(tag); 
    $("#"+tag).children("#delete").attr("value","正在处理");
    $("#"+tag).children("#delete").attr("disabled","disabled");
}

 
function delsuccess(tag)
{
    $("#"+tag).children("#delete").attr("disabled","disabled");
    $("#"+tag).children("#delete").attr("value","已发放");  
    var num_of_info = tag.substring(4);
    info[num_of_info]["checktype"]=already_send;
}

function changeerror(tag)
{
    $("#"+tag).children("#delete").attr("disabled","");
     $("#"+tag).children("#delete").attr("value","确认发放");
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
    return ($("#"+tag).children("#punish").attr("value")=="确认发放");
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
	params += "&exchange_stu_id="+encodeURIComponent(mysearch.exchange_stu_id)
    params += "&exchange_checktype="+encodeURIComponent(mysearch.exchange_checktype)
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
	params += "&exchange_id="+encodeURIComponent(change.exchange_id)
    console.log(params);
	xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4)
        {// 4 = "loaded"
            if (xmlhttp.status==200)
            {// 200 = OK
                var result = xmlhttp.responseText;
                myflag=0;
                mycount++;
                console.log(result)
                switch (result)
                {
                    
                    case 'Success':
                        delsuccess(tag);
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


