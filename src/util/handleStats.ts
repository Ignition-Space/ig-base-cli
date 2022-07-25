import chalk from 'chalk'
import { loggerError, loggerInfo, loggerSuccess } from "@/util/index";
import { Stats } from "webpack";
import columnify from "columnify";
import formatWebpackMessage from './formatWebpackMessage';

export default function handleStats(stats: Stats) {
  try {
    loggerInfo('****** OUTPUT START ******')
    const statsInfo = stats.toJson({
      all: false,
      assets: true,
      warnings: true,
      errors: true,
    });

    const messages = formatWebpackMessage(statsInfo);
    if ((messages.errors || []).filter(Boolean).length) {
      console.log(messages.errors?.[0]);
      throw new Error('Failed to compile.');
    }

    if ((messages.warnings || []).filter(Boolean).length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings?.join('\n\n'));
    }

    const assets = statsInfo?.assets;
    if (!assets) return;
    const columns = columnify(
      assets.map((d) => ({size: d.size, name: d.name})),
      {
        columns: ['name', 'size'],
        minWidth: 30,
        config: {
          size: {
            headingTransform: function (heading: string) {
              return chalk.cyan(('file ' + heading).toLocaleUpperCase());
            },
            dataTransform: function (data: string) {
              return +data < 1000 ? '小于1KB' : `${(+data / 1000) | 0} KB`;
            },
            align: 'right',
          },
          name: {
            headingTransform: function (heading: string) {
              return chalk.cyan(heading.toLocaleUpperCase());
            },
            maxWidth: 50,
          },
        },
      },
    );
    console.log(columns);
    loggerSuccess(`total size: ${(assets.reduce((a: any, b: any) => a + b.size, 0) / 1000) | 0}KB cost: ${(stats.endTime - stats.startTime) / 1000}s`)
  } catch (err: any) {
    loggerError('****** OUTPUT FAILED ******')
    loggerError(err.message);
  }
}
