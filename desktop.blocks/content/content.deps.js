({
    shouldDeps: [
        { block: 'carousel', elems: ['item']},
        { block: 'motivator', elems: [
            { name: 'img', elemMods: { theme: ['bem', 'another'] } }, 
            'slogan',
            'tagline'
        ]}
    ]
})
