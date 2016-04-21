
<?php

	//postgres db connection
	$pg = pg_connect("host=HOSTNAME user=USERNAME password=PASSWORD dbname=DBNAME port=PORT");
	$path_components = explode('/', $_SERVER['PATH_INFO']);

	if($_SERVER['REQUEST_METHOD'] == "GET") {

		if($path_components[1] == "swimmers") {
			$result = pg_query($pg, 'select * from swimmer order by lname');

			$swimmers_array = array();
			while ($n = pg_fetch_assoc($result)) {
				$tmp = array();

				// $tmp['id'] = $n['id'];
				$tmp['fname'] = $n['fname'];
				$tmp['lname'] = $n['lname'];
				$tmp['e1'] = $n['e1'];
				$tmp['e1p'] = $n['e1p'];
				$tmp['e2'] = $n['e2'];
				$tmp['e2p'] = $n['e2p'];
				$tmp['e3'] = $n['e3'];
				$tmp['e3p'] = $n['e3p'];

				$swimmers_array[] = $tmp;
			}
			echo json_encode($swimmers_array);

		} else if($path_components[1] == "relays") {
			$result = pg_query($pg, "select * from relay");

			$relay_array = array();
			while($n = pg_fetch_assoc($result)) {
				$tmp = array();

				$tmp['name'] = $n['name'];
				$tmp['place'] = $n['place'];

				$relay_array[] = $tmp;
			}
			echo json_encode($relay_array);

		}

	} else if($_SERVER['REQUEST_METHOD'] == "POST") {
		$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $name = $request->name;
		$e1 = $request->e1;
		$e2 = $request->e2;
		$e3 = $request->e3;

		pg_query("update swimmer set e1p = '$e1', e2p = '$e2', e3p = '$e3' where lname='$name'");
	}


?>
