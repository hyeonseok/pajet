<?php
ini_set('display_errors', 1);
error_reporting(1);

header('Content-Type: text/javascript');

$eval_data = file('data.csv');

foreach ($eval_data as $row) {
	$item = explode(',', $row);
	if ($url == urldecode($_REQUEST['url'])) {
		$path = $item[0];
	} else {
		$path = '';
	}
	$url = $item[1];
	$type = $item[2];
	//echo(urldecode($_REQUEST['url'])."\n");
	if ($type != 'img' && $type != 'inputimg' && $url != urldecode($_REQUEST['url'])) {
		continue;
	}
	$data = $item[3];
	$eval = trim($item[4]);
	$result[] = array($type, $data, $eval);
}

//print_r($result);

$isFirst = true;
echo('var imageEvalResult = [' . "\n");
foreach ($result as $eval) {
	if (!$isFirst) {
		echo(', ');
	}
	$isFirst = false;
	echo('{"type": "' . $eval[0] . '", "data": "' . $eval[1] . '", "eval": "' . $eval[2] . '"}' . "\n");
}
echo('];' . "\n");

echo('var pagePath = "' . $path . '";' . "\n");
?>
