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
        <p className="time">
          {this.state.time} (因選舉已結束，所以停止自動更新開票進度)
        </p>
        <div className="author">
          <p>
            開發者：
            <a
              href="https://github.com/SiongSng/"
              target="_blank"
              rel="noreferrer"
            >
              菘菘 (SiongSng)
            </a>
          </p>
        </div>
        <p>
          本網站程式原始程式碼：
          <a
            href="https://github.com/SiongSng/2022-election"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/SiongSng/2022-election
          </a>
        </p>
        <style jsx>
          {`
            .footer {
              position: fixed;
              bottom: 0;
              width: 100%;
              background-color: #212121;
              padding-top: 10px;
            }

            .time {
              color: rgb(161, 144, 253);
              font-size: 1.1rem;
              font-weight: bold;
              text-align: center;
            }

            p {
              color: white;
              text-align: center;
              margin-top: 5px;
            }
          `}
        </style>
      </div>
    );
  }
}
