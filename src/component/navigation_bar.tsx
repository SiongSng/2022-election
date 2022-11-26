import React from 'react';
import { HamburgerMenu } from '@/component/hamburger';

export class NavigationMenu extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="navigation_menu">
        <div className="hamburger">
          <HamburgerMenu />
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="/">首頁</a>
            </li>
            <li>
              <a href="/mayor">縣市長</a>
            </li>
            <li>
              <a href="/council">縣市議員</a>
            </li>
            <li>
              <a href="/referendum">憲法修正案公民複決</a>
            </li>
          </ul>
        </div>
        <style jsx>{`
          .navigation_menu {
            margin-left: auto;
          }

          .hamburger {
            display: none;
          }

          .menu ul {
            display: flex;
            padding: 0;
          }

          .menu li {
            list-style-type: none;
            margin: 0 1rem;
          }

          .menu a {
            font-size: 1.2rem;
            color: white;
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
