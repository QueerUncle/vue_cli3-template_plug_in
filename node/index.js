/**
 *  2019/1/16  lize
 */
/**
 *  2018/1/11  lize
 */
var express = require("express");

var app = express();

var path = require("path");

var fs = require("fs")

var multer  = require('multer');

const mutipart= require('connect-multiparty');

const mutipartMiddeware = mutipart();

//磁盘存储引擎（说白了就是指定上传的文件存储到哪，当然你也可以对文件重命名等等）
var storage=multer.diskStorage({
  
  destination: function (req, file, cb) {
    //我这里是存储在public下的uploads目录
    
    cb(null, __dirname+'/img')
    
  },
  
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname + '-' + Date.now()+"_" + file.originalname)
    
  }
  
});



var upload = multer({ storage: storage });

app.use(express.static('img'));

//解决跨域请求
app.use('*', function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  
  res.header("X-Powered-By",' 3.2.1');
  
  res.header("Content-Type", "application/json;charset=utf-8");
  
  next();
  
});

//get_openid
app.post('/api/upload',upload.array("file",1000), function(req, res){
  
  var files = req.files;
  
  var dir = req.body.dirname;
  
  // console.log(dir);
  
  let ids = [];
  
  for(var i = 0; i < files.length; i++) {

    var file = files[i];
  
    ids.push(file.filename)

  }
  res.json({

    code: 1000,

    desc: '成功导入'+files.length+ '张图片',
  
    ids:ids,
    
    id:111

  });
  
});

app.post('/api/uploads', mutipartMiddeware,function(req, res){
  
  console.log(req.files);
  
  res.json({
    
    message:'上传成功'
    
  })
  
  // var files = req.files;
  //
  // var dir = req.body.dirname;
  //
  // // console.log(dir);
  //
  // let patharr = [];
  //
  // for(var i = 0; i < files.length; i++) {
  //
  //   var file = files[i];
  //
  //   console.log(file,'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
  //
  //   patharr.push(file.filename)
  //
  // }
  // res.json({
  //
  //   code: 1000,
  //
  //   desc: '成功导入'+files.length+ '张图片',
  //
  //   pathAry:patharr
  //
  // });
  
});

app.get('/',function(req,res){
  
  res.send('你好！')
  
});
app.listen(3001);

console.log(3001)
