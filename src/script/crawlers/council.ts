import { formatCandidate, writeJson } from '@/script/util';
import fetch from 'cross-fetch';

/**
 * 取得縣市議員的資料
 * 資料來源: 中華民國中央選舉委員會/財團法人中央通訊社
 */
export async function crawlerCouncilData() {
  const timestamp = new Date().getTime();
  const url = `https://www.cna.com.tw/project/20221126-election-live/api/council.json?t=${timestamp}`;

  const response = await fetch(url);

  if (response.status === 200) {
    const cities = await response.json();

    const result: CouncilList = {};

    for (const cityCode in cities) {
      if (typeof cityCode === 'string') {
        const rawCity = Object.keys(cities[cityCode]);

        const constituencies: CouncilConstituency[] = [];

        for (const constituencyCode of rawCity) {
          const rawConstituency = cities[cityCode][constituencyCode];

          const constituency: CouncilConstituency = {
            code: rawConstituency.code,
            name: rawConstituency.name,
            includeTowns: rawConstituency.includeTowns.map((town: string) =>
              town.replaceAll(' ', '')
            ),
            processRate: rawConstituency.process,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            candidates: rawConstituency.candidates.map((candidate: any) =>
              formatCandidate(candidate)
            ),
          };

          constituencies.push(constituency);
        }

        const city: CouncilCity = {
          name: cityCodeOfName[cityCode],
          constituencies,
        };

        result[cityCode] = city;
      }
    }

    writeJson('council', result);
  } else {
    throw new Error('Failed to crawler council data.');
  }
}

const cityCodeOfName: { [key: string]: string } = {
  '10002': '宜蘭縣',
  '10004': '新竹縣',
  '10005': '苗栗縣',
  '10007': '彰化縣',
  '10008': '南投縣',
  '10009': '雲林縣',
  '10010': '嘉義縣',
  '10013': '屏東縣',
  '10014': '台東縣',
  '10015': '花蓮縣',
  '10016': '澎湖縣',
  '10017': '基隆市',
  '10018': '新竹市',
  '10020': '嘉義市',
  '63000': '台北市',
  '64000': '高雄市',
  '65000': '新北市',
  '66000': '台中市',
  '67000': '台南市',
  '68000': '桃園市',
  '09007': '連江縣',
  '09020': '金門縣',
};

/**
 * 縣市議員的資料格式
 */
export interface CouncilList {
  [key: string]: CouncilCity;
}

/**
 * 縣市議員所屬的城市
 * 像是台北市、新北市、高雄市、屏東縣等等
 */
export interface CouncilCity {
  name: string;
  constituencies: CouncilConstituency[];
}

/**
 * 縣市議員選舉區資料
 * 像是高雄市第1選舉區、高雄市第2選舉區、高雄市第3選舉區等等
 */
export interface CouncilConstituency {
  /**
   * 選舉區代碼
   */
  code: string;

  /**
   * 選舉區名稱
   */
  name: string;

  /**
   * 這個選舉區包含的鄉鎮市區
   */
  includeTowns: string[];

  /**
   * 開票進度
   */
  processRate: number;

  /**
   * 候選人們
   */
  candidates: CouncilCandidate[];
}

/**
 * 縣市議員候選人資料
 */
export interface CouncilCandidate {
  /**
   * 候選人編號
   */
  number: number;

  /**
   * 候選人名稱
   */
  name: string;

  /**
   * 推薦之政黨
   */
  party: string;

  /**
   * 票數
   */
  tickets: number;

  /**
   * 票數比例
   */
  rate: number;
}
