// next.config.mjs
export default {
    reactStrictMode: true,
    webpack(config, { isServer }) {
        if (!isServer) {
            config.devtool = false; // Disable source map generation for client-side
        }

        // Fix for ES module resolution in some environments
        config.resolve = {
            ...config.resolve,
            extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"], // Ensure support for these file types
        };

        return config;
    },
};
