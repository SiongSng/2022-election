import { ProcessEnvOptions } from 'node:child_process';
import * as childProcess from 'node:child_process';
import * as fs from 'fs';

export function writeJson(filename: string, data: unknown) {
  if (!data) return;
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }

  fs.writeFileSync(`data/${filename}.json`, JSON.stringify(data));
}

export function pushChangesToGithub(runs: number, githubAPIToken: string) {
  console.log('Push changes to github...');
  const cloneDir = `.data-branch-clone_${runs}`;
  const option: ProcessEnvOptions = {
    cwd: cloneDir,
  };

  childProcess.execSync(
    'git config --global user.email 41898282+github-actions[bot]@users.noreply.github.com'
  );
  childProcess.execSync('git config --global user.name "GitHub Actions Bot"');

  console.log('Cloning repository...');
  childProcess.execSync(
    `git clone --single-branch --branch data "https://x-access-token:${githubAPIToken}@github.com/SiongSng/2022-election.git" "${cloneDir}"`
  );

  childProcess.execSync(`cp -R data ${cloneDir}`);

  const needsPush: boolean =
    childProcess.execSync(`git status --porcelain`, {
      encoding: 'utf8',
      cwd: cloneDir,
    }).length > 0;

  if (needsPush) {
    const time = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Taipei',
    });

    childProcess.execSync('git checkout --orphan latest_branch', option);

    childProcess.execSync(`git add -A`, option);
    childProcess.execSync(
      `git commit --message "Auto update data @${time}"`,
      option
    );
    childProcess.execSync('git branch -D data', option);
    childProcess.execSync('git branch -m data', option);

    childProcess.execSync(`git push -f origin data`, option);
    console.log('Pushed successfully');
  }

  fs.rmSync(cloneDir, { recursive: true });
}

export function formatCandidate(candidate: {
  candNo: number;
  name: string;
  party: string;
  tickets: number;
  ratio: number;
}) {
  return {
    number: candidate.candNo,
    name: candidate.name,
    party: candidate.party,
    tickets: candidate.tickets,
    rate: candidate.ratio,
  };
}
