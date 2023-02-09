const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { 
        //filename: path.resolve(__dirname,'src/index.js')
        app: "./src/index.js",
        worker: "./src/js/worker.js"
    },
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins: [ 
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            excludeChunks: ["worker"]
        })
    ]
};

