/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"picsum.photos"
      },
      {
        protocol:"https",
        hostname:"fastly.picsum.photos"
      },
      {
        protocol:"https",
        hostname:"portfolio-manager.s3.tebi.io"
      }
    ]
  }
};

export default nextConfig;
