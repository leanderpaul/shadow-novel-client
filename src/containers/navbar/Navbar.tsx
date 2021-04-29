/**
 * Importing npm packages.
 */
import React, { useState, useContext } from 'react';

/**
 * Importing npm design components.
 */
import { Space, Divider } from 'antd';
import { HddOutlined } from '@ant-design/icons';
import { HomeOutlined, CompassOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AppstoreFilled, EditFilled, SettingFilled, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */
import NavItem from '../../components/nav-item/NavItem';

/**
 *  Importing user defined modules.
 */
import { AuthContext } from '../../utils/store';

/**
 * Importing styled components.
 */
import LogoImg from '../../assets/img/logo-pic.png';
import LogoDesc from '../../assets/img/logo-desc.png';
import { Container, LogoContainer, NavItemList, Toggle } from './styles';

/**
 * Importing types.
 */

/**
 * Declaring constants.
 */

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [auth, setAuth] = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  const authenticated = auth.isAuthenticated;
  const logout = () => setAuth();

  return (
    <Container className='transit' open={isOpen}>
      <LogoContainer>
        <Space direction='vertical' size='middle'>
          <img src={LogoImg} className='transit' width={isOpen ? 60 : 30} alt='Shadow Novel Logo' />
          <img src={LogoDesc} className='transit' width={isOpen ? 120 : 30} alt='Shadow Novel Text' />
          <Toggle open={isOpen} onClick={toggle} />
        </Space>
      </LogoContainer>
      <Divider style={{ margin: '10px', width: 'auto', minWidth: 'auto' }} />
      <NavItemList>
        <NavItem Icon={HomeOutlined} title='Home' key='home' link='/' />
        <NavItem Icon={CompassOutlined} title='Explore' key='explore' link='/explore' />
        <NavItem Icon={ClockCircleOutlined} title='Latest Updates' key='latest-updates' link='/latest-updates' />
        <NavItem Icon={SearchOutlined} title='Search' key='search' link='/search' />
      </NavItemList>
      <Divider style={{ margin: '10px', width: 'auto', minWidth: 'auto' }} />
      <NavItemList>
        <NavItem Icon={AppstoreFilled} title='Library' key='library' disabled={!authenticated} link='/library' />
        <NavItem Icon={EditFilled} title='Workspace' key='workspace' disabled={!authenticated} link='/workspace' />
        <NavItem Icon={SettingFilled} title='Settings' key='settings' link='/settings' />
        {authenticated ? <NavItem Icon={LogoutOutlined} title='Logout' key='logout' onClick={logout} /> : <NavItem Icon={LoginOutlined} title='Login' key='login' link='/login' />}
      </NavItemList>
      <Divider style={{ margin: '10px', width: 'auto', minWidth: 'auto' }} />
      <NavItemList>
        <NavItem Icon={HddOutlined} title='Server Settings' />
      </NavItemList>
    </Container>
  );
}

export default Navbar;
