import React from 'react';

export class Loading extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <h1>載入資料中...</h1>

        <style jsx>{`
          .loader-container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: fixed;
            z-index: 1;
          }

          .spinner {
            width: 64px;
            height: 64px;
            border: 8px solid;
            border-color: #3d5af1 transparent #3d5af1 transparent;
            border-radius: 50%;
            animation: spin-anim 1.2s linear infinite;
          }

          @keyframes spin-anim {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
}
