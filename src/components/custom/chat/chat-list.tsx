"use client";
import Link from "next/link";

const people = [
	{ id: "1", name: "Alice" },
	{ id: "2", name: "Bob" },
];

const ChatList = () => {
  return (
    <div className="border-r p-4 space-y-2">
    {people.map((person) => (
        <Link
            href={`/chat/${person.id}`}
            key={person.id}
            className="block p-2 rounded hover:bg-gray-100"
        >
            {person.name}
        </Link>
    ))}
</div>
  )
}

export default ChatList
