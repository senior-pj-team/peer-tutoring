import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import { samplePayouts } from "./data";

export default function Payouts() {
	return (
		<div className="container mx-auto px-4 lg:px-6">
			<DataTable columns={columns} data={samplePayouts} type="payouts" />
		</div>
	);
}
