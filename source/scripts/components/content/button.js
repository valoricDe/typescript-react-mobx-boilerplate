import React from 'react';
const Button = (props) => {
    const { caption, type, onClick } = props;
    return (React.createElement("button", {className: `content__button content__button--${type}`, onClick: onClick}, caption));
};
export default Button;
//# sourceMappingURL=button.js.map