
import chalk from 'chalk'

// 计时日志
export const loggerTiming = (str: string = '', start: boolean = true) => {
  if (start) {
    console.time('Timing')
    console.log(chalk.cyan(`****** ${str} START ******`))
  } else {
    console.log(chalk.cyan(`****** ${str} END ******`))
    console.timeEnd('Timing')
  }
}

type LogType = string | unknown

// 普通日志
export const loggerInfo = (str: LogType) => {
  console.log(chalk.green(`[INFO]： ${str}`));
}

// 警告日志
export const loggerWarring = (str: LogType) => {
  console.log(chalk.yellowBright(`[WARRING]： ${str}`));
}

// 成功日志
export const loggerSuccess = (str: LogType) => {
  console.log(chalk.greenBright(`[SUCCESS]： ${str}`));
}

// 报错日志
export const loggerError = (str: LogType) => {
  console.log(chalk.redBright(`[ERROR]： ${str}`));
}
