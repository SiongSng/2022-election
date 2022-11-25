import { exit } from 'node:process';
import { pushChangesToGithub } from '@/script/util';
import { crawlerReferendumData } from '@/script/crawlers/referendum';
import { crawlerCouncilData } from '@/script/crawlers/council';
import { crawlerMayorData } from '@/script/crawlers/mayor';

const githubAPIToken = process.env.GITHUB_API_TOKEN;

// Check if the script is running on github action
const githubAction =
  githubAPIToken != undefined && githubAPIToken != '' && githubAPIToken != null;

async function start() {
  let runs = 0;
  let second = 0;
  await _start();

  async function _start() {
    await startCrawler();
    try {
      if (githubAction) pushChangesToGithub(runs, githubAPIToken);
    } catch (error) {
      console.error('Failed to push changes to github.', error);
    }
    console.log('Finished');
  }

  if (githubAction) {
    setInterval(() => {
      // Exit the process after three hours
      if (second >= 60 * 60 * 3) {
        console.log('Exiting...');
        exit(0);
      }
      second++;
    }, 1000);

    // Runs every minute
    setInterval(() => {
      runs++;

      _start().then(() => console.log(`[${runs}] Waiting for next crawler...`));
    }, 1000 * 60);
  }
}

async function startCrawler() {
  console.log('Crawling referendum data...');
  crawlerReferendumData();
  console.log('Finished crawling referendum data.');

  console.log('Crawling council data...');
  crawlerCouncilData();
  console.log('Finished crawling council data.');

  console.log('Crawling mayor data...');
  crawlerMayorData();
  console.log('Finished crawling mayor data.');

  console.log('Crawler the data successfully');
}

start();
