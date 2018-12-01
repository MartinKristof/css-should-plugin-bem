const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tss?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
};
