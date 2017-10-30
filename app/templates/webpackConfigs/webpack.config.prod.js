module.exports = function(env) {
    const path = require('path'),
        webpack = require('webpack'),
        cleanWebpackPlugin = require('clean-webpack-plugin'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        settings = require('./statics/configSettings.js'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        extractCSS = new ExtractTextPlugin(settings.styleSheetNames.prod.css),
        extractSCSS  = new ExtractTextPlugin(settings.styleSheetNames.prod.scss);
    
    return {
        entry: {
            main: './src/scripts/app.js'
        },
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: './scripts/[name].min.[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: extractCSS.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: settings.cssloaderOptionsProd
                            }
                        ]
                    })
                },
                {
                    test: /\.scss$/,
                    use: extractSCSS.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: settings.cssloaderOptionsProd
                            },
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /\.(ts|js)?$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use: [ 'style-loader', 'file-loader' ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.scss']
        },
        plugins: [
            new cleanWebpackPlugin(['dist'], settings.cleanOptions),
            new HtmlWebpackPlugin(settings.htmlPluginOptions),
            new webpack.optimize.UglifyJsPlugin(settings.UglifyJsOptions),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.DefinePlugin(settings.defineOptions),
            extractCSS,
            extractSCSS
        ],
        devtool: 'source-map',
        externals: {}
    };
};

