blocks['b-page'] = function(data) {
    return ({
        block: 'b-page',
        title: 'BEM Server Motivator',
        head: [
            { elem: 'css', url: 'desktop.bundles/index/_index.css', ie: false },
            { elem: 'css', url: 'desktop.bundles/index/_index.ie.css', ie: 'lt IE 8' },
            { block: 'i-jquery', elem: 'core' },
            { elem: 'js', url: 'desktop.bundles/index/_index.js' }
        ],
        content: [
            blocks['content'](data)
        ]
    });
}
