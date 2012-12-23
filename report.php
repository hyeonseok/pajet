<?php
ini_set('display_errors', 1);
error_reporting(1);

function getFormattedText($pass, $fail) {
	if ($pass + $fail == 0) {
		return 'N/A';
	} else {
		return $pass . '/' . ($pass + $fail) . ' (' . round(($pass / ($pass + $fail)) * 1000) / 10 . '%)';
	}
}

require_once('lib/FileLog.class.php');
if (isset($_REQUEST['data'])) {
	$data_file = $_REQUEST['data'];
} else {
	$data_file = 'data.tsv';
}
$data = new FileLog('data/' . $data_file, array('id', 'page_path', 'page_url', 'category', 'element', 'pass', 'comment'));
$eval_data = $data->load();

$fail_item = array();
foreach ($eval_data as $row) {
	$path = $row['page_path'];
	$url = $row['page_url'];
	$category = $row['category'];
	$data = $row['element'];
	$eval = $row['pass'];
	if (strlen($eval) < 1) {
		continue;
	}
	$comment = $row['comment'];

	$result[$url]['result'][$category][$data] = $eval;
	$result[$url]['path'] = $path;

	if ($eval == 'fail') {
		$fail_item[$category][$path][$data] = array('page_url' => $url, 'comment' => $comment);
	}
}

$result_output = array();
foreach ($result as $url => $data_by_url) {
	$result_by_type = array();
	foreach ($data_by_url['result'] as $category => $item) {
		if ($category == 'inputimg' || $category == 'backgroundimage') {
			$key = 'img';
		} else {
			$key = $category;
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
		'keyboard' => getFormattedText($result_by_type['keyboard']['pass'], $result_by_type['keyboard']['fail']), 
		'skip_navigation' => getFormattedText($result_by_type['skipnav']['pass'], $result_by_type['skipnav']['fail']), 
		'page_title' => getFormattedText($result_by_type['pagetitle']['pass'], $result_by_type['pagetitle']['fail']), 
		'frame_title' => getFormattedText($result_by_type['frametitle']['pass'], $result_by_type['frametitle']['fail']), 
		'human_language' => getFormattedText($result_by_type['locale']['pass'], $result_by_type['locale']['fail']), 
		'table' => getFormattedText($result_by_type['table']['pass'], $result_by_type['table']['fail']), 
		'label' => getFormattedText($result_by_type['label']['pass'], $result_by_type['label']['fail'])
	);
}

$total_output = array(
	'alt_text' => getFormattedText($total['img']['pass'], $total['img']['fail']), 
	'keyboard' => getFormattedText($total['keyboard']['pass'], $total['keyboard']['fail']), 
	'skip_navigation' => getFormattedText($total['skipnav']['pass'], $total['skipnav']['fail']), 
	'page_title' => getFormattedText($total['pagetitle']['pass'], $total['pagetitle']['fail']), 
	'frame_title' => getFormattedText($total['frametitle']['pass'], $total['frametitle']['fail']), 
	'human_language' => getFormattedText($total['locale']['pass'], $total['locale']['fail']), 
	'table' => getFormattedText($total['table']['pass'], $total['table']['fail']), 
	'label' => getFormattedText($total['label']['pass'], $total['label']['fail'])
);

header('Content-Type: text/html; charset=utf-8');
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
body {
	font-size: 75%;
}
h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
	font-size: 1.2em;
}
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
}
th {
	background-color: #ccc;
}
</style>
</head>
<body>
<h1>이름</h1>
<h2>요약표</h2>
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
			<th>키보드</th>
			<th>스킵 네비게이션</th>
			<th>페이지 제목</th>
			<th>프레임 제목</th>
			<th>사용 언어 선언</th>
			<th>표</th>
			<th>레이블</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th>합계</th>
			<td><?php echo($total_output['alt_text']); ?></td>
			<td><?php echo($total_output['keyboard']); ?></td>
			<td><?php echo($total_output['skip_navigation']); ?></td>
			<td><?php echo($total_output['page_title']); ?></td>
			<td><?php echo($total_output['frame_title']); ?></td>
			<td><?php echo($total_output['human_language']); ?></td>
			<td><?php echo($total_output['table']); ?></td>
			<td><?php echo($total_output['label']); ?></td>
		</tr>
	</tfoot>
	<tbody>
<?php foreach ($result_output as $val) { ?>
		<tr>
			<th><a href="<?php echo($val['url']); ?>"><?php echo($val['path']); ?></a></th>
			<td><?php echo($val['alt_text']); ?></td>
			<td><?php echo($val['keyboard']); ?></td>
			<td><?php echo($val['skip_navigation']); ?></td>
			<td><?php echo($val['page_title']); ?></td>
			<td><?php echo($val['frame_title']); ?></td>
			<td><?php echo($val['human_language']); ?></td>
			<td><?php echo($val['table']); ?></td>
			<td><?php echo($val['label']); ?></td>
		</tr>
<?php } ?>
	</tbody>
</table>
<h2>오류 내용</h2>
<?php
foreach ($fail_item as $category => $page) {
	echo('<h3>' . $category . '</h3>');
	foreach ($page as $path => $items) {
		echo('<h4>' . $path . '</h4>');
		foreach ($items as $element => $item) {
			echo('<p>' . $element . ': ' . $item['comment'] . '</p>');
		}
	}
}
?>
</body>
</html>
