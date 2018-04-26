function openInfo(urls, extras, id = "") {
	console.log('5555666' + JSON.stringify(extras))
	mui.openWindow({
		url: urls,
		id: id,
		extras: extras
	});
}