const path=require("path");
module.exports={
    // 部署应用时的基本 URL
    publicPath: '/vue-phone-cus',
    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: 'dist',
    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: './assets',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    configureWebpack:{
          module:{
            rules: [
              {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true,
                  getCustomTransformers: () => ({
                    before: [
                    require('ts-import-plugin')({
                      "libraryName": "mand-mobile"
                    })
                    ]
                  })
                }
              },
              {
                test: /\.svg$/i,
                loader: 'svg-sprite-loader',
                include: [
                  // 将某个路径下所有svg交给 svg-sprite-loader 插件处理
                  path.resolve(__dirname, 'src/my-svg')
                ],
              }
            ]
          },
          resolve: {
            alias: {
              '@': path.resolve("src"),
              '@assets': path.resolve("src/assets"),
              '@utils': path.resolve("src/utils")
            }
          }
    },
    devServer:{
        contentBase: path.resolve(__dirname),       //这里指的是服务器在哪个文件夹下起
        host: '0.0.0.0',                                                    // 服务器的IP地址，可以使用IP也可以使用localhost
        inline:true,                                                            //看下文
        compress:true,                                                    //是否起用服务端压缩
        port:1717,                                                      //默认为8080
        hot:true,
        open:true,
        proxy:{
          // '/llxData':{
          //   target:"http://llxali.club:9999/api",
          //   changeOrigin: true,
          //   pathRewrite:{
          //     '^/llxData':"/api"
          //   }
          // },
          '/list':{
            target:"http://120.26.211.143:5001",
            changeOrigin: true,
            pathRewrite:{
              '^/list':""
            }
          }
          // '/getDetails': {
          //   target:" http://192.168.101.153:1112",
          //   changeOrigin: true,
          //   pathRewrite:{
          //     '^/getDetails':""
          //   }
          // }
        }
    }
}