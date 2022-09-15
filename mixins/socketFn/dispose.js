Socket.onError((err)=>{
	console.log(err);
})
Socket.onOpen((err)=>{
	console.log('-----正在连接');
})