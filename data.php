<?php
header('Content-Type: text/plain');

print_r($_REQUEST);

$eval_data = fopen('data.csv', 'a');

$page_path = $_REQUEST['path'];
$page_url = $_REQUEST['url'];

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
