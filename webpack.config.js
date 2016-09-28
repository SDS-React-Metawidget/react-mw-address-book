/**
 * Created by alex on 28/09/2016.
 */

module.exports = {
    entry: './src/client.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
};
