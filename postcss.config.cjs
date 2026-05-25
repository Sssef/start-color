module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "nesting-rules": true, // Нативный CSS Nesting
        "custom-media-queries": true, // @custom-media
        "custom-properties": true, // CSS Variables fallback
        "logical-properties-and-values": true,
      },
      browsers: "last 2 versions, > 0.5%, not dead",
    },
  },
};
