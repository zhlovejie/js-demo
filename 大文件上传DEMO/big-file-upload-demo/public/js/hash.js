self.importScripts('/js/spark-md5.min.js')
self.onmessage = e => {
  let {file} = e.data
  let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  let spark = new SparkMD5.ArrayBuffer()
  let chunkSize = 2097152 * 10 //chunks of 20MB
  let chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  let chunkList = []

  let loadNext = () => {
    let start = currentChunk * chunkSize
    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize 
    let chunk = blobSlice.call(file, start, end)
    
    chunk.arrayBuffer().then(res =>{
      chunkList.push(chunk)
      spark.append(res)
      currentChunk ++
      if(currentChunk < chunks){
        let progress = parseInt(currentChunk / chunks * 100)
        self.postMessage({progress})
        loadNext()
      }else{
        let hash = spark.end()
        self.postMessage({
          chunkList:chunkList.map((c,idx) =>{
            return {
              chunk:c,
              hashIdx:`${hash}_${idx}`,
              hash:hash,
              chunkName:`${file.name}_${idx}`,
              //fileName:file.name
            }
          }),
          progress:100,
          hash:hash
        })
      }
    })
  }

  loadNext()
}

self.onerror = e => console.log(e)