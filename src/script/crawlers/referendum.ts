import { writeJson } from '@/script/util';
import fetch from 'cross-fetch';

/**
 * 爬取憲法修正案公民複決的資料
 * 資料來源: 中華民國中央選舉委員會/財團法人中央通訊社
 */
export async function crawlerReferendumData() {
  const timestamp = new Date().getTime();
  const url = `https://www.cna.com.tw/project/20221126-election-live/api/result.json?t=${timestamp}`;

  const response = await fetch(url, { cache: 'no-cache' });

  if (response.status === 200) {
    const rawData = await response.json();

    const result: ReferendumData = {
      processRage: rawData.processRage,
      agreeTickets: rawData.agreeTicket,
      agreeRate: rawData.agreeRat,
      disagreeTickets: rawData.disagreeTicket,
      disagreeRate: rawData.disagreeRat,
      timestamp: Date.parse(rawData.time),
    };

    writeJson('referendum', result);
  } else {
    throw new Error('Failed to crawler referendum data.');
  }
}

/**
 * 憲法修正案公民複決的資料格式
 */
export interface ReferendumData {
  /**
   * 開票進度
   */
  processRage: number;

  /**
   * 同意票數量
   */
  agreeTickets: number;

  /**
   * 同意票比例
   */
  agreeRate: number;

  /**
   * 不同意票數量
   */
  disagreeTickets: number;

  /**
   * 不同意票比例
   */
  disagreeRate: number;

  /**
   * 資料更新時間 (Unix Timestamp)
   */
  timestamp: number;
}
