export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/"
		},
		sitemap: `${process.env.ROOT_URL}/sitemap.xml`
	};
}
