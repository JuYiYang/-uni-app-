type configType = {
	REQUEST_URL: string,
	title: string
	CHAT_SOCKET_URL: string
}


const configObj: configType = {

	REQUEST_URL: process.env.REQUEST_URL as string,

	title: "clear",
	
	CHAT_SOCKET_URL:process.env.CHAT_SOCKET_URL as string

}

export default configObj