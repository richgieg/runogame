const webpack = require('webpack');
const path = require('path');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

const config = {
    entry: './src/Main.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    stats: 'errors-warnings',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true,
                    forceIsolatedModules: true
                }
            },
        ],
    },
    plugins: [
        new ExtraWatchWebpackPlugin({
            files: ['../server/shared/**/*.ts'],
        }),
    ],
};

module.exports = config;
