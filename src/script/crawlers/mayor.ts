import { writeJson, formatCandidate } from '@/script/util';
import fetch from 'cross-fetch';

/**
 * 取得縣市長的資料
 * 資料來源: 中華民國中央選舉委員會/財團法人中央通訊社
 */
export async function crawlerMayorData() {
  const timestamp = new Date().getTime();
  const url = `https://www.cna.com.tw/project/20221126-election-live/api/city.json?t=${timestamp}`;

  const response = await fetch(url, { cache: 'no-cache' });

  if (response.status === 200) {
    const cities = await response.json();

    const result: MayorList = {};

    for (const cityCode in cities) {
      if (typeof cityCode === 'string') {
        const rawCity = cities[cityCode];

        const city: MayorCity = {
          processRate: parseInt(rawCity.process),
          name: rawCity.name,
          code: rawCity.code,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          candidates: rawCity.candidates.map((candidate: any) =>
            formatCandidate(candidate)
          ),
          nowWinParty: formatNowWinParty(rawCity.nowWinParty),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          towns: Object.values(rawCity.towns).map((town: any) => {
            return {
              name: town.name,
              code: town.code,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              candidates: town.candidates.map((candidate: any) =>
                formatCandidate(candidate)
              ),
              nowWinParty: formatNowWinParty(town.nowWinParty),
            };
          }),
        };

        result[cityCode] = city;
      }
    }

    writeJson('mayor', result);
  } else {
    console.error('Failed to fetch mayor data.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatNowWinParty(nowWinParty: any): MayorNowWinParty {
  return {
    party: nowWinParty.party
      ? nowWinParty.party.filter((party: string) => party.length > 0)
      : [],
    rate: nowWinParty.ratio
      ? nowWinParty.ratio.filter((rate: number) => rate > 0)
      : [],
  };
}

export interface MayorList {
  [cityCode: string]: MayorCity;
}

/**
 * 縣市長的資料格式
 */
export interface MayorCity {
  /**
   * 開票進度
   */
  processRate: number;

  /**
   * 縣市名稱
   */
  name: string;

  /**
   * 縣市代碼
   */
  code: string;

  /**
   * 現在領先的政黨
   */
  nowWinParty: MayorNowWinParty;

  /**
   * 候選人們
   */
  candidates: MayorCandidate[];

  /**
   * 各縣市中的鄉鎮市區開票狀態
   */
  towns: MayorTown[];
}

/**
 * 縣市或鄉鎮市區中現在領先的政黨
 */
export interface MayorNowWinParty {
  /**
   * 政黨名稱 (按照領先順序)
   */
  party: string[];

  /**
   * 票數 (按照領先順序)
   */
  rate: number[];
}

/**
 * 縣市長候選人的資料
 */
export interface MayorCandidate {
  /**
   * 候選人編號
   */
  number: number;

  /**
   * 候選人姓名
   */
  name: string;

  /**
   * 候選人推薦之政黨
   */
  party: string;

  /**
   * 候選人得票數
   */
  tickets: number;

  /**
   * 候選人得票比例
   */
  rate: number;
}

/**
 * 鄉鎮市區開票狀態
 */
export interface MayorTown {
  /**
   * 鄉鎮市區名稱
   */
  name: string;

  /**
   * 鄉鎮市區代碼
   */
  code: string;

  /**
   * 在各鄉鎮市區中候選人們的開票狀態
   */
  candidates: MayorCandidate[];

  /**
   * 在各鄉鎮市區中的領先政黨
   */
  nowWinParty: MayorNowWinParty;
}
