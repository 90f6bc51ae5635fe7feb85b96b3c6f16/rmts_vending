 const GLOBAL = {
	BASE_URL: {
		URL: 'http://localhost:7001/',
    URL_IO: 'ws://localhost:3003/',
    URL_IMG: 'http://localhost:7001/',
    URL_UPLOAD: 'http://localhost:7001/file-upload/uploadFile/',
    URL_DELETE: 'http://localhost:7001/file-upload/deleteFlie/',
    URL_EXPORT: 'http://localhost/export/',
	},
	AUTH_HEADERS: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',

    'x-access-token': localStorage.getItem("x-access-token"),
	},
}

export default GLOBAL