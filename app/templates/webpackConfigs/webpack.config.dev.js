module.exports = function(env) {
    const path = require('path'),
        cleanWebpackPlugin = require('clean-webpack-plugin'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        settings = require('./statics/configSettings.js'),
        ExtractTextPlugin = require('mini-css-extract-plugin'),
        extractCSS = new ExtractTextPlugin({filename: settings.styleSheetNames.dev.css});

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
                    test: /\.s?[ac]ss$/,
                    use: [
                        ExtractTextPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ],
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
            extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
        },
        plugins: [
            new cleanWebpackPlugin(['dist'], settings.cleanOptions),
            new HtmlWebpackPlugin(settings.htmlPluginOptions),
            extractCSS
        ],
        mode: "development",
        devtool: 'inline-source-map',
        externals: {}
    };
};

