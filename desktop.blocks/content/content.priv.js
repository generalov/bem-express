blocks['content'] = function(data) { 

    return {
        block: 'content',
        content: [
            {
                block: 'carousel',
                content: data.slides.map(function(item, i) {
                    return {
                        elem: 'item', content: [
                            {
                                block: 'motivator',
                                content: [
                                    {elem: 'img', elemMods: {theme: data.slides[i].type}},
                                    {elem: 'slogan', content: data.slides[i].slogan || 'BEM SERVER'},
                                    {elem: 'tagline', content: data.slides[i].tagline}
                                ]
                            }
                        ]
                    };
                })
            }
        ]
    };

};
