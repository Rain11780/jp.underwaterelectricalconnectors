import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import ContactForm from "@/components/widgets/contact-form";
import ProductCard from "@/components/widgets/product-card";
import PageHeader from "@/components/widgets/page-header";
import Image from "next/image";
import { notFound } from "next/navigation";
import { product } from "@/data/product";

// Metadata

export default function Product({ params }) {
	const { slug } = params;

	const product_data = product.find((item) => item.slug === `/${slug}`);
	if (!product_data) return notFound();

	const related_product = product.sort(() => Math.random() - 0.5).slice(0, 4);

	const header = {
		title: product_data.title,
		focus: product_data.focus,
		breadcrumb: [
			{
				label: "All Products",
				href: "/product"
			}
		],
		description: product_data.description
	};

	return (
		<>
			<PageHeader data={header} />

			<div className="container flex flex-col lg:flex-row justify-between mt-8 gap-8">
				<div className="w-full lg:w-2/3 text-justify">
					<Image src={product_data.main_image} alt={product_data.title} className="w-full border border-border rounded-lg" width={800} height={500} />
					<div className="grid md:grid-cols-2 gap-6 mt-6">
						{product_data.image_list.map((item, index) => (
							<Image key={index} src={item} alt={product_data.title} className="w-full border border-border rounded-lg" width={400} height={300} />
						))}
					</div>

					{product_data.product_description && (
						<div className="flex flex-col gap-4 mt-8">
							<h2 className="text-lg font-bold">Product Description</h2>
							{product_data.product_description.map((item, index) => (
								<p key={index} className="text-base text-muted-foreground">
									{item}
								</p>
							))}
						</div>
					)}

					{product_data.product_parameter && (
						<div className="flex flex-col gap-4 mt-8">
							<h2 className="text-lg font-bold">Product Parameter</h2>
							{product_data.product_parameter.map((item, index) => (
								<p key={index} className="text-base text-muted-foreground">
									{item}
								</p>
							))}
						</div>
					)}

					{product_data.faq && (
						<div className="flex flex-col gap-4 mt-8">
							<h2 className="text-lg font-bold">Product FAQ</h2>
							<Accordion type="single" collapsible className="w-full AccordionRoot">
								{product_data.faq.map((item, index) => (
									<AccordionItem key={index} value={`question-${index}`}>
										<AccordionTrigger className="font-medium text-muted-foreground hover:text-muted-foreground/60 hover:no-underline">{item.question}</AccordionTrigger>
										<AccordionContent className="text-base text-muted-foreground">{item.answer}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					)}
				</div>

				<aside className="w-full lg:w-1/3 top-10 h-fit lg:sticky">
					<div className="flex flex-col gap-6">
						<span className="text-sm font-medium">Request a Quote</span>
						<div className="space-y-4">
							<ContactForm />
						</div>
					</div>
				</aside>
			</div>

			<div className="container mt-12 gap-6">
				<h2 className="text-lg font-bold">Related Products</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-6">
					{related_product.map((item) => (
						<ProductCard key={item.slug} data={item} />
					))}
				</div>
			</div>
		</>
	);
}
