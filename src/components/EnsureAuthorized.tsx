import React, { useContext } from 'react'
import { AuthInterface, AuthContext } from '../common/auth';
import { UnAuthenticated } from './UnAuthenticated';

export const EnsureAuthorized = ({ children }: { children: any }) => {
    const auth = useContext(AuthContext);

    return (
        <>
            {auth.isAuthenticated && children}
            {!auth.isAuthenticated && <UnAuthenticated />}
        </>
    )
}
