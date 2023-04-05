// next.config.js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
module.exports =(phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {

    };
  }
  return {
    /* config options for all phases except development here */
    compiler: {
      removeConsole: true,
    },
  };
};