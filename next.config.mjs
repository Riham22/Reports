// next.config.mjs
export default {
    reactStrictMode: true,
    webpack(config, { isServer }) {
        if (!isServer) {
            config.devtool = false; // Disable source map generation for client-side
        }
        return config;
    },
};
