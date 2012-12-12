<?php
function is_utf8 ($str) {
	$converted = iconv('utf-8', 'utf-8', $str);
	if ($converted == $str) {
		return true;
	} else {
		return false;
	}
}

require_once('lib/FileLog.class.php');

$data = new FileLog('data/data.tsv', array('id', 'page_path', 'page_url', 'category', 'element', 'pass', 'comment'));

$page_path = $_REQUEST['path'];
$page_url = $_REQUEST['url'];

// if (!is_utf8($page_path)) {
// 	$page_path = iconv('euc-kr', 'utf-8', $page_path);
// }

$count = 0;
foreach ($_REQUEST['result'] as $category => $seq) {
	foreach ($seq as $item) {
		if (isset($item['pass'])) {
			$data->save(array(uniqid(), $page_path, $page_url, $category, $item['data'], $item['pass'], $item['comment']));
			$count++;
		}
	}
}

header('Content-Type: text/plain');
?>
Saved <?php echo($count); ?> items.
