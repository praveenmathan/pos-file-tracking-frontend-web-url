const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');

const isProduction = true; // TODO:config for multi env
const PUBLIC_PATH = "/";
const resolve = {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".scss", ".json"],
    alias: {
        "universal": path.resolve(__dirname, "src/universal"),
        "server": path.resolve(__dirname, "src/server"),
        "client": path.resolve(__dirname, "src/client"),
        "assets": path.resolve(__dirname, "assets"),
        "config": path.resolve(__dirname, "config"),
        "components": path.resolve(__dirname, "src/universal/components"),
        "connectors": path.resolve(__dirname, "src/universal/connectors"),
        "actions": path.resolve(__dirname, "src/universal/actions"),
        "reducers": path.resolve(__dirname, "src/universal/reducers"),
        "services": path.resolve(__dirname, "src/services"),
        "prerender": path.resolve(__dirname, "src/server/prerender"),
        "shared": path.resolve(__dirname, "src/universal/shared"),
        "utils": path.resolve(__dirname, "src/universal/utils"),
        "global-css": path.resolve(__dirname, "src/universal/global-css"),
        "src": path.resolve(__dirname, "src"),
    }
};
var babelOptions = {
    "presets": [
        "@babel/preset-react",
        "@babel/preset-env"
    ],
    "plugins": [
        ["@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-destructuring",
        "@babel/plugin-proposal-object-rest-spread",
        "@loadable/babel-plugin"
    ]
};
// TODO: separate out common config and use webpack merge

let serverSideRendering = {
    name: "SSR",
    target: "node",
    externals: [nodeExternals({
        whitelist: [/\.(?!(?:tsx?|json|js)$).{1,5}$/i],
    })],
    mode: 'production',
    devtool: (() => {
        if (isProduction) {
            return 'hidden-source-map';
        }
        return 'inline-source-map';
    })(),
    // define the entry point
    entry: {
        server: "./src/server/Server.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: PUBLIC_PATH,
        library: "[name]",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [{
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: babelOptions
            }
            ]
        },
        {
            test: /\.js?$/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "isomorphic-style-loader"
            },
            {
                loader: "css-loader",
            },
            {
                loader: "postcss-loader",
                options: {
                    plugins: function () {
                        return [autoprefixer];
                    }
                }
            },
            {
                loader: "sass-loader" // compiles Sass to CSS, using Node Sass by default
            }
            ]
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(jpg|jpeg|png|svg|gif)(\?.*)?$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                }
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf)($|\?)/,
            loader: "url-loader?limit=5000&hash=sha512&digest=hex&size=16&name=fonts/[name]-[hash].[ext]"
        },
        ]
    },
    resolve,
    plugins: [
        // Pass the environment specific urls and apis to the application
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify('production'),
                "PUBLIC_URL": JSON.stringify(PUBLIC_PATH),
            },
        }),
    ],
};
const INDEX_FILE_NAME = 'template.html';
let clientSideRendering = {
    name: "CSR",
    mode: 'production',
    devtool: (() => {
        if (isProduction) {
            return 'hidden-source-map';
        }
        return 'inline-source-map';
    })(),
    entry: {
        bundle: [
            "core-js/stable/object", // For IE11
            "core-js/stable/promise", // For IE11
            "core-js/stable/array", // For IE11
            "core-js/stable/set", // For IE10
            "core-js/stable/map", // For IE10
            "core-js/stable/weak-map", // For IE10
            "./src/client/Browser.js"
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        publicPath: PUBLIC_PATH,
    },
    module: {
        rules: [{
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: babelOptions
            }
            ]
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "isomorphic-style-loader",
            },
            {
                loader: "css-loader",
            },
            {
                loader: "postcss-loader",
                options: {
                    plugins: function () {
                        return [autoprefixer];
                    }
                }
            },
            {
                loader: "sass-loader"
            }
            ]
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(jpg|jpeg|png|svg|gif)(\?.*)?$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf)($|\?)/,
            loader: "url-loader?limit=5000&hash=sha512&digest=hex&size=16&name=fonts/[name]-[hash].[ext]"
        },
        ]
    },
    resolve,
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static"
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: INDEX_FILE_NAME,
            PUBLIC_URL: PUBLIC_PATH + "/",
            inject: false
        }),

        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify('production'),
                "PUBLIC_URL": JSON.stringify(PUBLIC_PATH),
            },
        }),
        // Copy the manifest and favicon to output folder
        new CopyWebpackPlugin([{
            from: "public/manifest.json",
            to: "public/manifest.json",
        },
        {
            from: "public/favicon.png",
            to: "public/favicon.png"
        }
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction,
            debug: !isProduction
        }),
        new LoadablePlugin()
    ],
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        concatenateModules: true,
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.',
        }
    }
};
module.exports = [clientSideRendering, serverSideRendering]