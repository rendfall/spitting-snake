(function (root) {
    function createElement(name, styles) {
        let $el = document.createElement('i');
        Object.assign($el.style, styles);
        return $el;
    }

    let Elements = {
        tile: createElement('i', { 
            display: 'block',
            float: 'left',
            outline: '1px solid #ddd'
        }),

        score: createElement('i', {
            display: 'block',
            fontSize: '24px'
        }),

        menuItem: createElement('i', { 
            display: 'block',
            width: '100px',
            textAlign: 'center',
            padding: '10px 0',
            height: '20px',
            border: '1px solid #ddd',
            cursor: 'pointer'
        })
    };

    root.Elements = {
        create(name) {
            return Elements[name].cloneNode(true);
        }
    };
})(window);
