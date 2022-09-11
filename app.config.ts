type configType = {
	REQUEST_URL: string,
	title: string
}


const configObj: configType = {

	REQUEST_URL: process.env.REQUEST_URL as string,

	title: "clear",

}

export default configObj