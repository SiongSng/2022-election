import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import '@/component/hamburger.css';
import { BASE_ROUTE } from '@/routes/root';

export class HamburgerMenu extends React.Component {
  render(): React.ReactNode {
    return (
      <Menu>
        <a className="menu-item" href={`${BASE_ROUTE}/`}>
          首頁
        </a>
        <a className="menu-item" href={`${BASE_ROUTE}/mayor`}>
          縣市長
        </a>
        <a className="menu-item" href={`${BASE_ROUTE}/council`}>
          縣市議員
        </a>
        <a className="menu-item" href={`${BASE_ROUTE}/referendum`}>
          憲法修正案公民複決
        </a>
      </Menu>
    );
  }
}
