const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const generateSolve = (filePath) => {
  if (!path.isAbsolute(filePath)) {
    throw new TypeError(
      `Invalid filePath: ${filePath}\nfilePath should be an absolute path`
    );
  }

  return async (input) => {
    const { stdout, stderr } = await exec(`echo "${input}" | node ${filePath}`);

    return stderr ? Promise.reject(stderr) : Promise.resolve(stdout);
  };
};

module.exports = generateSolve;
