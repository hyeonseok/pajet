<?php
header('Content-Type: text/javascript');

$eval_data = file('data.csv');

foreach ($eval_data as $row) {
	$item = explode(',', $row);
	$url = $item[0];
	$type = $item[1];
	if ($type != 'img' && $url != urldecode($_REQUEST['url'])) {
		continue;
	}
	$data = $item[2];
	$eval = trim($item[3]);
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
echo('];');
?>
