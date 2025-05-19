import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatar.iran.liara.run",
				port: "",
				pathname: "/public/**",
				search: "",
			},
		],
		domains: ["jwvartwshnsxrrtpgtlc.supabase.co"],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
