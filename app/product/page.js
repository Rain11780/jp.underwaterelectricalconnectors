import ProductCard from "@/components/widgets/product-card";
import PageHeader from "@/components/widgets/page-header";
import { product } from "@/data/product";
import { getPagination } from "@/lib/utils";
import PaginationBlock from "@/components/widgets/pagination-block";
import { notFound } from "next/navigation";

const header = {
	title: "All Products",
	focus: "Products",
	description: "海洋、深海、淡水での信頼性のためにカスタマイズされた、IP68等級の水中電気コネクタをご覧ください。あらゆるプロジェクトニーズに対応するオーダーメイドのソリューションをご提供します。"
};

// Metadata
export const metadata = {
	title: header.title,
	description: header.description
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
			name: header.title,
			item: `${process.env.ROOT_URL}/product`
		}
	]
};

export default async function page({ searchParams }) {
	const { page } = (await searchParams) || "1";
	const { totalPages, currentPage, pageData, prevPage, nextPage, isPageOutOfRange, pageNumbers } = getPagination(product, page);
	if (isPageOutOfRange) return notFound();

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
