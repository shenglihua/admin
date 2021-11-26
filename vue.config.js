module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.61:8888', // naseurl 基础的路径地址
                changeOrigin: true,// 是否跨域
                pathRewrite: {
                    '^/api':'' // 重写路径
                }
            }
        }
    }
}