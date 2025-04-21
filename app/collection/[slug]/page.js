import PaginationBlock from "@/components/widgets/pagination-block";
import ProductCard from "@/components/widgets/product-card";
import PageHeader from "@/components/widgets/page-header";
import { collection } from "@/data/collection";
import { getPagination } from "@/lib/utils";
import { notFound } from "next/navigation";
import { product } from "@/data/product";

// Metadata
export function generateMetadata({ params }) {
	const { slug } = params;
	const collection_data = collection.find((item) => item.slug === `/${slug}`);
	return {
		title: collection_data.title,
		description: collection_data.description
	};
}

export default async function Category({ params, searchParams }) {
	const { slug } = params;

	const collection_data = collection.find((item) => item.slug === `/${slug}`);
	if (!collection_data) return notFound();

	const product_data = product.filter((item) => item.collection === collection_data.title);
	if (!product_data) return notFound();

	const { page } = (await searchParams) || "1";
	const { totalPages, currentPage, pageData, prevPage, nextPage, isPageOutOfRange, pageNumbers } = getPagination(product_data, page);
	if (isPageOutOfRange) return notFound();

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
				name: "All Collection",
				item: `${process.env.ROOT_URL}/collection`
			},
			{
				"@type": "ListItem",
				position: 3,
				name: collection_data.title,
				item: `${process.env.ROOT_URL}/collection/${slug}`
			}
		]
	};

	const header = {
		title: collection_data.title,
		focus: collection_data.focus,
		breadcrumb: [
			{
				label: "All Collection",
				href: "/collection"
			}
		],
		description: collection_data.description
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<PageHeader data={header} />

			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-6">
				{pageData.map((item) => (
					<ProductCard key={item.slug} data={item} />
				))}
			</div>

			<PaginationBlock totalPages={totalPages} currentPage={currentPage} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
		</>
	);
}
