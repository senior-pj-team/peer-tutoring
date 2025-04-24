import CustomCarousel from "@/components/custom/home/custom-carousel";

export default function TopTutorsSection() {
	const tutors = [
		{
			name: "John Mayer",
			totalStudents: 56,
			totalSessions: 12,
			image: "/tutorone.webp",
		},
		{
			name: "John Mayer",
			totalStudents: 56,
			totalSessions: 12,
			image: "/tutortwo.webp",
		},
		{
			name: "John Mayer",
			totalStudents: 56,
			totalSessions: 12,
			image: "/tutortwo.webp",
		},
		{
			name: "John Mayer",
			totalStudents: 56,
			totalSessions: 12,
			image: "/tutorone.webp",
		},
		{
			name: "John Mayer",
			totalStudents: 56,
			totalSessions: 12,
			image: "/tutortwo.webp",
		},
	];
	return (
		<div className="mt-5 px-10">
			<div className="text-3xl font-bold tracking-wider">Top Rated Tutors</div>
			<CustomCarousel content={tutors} />
		</div>
	);
}
