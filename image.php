<?php
header('Content-Type: text/javascript');

$eval_data = file('data.csv');

foreach ($eval_data as $row) {
	$item = explode(',', $row);
	$path = $item[0];
	$url = $item[1];
	$type = $item[2];
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
