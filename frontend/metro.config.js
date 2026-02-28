const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;

// Ensure Metro can resolve .ts and .tsx files from node_modules if needed
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
