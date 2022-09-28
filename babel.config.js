module.exports = (api) => {
  const moduleResolverPlugin = [
    "module-resolver",
    {
      root: ["./src"],
      alias: {
        _components: "./src/components",
      },
    },
  ];

  const defaultConfig = {
    presets: [
      [
        "@babel/preset-env",
        {
          corejs: 3,
          useBuiltIns: "usage",
        },
      ],
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      ],
    ],
    plugins: [moduleResolverPlugin, "@emotion/babel-plugin"],
  };
  return defaultConfig;
};
