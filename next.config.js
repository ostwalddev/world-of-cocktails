/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		minimumCacheTTL: 3600,
		remotePatterns: [
			'www.thecocktaildb.com',
			'source.unsplash.com',
			'images.pexels.com',
			'images.unsplash.com',
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
		].map(hostname => ({protocol: 'https', hostname})),
	},
};

module.exports = nextConfig;
