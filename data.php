<?php
function is_utf8 ($str) {
	$converted = iconv('utf-8', 'utf-8', $str);
	if ($converted == $str) {
		return true;
	} else {
		return false;
	}
}

header('Content-Type: text/plain');

$eval_data = fopen('data.csv', 'a');

$page_path = $_REQUEST['path'];
$page_url = $_REQUEST['url'];

if (!is_utf8($page_path)) {
	$page_path = iconv('euc-kr', 'utf-8', $page_path);
}

$count = 0;
foreach ($_REQUEST['result'] as $type => $seq) {
	foreach ($seq as $item) {
		if (isset($item['pass'])) {
			$str .= $page_path . ',' . $page_url . ',' . $type. ',' . $item['data'] . ',' . $item['pass'] . "\n";
			$count += 1;
		}
	}
}

fwrite($eval_data, $str);
?>
Saved <?php echo($count); ?> items.
