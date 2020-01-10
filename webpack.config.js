const path = require("path");

const DIST_FOLDER = path.resolve(__dirname, "dist");
const ENTRY_FILE = "./src/index.js";

const config = {
  entry: ENTRY_FILE,
  output: {
    filename: "bundle.js",
    path: DIST_FOLDER
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },

      {
        test: /\.(png|jpg|svg|gif|woff|ttf|woff2|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 1024,
              name: "assets/[path][name].[ext]",
              context: "src/"
            }
          }
        ]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  }
};

if (process.env.NODE_ENV === "development") {
  config["mode"] = "development";
  config["watch"] = true;
  config["devServer"] = {
    contentBase: DIST_FOLDER,
    compress: true,
    port: 9000
  };
} else if (process.env.NODE_ENV === "production") {
  config["mode"] = "production";
}

module.exports = config;
