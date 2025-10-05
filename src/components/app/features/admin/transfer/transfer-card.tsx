import { AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import Link from "next/link";
import { TransferActionDialog } from "../financial/transfer-action-dialog";
import { TransferReceiptDialog } from "../financial/transfer-receipt-dialog";

export function TransferCard({
	data,
	start,
	end,
	status,
}: {
	data: TSessionJoinResult;
	start: string | undefined;
	end: string | undefined;
	status: TSessionStatus;
}) {
	return (
		<Card key={data.id}>
			<div className="flex justify-between items-center pr-5">
				<CardContent className="flex justify-between items-center w-[90%]">
					<div className="flex flex-col w-full pr-3 gap-2 flex-5">
						<div className="w-full line-clamp-1 truncate mb-3 ">
							<Link key={data.id} href={`/admin-dashboard/session/${data.id}`}>
								<p className="font-medium hover:underline cursor_pointer mr-1">
									{data.session_name}
								</p>
							</Link>
						</div>

						<div className="flex gap-2 items-center">
							<span className="text-xs text-gray-400 font-bold">
								{status === "archived" ? <>Paid out at: </> : <>Held until: </>}
							</span>
							<span className="font-bold text-orange-500 text-xs">
								{status === "archived"
									? data.paid_out_at
										? format(data.paid_out_at, "dd MMMM yyyy hh:mm a")
										: "Unknown"
									: data.held_until
										? format(data.held_until, "dd MMMM yyyy hh:mm a")
										: "Unknown"}
								{}
							</span>
							<span className="font-bold text-gray-500 text-xs">{`(Please do not transfer before this time)`}</span>
						</div>
						<div className="flex gap-2 items-center">
							<span className="text-xs text-gray-400 font-bold">
								Session completed at:
							</span>
							<span className="font-bold text-orange-500 text-xs">
								{data.end_time
									? format(data.end_time, "dd MMMM yyyy hh:mm a")
									: "Unknown"}
							</span>
						</div>
						<div className="flex gap-2 items-center mb-1">
							<span className="text-xs text-gray-400 font-bold">
								Amount by tutor per session:
							</span>
							<span className="font-bold text-orange-500 text-xs">
								{data.price ?? "Unknown"}
							</span>
							<span className="font-bold text-gray-500 text-xs">{`(service fee before stripe: ${data.service_fee})`}</span>
						</div>
						<div className="flex gap-2 items-center">
							<span className="text-xs text-gray-400 font-bold">
								Transfer to tutor:
							</span>
							<div className="flex gap-1 items-center">
								<Avatar className="w-6 h-6">
									{data.tutor.profile_url && (
										<AvatarImage>{data.tutor.profile_url}</AvatarImage>
									)}
									<AvatarFallback>
										<span className="text-xs">
											{getAvatarFallback(data.tutor.username ?? "Unknown")}
										</span>
									</AvatarFallback>
								</Avatar>
								<div className=" hover:underline cursor-pointer">
									<Link href={`/home/tutor-view/${data.tutor.id}`}>
										<span className="font-bold text-xs">
											{data.tutor.username ?? "Unknown"}
										</span>

										<span className="font-bold text-gray-500 text-xs">{`(${data.tutor.email})`}</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
				{status !== "archived" ? (
					<TransferActionDialog
						session_id={data.id}
						session_name={data.session_name}
						tutor_id={data.tutor.id}
						tutor_name={data.tutor.username}
						tutor_email={data.tutor.email}
						start={start}
						end={end}
					/>
				) : (
					<>
						<TransferReceiptDialog
							receipt={data.payment_evidence}
							content={{
								session_id: data.id,
								session_name: data.session_name,
								transferred_amount: data.transferred_amount,
								tutor_id: data.tutor.id,
								tutor_name: data.tutor.username,
							}}
						/>
					</>
				)}
			</div>
		</Card>
	);
}
