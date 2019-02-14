import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import getData from '../../common/getData';
import styles from './index.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.staticContext
        };
    }

    async componentDidMount() {
        this.setState({ user: await getData(this.props.match.path) });
    }

    render() {
        const { user } = this.state;
        return (
            <div className={styles.box}>
                <Link to="/about">About</Link>
                <h1>hello koa-react-template</h1>
                <p>{user && user.userId}</p>
                <p>{user && user.name}</p>
                <p>{user && user.gender}</p>
                <p>{user && user.age}</p>
            </div>
        );
    }
}

export default withRouter(Home);
