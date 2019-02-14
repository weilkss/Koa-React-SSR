import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../client/redux/store.js';

import { RoutesIndex, routes } from '../../client/router/index.jsx';
import getData from '../../client/common/getData';

async function clientRoute(ctx, next) {
    for (let item of routes) {
        if (item.path == ctx.url) {
            const data = await getData(ctx.url);
            await ctx.render('index', {
                root: renderToStaticMarkup(
                    <Provider store={store}>
                        <StaticRouter location={ctx.url} context={data}>
                            <RoutesIndex {...store.getState()} />
                        </StaticRouter>
                    </Provider>
                )
            });
            break;
        }
    }
    await next();
}

export default clientRoute;
