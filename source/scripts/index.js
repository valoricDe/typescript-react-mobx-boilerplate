var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import createStores from './main/create-stores';
const stores = createStores();
render(React.createElement(App, __assign({}, stores)), document.getElementById(process.env.root));
//# sourceMappingURL=index.js.map