import React from "react";

const GeneralLoading = () => {
	return (
		<div className="w-full flex pt-[20rem] h-screen justify-center">
			<div className="flex gap-3 ">
				<div className="h-3 w-3 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="h-3 w-3 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
				<div className="h-3 w-3 bg-orange-300 rounded-full animate-bounce"></div>
			</div>
		</div>
	);
};

export default GeneralLoading;
