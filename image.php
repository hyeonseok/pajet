<?php
ini_set('display_errors', 1);
error_reporting(1);

header('Content-Type: text/javascript');

require_once('lib/FileLog.class.php');
$data = new FileLog('data/data.tsv', array('id', 'page_path', 'page_url', 'category', 'element', 'pass', 'comment'));
$eval_data = $data->load();

foreach ($eval_data as $row) {
	if ($url == urldecode($_REQUEST['url'])) {
		$path = $row['page_path'];
	} else {
		$path = '';
	}
	$url = $row['page_url'];
	$type = $row['category'];
	if ($type != 'img' && $type != 'inputimg' && $url != urldecode($_REQUEST['url'])) {
		continue;
	}
	$data = $row['element'];
	$eval = $row['pass'];
	$comment = $row['comment'];
	$result[] = array($type, $data, $eval, $comment);
}

$isFirst = true;
echo('var imageEvalResult = [' . "\n");
foreach ($result as $eval) {
	if (!$isFirst) {
		echo(', ');
	}
	$isFirst = false;
	echo('{"type": "' . $eval[0] . '", "data": "' . $eval[1] . '", "eval": "' . $eval[2] . '", "comment": "' . $eval[3] . '"}' . "\n");
}
echo('];' . "\n");

echo('var pagePath = "' . $path . '";' . "\n");
?>
