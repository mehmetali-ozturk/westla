/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/admin/dashboard',
  //       destination: '/admin/dashboard',
  //       permanent: false,
  //     },
      
  //   ]
  // }
}

module.exports = nextConfig