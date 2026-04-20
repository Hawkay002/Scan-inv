// Made by Shovith (Sid)
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // expo-router requires reanimated plugin to be listed LAST
      'react-native-reanimated/plugin',
    ],
  };
};

