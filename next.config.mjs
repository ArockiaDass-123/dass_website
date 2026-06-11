/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactCompiler: true,
  images: {
    unoptimized: true,
    qualities: [75, 80, 95, 100],
  },
};

export default nextConfig;
