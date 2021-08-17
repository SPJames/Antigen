const concurrently = require('concurrently');
const path = require('path');
concurrently([
    { command: 'webpack --watch', name: 'webpack' },
    { command: 'live-server --entry-file=index.html', name: 'server', cwd: path.resolve(__dirname, 'dist')}
]);