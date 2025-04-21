import { Zap, Eye, CircleDollarSign, CheckCheck, Clock, House, UserPen } from "lucide-react";
import PageHeader from "@/components/widgets/page-header";
import Image from "next/image";
import { about as data } from "@/data/about";

const vision_value_icon_list = [<Zap className="w-10 h-10 text-primary" />, <Eye className="w-10 h-10 text-primary" />, <CircleDollarSign className="w-10 h-10 text-primary" />];
const our_capabilities_icon_list = [<CheckCheck className="w-10 h-10 text-primary" />, <Clock className="w-10 h-10 text-primary" />, <House className="w-10 h-10 text-primary" />, <UserPen className="w-10 h-10 text-primary" />];

// Metadata
export const metadata = {
	title: data.header.title,
	description: data.header.description
};

// Structured Data
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: `${process.env.ROOT_URL}`
		},
		{
			"@type": "ListItem",
			position: 2,
			name: data.header.title,
			item: `${process.env.ROOT_URL}/about`
		}
	]
};

export default function About() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<PageHeader data={data.header} />

			<section className="container grid grid-cols-1 md:grid-cols-2 mt-8 gap-6">
				<Image src={data.about_us.image} alt={data.about_us.title} className="w-full h-full rounded-lg shadow-md" width={800} height={500} />
				<div className="rounded-lg shadow-md space-y-4 p-8">
					<h2 className="text-xl font-semibold">{data.about_us.title}</h2>
					{data.about_us.description.map((item, index) => (
						<p className="mt-2 text-muted-foreground" key={index}>
							{item}
						</p>
					))}
				</div>
			</section>

			<section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-6">
				{data.vision_value.map((item, index) => (
					<div key={index} className="rounded-lg shadow-md p-8 text-center">
						<div className="flex justify-center mb-4">{vision_value_icon_list[index]}</div>
						<h3 className="text-xl font-semibold">{item.title}</h3>
						<p className="mt-2 text-muted-foreground">{item.description}</p>
					</div>
				))}
			</section>

			<section className="container grid grid-cols-1 md:grid-cols-2 mt-12 gap-6">
				<div className="rounded-lg shadow-md space-y-4 p-8">
					<h2 className="text-xl font-semibold">{data.why_choose_us.title}</h2>
					{data.why_choose_us.description.map((item, index) => (
						<p key={index} className="mt-2 text-muted-foreground">
							{item}
						</p>
					))}
				</div>
				<Image src={data.why_choose_us.image} alt={data.why_choose_us.title} className="w-full h-full rounded-lg shadow-md" width={800} height={500} />
			</section>

			<section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 gap-6">
				{data.our_capabilities.map((item, index) => (
					<div key={index} className="rounded-lg shadow-md p-8 text-center">
						<div className="flex justify-center mb-4">{our_capabilities_icon_list[index]}</div>
						<h3 className="text-xl font-semibold">{item.title}</h3>
						<p className="mt-2 text-muted-foreground">{item.description}</p>
					</div>
				))}
			</section>
		</>
	);
}
