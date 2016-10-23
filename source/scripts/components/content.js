var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Center from './common/center';
import Label from './content/label';
import Button from './content/button';
import Footer from './content/footer';
let Content = class Content extends Component {
    constructor() {
        super(...arguments);
        this.handleIncrement = () => {
            let tick = this.props.tickStore.models.values().next().value;
            if (tick) {
                tick.increment();
            }
        };
        this.handleDecrement = () => {
            let tick = this.props.tickStore.models.values().next().value;
            if (tick) {
                tick.decrement();
            }
        };
    }
    render() {
        let ticks = this.props.tickStore.models.values().next();
        return (React.createElement("div", {className: 'content'}, 
            React.createElement(Center, null, 
                React.createElement(Label, {value: ticks.value ? ticks.value.value : ""}), 
                React.createElement(Button, {type: 'increment', caption: '++', onClick: this.handleIncrement}), 
                React.createElement(Button, {type: 'decrement', caption: '--', onClick: this.handleDecrement}), 
                React.createElement(Footer, null))
        ));
    }
    ;
};
Content = __decorate([
    observer
], Content);
export default Content;
;
//# sourceMappingURL=content.js.map