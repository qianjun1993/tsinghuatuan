var row;
var line;
var rect;

var pictureL=50;

var xmlhttp = null;
var ifchoice = 0;
var choicerow = 0;
var choiceline = 0;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var singleD;
var singleH;
var unavail;
var avail;
var chosen;
flag=0;

function hideElem(id) {
    document.getElementById(id).setAttribute('style', 'display:none');
}

function showElem(id) {
    document.getElementById(id).setAttribute('style', 'display:block');
}


function showLoading(flag) {
    if (flag) {
        showElem('helpLoading');
    } else {
        hideElem('helpLoading');
    }
}

function showError(text) {
    document.getElementById('helpSubmit').innerText = text;
    showElem('helpSubmit');
    console.log(text);
    document.getElementById('submitGroup').setAttribute('class', 'form-group has-error');
}

function getMap(s_row, s_line, s_map){
    row = eval("("+s_row+")");
    line = eval("("+s_line+")");
    var map = eval("("+s_map+")");
    //row为横行有多少即相当于高度，line为纵列有多少相当于宽度
    rect = new Array();
    for(var i = 0; i < row; i++){
        rect[i] = new Array();
        for(var j = 0; j < line; j++){
            rect[i][j] = -1;
        }
    }

 //给定三元组[R,L,S]标示第L行第R列以及状态S 
    for(var m = 0; m < map.length; m++){
        rect[map[m][0]][map[m][1]] = map[m][2];    
    }
	changecanvas();
	avail = new Image();
	avail.src = document.getElementById('available').src;
        avail.onload = function()
	{
		unavail = new Image();
		unavail.src = document.getElementById('unavailable').src; 
		unavail.onload = function()
		{
			chosen = new Image();
			chosen.src = document.getElementById('chosen').src; 
			chosen.onload = function(){drawmap();}
		}
	} 
}

function changecanvas()
{
	var testwidth=Math.floor(window.screen.width/line);
	if(testwidth<pictureL)
	{
		pictureL = testwidth;
	}
	if(pictureL<10) pictureL=10;
	canvas.width = line * pictureL
	canvas.height = row * pictureL;
	bind();
}

function drawmap()
{

    //绘制
    singleD = Math.floor(pictureL);
    singleH = Math.floor(pictureL);
    for(var i = 0; i < row; i++){
        for(var j = 0; j < line; j++){
            if(rect[i][j] == -1){
                //context.fillStyle = "#FFFFFF";
                //context.fillRect(j*singleD,i*singleH,(j+1)*singleD,(i+1)*singleH);
            }
            else if(rect[i][j] == 0){
                context.drawImage(avail, j*singleD, i*singleH, singleD, singleH);
            }
            else{
                context.drawImage(unavail, j*singleD, i*singleH, singleD, singleH);
            }
        }
    }
    document.getElementById('submitBtn').removeAttribute('disabled');        
}

function bind(){
	var canvas = document.getElementById('myCanvas');
	canvas.addEventListener("click",function(e){
                //drawmap();
		var re = canvas.getBoundingClientRect();
		var a = e.clientX - re.left * (canvas.width/re.width);
		var b = e.clientY - re.top * (canvas.height/re.height);
		var x = Math.floor(a/(pictureL));
		var y = Math.floor(b/(pictureL));
		console.log(y);
		console.log(x);
		console.log(rect[y][x]);
		if(rect[y][x] == 0 && flag == 0)
		{
			if( ifchoice == 1)
			{
				context.drawImage(avail, choiceline*singleD, choicerow *singleH, singleD, singleH);
			}
                        ifchoice = 1;
                        choicerow = y;
                        choiceline = x;
			context.drawImage(chosen, choiceline*singleD, choicerow *singleH, singleD, singleH);
		}
		else if(rect[y][x] == 1&& flag == 0)
		{
			showError('该座位已被选走2333.');
		}
	});
}

function checkseat(ticketid)
{
	if(ifchoice == 1&&rect[choicerow][choiceline] == 0)
	{
		var form = document.getElementById('seatForm'),
            	elems = form.elements,
            	url = form.action,
            	params = "ticket_uid=" + encodeURIComponent(ticketid),
            	i, len;
		flag = 1;
                params += '&' + "row=" + encodeURIComponent(choicerow);
                params += '&' + "line=" + encodeURIComponent(choiceline);
		for (i = 0, len = elems.length; i < len; ++i) {
            		params += '&' + elems[i].name + '=' + encodeURIComponent(elems[i].value);
        	}
		document.getElementById('submitBtn').setAttribute('disabled', 'disabled');
		xmlhttp = new XMLHttpRequest();
        	xmlhttp.open('POST', url , true);
        	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        	xmlhttp.onreadystatechange = readyStateChanged;
        	xmlhttp.send(params);
	}
	else
	{
		showError('请先选择座位.');
	}
        return false;
}

function readyStateChanged()
{
	if (xmlhttp.readyState==4)
	{// 4 = "loaded"
		if (xmlhttp.status==200)
		{// 200 = OK
			console.log(xmlhttp.status);
			var result = xmlhttp.responseText;
			switch (result)
			{
                		case 'Success':
					hideElem('seatHolder');
					showElem('successHolder');
					break;
				case 'Full':
					showError('该座位已被选走.');
					document.getElementById('submitBtn').removeAttribute('disabled');
					flag = 0;
					break;
				case 'Selected':
					showError('您已经选过座位.');
					context.drawImage(avail, choiceline*singleD, choicerow *singleH, singleD, singleH);
					break;
				case 'Error':
					showError('该座位已被选走1.');
					document.getElementById('submitBtn').removeAttribute('disabled');
					flag = 0;
			}
		}
                else
		{
			flag = 0;
                        showError('服务器连接异常，请稍后重试。');
         		document.getElementById('submitBtn').removeAttribute('disabled');
		}
	}
}


