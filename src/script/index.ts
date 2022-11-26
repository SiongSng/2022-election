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
  try {
    console.log('Crawling referendum data...');
    await crawlerReferendumData();
    console.log('Finished crawling referendum data.');
  } catch (error) {
    console.error('Failed to crawl referendum data.', error);
  }

  try {
    console.log('Crawling council data...');
    await crawlerCouncilData();
    console.log('Finished crawling council data.');
  } catch (error) {
    console.error('Failed to crawl council data.', error);
  }

  try {
    console.log('Crawling mayor data...');
    await crawlerMayorData();
    console.log('Finished crawling mayor data.');
  } catch (error) {
    console.error('Failed to crawl mayor data.', error);
  }

  console.log('Crawler the data successfully');
}

start();
