import React, {ReactElement} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import VideoTab from './VideoTab/component';
import {RouterLinks} from '../shared/types/RouterLinks';
import { createBrowserHistory } from 'history';


export default function Routes(): ReactElement {

    return (
        <Router history={createBrowserHistory()}>
            <Switch>

                <Route exact path="/">
                    <Redirect to={RouterLinks.LOGIN}/>
                </Route>

                {/*<LoginPage>*/}
                <Route path={RouterLinks.LOGIN}>
                    <VideoTab/>
                </Route>

            </Switch>

        </Router>
    )
}
