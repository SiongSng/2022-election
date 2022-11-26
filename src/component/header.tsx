import React from 'react';
import logo from '@/assets/logo.png';
import { NavigationMenu } from '@/component/navigation_bar';

export class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <h2 className="title">2022 年選舉即時開票結果</h2>
        <NavigationMenu />
        <style jsx>{`
          .header {
            margin: 10px;
            display: flex;
            align-items: center;
          }

          .title {
            margin: 1rem;
          }

          .logo {
            width: 50px;
            height: 50px;
          }

          @media (max-width: 768px) {
            .title {
              font-size: 1.2rem;
            }

            .logo {
              width: 30px;
              height: 30px;
            }
          }
        `}</style>
      </div>
    );
  }
}
