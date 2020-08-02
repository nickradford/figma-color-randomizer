module.exports = function (config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: "preact/compat",
        "react-dom": "preact-compat",
      },
    },
  };
};
