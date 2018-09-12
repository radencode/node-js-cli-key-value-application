const success = message => console.log(`\nSUCCESS: ${message}`);
const error = message => console.log(`\nERROR: ${message}`);
const common = message => console.log(`\n${message}`);
const item = message => console.log(message);
const prompt = message => process.stdout.write(`\n${message}`);

module.exports = { success, error, common, prompt, item };