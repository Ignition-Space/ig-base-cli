import chalk from 'chalk'
import { loggerError, loggerInfo, loggerSuccess } from "@/util/index";
import { Stats } from "webpack";
import columnify from "columnify";

export default function outputProductSize(stats: Stats) {
  loggerInfo('****** OUTPUT START ******')
  try {
    const assetInfo = stats.toJson({
      all: false,
      assets: true,
    });
    const assets = assetInfo?.assets;
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
  } catch (err) {
    loggerError('****** OUTPUT FAILED ******')
  }
}
