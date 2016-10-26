var webpack = require("webpack");

module.exports = {
    devtool: "source-map",
    entry: "./src/js/main.js",
    output: {
        path: __dirname + "/dist/js",
        filename: "app.bundle.js",
        publicPath: "/dist/js/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: [ "es2015" ]
                }
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: "url?limit=100000"
            },
            {
                test: /\.(scss|sass)$/,
                loaders: [ "style", "css", "sass" ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "window.$": "jquery",
            "window.jQuery": "jquery"
        }),
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
