/*
 * @Author: Cookie
 * @Date: 2021-07-03 21:57:20
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-04 22:54:24
 * @Description:
 */

import { ESLint } from 'eslint'
import { getCwdPath, getDirPath, countTime, success, failed } from '../util'

const getRePath = (path: string) => {
  return getDirPath(`../../node_modules/${path}`)
}

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
    "parser": getRePath("@typescript-eslint/parser"),
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
  resolvePluginsRelativeTo: getDirPath('../../node_modules')
});


export const getEslint = async (path: string = 'src') => {

  try {
    countTime('Eslint 校验');
    // 2. Lint files.
    const results = await eslint.lintFiles([`${getCwdPath()}/${path}`]);

    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);

    // 4. Format the results.
    const formatter = await eslint.loadFormatter("stylish");

    const resultText = formatter.format(results);

    // 5. Output it.
    if (resultText) {
      failed('请检查===》')
      console.log(resultText);
    }
    else {
      success('完美！');
    }
  } catch (error) {
    process.exitCode = 1;
    failed(error);
  } finally {
    countTime('Eslint 校验', false);
  }

}
