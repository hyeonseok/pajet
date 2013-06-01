<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>PAJET</title>
</head>
<body>
<h1>PAJET</h1>
<h2>Bookmarklet</h2>
<p><a href="javascript:function loadScript(scriptURL) {var scriptElem = document.createElement('SCRIPT');scriptElem.setAttribute('type', 'text/javaScript');scriptElem.setAttribute('src', scriptURL);document.body.appendChild(scriptElem);}loadScript('http://<?php echo($_SERVER['HTTP_HOST']); ?>/tools/pajet/pajet.js');">Run Pajet</a></p>
<ul>
	<li><a href="{SITEURL}">{SITENAME}</a>: <a href="report.php?data={FILENAME}">정량평가 결과</a></li>
</ul>
</body>
</html>
