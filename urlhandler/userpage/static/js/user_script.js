/**
 * Created by DYT on 2014/12/4.
 */
function submitbug(){
    var text = $(bug)[0].value;
	var stu_id = "";
	getStuId(stu_id);
    //alert(text);
    submit(stu_id,text,"bug");
}

function submitsuggestion(){
    var text = $(suggestion)[0].value;
	var stu_id = "";
	getStuId(stu_id);
    //alert(text);
    submit(stu_id,text,"suggestion");
}

function submitactivity(){
    var text = $(activity)[0].value;
	var stu_id = "";
	getStuId(stu_id);
    //alert(text);
    submit(stu_id,text,"activity");
}

function submit(stu_id,text,type){
    var send_packet = stu_id + "&" + type + "&" + text;
	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			alert("您的反馈结果我们已经收到，感谢您的支持。");
		}
	}
	xmlhttp.send(send_packet);
    
}

