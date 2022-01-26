import React from 'react'
import { Route, Redirect } from 'react-router'

const usuario="s";

export const PrivateRoute = ({component:Component, ...rest}) => {
    
    return (
        <Route {...rest}>
            {
               usuario?
                <Component />
               :
                <Redirect to="/" />
            }            
        </Route>
    )
}
