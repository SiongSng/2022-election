import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '@/component/hamburger.css';
export class HamburgerMenu extends React.Component {
  render(): React.ReactNode {
    return (
      <Menu>
        <a className="menu-item" href="/">
          首頁
        </a>
        <a className="menu-item" href="/mayor">
          縣市長
        </a>
        <a className="menu-item" href="/council">
          縣市議員
        </a>
        <a className="menu-item" href="/referendum">
          憲法修正案公民複決
        </a>
      </Menu>
    );
  }
}
