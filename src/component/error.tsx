import { ErrorOutline } from '@mui/icons-material';
import React from 'react';

export class ErrorMessage extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="error-container">
        <ErrorOutline className="icon" color="error" sx={{ fontSize: 80 }} />
        <h1>發生未知錯誤</h1>
        <h2>請稍後再試</h2>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
}
