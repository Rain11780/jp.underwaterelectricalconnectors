import PolicyTemplate from "@/components/widgets/policy-template";
import { privacyPolicy } from "@/data/privacy-policy";

export const metadata = {
	title: privacyPolicy.title,
	description: privacyPolicy.sections[0].paragraphs[0],
	robots: {
		index: false,
		follow: false
	}
};

export default function PrivacyPolicy() {
	return <PolicyTemplate data={privacyPolicy} />;
}
