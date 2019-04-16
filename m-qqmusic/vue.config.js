const isDev = process.env.NODE_ENV === 'production';
module.exports = {
    lintOnSave: 'error',
    css: {
        modules: false,
        extract: isDev,
        sourceMap: true,
        loaderOptions: {
            css: {
                loader: 'sass-loader'
            }
        }
    },
    devServer: {
        proxy: {
            '/(top|query|music|lyric)': {
                target: 'http://www.myingsmile.com:3000',
                changeOrigin: true
            }
        }
    }
};
