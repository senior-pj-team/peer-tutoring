"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ControllerFieldState } from "react-hook-form";
import TipTapMenuBar from "./tip-tap-menu-bar";
import { useEffect } from "react";

interface TipTapProps {
	value: string;
	onChange: (value: string) => void;
	fieldState: ControllerFieldState;
	disable: boolean;
}

export default function TipTap({
	value,
	onChange,
	fieldState,
	disable = false,
}: TipTapProps) {
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
		content: value || "",
		editorProps: {
			attributes: {
				class:
					"min-h-[12rem] border rounded-md bg-slate-50 py-2 px-3 mt-0 text-sm",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor) {
			editor.setEditable(!disable);
		}
	}, [editor, disable]);

	return (
		<FormItem className="grid gap-1">
			<FormLabel className="text-[1rem]">Requirements</FormLabel>
			<FormControl>
				<div>
					<TipTapMenuBar editor={editor} />
					<EditorContent
						editor={editor}
						className={editor?.isEditable ? "" : "text-gray-500"}
					/>
				</div>
			</FormControl>
			<FormMessage />
			{fieldState.error && (
				<FormMessage>{fieldState.error.message}</FormMessage>
			)}
		</FormItem>
	);
}
