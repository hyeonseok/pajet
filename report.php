<?php
ini_set('display_errors', 1);
error_reporting(1);

header('Content-Type: text/html; charset=utf-8');

if (isset($_REQUEST['data'])) {
	$data_file = $_REQUEST['data'];
} else {
	$data_file = 'data.csv';
}

$eval_data = file($data_file);

foreach ($eval_data as $row) {
	$item = explode(',', $row);
	$path = $item[0];
	$url = $item[1];
	$type = $item[2];
	$data = $item[3];
	$eval = trim($item[4]);
	if (strlen($eval) < 1) {
		continue;
	}
	$result[$url]['result'][$type][$data] = $eval;
	$result[$url]['path'] = $path;
}

function getFormattedText($pass, $fail) {
	if ($pass + $fail == 0) {
		return 'N/A';
	} else {
		return $pass . '/' . ($pass + $fail) . ' (' . round(($pass / ($pass + $fail)) * 1000) / 10 . '%)';
	}
}

$result_output = array();
foreach ($result as $url => $data_by_url) {
	$result_by_type = array();
	foreach ($data_by_url['result'] as $type => $item) {
		if ($type == 'inputimg' || $type == 'backgroundimage') {
			$key = 'img';
		} else {
			$key = $type;
		}
		$pass = 0;
		$fail = 0;
		foreach ($item as $d => $val) {
			if ($val == 'pass') {
				$pass++;
			} else if ($val == 'fail') {
				$fail++;
			}
		}
		$result_by_type[$key]['pass'] += $pass;
		$result_by_type[$key]['fail'] += $fail;
		$total[$key]['pass'] += $pass;
		$total[$key]['fail'] += $fail;
	}
	
	$result_output[] = array(
		'path' => $data_by_url['path'], 
		'url' => $url, 
		'alt_text' => getFormattedText($result_by_type['img']['pass'], $result_by_type['img']['fail']), 
		'skip_navigation' => getFormattedText($result_by_type['skipnav']['pass'], $result_by_type['skipnav']['fail']), 
		'page_title' => getFormattedText($result_by_type['pagetitle']['pass'], $result_by_type['pagetitle']['fail']), 
		'frame_title' => getFormattedText($result_by_type['frametitle']['pass'], $result_by_type['frametitle']['fail']), 
		'human_language' => getFormattedText($result_by_type['locale']['pass'], $result_by_type['locale']['fail']), 
		'label' => getFormattedText($result_by_type['label']['pass'], $result_by_type['label']['fail'])
	);
}

$total_output = array(
	'alt_text' => getFormattedText($total['img']['pass'], $total['img']['fail']), 
	'skip_navigation' => getFormattedText($total['skipnav']['pass'], $total['skipnav']['fail']), 
	'page_title' => getFormattedText($total['pagetitle']['pass'], $total['pagetitle']['fail']), 
	'frame_title' => getFormattedText($total['frametitle']['pass'], $total['frametitle']['fail']), 
	'human_language' => getFormattedText($total['locale']['pass'], $total['locale']['fail']), 
	'label' => getFormattedText($total['label']['pass'], $total['label']['fail'])
);

// header('Content-Type: text/plain; charset=utf-8');
// print_r($result_output);
// print_r($total_output);
// exit();
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
table {
	width: 100%;
	table-layout: fixed;
	border: 1px solid #000;
	border-width: 1px 1px 0 0;
	border-collapse: collapse;
}
th, 
td {
	border: 1px solid #000;
	border-width: 0 0 1px 1px;
	padding: 0.5em;
	text-align: center;
	font-size: 0.75em;
}
th {
	background-color: #ccc;
}
</style>
</head>
<body>
<table>
	<colgroup>
		<col style="width: 30em;">
		<col>
		<col>
		<col>
		<col>
		<col>
		<col>
	</colgroup>
	<thead>
		<tr>
			<th>페이지</th>
			<th>대체 텍스트</th>
			<th>스킵 네비게이션</th>
			<th>페이지 제목</th>
			<th>프레임 제목</th>
			<th>사용 언어 선언</th>
			<th>레이블</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th>합계</th>
			<td><?php echo($total_output['alt_text']); ?></td>
			<td><?php echo($total_output['skip_navigation']); ?></td>
			<td><?php echo($total_output['page_title']); ?></td>
			<td><?php echo($total_output['frame_title']); ?></td>
			<td><?php echo($total_output['human_language']); ?></td>
			<td><?php echo($total_output['label']); ?></td>
		</tr>
	</tfoot>
	<tbody>
<?php foreach ($result_output as $val) { ?>
		<tr>
			<th><a href="<?php echo($val['url']); ?>"><?php echo($val['path']); ?></a></th>
			<td><?php echo($val['alt_text']); ?></td>
			<td><?php echo($val['skip_navigation']); ?></td>
			<td><?php echo($val['page_title']); ?></td>
			<td><?php echo($val['frame_title']); ?></td>
			<td><?php echo($val['human_language']); ?></td>
			<td><?php echo($val['label']); ?></td>
		</tr>
<?php } ?>
	</tbody>
</table>
</body>
</html>
