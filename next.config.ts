type NextWebpackConfig = {
  resolve?: {
    fallback?: Record<string, boolean>;
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: NextWebpackConfig, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = config.resolve ?? {};
      config.resolve.fallback = {
        fs: false,
        path: false,
        ...(config.resolve.fallback ?? {}),
      };
    }
    return config;
  },
  transpilePackages: [],
};

module.exports = nextConfig;