import React from 'react';
import { HamburgerMenu } from '@/component/hamburger';
import { NavigationLink } from '@/component/navigation_link';

export class NavigationMenu extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="navigation-menu">
        <div className="hamburger">
          <HamburgerMenu />
        </div>
        <div className="menu">
          <ul>
            {NavigationLink('首頁', '/')}
            {NavigationLink('縣市長', '/mayor')}
            {NavigationLink('議員', '/council')}
            {NavigationLink('憲法修正案公民複決', '/referendum')}
          </ul>
        </div>
        <style jsx>{`
          .navigation-menu {
            margin-left: auto;
          }

          .hamburger {
            display: none;
          }

          .menu ul {
            display: flex;
            padding: 0;
          }

          .menu a:hover {
            font-weight: bold;
            color: #747bff;
          }

          @media (prefers-color-scheme: light) {
            .menu a {
              color: black;
            }

            .menu a:hover {
              color: #535bf2;
            }
          }

          @media screen and (max-width: 768px) {
            .hamburger {
              display: block;
            }

            .menu ul {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}
