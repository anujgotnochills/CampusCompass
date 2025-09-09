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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    allowedDevOrigins: [
        'https://6000-firebase-studio-1755514717840.cluster-zumahodzirciuujpqvsniawo3o.cloudworkstations.dev',
    ]
  },
};

export default nextConfig;
