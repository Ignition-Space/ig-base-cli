/*
 * @Author: Cookie
 * @Date: 2021-07-03 21:57:20
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 17:06:54
 * @Description:
 */

import { ESLint } from 'eslint'
import { getCwdPath, loggerTiming, loggerSuccess, loggerError, getDirPath } from '../util'

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

  try {
    loggerTiming('Eslint 校验');
    // 2. Lint files.
    const results = await eslint.lintFiles([`${getCwdPath()}/${path}`]);

    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);

    // 4. Format the results.
    const formatter = await eslint.loadFormatter("stylish");

    const resultText = formatter.format(results);

    // 5. Output it.
    if (resultText) {
      loggerError('请检查===》')
      console.log(resultText);
    }
    else {
      loggerSuccess('格式校对成功！');
    }
  } catch (error) {
    process.exitCode = 1;
    loggerError(error);
  } finally {
    loggerTiming('Eslint 校验', false);
  }

}
