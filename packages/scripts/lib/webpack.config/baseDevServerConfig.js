module.exports = {
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true, // 解决f5刷新界面报404问题
        open: true,
    }
};
