import ContactForm from "@/components/widgets/contact-form";
import PageHeader from "@/components/widgets/page-header";
import { Phone, Mail, MapPinHouse } from "lucide-react";
import { contact as data } from "@/data/contact";

const icon_list = [<Phone className="w-10 h-10 text-primary" />, <Mail className="w-10 h-10 text-primary" />, <MapPinHouse className="w-10 h-10 text-primary" />];

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
			item: `${process.env.ROOT_URL}/contact`
		}
	]
};

export default function Contact() {
	return (
		<>
			{/* Structured Data */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<PageHeader data={data.header} />

			<section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
				{data.contact_info.map((item, index) => (
					<div className="rounded-lg shadow-lg p-8 text-center">
						<div className="flex justify-center mb-4">{icon_list[index]}</div>
						<h3 className="text-xl font-semibold">{item.label}</h3>
						<p className="mt-2 text-muted-foreground">{item.description}</p>
						<p className="mt-2 text-muted-foreground">{item.value}</p>
					</div>
				))}
			</section>

			<section className="container grid grid-cols-1 md:grid-cols-2 mt-12 gap-6">
				<div className="border border-border rounded-lg shadow-lg">
					<iframe src={data.map_link} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>
				<div>
					<ContactForm />
				</div>
			</section>
		</>
	);
}
