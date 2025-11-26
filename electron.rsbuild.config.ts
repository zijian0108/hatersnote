import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { resolve } from "node:path";

const template = resolve(__dirname, "src", "renderer", "index.html");

export default defineConfig({
  root: resolve(__dirname, "."),
  server: {
    historyApiFallback: true
  },
  environments: {
    // main
    main: {},
    // preload
    preload: {},
    // renderer
    renderer: {
      plugins: [pluginReact(), pluginSass()],
      html: {
        template
      },
      output: {
        assetPrefix: '/'
      }
    }
  }
});
