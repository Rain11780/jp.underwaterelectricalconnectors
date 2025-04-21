import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Image src="/loading.gif" height={50} width={50} alt="Loading..." />
		</div>
	);
}
