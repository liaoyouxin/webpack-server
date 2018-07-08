const htmlWebpackPlugin = require('html-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const devServerOutput = require('webpack-dev-server-output')
const path = require('path')

module.exports = {
	mode:'development',
	entry:{
		main:'./src/index.js'
	},
	output:{
		filename:'./js/bundle.js',
		path:path.resolve(__dirname,'dist'),
		publicPath:"http://localhost:8888/"
	},
	module:{
		rules:[
		  {
		  	test:/\.js$/,
		  	exclude:/node_modules/,
		  	use:{
		  		loader: 'babel-loader'
		  	}
		  },
		  {
		  	test:/\.(css|less)$/,
		  	use:extractTextPlugin.extract({
		  		fallback:'style-loader',
		  		use:[
		  		{loader:'css-loader'},
		  		{loader:'less-loader'}
		  		]
		  	})
		  	// use:[
		  	//     {loader:'style-loader'},
     //            {loader:'css-loader'}
		  	// ]
		  },
		  {
		  	test:/\.(jpg|png|gif)$/,
		  	use:{
		  		loader:'file-loader',
		  		options:{
		  			limit:8192, //设置文件大小限制
		  			outputPath:'./img'
		  		}
		  	}
		  }
		]
	},
	plugins: [
       //new cleanWebpackPlugin(['dist']),
	   new extractTextPlugin("./css/[name].css"),
	   new htmlWebpackPlugin({
	   	   title:'hello',//设置生成html文件的标题
	   	   template:'./index.html', //打包模板
	   	   filename:'index.html', //打包生成文件名
	   	   inject: 'body',  //script标签位置
	   	   //favicon:'ico文件路径',
	   	   minify:{
	   	   	 removeAttributeQuotes: true //移除属性的
	   	   },
	   	   hash:true//防止js缓存
	   	  //cache:true, //只有在内天,默认开启
	   	  //showErrors:true, //显示编译时错误信息，默认开启
	   	  // chunks:['文件1','文件2'],//多入口文件时，指定文件,没有chunks时默认引用全部
	   	  //excludeChunks:['文件名'],//跟chunks相反 选择排除特定文件
	   	  //xhtml:false,//为true时兼容以xhtml的模式引用文件
	   	   
	   })
	],
	devServer:{
		contentBase:path.join(__dirname,'dist'), //网站根目录
		port:8888, //端口号
		host:'localhost',//指定ip局域网可访问
		open:true, //自动打开浏览器
		//index:'index.html',//设置首页
		inline:true,//监听页面改动自动刷新
		//hot:true,  //热更新
		compress:false //压缩
	}
}