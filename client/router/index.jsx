/**
 * 返回一个基本的App
 */
import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../page/Home';
import About from '../page/About';

const routes = [{ path: '/', component: Home }, { path: '/about', component: About }];

class RoutesIndex extends React.Component {
    render() {
        return (
            <div className="app-container">
                {routes.map((item, index) => (
                    <Route key={index} path={item.path} exact component={item.component} />
                ))}
            </div>
        );
    }
}

export default { RoutesIndex, routes };
