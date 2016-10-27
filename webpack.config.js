var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extrectCSS = new ExtractTextPlugin("css/app.css");

module.exports = {
    devtool: "source-map",
    entry: "./src/js/main.js",
    output: {
        path: __dirname + "/dist/",
        filename: "app.bundle.js",
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel"
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: "url?limit=100000"
            },
            {
                test: /\.(scss|sass)$/,
                loader: extrectCSS.extract(["css", "sass"])
            },
            {
                test: /\.vue$/,
                loader: "vue"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "window.$": "jquery",
            "window.jQuery": "jquery"
        }),
        extrectCSS,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: "127.0.0.1",
        inline: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        }
    }
};
