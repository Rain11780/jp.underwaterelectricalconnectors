import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
	title: "Not Found",
	description: "Page Not Found",
	robots: {
		index: false,
		follow: false
	}
};

export default function NotFound() {
	return (
		<section className="container pt-12 md:pt-24 text-center">
			<div className="text-3xl font-bold md:text-5xl lg:text-7xl">
				<p className="flex flex-wrap items-center justify-center">Page Not Found</p>
			</div>
			<Link href="/">
				<Button size={"lg"} className="mt-10">
					Back to Home
				</Button>
			</Link>
		</section>
	);
}
