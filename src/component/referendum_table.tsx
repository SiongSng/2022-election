import { ReferendumData } from '@/script/crawlers/referendum';
import { LinearProgress } from '@mui/material';
import React from 'react';

export class ReferendumTable extends React.Component<
  ReferendumTableProps,
  Record<string, unknown>
> {
  constructor(props: ReferendumTableProps) {
    super(props);
  }

  render(): React.ReactNode {
    const data = this.props.data;
    const allTickets = data.agreeTickets + data.disagreeTickets;
    const agreeRateStr =
      ((data.agreeTickets / allTickets) * 100).toFixed(3) + '%';
    const disagreeRateStr =
      ((data.disagreeTickets / allTickets) * 100).toFixed(3) + '%';

    const passThreshold = 9619697;
    const passRate = (data.agreeTickets / passThreshold) * 100;

    return (
      <div className="table-container">
        <div className="box">
          <div className="result-box">
            <h2>開票結果</h2>
            <p>
              同意票數: {data.agreeTickets} ({agreeRateStr})
            </p>
            <p>
              不同意票數: {data.disagreeTickets} ({disagreeRateStr})
            </p>
            <div className="progress">
              <LinearProgress
                color="success"
                variant="determinate"
                value={100}
                style={{
                  height: 10,
                  width: `${agreeRateStr}`,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              />
              <LinearProgress
                color="error"
                variant="determinate"
                value={100}
                style={{
                  height: 10,
                  width: `${disagreeRateStr}`,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />
            </div>
          </div>
          <div className="progress-box">
            <h2>開票進度</h2>
            <p>{data.processRage}%</p>
            <LinearProgress
              color="info"
              variant="determinate"
              value={data.processRage}
              style={{ height: 10, borderRadius: 5 }}
            />
          </div>
          <div className="pass-box">
            <h2>通過門檻</h2>
            <p>{passRate.toFixed(2)}%</p>
            <LinearProgress
              color="warning"
              variant="determinate"
              value={passRate}
              style={{ height: 10, borderRadius: 5 }}
            />
          </div>
        </div>

        <style jsx>{`
          .table-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .box {
            margin: 15px;
            width: 60%;
            display: flex;
            flex-direction: column;
            background-color: rgb(47, 47, 47);
            border-radius: 10px;
            padding: 30px;
          }

          .progress-box {
            margin-top: 15px;
          }

          .progress-box p {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 5px;
          }

          .result-box {
            margin: 0;
          }

          .result-box .progress {
            display: flex;
            flex-direction: row;
          }

          .result-box p {
            margin: 5px;
            font-size: 1rem;
          }

          .pass-box {
            margin-top: 15px;
          }

          .pass-box p {
            margin: 5px;
            font-size: 1.5rem;
            font-weight: bold;
          }

          h2 {
            margin: 10px;
          }

          @media (max-width: 768px) {
            .box {
              width: 90%;
            }
          }

          @media (prefers-color-scheme: light) {
            .box {
              background-color: rgb(224, 224, 224);
            }
          }
        `}</style>
      </div>
    );
  }
}

export interface ReferendumTableProps {
  data: ReferendumData;
}
