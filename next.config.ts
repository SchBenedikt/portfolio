
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'technik.xn--schchner-2za.de',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tustoeging.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.koenig-karlmann-gymnasium.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mb21.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nextcloud.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'www.bayernjudo.de',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
