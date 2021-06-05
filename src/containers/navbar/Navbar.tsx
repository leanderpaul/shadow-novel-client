/**
 * Importing npm packages.
 */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Space } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { HomeOutlined, CompassOutlined, SearchOutlined } from '@ant-design/icons';
import { AppstoreFilled, EditFilled, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

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
import { Container, LogoContainer, NavItemList, Toggle, Divider } from './styles';
import Settings from '../settings/Settings';

/**
 * Importing types.
 */

/**
 * Declaring constants.
 */

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  const authenticated = auth.isAuthenticated;
  const logout = () => setAuth();
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <Container className='transit' open={isOpen}>
      <Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
      <LogoContainer>
        <Space direction='vertical' size='middle'>
          <Link to='/'>
            <img src={LogoImg} className='transit' width={isOpen ? 60 : 30} alt='Shadow Novel Logo' />
          </Link>
          <Link to='/'>
            <img src={LogoDesc} className='transit' width={isOpen ? 120 : 30} alt='Shadow Novel Text' />
          </Link>
          <Toggle open={isOpen} onClick={toggle} />
        </Space>
      </LogoContainer>
      <Divider />
      <NavItemList>
        <NavItem Icon={HomeOutlined} title='Home' key='home' link='/' />
        <NavItem Icon={CompassOutlined} title='Explore' key='explore' link='/novel' />
        <NavItem Icon={SearchOutlined} title='Search' key='search' link='/search' />
      </NavItemList>
      <Divider />
      <NavItemList>
        {auth.isAuthenticated ? (
          <>
            <NavItem Icon={AppstoreFilled} title='Library' key='library' disabled={!authenticated} link='/library' />
            <NavItem Icon={EditFilled} title='Workspace' key='workspace' disabled={!authenticated} link='/workspace' />
            <NavItem Icon={UserOutlined} title='Profile' key='profile' disabled={!authenticated} link='/profile' />
            <NavItem Icon={LogoutOutlined} title='Logout' key='logout' onClick={logout} />
          </>
        ) : (
          <NavItem Icon={LoginOutlined} title='Login' key='login' link='/login' />
        )}
      </NavItemList>
      <Divider />
      <NavItemList>
        <NavItem Icon={SettingFilled} title='Settings' onClick={toggleSettings} />
      </NavItemList>
    </Container>
  );
}

export default Navbar;
