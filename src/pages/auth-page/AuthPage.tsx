/**
 * Importing components from npm packages.
 */
import React, { useState, useContext, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';

/**
 * Importing npm design components.
 */
import { Typography } from 'antd';

/**
 * Importing user defined components.
 */
import Login from './Login';
import Register from './Register';

/**
 *  Importing user defined modules.
 */
import { AuthContext, authToken } from '../../utils/store';
import { AuthAPI } from '../../utils/api';

/**
 * Importing styled components.
 */
import { AuthCard, Container } from './styles';

/**
 * Importing types.
 */
import { CardTabListType } from 'antd/lib/card';
import type { ErrorResponse } from '../../typescript/api';
import type { Auth } from '../../utils/store';

type ITab = 'login' | 'register';

const tabs: CardTabListType[] = [
  {
    key: 'login',
    tab: (
      <Typography.Title className='px-4 mb-0 text-uppercase ls-1' level={4}>
        Login
      </Typography.Title>
    )
  },
  {
    key: 'register',
    tab: (
      <Typography.Title className='px-4 mb-0 text-uppercase ls-1' level={4}>
        Register
      </Typography.Title>
    )
  }
];

function AuthPage() {
  const [tab, setTab] = useState<ITab>('login');
  const { state } = useLocation();
  const [auth, setAuth] = useContext(AuthContext);
  const { isLoading, mutate } = useMutation(AuthAPI.verifySession, { onSuccess: setAuth, onError: () => setAuth() });

  useEffect(() => {
    if (authToken) mutate();
  }, []);

  return auth.isAuthenticated ? (
    <Redirect to={(state as any)?.from || '/'} />
  ) : (
    <Container>
      <AuthCard loading={isLoading} tabList={tabs} activeTabKey={tab} onTabChange={(key) => setTab(key as ITab)} tabProps={{ centered: true }}>
        {tab === 'login' ? <Login /> : <Register />}
      </AuthCard>
    </Container>
  );
}

export default AuthPage;
