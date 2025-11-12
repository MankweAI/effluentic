/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this redirects function
  async redirects() {
    return [
      {
        // This matches the "homepage" or "root"
        source: "/",
        // This is the destination URL of our new spoke
        destination: "/spokes/blocked-drain-diagnostic",
        // permanent: true = 308 redirect
        permanent: true,
      },
      {
        // This is a catch-all for any *other* page
        // that isn't our spoke page
        source: "/:path((?!spokes/geyser-repair-pretoria-east$).*)",
        destination: "/spokes/geyser-repair-pretoria-east",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
