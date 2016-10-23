var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import Content from './content';
export default class App extends Component {
    renderDevTools() {
        if (process.env.NODE_ENV !== 'production') {
            return React.createElement(DevTools, null);
        }
        return null;
    }
    ;
    render() {
        return (React.createElement("div", {className: 'wrapper'}, 
            this.renderDevTools(), 
            React.createElement(Content, __assign({}, this.props))));
    }
    ;
}
;
//# sourceMappingURL=app.js.map