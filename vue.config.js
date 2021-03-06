module.exports = {
    devServer: {
        port:5000,
        proxy: {
            '/api': { // ，匹配所有以 '/api'开头的请求路径v8888/ftf_web
                // target: 'http://192.168.43.40:8081', // 转发请求到5000端口
                target: 'http://localhost:8081', // 转发请求到5000端口
                // target: 'http://localhost:8888/ftf_web', // 转发请求到5000端口
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 转发请求前，重写路径: 去掉路径中开头的'/api'
                    '^/api': ''
                }
            },
            '/baidu': { // 匹配所有以 '/baidu'开头的请求路径
                target: 'http://www.baidu.com', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/baidu'
                    '^/baidu': ''
                }
            }
        }
    }
}