let emoji = [
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
]

let emojiDecimalism = [
	128512,
	128513,
	128514,
	128515,
	128516,
	128517,
	128518,
	128519,
	128520,
	128521,
	128522,
	128523,
	128524,
	128525,
	128526,
	128527,
	128528,
	128529,
	128530,
	128531,
	128532,
	128533,
	128534,
	128535,
	128536,
	128537,
	128538,
	128539,
	128540,
	128541,
	128542,
	128545,
	128546,
	128547,
	128548,
	128549,
	128550,
	128551,
	128552,
	128553,
	128554,
	128555,
	128556,
	128557,
	128558,
	128559,
	128560,
]
// let a = [a]
const emojiJson = emoji.map((item, index) => {
	index += 1
	let str = Array(5).join(0) + index
	str = str.slice(-5)
	return {
		code: '/' + str + '/',
		ct: item
	}
})
// 通过code拿到emoji
export const exchangeEmoji = (code) => {
	for (let i = 0; i < emojiJson.length; i++) {
		if (code == emojiJson[i].code) {
			return emojiJson[i].ct
		} else {
			return code
		}
	}
}
// 通过emoji拿到code 
export const exchangeCode = (emoji) => {
	console.log(emoji);
	for (let i = 0; i < emojiJson.length; i++) {
		if (emoji == emojiJson[i].ct) {
			return emojiJson[i].code
		} else {
			return emoji
		}
	}
}
// 处理传递过来的emoji 
const chuliCode = (code) =>{
	
}
	// 处理传递过来的字符串
	const chuliEmoji = (str) => {
		const stera = str.match(/\/.*?\//g)
		if (stera) {
			// console.log(str.replace(stera, '$'));
			for (let i = 0; i < stera.length; i++) {
				str = str.replace(stera[i], exchangeEmoji(stera[i]));
			}
		}
		console.log(str);
		return str
	}


export default emojiJson
// export default a.map(item => {
// 	item = item + ''
// 	item = '&#' + item + ';'
// 	return item
// })
