const axios = require('axios')
const fs = require('fs')
const path = require('path')

const imagesPath = path.resolve(__dirname,'images') //采集菜谱图片目录
const videosPath = path.resolve(__dirname,'videos') //采集菜谱视频目录
const dataBasePath   = path.resolve(__dirname,'data')   //采集菜谱数据目录
const dataFileName = 'db_data.json'  
const dataPath = path.join(dataBasePath,dataFileName)


fetchRecipe(0,10)

/**
 * 资源路径检测
 */
function initPaths(){
  !fs.existsSync(imagesPath) && fs.mkdirSync(imagesPath)
  !fs.existsSync(videosPath) && fs.mkdirSync(videosPath)
  !fs.existsSync(dataBasePath) && fs.mkdirSync(dataBasePath)
}
/**
 * 根据Fiddler抓取IOS的请求分析后，用 node 模拟请求
 * @param {菜谱编号 目前范围 约为 0 - 3000} id 
 */
function getRecipe(id){
	let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjUwNjAxNzQsInNlc3Npb25faWQiOjYzMjEzMSwidXNlcl9pZCI6NTY4Njg2LCJ1c2VyX25hbWUiOiJcdTZiNjNcdTVjMTEifQ.2no3fYQKCDNLdyQG_cfTvMBMIuRADrZ449CKtcufdWs'

	return axios({
		method: 'get',
		baseURL:'https://lanfanapp.com/api/v1/',
	  url:'/recipe/page_detail.json',
	  params:{
	  	'recipe_id':String(id),
	  	'token':token
	  },
	  headers:{
	  	'Host':'lanfanapp.com',
	  	'Connection':'keep-alive',
	  	'Accept-Language':'zh-cn',
	  	'Accept-Encoding':'br, gzip, deflate',
	  	'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77 MicroMessenger/7.0.5(0x17000523) NetType/WIFI Language/zh_CN',
	  	'Content-Type':'application/json',
	  	'Referer':'https://servicewechat.com/wx5ad83bca233d9602/10/page-frame.html',
	  	'X-WEAPP':'1.1.0'
	  },
	  timeout:1000 * 5
	}).then(response => {
		return {
			errorCode:0,
			data:response.data.content.recipe
		}
	}).catch(err =>{
		return {
			errorCode:1,
			message:err.message
		}
	})
}

/**
 * 保存菜谱数据 方便批量导入小程序
 * @param {} data 
 */
function save(data){
	fs.appendFileSync(dataPath,`${JSON.stringify(data.data)}\n`)
}

/**
 * 执行采集
 * @param {初始菜谱编号 默认 0} start 
 * @param {采集条数} count 
 */
async function fetchRecipe(start = 0,count = 1){
  initPaths()
	for(let i=start;i<start + count;i++){
		try{
			let result = await getRecipe(i)
			if(result.errorCode === 0){
				console.log(`${i + 1} 、 ${result.data.name} ${result.data.name_adj} done.`)
				for(let item of getDownloadUrls(result.data)){
					await fetchSource(item.url,item.name,item.type)
				}
				save(result)
			}else{
				console.log(`${i + 1} 、 ${result.message}.`)
			}
		}catch(err){
			console.log(err.message)
		}
	}
	console.log('over')
}

/**
 * 获取需要下载资源地址列表
 * @param {采集JSON数据} data 
 */
function getDownloadUrls(data){
	let result = []

	//图片720 * 1280
	let original_image = formatUrl(data.image.url_pattern,720,1280)  //720 * 1280
	result.push({
		type:'image',
		url:original_image,
		name:data.image.ident
	})

	//图片308 * 308 
	let square_image   = formatUrl(data.square_image.url_pattern,308,308) //308 * 308 
	result.push({
		type:'image',
		url:square_image,
		name:data.square_image.ident
	})

	//步骤图片 200 * 200
	let stepsImages = data.steps.map(step => {
		return {
			type:'image',
			url:formatUrl(step.image.url_pattern,step.image.original_width,step.image.original_height),
			name:step.image.ident
		}
	})

	result.push(...stepsImages)

	//视频720 * 1280
	let video = data.video.url //720 * 1280
	result.push({
		type:'video',
		url:video,
		name:data.video.ident
	})
	
	return result
}

/**
 * 下载图片和视频
 * @param {*} url 
 * @param {*} fileName 
 * @param {*} type 
 */
function fetchSource(url,fileName,type='image'){
	if(fs.existsSync(path.join(imagesPath,fileName)) || fs.existsSync(path.join(videosPath,fileName))) {
		console.log(fileName+' 已存在忽略...')
		return
	} 
	return axios({
	  method: 'get',
	  url:url,
	  responseType: 'stream'
	})
	.then(function (response) {
	  if(type === 'image'){
	  	console.log('download image:'+fileName)
	  	response.data.pipe(fs.createWriteStream(path.join(imagesPath,fileName)))
	  }
	  if(type === 'video'){
	  	console.log('download video:'+fileName)
	  	response.data.pipe(fs.createWriteStream(path.join(videosPath,fileName)))
	  }
	})
	.catch(err =>{
		console.log('error:'+err.message+'--'+fileName)
	})
}

/**
 * 格式化图片地址
 * @param {*} url 
 * @param {*} w 
 * @param {*} h 
 * @param {*} format 
 */
function formatUrl(url,w,h,format='jpg'){
	return url.replace('{width}',w).replace('{height}',h).replace('{format}',format)
}
