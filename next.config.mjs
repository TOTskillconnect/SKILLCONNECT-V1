/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static file serving for media files
  images: {
    disableStaticImages: true,
  },
  // Configure webpack for media files
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]',
      },
    });
    return config;
  },
  // Add proper headers including CSP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src 'self' blob: data:; img-src 'self' blob: data:;"
          }
        ]
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          }
        ],
      },
    ];
  },
};

export default nextConfig; 