/*
 * @Author: Cookie
 * @Date: 2021-07-03 21:57:20
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 20:16:57
 * @Description:
 */
import { ESLint } from 'eslint'
import { getCwdPath, loggerTiming, loggerError, getDirPath } from '@/util'
import ora from "ora";

// 1. Create an instance.
const eslint = new ESLint({
  fix: true,
  extensions: [".js", ".ts"],
  useEslintrc: false,
  overrideConfig: {
    "env": {
      "browser": true,
      "es2021": true
    },
    "parser": require.resolve("@typescript-eslint/parser"),
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "@typescript-eslint",
    ],
  },
  resolvePluginsRelativeTo: getDirPath('node_modules')
});


export const getEslint = async (path: string = 'src') => {
  const spinner = ora('checking...')

  try {
    loggerTiming('ESLINT CHECK');

    spinner.start()

    // 2. Lint files.
    const results = await eslint.lintFiles([getCwdPath(path)]);

    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);

    // 4. Format the results.
    const formatter = await eslint.loadFormatter("stylish");

    const resultText = formatter.format(results);

    // 5. Output it.
    if (resultText) {
      loggerError(`'PLEASE CHECK ===》', ${resultText}`);
    }

    else {
      spinner.succeed('Eslint CHECK SUCCESS!');
      // loggerSuccess('Eslint check completed!');
    }
  } catch (error) {
    spinner.fail('ESLINT CHECK FAILED!');
    loggerError(error);
    process.exit(1)
  } finally {
    loggerTiming('ESLINT CHECK', false);
  }

}
