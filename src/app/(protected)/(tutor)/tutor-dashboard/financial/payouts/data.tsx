export type Payouts = {
	id: string;
	session: string;
	student: {
		name: string;
		proile_picture: string;
	};
	released_at: string;
	amount: number;
};

export const samplePayouts: Payouts[] = [
	{
		id: "P-1001",
		session:
			"Introduction to Computer Science Introduction to Computer Science Introduction to Computer Science Introduction to Computer Science Introduction to Computer Science Introduction to Computer Science Introduction to Computer Science Introduction to Computer Science ",
		student: {
			name: "Alice Johnson",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-17T10:30:00Z",
		amount: 120,
	},
	{
		id: "P-1002",
		session: "Data Structures and Algorithms",
		student: {
			name: "Brian Lee",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-18T12:00:00Z",
		amount: 90,
	},
	{
		id: "P-1003",
		session: "Linear Algebra for Engineers",
		student: {
			name: "Carla Mendes",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-19T09:00:00Z",
		amount: 75,
	},
	{
		id: "P-1004",
		session: "Software Engineering Principles",
		student: {
			name: "Daniel Fox",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-20T14:45:00Z",
		amount: 110,
	},
	{
		id: "P-1005",
		session: "Database Systems",
		student: {
			name: "Emily Zhang",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-21T16:20:00Z",
		amount: 95,
	},
	{
		id: "P-1001",
		session: "Intro to Computer Science",
		student: {
			name: "Alice Johnson",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-01T10:30:00Z",
		amount: 120,
	},
	{
		id: "P-1002",
		session: "Data Structures",
		student: {
			name: "Brian Lee",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-02T12:00:00Z",
		amount: 90,
	},
	{
		id: "P-1003",
		session: "Linear Algebra",
		student: {
			name: "Carla Mendes",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-03T09:00:00Z",
		amount: 75,
	},
	{
		id: "P-1004",
		session: "Software Engineering",
		student: {
			name: "Daniel Fox",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-04T14:45:00Z",
		amount: 110,
	},
	{
		id: "P-1005",
		session: "Database Systems",
		student: {
			name: "Emily Zhang",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-05T16:20:00Z",
		amount: 95,
	},
	{
		id: "P-1006",
		session: "Machine Learning",
		student: {
			name: "Farhan Malik",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-06T15:00:00Z",
		amount: 130,
	},
	{
		id: "P-1007",
		session: "Operating Systems",
		student: {
			name: "Grace Nguyen",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-07T10:15:00Z",
		amount: 85,
	},
	{
		id: "P-1008",
		session: "Networks",
		student: {
			name: "Hector Ramirez",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-08T11:30:00Z",
		amount: 88,
	},
	{
		id: "P-1009",
		session: "Cybersecurity Basics",
		student: {
			name: "Isla Thompson",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-09T13:20:00Z",
		amount: 100,
	},
	{
		id: "P-1010",
		session: "Web Development",
		student: {
			name: "Jack Monroe",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-10T09:40:00Z",
		amount: 115,
	},
	{
		id: "P-1011",
		session: "Mobile App Dev",
		student: {
			name: "Karen Davis",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-11T08:20:00Z",
		amount: 102,
	},
	{
		id: "P-1012",
		session: "AI for Beginners",
		student: {
			name: "Leo Sanchez",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-12T12:10:00Z",
		amount: 125,
	},
	{
		id: "P-1013",
		session: "Python Programming",
		student: {
			name: "Maya Patel",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-13T17:50:00Z",
		amount: 78,
	},
	{
		id: "P-1014",
		session: "Java Development",
		student: {
			name: "Nathan Kim",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-14T14:30:00Z",
		amount: 89,
	},
	{
		id: "P-1015",
		session: "C++ Basics",
		student: {
			name: "Olivia White",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-15T16:45:00Z",
		amount: 94,
	},
	{
		id: "P-1016",
		session: "HTML & CSS",
		student: {
			name: "Paul Anderson",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-16T13:00:00Z",
		amount: 72,
	},
	{
		id: "P-1017",
		session: "UI/UX Fundamentals",
		student: {
			name: "Quinn Roberts",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-17T10:30:00Z",
		amount: 91,
	},
	{
		id: "P-1018",
		session: "Cloud Computing",
		student: {
			name: "Rita Fernandez",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-18T12:00:00Z",
		amount: 119,
	},
	{
		id: "P-1019",
		session: "DevOps Essentials",
		student: {
			name: "Samir Chawla",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-19T09:00:00Z",
		amount: 111,
	},
	{
		id: "P-1020",
		session: "Big Data Intro",
		student: {
			name: "Tina Brooks",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-20T14:45:00Z",
		amount: 103,
	},
	{
		id: "P-1021",
		session: "Ethical Hacking",
		student: {
			name: "Umar Shaikh",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-21T16:20:00Z",
		amount: 135,
	},
	{
		id: "P-1022",
		session: "Intro to Robotics",
		student: {
			name: "Valeria Gomez",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-22T15:00:00Z",
		amount: 122,
	},
	{
		id: "P-1023",
		session: "R Programming",
		student: {
			name: "Will Huang",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-23T10:15:00Z",
		amount: 106,
	},
	{
		id: "P-1024",
		session: "React.js Essentials",
		student: {
			name: "Xenia Voss",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-24T11:30:00Z",
		amount: 128,
	},
	{
		id: "P-1025",
		session: "Node.js & Express",
		student: {
			name: "Yusuf Kader",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-25T13:20:00Z",
		amount: 113,
	},
	{
		id: "P-1026",
		session: "Intro to AI Ethics",
		student: {
			name: "Zara Novak",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-26T09:40:00Z",
		amount: 84,
	},
	{
		id: "P-1027",
		session: "Quantum Computing 101",
		student: {
			name: "Alan Bishop",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-27T08:20:00Z",
		amount: 142,
	},
	{
		id: "P-1028",
		session: "Blockchain Basics",
		student: {
			name: "Betty Carson",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-28T12:10:00Z",
		amount: 117,
	},
	{
		id: "P-1029",
		session: "Agile Project Management",
		student: {
			name: "Carlos Rivera",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-29T17:50:00Z",
		amount: 98,
	},
	{
		id: "P-1030",
		session: "Intro to Game Dev",
		student: {
			name: "Diana Luo",
			proile_picture: "https://avatar.iran.liara.run/public",
		},
		released_at: "2025-04-30T14:30:00Z",
		amount: 109,
	},
];
