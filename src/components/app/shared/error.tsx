import Image from "next/image";

export default function GeneralError() {
	return (
		<div className="pb-20 w-full bg-white">
			<div className="flex  justify-center pt-15">
				<div className="w-[36rem] flex flex-col  items-center">
					<Image
						src={"/general-error.jpg"}
						alt="Error Pic"
						width={300}
						height={200}
					/>
					<span className="text-4xl mb-5">Oh, No</span>
					<div className="mb-3 text-sm font-bold text-red-400">
						Something went wrong. Please visit again!
					</div>
				</div>
			</div>
		</div>
	);
}
