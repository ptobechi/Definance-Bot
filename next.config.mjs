/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'financialmodelingprep.com',
          pathname: '/**',  // Allow all paths from the specified hostname
        },
      ],
    },
};
  
export default nextConfig;
  