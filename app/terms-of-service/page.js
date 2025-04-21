import PolicyTemplate from "@/components/widgets/policy-template";
import { termsOfService } from "@/data/terms-of-service";

export const metadata = {
	title: termsOfService.title,
	description: termsOfService.sections[0].paragraphs[0],
	robots: {
		index: false,
		follow: false
	}
};

export default function TermsOfService() {
	return <PolicyTemplate data={termsOfService} />;
}
