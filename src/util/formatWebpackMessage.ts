import chalk from 'chalk'
import { Stats } from 'webpack';

const friendlySyntaxErrorLabel = "Syntax error:";

function isLikelyASyntaxError(message: string) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// Cleans up webpack error messages.
function formatMessage(message: string | Error | Error[]) {
  let _message = '';
  /** @type {string[]} */
  let lines: string[] = [];

  if (typeof message === "string") {
    lines = message.split("\n");
  } else if ("message" in message) {
    lines = message["message"].split("\n");
  } else if (Array.isArray(message)) {
    message.forEach((message) => {
      if ("message" in message) {
        lines = message["message"].split("\n");
      }
    });
  }

  // 从 errors/warnings 中去除 webpack 添加的标头
  // https://github.com/webpack/webpack/blob/master/lib/ModuleError.js
  lines = lines.filter((line) => !/Module [A-z ]+\(from/.test(line));

  // 将解析错误转化为语法错误
  // TODO: move this to our ESLint formatter?
  lines = lines.map((line) => {
    const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
      line
    );
    if (!parsingError) {
      return line;
    }
    const [, errorLine, errorColumn, errorMessage] = parsingError;
    return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`;
  });

  _message = lines.join("\n");
  // Smoosh syntax errors (commonly found in CSS)
  _message = _message.replace(
    /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
    `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`
  );
  // Clean up export errors
  _message = _message.replace(
    /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$2'.`
  );
  _message = _message.replace(
    /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$2' does not contain a default export (imported as '$1').`
  );
  _message = _message.replace(
    /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`
  );
  lines = _message.split("\n");

  // 删除前换行符
  if (lines.length > 2 && lines[1].trim() === "") {
    lines.splice(1, 1);
  }
  // 清理文件名
  lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, "$1");

  // Cleans up verbose "module not found" messages for files and packages.
  if (lines[1] && lines[1].indexOf("Module not found: ") === 0) {
    lines = [
      lines[0],
      lines[1]
        .replace("Error: ", "")
        .replace("Module not found: Cannot find file:", "Cannot find file:"),
    ];
  }

  _message = lines.join("\n");
  // 内部堆栈剥离
  _message = _message.replace(
    /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
    ""
  );

  _message = _message.replace(/^\s*at\s<anonymous>(\n|$)/gm, ""); // at <anonymous>
  lines = _message.split("\n");

  // 删除重复的换行符
  lines = lines.filter(
    (line, index, arr) =>
      index === 0 || line.trim() !== "" || line.trim() !== arr[index - 1].trim()
  );

  // Reassemble the message
  _message = lines.join("\n");
  return _message.trim();
}

const formatWebpackMessage = function (json: any) {
  const formattedErrors = json.errors?.map(formatMessage);
  const formattedWarnings = json.warnings.map(formatMessage);
  const result = { errors: formattedErrors, warnings: formattedWarnings };
  if (result.errors.some(isLikelyASyntaxError)) {
    // 只显示任何语法错误
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }
  return result;
};

export default formatWebpackMessage;
