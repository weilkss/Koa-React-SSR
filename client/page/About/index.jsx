import React, { Component } from 'react';
import { connect } from 'react-redux';
import reduxTypes from '../../redux/types';
import { Button } from '../../components';
import styles from './index.scss';

class About extends Component {
    handleAddClick() {
        this.props.dispatch({
            type: reduxTypes.ADD_COUNTER
        });
    }
    handleDelClick() {
        this.props.dispatch({
            type: reduxTypes.DEL_COUNTER
        });
    }
    render() {
        const { count } = this.props;
        return (
            <div className={styles.box}>
                <Button className={styles.button} onClick={() => this.handleAddClick()}>
                    增加
                </Button>
                <span>{count}</span>
                <Button className={styles.button} onClick={() => this.handleDelClick()}>
                    减少
                </Button>
            </div>
        );
    }
}

export default connect(state => state)(About);
