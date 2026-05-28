module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "last 2 versions",
        "> 0.5%",
        "not dead",
        "iOS >= 12",
        "Safari >= 14",
      ],
    },
    "postcss-preset-env": {
      stage: 2,
      features: {
        "nesting-rules": true, // Нативный CSS Nesting
        "custom-media-queries": true, // @custom-media
        "custom-properties": true, // CSS Variables fallback
      },
      browsers: "last 2 versions, > 0.5%, not dead",
    },
  },
};
