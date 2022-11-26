import React from 'react';

export class HamburgerMenu extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <svg viewBox="0 0 100 60" width="25" height="25" className="hamburger">
          <rect width="100" height="12"></rect>
          <rect y="30" width="100" height="12"></rect>
          <rect y="60" width="100" height="12"></rect>
        </svg>
        <style jsx>{`
          .hamburger {
            fill: white;
          }

          @media (prefers-color-scheme: light) {
            .hamburger {
              fill: black;
            }
          }
        `}</style>
      </div>
    );
  }
}
