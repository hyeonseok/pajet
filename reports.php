<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title></title>
</head>
<body>
<ul>
	<li><a href="http://www.knou.ac.kr/">메인 사이트</a>: <a href="report.php?data=knou-www.csv">정량평가 결과</a></li>
	<li><a href="http://portal.knou.ac.kr/portal/eco/main.do?epTicket=LOG">인터넷상담 사이트</a>: <a href="report.php?data=knou-potal.csv">정량평가 결과</a></li>
	<li><a href="http://library.knou.ac.kr/index.jsp">중앙도서관 사이트</a>: <a href="report.php?data=knou-library.csv">정량평가 결과</a></li>
	<li><a href="http://cle.knou.ac.kr/">평생 교육원 사이트</a>: <a href="report.php?data=knou-cle.csv">정량평가 결과</a></li>
	<li><a href="http://dmc.knou.ac.kr/index.jsp">디지털 미디어 센터 사이트</a>: <a href="report.php?data=knou-dmc.csv">정량평가 결과</a></li>
</ul>
<a href="javascript:function loadScript(scriptURL) {var scriptElem = document.createElement('SCRIPT');scriptElem.setAttribute('type', 'text/javaScript');scriptElem.setAttribute('src', scriptURL);document.body.appendChild(scriptElem);}loadScript('http://<?php echo($_SERVER['REMOTE_ADDR']); ?>:8888/tools/pajet/pajet.js');">pajet</a>
</body>
</html>
