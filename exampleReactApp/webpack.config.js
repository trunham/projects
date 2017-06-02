var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill', './client'
    ],
    output: {
        path:     path.join(__dirname, 'assets/js'),
        filename: 'bundle.js'
    },
    context: __dirname,
    node: {
        __filename: true,
        __dirname: true
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions:         ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test:    /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name="[name]-[hash].[ext]"'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
        new webpack.optimize.UglifyJsPlugin({
                 compress: {
                        warnings: false,
                        screw_ie8: true
                },
                comments: false,
                sourceMap: false
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: false,
        proxy: {
            '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
        },
        host: '127.0.0.1'
    }
};
