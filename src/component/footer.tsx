import React from 'react';

export class Footer extends React.Component<
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
      <div className="footer">
        <p className="time">{this.state.time} (每分鐘更新一次資料)</p>
        <style jsx>
          {`
            .time {
              color: rgb(161, 144, 253);
              font-size: 1.1rem;
              font-weight: bold;
              text-align: center;
            }
          `}
        </style>
      </div>
    );
  }
}
