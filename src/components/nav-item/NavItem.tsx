/**
 * Importing npm packages.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Tooltip } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */
import { Container } from './styles';

/**
 * Importing types.
 */
interface NavItemProps {
  Icon: React.ForwardRefExoticComponent<any>;
  title: string;
  link?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function NavItem(props: NavItemProps) {
  const { Icon, title, link, disabled, onClick } = props;
  const { pathname } = useLocation();
  const toLink = disabled ? '#' : link || '#';

  return (
    <Link to={toLink} onClick={onClick}>
      <Tooltip placement='right' title={title}>
        <Container disabled={disabled} active={pathname === link}>
          <span className='icon'>
            <Icon />
          </span>
          <span>{title}</span>
        </Container>
      </Tooltip>
    </Link>
  );
}

export default NavItem;
