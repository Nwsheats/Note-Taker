// allows uuid to be exported, with a specific math function to dictate how the code is set

module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
