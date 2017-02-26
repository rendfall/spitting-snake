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
            border: '1px solid #ddd',
            width: '8px',
            height: '8px'
        }),

        menuItem: createElement('i', { 
            display: 'block',
            float: 'left',
            width: '100px',
            textAlign: 'center',
            padding: '10px 0',
            height: '30px',
            border: '1px solid #ddd'
        })
    };

    root.Elements = {
        create(name) {
            return Elements[name].cloneNode(true);
        }
    };
})(window);
