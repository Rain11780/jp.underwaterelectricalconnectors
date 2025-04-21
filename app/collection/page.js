import CollectionCard from "@/components/widgets/collection-card";
import PageHeader from "@/components/widgets/page-header";
import { collection } from "@/data/collection";

const header = {
	title: "All Collection",
	focus: "Collection",
	description: "海洋、深海、淡水での信頼性のために設計された水中電気コネクタをご覧ください。マイクロ防水コネクタはコンパクトな精度を提供し、スタンダード防水コネクタは多用途なIP68性能を確保します。イーサネット防水コネクタは高速の水中ネットワークを可能にし、同軸防水コネクタはクリアな信号を伝送します。超小型防水コネクタは精密な用途に適しており、丸型ミニ防水コネクタは堅実な性能を、フラット型防水コネクタは狭いスペースに適合します。大電流防水コネクタは高負荷システムに電力を供給し、分離型防水コネクタは接続を簡略化します。すべてのIP68水中コネクタはカスタマイズ可能で、ROV、センサー、水産養殖などに合わせた長さに対応可能です。オーダーメイドのソリューションについては、お気軽にお問い合わせください"
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
			item: `${process.env.ROOT_URL}/collection`
		}
	]
};

export default function Category() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<PageHeader data={header} />
			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-6">
				{collection.map((item) => (
					<CollectionCard key={item.slug} data={item} />
				))}
			</div>
		</>
	);
}
