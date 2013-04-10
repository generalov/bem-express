({
    mustDeps: [
        {
            block: 'i-bem',
            elem: 'dom',
            mods: { init: 'auto' }
        },
        { block: 'bemhtml' }
    ],
    shouldDeps: [
        {
            block: 'content'
        }
    ],
    noDeps: [
        {
            block: 'i-bem',
            elem: 'html'
        }
    ]
})
