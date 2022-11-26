import React from 'react';
import logo from '@/assets/logo.png';
import { NavigationMenu } from '@/component/navigation_bar';

export class Header extends React.Component<
  Record<string, unknown>,
  { time: string }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      time: this.getNowTime(),
    };
  }

  getNowTime(): string {
    return new Date().toLocaleTimeString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  render(): React.ReactNode {
    setInterval(() => {
      this.setState({ time: this.getNowTime() });
    }, 1000);

    return (
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <h2 className="title">2022 年選舉即時開票結果</h2>
        <p className="time">{this.state.time} (每分鐘更新一次資料)</p>
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

          .time {
            color: rgb(161, 144, 253);
            font-size: 1.1rem;
            font-weight: bold;
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
