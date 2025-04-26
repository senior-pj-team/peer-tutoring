import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import { students } from "./data";

export default function Students() {
	return (
		<div className="mb-5 px-4 lg:px-6 ">
			<DataTable columns={columns} data={students} type="students" />
		</div>
	);
}
