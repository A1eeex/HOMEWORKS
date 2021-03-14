const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    mode:'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer:{
        contentBase: './dist/'
    },
    module:{
        rules:[{
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            }]
    },
    plugins: [new HtmlWebpackPlugin({
        template:'./src/index.html',
    })],
}