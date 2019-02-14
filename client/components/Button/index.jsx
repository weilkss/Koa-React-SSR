/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

class Button extends React.Component {
    render() {
        const { children, className, ...others } = this.props;
        return (
            <button className={classnames(styles.button, className ? className : null)} {...others}>
                {children}
            </button>
        );
    }
}

export default Button;
