(function () {
	//console.log('pajet runs');
	var allElForWas = document.getElementsByTagName("*");
	var NgbUserEvent = new __NgbUserEvent();
	var NgbBrowser = new __NgbBrowser();
	function getObjectList()
	{
		var objectEl = document.getElementsByTagName("object");
		var embedEl = document.getElementsByTagName("embed");
	}
	function getImgTagList()
	{
		var summary = '<div class="sum">';
		var imgEl = document.getElementsByTagName("img");
		var inputEl = document.getElementsByTagName("input");
		var returnValue = [];
		returnValue.push("<h2>1. 적절한 대체 텍스트 제공</h2>");
	
		if(imgEl.length != 0)
		{
			returnValue.push('<ul id="imageList">');
			mapEl = document.getElementsByTagName("map");
			mapElCount = mapEl.length;
			for (var i=0; i<imgEl.length; i++) 
			{
				if(imgEl[i].getAttribute("alt") == null)
				{
					returnValue.push("<li class=\"fail\"><img src=\""+imgEl[i].src+"\" class=\"imageItem\" /> : alt 미정의");
				}
				else if(imgEl[i].getAttribute("alt") =="")
				{
					returnValue.push("<li class=\"warning\"><img src=\""+imgEl[i].src+"\" class=\"imageItem\" /> : alt가 빈값");
				}
				else
				{
					returnValue.push("<li><img src=\""+imgEl[i].src+"\" class=\"imageItem\" alt=\""+imgEl[i].getAttribute("alt")+"\" /> : "+imgEl[i].getAttribute("alt"));
				}
				
				if(imgEl[i].getAttribute("usemap") && imgEl[i].getAttribute("usemap") != null)
				{
					returnValue.push("<h3>이미지 맵의 사용</h3>");
					var mapValue = imgEl[i].getAttribute("usemap").replace("#",'');
					returnValue.push("<p>");
					for(var l=0;l<mapElCount;++l)
					{
						if(mapEl[l].getAttribute("name")== mapValue)
						{
							areaEl = mapEl[l].getElementsByTagName("area");
							for(var m=0;m<areaEl.length;++m)
							{
								returnValue.push(areaEl[m].getAttribute("alt")+", ");
							}
						}
					}
					returnValue.push("</p>");
				}
				
				if(imgEl[i].getAttribute("longdesc") && imgEl[i].getAttribute("longdesc") != null)
				{
					returnValue.push("<p>");
					returnValue.push("<a href=\""+imgEl[i].getAttribute("longdesc")+"\">Long description link</a>");
					returnValue.push("</p>");
				}
				returnValue.push(generateRadioBtn('img', i, imgEl[i].src));
				returnValue.push("</li>");
			}
			returnValue.push('</ul>');
			summary += '<p>이 페이지 내의 IMG 요소는' + imgEl.length +'개입니다.</p>';
		}
		else
		{
			summary += '<p>이 페이지 내의 IMG 요소는 0 개입니다.</p>';
		}
		var countImgInput = 0;
		if(inputEl.length>0)
		{
			returnValue.push("<ul style='margin-top:20px;'>");
			for(var j=0;j<inputEl.length;++j)
			{
				var getTypeInput = (inputEl[j].getAttribute("type")!=null)?inputEl[j].getAttribute("type").toLowerCase():"text";
				if(getTypeInput=="image")
				{
					returnValue.push("<li><img src=\""+inputEl[j].src+"\" class=\"imageItem\" alt=\""+inputEl[j].getAttribute("alt")+"\" /> : "+inputEl[j].getAttribute("alt")+"</li>");
					returnValue.push(generateRadioBtn('inputimg', j, inputEl[j].src));
					countImgInput++;
				}
			}
			returnValue.push("</ul>");
		}
		summary += '<p>이 페이지 내의 AREA 요소는 ' + document.getElementsByTagName("area").length +'개입니다.</p>';
		summary += '<p>이 페이지 내의 input[type="image"] 요소는 ' + countImgInput +' 개입니다.</p>';
		summary += '</div>'
		return returnValue.join('') + summary;
	}
	function checkBackgroundImg()
	{
		var returnValue = "<h2>1. 적절한 대체 텍스트 제공(배경사용여부)</h2>";
		returnValue += "<p><button onclick='toggleImageOutline()'>Toggle image outline</button></p>";
		returnValue += "<p><button onclick='togglebgimage()'>Turn on.off background Image</button></p>";
		// TODO: 갯수를 수동으로 입력할 수 있게...
		return returnValue;
	}
	var isImageOutlineToggled;
	window.toggleImageOutline = function () {
		var imgEl = document.getElementsByTagName("img");
		if (isImageOutlineToggled) {
			for (var i=0; i<imgEl.length; i++)
			{
				imgEl.item(i).style.outline = 'none';
				isImageOutlineToggled = false;
			}
		} else {
			for (var i=0; i<imgEl.length; i++)
			{
				imgEl.item(i).style.outline = '1px solid #000';
				isImageOutlineToggled = true;
			}
		}
	}
	var isBackgroundImageStatus=true;
	var tempSaveBg = new Array();
	window.togglebgimage = function () {
		if(isBackgroundImageStatus)
		{
			tempSaveBg = new Array();
			for (var i =0;i<allElForWas.length;++i)
			{
				var getBackgroundImage = getStyle(allElForWas[i],"backgroundImage");
				if(getBackgroundImage !="none")
				{
					tempSaveBg[i] = getBackgroundImage;
					allElForWas[i].style.backgroundImage = "none";
				}
			}
			isBackgroundImageStatus = false
		} else {
			for (var i =0;i<allElForWas.length;++i)
			{
				if(tempSaveBg[i]!=null)
				{
					allElForWas[i].style.backgroundImage = tempSaveBg[i]
				}
			}
			isBackgroundImageStatus = true;
		}
	}
	
	//movie list
	function getMovieList() {
		var template = [];
		var objectEl = document.getElementsByTagName('object');
		var embedEl = document.getElementsByTagName('embed');
		var els;
		
		//console.log(objectEl);
		//console.log(embedEl);

		template.push(generateRadioBtn('movie', 0, 'skipnav'));

		return template.join('');
	}	

	//get #link
	function getSkipNav() {
		var aEl = document.getElementsByTagName("a");
		var returnValue = [];
		returnValue.push("<h2>12. 반복영역 건너뛰기</h2>");
		var hrefCount = 0;
		if(aEl.length>0)
		{
			var aElLength = (aEl.length>10)? 10 : aEl.length;
			returnValue.push("<ul id='skipPajetL'>");
			for (var i=0;i<aElLength; ++i)
			{
				var getHref = aEl[i].getAttribute("href",2);
				if(getHref && getHref.indexOf('#')==0 && getHref != "#")
				{
					hrefCount++;
					var inText = aEl[i].innerHTML;
					var inDom = getHref.replace('#','');
					var ableAccess;
					if(document.getElementById(inDom))
					{
						ableAccess = true;
					} else {
						if(document.getElementsByName(inDom).length>0)
							ableAccess = true;
						else
							ableAccess = false;
					}
					if(ableAccess)
						returnValue.push("<li class=\"pass\">["+ (i+1) + "번째 링크]\""+ inText + "\" 바로가기 링크(href=\""+getHref+"\")가 문서내에 연결이 되어 있습니다.</li>");
					else
						returnValue.push("<li class=\"fail\">["+ (i+1) + "번째 링크]\""+ inText + "\" 바로가기 링크(href=\""+getHref+"\")가 문서내에 연결이 되어 있지 않습니다.</li>");
				}
			}
			if(hrefCount==0)
			{
				returnValue.push("<li class=\"fail\">스킵 네비게이션이 정의되어 있지 않습니다.</li>");
			}
			returnValue.push("</ul>");
		} else {
			returnValue.push("<p class=\"fail\">이 페이지에는 링크가 존재하지 않습니다.</p>");
		}
		returnValue.push(generateRadioBtn('skipnav', 0, 'skipnav'));
		return returnValue.join('');
	}
	function getTitle()
	{
		var titleElLsit = [];
		titleElLsit.push('<h2>13.1 제목 제공(페이지 타이틀)</h2>');
		var elText = document.getElementsByTagName("head")[0];
		if (elText) elText = elText.getElementsByTagName("title")[0];
		if (elText) elText = elText.text;
		if(elText && elText != null)
		{
			titleElLsit.push("<p>"+ elText + "</p>");
		}
		else
		{
			titleElLsit.push('<p class="fail">페이지 타이틀이 정의 되지 않았습니다.</p>');
		}
		return titleElLsit.join('');
	}
	
	
	function getFrameTagList()
	{
		var frameEl = document.getElementsByTagName("frame");
		var iframeEl = document.getElementsByTagName("iframe");
		var frameCount = frameEl.length + iframeEl.length;
		var frameElList = [];
		var cnt = 0;
		frameElList.push("<h2>13.2 제목 제공(프레임제목)</h2>");
		if(frameCount>0)
		{
			frameElList.push("<p>"+frameCount+"개의 프레임이 사용 되었습니다.</p>");
			frameElList.push("<table class=\"frameTable\"><thead><tr><th>URL</th><th>title</th></tr></thead><tbody>");
			if(frameEl.length != 0)
			{
				for (var i=0; i<frameEl.length; i++)
				{
					frameElList.push("<tr><td>frame: <a href=\""+frameEl[i].src+"\">"+frameEl[i].src+"</a></td><td>"+frameEl[i].getAttribute("title")+"</td>");
					//frameElList.push('<td>' + generateRadioBtn('frame', cnt++, frameEl[i].src) + '</td>');
					frameElList.push('</tr>');
				}
			}
			if(iframeEl.length != 0)
			{
				for (var i=0; i<iframeEl.length; i++) 
				{
					frameElList.push("<tr><td>iframe: <a href=\""+iframeEl[i].src+"\">"+iframeEl[i].src+"</a></td><td>"+iframeEl[i].getAttribute("title")+"</td>");
					//frameElList.push('<td>' + generateRadioBtn('frame', cnt++, iframeEl[i].src) + '</td>');
					frameElList.push("</tr>");
				}
			}
			frameElList.push("</tbody></table>");
		}
		else
		{
			frameElList.push('<p>이 페이지는 프레임이 사용되지 않았습니다.</p>');
		}
		return frameElList.join('');
	}
	function getHnTagList()
	{
		var returnValue = [];
		returnValue.push("<h2>13.3 제목 제공(콘텐츠 블록)</h2>");
		for(var i=1;i<7;++i)
		{
			var hnTag = document.getElementsByTagName("h"+i);
			returnValue.push("<h3>h"+i +"태그의 사용</h3>");
			returnValue.push("<ul class=\"hnTagList\">");
			if(hnTag.length>0)
			{
				for(j=0;j<hnTag.length;++j)
				{
					returnValue.push("<li>"+hnTag[j].innerHTML +"</li>");
				}
			} else {
				returnValue.push("<li class=\"warning\">이페이지에는 h"+i+"태그가 사용되지 않았습니다.</li>");
			}
			returnValue.push("</ul>");
		}
		returnValue.push('페이지 타이틀, 프레임 타이틀, 섹션 타이틀');
		returnValue.push(generateRadioBtn('title', 0, 'title'));
		return returnValue.join('');
	}
	function getlocale()
	{
		var returnValue = [];
		returnValue.push("<h2>15 기본언어 표시</h2><ul class=\"localeList\">");
		var htmlEL = document.getElementsByTagName("html");
		if(htmlEL.length >0)
		{
			returnValue.push("<li>lang : ");
			returnValue.push((htmlEL[0].getAttribute("lang")!=null)?"<span class='pass'>"+htmlEL[0].getAttribute("lang")+"</span>":"<span class='fail'>값이 없습니다</span>");
			returnValue.push("</li>");
			returnValue.push("<li>xml:lang : ");
			returnValue.push((htmlEL[0].getAttribute("xml:lang")!=null)?"<span class='pass'>"+htmlEL[0].getAttribute("xml:lang")+"</span>":"<span class='fail'>값이 없습니다</span>");
			returnValue.push("</li>");
		}
		returnValue.push("</ul>");
		returnValue.push(generateRadioBtn('locale', 0, 'locale'));
		return returnValue.join('');
	}

	function getTableInfo()
	{
		var el = document.getElementsByTagName("table");
		var genList = [];
		genList.push("<h2>18. 표의 구성</h2>");
		if(el.length != 0)
		{
			genList.push("<ul class='tblist'>");
			for (var i=0; i<el.length; i++) {
				var thList = el[i].getElementsByTagName("th");
				var thStr = '';
				for (var j=0; j<thList.length; j++) {
					thStr += ', <span class="warning">' + thList.item(j).innerHTML + '</span>';
				}
				var summaryStr = (el[i].getAttribute("summary")==null) ? "" : el[i].getAttribute("summary");
				var captionStr = (el[i].getElementsByTagName("caption").length > 0) ? el[i].getElementsByTagName("caption")[0].innerHTML : "";
				if (captionStr == '' && summaryStr == '') {
					tableHeading = '<span class="fail">제목없는</span>';
				} else if (captionStr == summaryStr) {
					tableHeading = '<span class="fail">[C][S] ' + captionStr + '</span>';
				} else {
					var resultCaptionCode;
					var resultsummaryCode;
					resultCaptionCode = (captionStr=="")?'<span class="fail">[C]:미정의</span>':'<span class="pass">[C]' + captionStr +'</span>';
					resultsummaryCode = (summaryStr=="")?'<span class="fail">[S]:미정의</span>':'<span class="pass">[S]' + summaryStr +'</span>';
					tableHeading = resultCaptionCode +", "+ resultsummaryCode;
				}
				genList.push("<li>" + tableHeading + ' 테이블: th의 사용 ' + ((thStr == '') ? '<span class="fail">th태그가 사용되지 않았습니다</span>.' : thStr.replace(', ', '').replace(/<br>/ig,'')));
				genList.push(generateRadioBtn('table', i, 'table' + i));
				genList.push("</li>");
			}
			genList.push("</ul>");
		}
		else
		{
			genList.push("<p>이 페이지는 테이블이 사용되지 않았습니다.</p>");
		}
		return genList.join('');
	}

	//input,select,textarea related labels
	function getLabelList()
	{
		var returnValue = [];
		returnValue.push("<h2>19. 레이블 제공</h2>");
		var labelEl = document.getElementsByTagName("label");
		var returnLabelFor = "";
		if(labelEl.length>0)
		{
			for(var i=0;i<labelEl.length;++i)
			{
				if(labelEl[i].getAttribute("for"))
				{
					returnLabelFor += ","+labelEl[i].getAttribute("for")+"|";
				}
				else if(labelEl[i].getAttribute('htmlFor'))
				{
					returnLabelFor += ","+labelEl[i].attributes['for'].nodeValue+"|";
				}
			}
		}
		else
		{
			returnValue.push("<p>이 페이지에는 label이 사용되지 않았습니다. 서식을 확인하세요.</p>");
		}
		returnValue.push("<ul>");
		
		var needLabelNum = 0;
		var summary = '<div class="sum">';
		var inputEl = document.getElementsByTagName("input");
		var cnt = 0;
		if(inputEl.length>0)
		{
			for(var j=0;j<inputEl.length;++j)
			{
				var getTypeInput = (inputEl[j].getAttribute("type")!=null)?inputEl[j].getAttribute("type").toLowerCase():"text";
				if(getTypeInput=="text"||getTypeInput=="radio"||getTypeInput=="checkbox"||getTypeInput=="password"||getTypeInput=="file")
				{
					needLabelNum++
					var nameId = inputEl[j].getAttribute("id");
					var nameTitle = inputEl[j].getAttribute("title");
					if(returnLabelFor.indexOf(","+nameId+"|")>-1) {
						var labelText = document.querySelector ? document.querySelector('label[for="'+nameId+'"]').innerHTML : 'LABEL';
						returnValue.push('<li>'+j+'번째 input[type="'+getTypeInput+'"]는 "'+labelText+'"과 "<span class="pass">'+nameId+'</span>"으로 연결되었습니다.');
					}
					else if(nameTitle)
					{
						returnValue.push('<li>'+j+'번째 input[type="'+getTypeInput+'"]는 label과 연결되지 않았고, title속성은 "<span class="warning">'+nameTitle+'</span>"입니다');
					}
					else
					{
						returnValue.push('<li>'+j+'번째 input[type="'+getTypeInput+'"]는 label과 <span class="fail">연결되지 않았습니다.</span>');
					}
					returnValue.push(generateRadioBtn('label', cnt, 'label' + cnt));
					cnt++;
				}
			}
		}
		var selectEl = document.getElementsByTagName("select");
		if(selectEl.length>0)
		{
			for(var k=0;k<selectEl.length;++k)
			{
				needLabelNum++
				var nameId = selectEl[k].getAttribute("id");
				var nameName = selectEl[k].getAttribute("name");
				var nameTitle = selectEl[k].getAttribute("title");
				if(returnLabelFor.indexOf(","+nameId+"|")>-1) {
					var labelText = document.querySelector ? document.querySelector('label[for="'+nameId+'"]').innerHTML : 'LABEL';
					returnValue.push('<li>'+k+'번째 select태그는 id 속성으로 "'+labelText+'"과 "<span class="pass">'+nameId+'</span>"으로 연결되었습니다.');
				}
				else if(nameTitle)
					returnValue.push('<li>'+k+'번째 select태그는 label과 연결되지 않았고, title속성은 "<span class="warning">'+nameTitle+'</span>"입니다');
				else
					returnValue.push('<li>'+k+'번째 select[name="'+nameName+'"]는 label과 <span class="fail">연결되지 않았습니다.</span>');
				returnValue.push(generateRadioBtn('label', cnt, 'label' + cnt));
				cnt++;
			}
		}
		var textareaEl = document.getElementsByTagName("textarea");
		if(textareaEl.length>0)
		{
			for(var l=0;l<textareaEl.length;++l)
			{
				needLabelNum++;
				var nameAtt = textareaEl[l].getAttribute("name");
				var nameId = textareaEl[l].getAttribute("id");
				var nameTitle = textareaEl[l].getAttribute("title");
				if(returnLabelFor.indexOf(","+nameId)>-1) {
					var labelText = document.querySelector ? document.querySelector('label[for="'+nameId+'"]').innerHTML : 'LABEL';
					returnValue.push('<li>'+l+'번째 textarea태그는 id 속성으로 "'+labelText+'"과 "<span class="pass">'+nameId+'</span>"으로 연결되었습니다.');
				}
				else if(nameTitle)
					returnValue.push('<li>'+l+'번째 textarea태그는 label과 연결되지 않았고, title속성은 "<span class="warning">'+nameTitle+'</span>"입니다');
				else
					returnValue.push('<li>'+l+'번째 textarea태그는 label과 <span class="fail">연결되지 않았습니다.</span>');
				returnValue.push(generateRadioBtn('label', cnt, 'label' + cnt));
				cnt++;
			}
		}
		returnValue.push("</ul>");
		summary += '<p>label이 필요한 서식은 ' + needLabelNum + '개입니다.</p></div>'
		returnValue.push(summary);
		return returnValue.join('');
	}
	
	
/*
	//form use action attribute and have submit, button, image
	function getFromList()
	{
		var formEl = document.getElementsByTagName("form");
		var returnValue = "<h2>4.2.1 웹 어플리케이션 접근성 준수(서식의 올바른 사용)</h2>";
		if(formEl.length>0)
		{
			returnValue += "<p>이 페이지에는 "+formEl.length+"개의 form 세트가 사용되었습니다.<p><ul>";
			for(var i=0;i<formEl.length;++i)
			{
				returnValue += "<li><h3>"+i+"번째 form태그의 정보입니다.</h3>";
				if(formEl[i].action!=null)
					returnValue += "<p>action속성에 \"<span class='pass'>"+formEl[i].action+"</span>\"이 정의되었습니다.</p>";
				else
					returnValue += "<p class='warning'>action속성이 정의되지 않은 form set 입니다.</p>"
	
				var formInputEl = formEl[i].getElementsByTagName("input");
				if(formInputEl.length > 0)
				{
					var submitCount = 0;
					var submitText = "";
					for(var j=0;j<formInputEl.length;j++)
					{
						if(formInputEl[j].type =="submit" || formInputEl[j].type =="button" || formInputEl[j].type =="image")
						{
							submitCount += 1;
							submitText = ", " + formInputEl[j].type
						}
					}
					
					if(submitCount>0)
					{
						submitText = submitText.substring(2);
						returnValue += "<p>이 폼에는 버튼 서식이 "+((submitCount==1)?"<span class='pass'>1</span>":"<span class='warning'>"+submitCount+"</span>")+"개 사용되었으며, 버튼들의 type은 \""+((submitCount==1)?"<span class='pass'>"+submitText+"</span>":"<span class='warning'>"+submitText+"</span>")+"\" 으로 구성되어 있습니다.</p>";
					}
					else
					{
						returnValue += "<p class=\"fail\">이 폼은 버튼 서식이 없습니다. 링크등으로 구성되어 있는지 확인해보세요.</p>"
					}
				}
				else
				{
					returnValue += "<p>input이 사용되지 않은 폼입니다.</p>"
				}
				returnValue +="</li>";
			}
			returnValue +="</ul>";
		}
		else
		{
			returnValue += "<p>이 페이지에는 form이 사용되지 않았습니다. 혹시 서식이 사용되지않았는지 아래항목에서 확인하십시오.<p>";
		}
		
		return returnValue;
	}
*/
/*
	//pseudo javascript
	function getJsLink(){
		var returnValue = "<h2>4.2.1 웹 어플리케이션 접근성 준수( pseudo자바스크립트 사용 여부)</h2>";
		var countPseudo = 0;
		var aEl = document.getElementsByTagName("a");
		returnValue += "<ul id='jsLink'>";
		for (var i = 0; i < aEl.length; ++i) {
			if (aEl[i].href.toLowerCase().indexOf('javascript:') > -1) {
				returnValue += "<li>\"" + aEl[i].innerHTML + '"에 수도 자바스크립트 링크 <span class="fail">' + aEl[i].href + "</span>가 사용되었습니다.</li>";
			}
		}
		returnValue += "</ul>";
		return returnValue;
	}
*/
/*
	//onclick
	function getOnclick()
	{	
		var returnValue = "<h2>4.2.1 웹 어플리케이션 접근성 준수(onclick 사용시 대체 URL체크)</h2><ul class=\"linkList\">";
		var hrefText = '', countOnclick = 0;
		for (var j = 0;j<allElForWas.length;j++)
		{
			if(allElForWas[j].onclick && allElForWas[j].onclick != null)
			{
				hrefText = '';
				if(allElForWas[j].href && allElForWas[j].onclick != null)
				{
					hrefText = allElForWas[j].href.replace(window.location.href,'');
				}
				else
				{
					hrefText = "<span class=\"warning\">지정되지않았거나 정의되지않음("+allElForWas[j].tagName+")</span>";
				}
				var elementName = (allElForWas[j].innerHTML) ? allElForWas[j].innerHTML + " 링크" : allElForWas[j].tagName + " 태그";
				returnValue += hrefText=="#" ? "<li>\""+elementName+"\"의 href값은 \"<span class=\"fail\">"+ hrefText + "</span>\"이고 <span class=\"warning\">onclick("+allElForWas[j].onclick+")</span>이 사용되었습니다." : "<li>\""+elementName+"\"의 href값은 \"<span class=\"pass\">"+ hrefText + "</span>\"이고 onclick("+allElForWas[j].onclick+")이 사용되었습니다.";
				countOnclick +=1;
			}
		}
		returnValue += (countOnclick==0)?"<li>이 페이지에는 onclick 요소가 없습니다.</li>":"";
		returnValue += "</ul>";
		return returnValue;
	}
*/

	//create contents
	function generateCheckList()
	{
		var gHTML = [];
		gHTML.push('<div id="pajetWrap">');
		gHTML.push('<div id="pajetHeader"><h1>PAJET</h1><p class="closeWacs"><button id="miniPajet">_</button><button id="closePajet">close</button></p></div>');
		gHTML.push('<div id="pajetContents">');

		gHTML.push('<form action="' + getScriptPath() + 'data.php" method="post" target="pajet-result">');
		gHTML.push('<p><input type="hidden" name="url" value="' + window.location.href + '"></p>');

		gHTML.push('<div id="section1" class="section">'+getImgTagList()+'</div>');	//1.1.1
		gHTML.push('<div id="section2" class="section">'+checkBackgroundImg()+'</div>');	//1.1.1
		gHTML.push('<div id="section13" class="section">'+getMovieList()+'</div>');	//2
		gHTML.push('<div id="section3" class="section">'+getSkipNav()+'</div>');	//241
		gHTML.push('<div id="section4" class="section">'+getTitle()+'</div>'); //242
		gHTML.push('<div id="section5" class="section">'+getFrameTagList()+'</div>'); //242
		gHTML.push('<div id="section6" class="section">'+getHnTagList()+'</div>');
		gHTML.push('<div id="section7" class="section">'+getlocale()+'</div>'); //311
		gHTML.push('<div id="section8" class="section">'+getTableInfo()+'</div>'); //332
		gHTML.push('<div id="section9" class="section">'+getLabelList()+'</div>'); //341
		//gHTML.push('<div id="section10" class="section">'+getFromList()+'</div>');
		//gHTML.push('<div id="section11" class="section">'+getJsLink()+'</div>');
		//gHTML.push('<div id="section12" class="section">'+getOnclick()+'</div>');

		gHTML.push('<p style="margin: 1em 0"><input type="submit" class="submit"></p>');
		gHTML.push('<iframe id="pajet-result" name="pajet-result" src="' + getScriptPath() + 'data.php" style="display: none"></iframe>');

		gHTML.push('</form>');

		gHTML.push('</div>');
		//gHTML.push('<div id="pajetFooter"><p><a href="mailto:mydeute@gmail.com">mydeute[at]gmail.com</a>, <a href="mailto:hyeonseok@gmail.com">hyeonseok[at]gmail.com</a></p></div>');
		gHTML.push('</div>');

		return gHTML.join('');
	}

	function setTemplate(el) {
		el.innerHTML = '';
		el.innerHTML = generateCheckList();
		el.style.display = 'block';

		//close button
		document.getElementById('closePajet').onclick = function () {
			el.innerHTML = "";
			el.style.display = "none";
		}
		document.getElementById('miniPajet').onclick = function () {

			var pContents = document.getElementById('miniPajet')
			var minButton = document.getElementById('pajetContents')
			if(minButton.style.display=="none")
			{
				minButton.style.display="block"
				pContents.innerHTML = "_"
			}
			else
			{
				minButton.style.display="none"
				pContents.innerHTML = "ㅁ"
			}
		}

		//1.1.1 image preview
/*
		var imgs = document.getElementById('section1').getElementsByTagName('img');
		for (var i = 0, cnt = imgs.length; i < cnt; i++) {
			if (imgs.item(i).className == 'imageItem') {
				imgs.item(i).onmouseover = function () {
					var imgSrc = this.src, imgAlt = this.alt;
					if(document.getElementById("deuteWasImg") != null) {
						var targetDom = document.getElementById("deuteWasImg")
					} else {
						var targetDom = document.createElement("div");
						targetDom.setAttribute("id","deuteWasImg")
						document.getElementsByTagName( 'body' )[ 0 ].appendChild( targetDom );
					}
					targetDom.innerHTML = "<img src=\""+imgSrc+"\" /><br />" + ((imgAlt) ? imgAlt : '[ALT 없음]');
					targetDom.style.left = "50%";
					targetDom.style.top = "50%";
					targetDom.style.display = "block";
					targetDom.style.margin = '-' + targetDom.offsetHeight / 2 + 'px 0 0 -' + targetDom.offsetWidth / 2 + 'px';
					targetDom.style.border = "3px solid #fdaf17";
					targetDom.style.background = "#fff";
				}
				imgs.item(i).onmouseout = function () {
					var targetDom = document.getElementById("deuteWasImg");
					targetDom.innerHTML = "";
					targetDom.style.display = "none";
				}
			}
		}
*/
	}

	function generateRadioBtn(type, seq, data) {
		var eval = '', pass = '', fail = '', cls = '';
		if (window.imageEvalResult) {
			for (var i = 0, cnt = window.imageEvalResult.length; i < cnt; i++) {
				if (window.imageEvalResult[i].type == type && window.imageEvalResult[i].data == data) {
					eval = window.imageEvalResult[i].eval;
					break;
				}
			}
		}

		if (eval == 'pass') {
			pass = ' checked="checked"';
			cls = ' class="checked"';
		} else if (eval == 'fail') {
			fail = ' checked="checked"';
			cls = ' class="checked"';
		} else {
			pass = fail = cls = '';
		}

		var template = [];
		template.push('<fieldset><span' + cls + ' onclick="updateRadioStatus(this)">');
		template.push('<label><input type="radio" name="eval_' + type + '[' + seq + ']" value="pass"' + pass + '> 적합</label>');
		template.push('<label><input type="radio" name="eval_' + type + '[' + seq + ']" value="fail"' + fail + '> 부적합</label>');
		template.push('<input type="hidden" name="' + type + '[' + seq + ']" value="' + data + '">');
		template.push('</span></fieldset>');
		return template.join('');
	}
	
	window.updateRadioStatus = function (el) {
		var inputs = el.getElementsByTagName('input');
		var isChecked = false;
		for (var i = 0, cnt = inputs.length; i < cnt; i++) {
			if (inputs.item(i).checked) {
				isChecked = true;
			}
			if (isChecked) {
				el.className = 'checked';
			}
		}
	}

	//util
	function __NgbUserEvent()
	{
	        this.MousePositionX = function(vent)
	        {
	                var LeftValue;
	                if ( window.pageYOffset ) { LeftValue = window.pageXOffset; }
	                else if ( document.documentElement && document.documentElement.scrollTop ) { LeftValue = document.documentElement.scrollLeft; }
	                else if ( document.body ) { LeftValue = document.body.scrollLeft; }
	
	                if(NgbBrowser.msie()) { return LeftValue + event.clientX; }
	                else { return evnt.pageX; }
	        };
	        this.MousePositionY = function(evnt)
	        {
	                var TopValue;
	                if ( window.pageYOffset ) { TopValue = window.pageYOffset;      }
	                else if ( document.documentElement && document.documentElement.scrollTop ) { TopValue = document.documentElement.scrollTop; }
	                else if ( document.body ) { TopValue = document.body.scrollTop; }
	
	                if(NgbBrowser.msie()) { return TopValue + event.clientY; }
	                else { return evnt.pageY;}
	        };
	}
	function __NgbBrowser()
	{
	        this.agt = navigator.userAgent.toLowerCase();
	        this.check = function(browserName) { return this.agt.indexOf(browserName) != -1 };
	        this.msie = function() { return this.check("msie") };
	        this.msie5 = function() { return this.check("msie 5") };
	        this.msie55 = function() { return this.check("msie 5.5") };
	        this.msie6 = function() { return this.check("msie 6") };
	        this.msie7 = function() { return this.check("msie 7") };
	        this.firefox = function() { return this.check("firefox") };
	        this.netscape = function() { return this.check("netscape") };
	        this.safari = function() { return this.check("safari") };
	        this.opera = function() { return this.check("opera") };
	        this.gecko = function() { return this.check("gecko") };
	        this.khtml = function() { return this.check("khtml") };
	        this.windows = function() { return this.check("windows") };
	        this.windows2000 = function() { return this.check("windows nt 5.0") };
	        this.windowsXP = function() { return this.check("windows nt 5.1") };
	        this.windows98 = function() { return this.check("windows 98") };
	        this.mac = function() { return this.check("mac") };
	        this.linux = function() { return this.check("linux") };
	}
	
	function getStyle(el, sStyle) {
		if (el.currentStyle) {
			getStyle = function(el, sStyle) {
				var computedStyle;
				computedStyle = el.currentStyle;
				return computedStyle[sStyle];
			};
		} else {
			getStyle = function(el, sStyle) {
				var computedStyle;
				computedStyle = window.getComputedStyle(el, null);
				return computedStyle[sStyle];
			};
		}
		getStyle(el, sStyle);
	}

	function getScriptPath() {
		var scriptElements = document.getElementsByTagName('script');
		for (var i = 0, cnt = scriptElements.length; i < cnt; i++) {
			if (scriptElements.item(i).src && scriptElements.item(i).src.indexOf('pajet.js') > -1) {
				return scriptElements.item(i).src.split('?')[0].replace('pajet.js', '');
			}
		}
		return false;
	}

	function loadScript(scriptURL) {
		var scriptElem = document.createElement('SCRIPT');
		scriptElem.setAttribute('type', 'text/javaScript');
		scriptElem.setAttribute('src', scriptURL);
		document.body.appendChild(scriptElem);
	}

	//실행
	loadScript(getScriptPath() + 'image.php?url=' + window.location.href);	// 처음에 pajet을 화면에 출력할 때는 서버의 데이터를 못 불러옴. pajet.js를 php로 가고 서버 데이터를 연동해야 하나...

	if(document.getElementById("deuteWas") != null) {
		setTemplate(document.getElementById("deuteWas"));
	} else {
		var addStyle = document.createElement('link');
		addStyle.rel = 'stylesheet';
		addStyle.type = 'text/css';
		addStyle.href = getScriptPath() + 'pajet.css?' + Math.random();
		document.getElementsByTagName("head")[0].appendChild(addStyle);
		
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id","deuteWas");
		if(document.getElementsByTagName("body")[0]){
			document.getElementsByTagName("body")[0].appendChild(newDiv);
		} else {
			alert("이 페이지에는 body가 없습니다. 혹시 frameset으로 페이지가 구성되지 않았는지 확인하세요.\n(프레임 셋 페이지는 평가 하실수 없습니다.)");
		}
		setTemplate(newDiv);
	}
})();
