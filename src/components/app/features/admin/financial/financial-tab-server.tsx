import { getamountSummaries } from "@/data/queries/student-session/get-amount-summaries";
import { TransferActionDialog } from "./transfer-action-dialog";
import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { format, formatDate } from "date-fns";

type Params = {
	session_id: number;
	session_name: string | null;
	tutor_id: string;
	tutor_name: string | null;
	tutor_email: string;
	status: TSessionStatus;
	held_until: string;
	paid_out_at: string | null;
};
export async function FinancialTabServer({
	session_id,
	session_name,
	tutor_id,
	tutor_name,
	tutor_email,
	status,
	held_until,
	paid_out_at,
}: Params) {
	const supabase = await createClient();
	const amountSummaries = await getamountSummaries(supabase, {
		session_id,
	});

	let sum_revenue: number | null = null;
	let sum_refunded: number | null = null;
	let sum_amount_to_tutor: number | null = null;

	if (amountSummaries && amountSummaries.length > 0) {
		sum_revenue = amountSummaries[0].sum_revenue;
		sum_refunded = amountSummaries[0].sum_refunded;
		sum_amount_to_tutor = amountSummaries[0].sum_amount_to_tutor;
	}
	return (
		<div className="py-6">
			{status === "completed" ? (
				<Badge className="bg-purple-50 mb-4">
					<div className="text-sm font-bold text-purple-500">{`You cannot transfer before ${formatDate(held_until, "dd MMMM yyyy")}`}</div>
				</Badge>
			) : status === "archived" && paid_out_at ? (
				<Badge className="bg-green-50 mb-4">
					<div className="text-sm font-bold text-green-500">{`You have transferred on ${format(paid_out_at, "dd MMMM yyyy hh:mm a")}`}</div>
				</Badge>
			) : status === "open" || status === "closed" || status === "cancelled" ? (
				<Badge className="bg-red-50 mb-4">
					<div className="text-sm font-bold text-red-500">{`You cannot transfer yet for ${status} session`}</div>
				</Badge>
			) : null}
			{status === "completed" && amountSummaries ? (
				<TransferActionDialog
					session_id={session_id}
					session_name={session_name}
					tutor_id={tutor_id}
					tutor_name={tutor_name}
					tutor_email={tutor_email}
					amount={amountSummaries[0].sum_amount_to_tutor}
				/>
			) : (
				!amountSummaries && (
					<div className="border border-gray-200 px-2 py-3 rounded-md text-red-500 font-bold text-sm w-[25%] text-center cursor-not-allowed">
						Something went wrong
					</div>
				)
			)}
			<div className="text-2xl my-4 mt-2 font-bold">Financial Stats</div>
			<div className="flex w-full items-center gap-x-5 mb-8">
				<div className="w-[250px] h-[110px] border border-gray-200 rounded-md p-4 flex flex-col">
					<div className="text-sm text-gray-400  mb-3">Total Revenue</div>
					<div className="text-2xl font-bold mb-1">{sum_revenue}</div>
					<div className="text-xs text-gray-400">Amount from stripe summed</div>
				</div>

				<div className="w-[250px] h-[110px] border border-gray-200 rounded-md p-4 flex flex-col">
					<div className="text-sm text-gray-400  mb-3">
						Total Amount to transfer
					</div>
					<div className="text-2xl font-bold mb-1">
						{sum_amount_to_tutor ?? "N/A"}
					</div>
					<div className="text-xs text-gray-400">Amount to tutor summed</div>
				</div>

				<div className="w-[250px] h-[110px] border border-gray-200 rounded-md p-4 flex flex-col">
					<div className="text-sm text-gray-400  mb-3">Total Refunded</div>
					<div className="text-2xl font-bold mb-1">{sum_refunded ?? 0}</div>
					<div className="text-xs text-gray-400">Refunded amount summed</div>
				</div>
				<div className="w-[250px] h-[110px] border border-gray-200 rounded-md p-4 flex flex-col">
					<div className="text-sm text-gray-400  mb-3">Total Profit</div>
					<div className="text-2xl font-bold mb-1">
						{sum_revenue && sum_amount_to_tutor
							? (sum_revenue - sum_amount_to_tutor).toFixed(2)
							: "NA "}
					</div>
					<div className="text-xs text-gray-400">Profit earned by admin</div>
				</div>
			</div>
		</div>
	);
}
