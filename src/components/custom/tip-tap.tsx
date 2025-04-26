"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SessionSchemaT } from "@/schema/sessionSchema";
import { ControllerFieldState, UseFormSetValue } from "react-hook-form";
import TipTapMenuBar from "./tip-tap-menu-bar";

interface TipTapProps {
	setValue: UseFormSetValue<SessionSchemaT>;
	fieldState: ControllerFieldState;
}
export default function TipTap({ setValue, fieldState }: TipTapProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					HTMLAttributes: {
						class: "list-disc ml-3",
					},
				},
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal ml-3",
					},
				},
			}),
		],
		content: "",
		editorProps: {
			attributes: {
				class:
					"min-h-[12rem] border rounded-md bg-slate-50 py-2 px-3 mt-0 text-sm",
			},
		},
		onUpdate: ({ editor }) => {
			setValue("requirements", editor.getHTML());
		},
	});

	return (
		<FormItem className="grid gap-1">
			<FormLabel className="text-[1rem]">Requirements</FormLabel>
			<FormControl>
				<div>
					<TipTapMenuBar editor={editor} />
					<EditorContent editor={editor} />
				</div>
			</FormControl>
			<EditorContent editor={editor} />
			<FormMessage />
			{fieldState.error && (
				<FormMessage>{fieldState.error.message}</FormMessage>
			)}
		</FormItem>
	);
}
