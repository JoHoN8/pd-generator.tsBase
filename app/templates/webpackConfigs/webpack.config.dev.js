module.exports = function(env) {
    const path = require('path'),
        cleanWebpackPlugin = require('clean-webpack-plugin'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        settings = require('./statics/configSettings.js'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        extractCSS = new ExtractTextPlugin(settings.styleSheetNames.dev.css),
        extractSCSS  = new ExtractTextPlugin(settings.styleSheetNames.dev.scss);

    return {
        entry: {
            main: './src/scripts/app.ts'
        },
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: './scripts/[name].js'
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: extractCSS.extract({
                        use: [
                            {
                                loader: 'css-loader',
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
            extractCSS,
            extractSCSS
        ],
        devtool: 'inline-source-map',
        externals: {}
    };
};

