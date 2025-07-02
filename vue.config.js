const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  // 输出配置
  outputDir: "dist",

  // 生产环境配置
  productionSourceMap: false,

  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        externals: {
          vue: "Vue",
          "element-ui": "ElementUI",
        },

        // 优化配置
        optimization: {
          // 压缩配置
          minimize: true,

          // 副作用优化 - 启用 Tree Shaking
          sideEffects: false,
        },

        // 性能优化
        performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000,
        },
      };
    }
  },

  // CSS 提取配置
  css: {
    extract: {
      ignoreOrder: true,
    },
  },

  // 链式配置
  chainWebpack: (config) => {
    // 生产环境优化
    if (process.env.NODE_ENV === "production") {
      // 移除 console.log 和 debugger
      config.optimization.minimizer("terser").tap((args) => {
        if (args[0] && args[0].terserOptions) {
          args[0].terserOptions.compress = {
            ...args[0].terserOptions.compress,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: [
              "console.log",
              "console.info",
              "console.debug",
              "console.warn",
            ],
          };
        }
        return args;
      });
    }
  },
});
