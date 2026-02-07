const rules = require('./webpack.rules');

// ------------------------------------
// JAVASCRIPT / REACT (JSX)
// ------------------------------------
rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
  },
});

// ------------------------------------
// CSS + TAILWIND + POSTCSS
// ------------------------------------
rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

// ------------------------------------
// IMAGES (PNG, JPG, SVG, ETC.)
// ------------------------------------
rules.push({
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: "asset/resource",
});

module.exports = {
  module: {
    rules,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
