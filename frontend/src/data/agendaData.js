const agendaData = [
  {
    id: 1,
    type: "Keynote",
    title: "Opening Keynote",
    speakerId: 1,
    venueId: 1,
    speaker: "Dr. Sarah Johnson",
    venue: "Main Auditorium",
    startTime: "09:30 AM",
    endTime: "10:30 AM",
    description:
      "Opening keynote on the future of Women in Engineering.",
    registered: true,
  },

  {
    id: 2,
    type: "Technical Session",
    title: "AI in Sustainable Energy",
    speakerId: 2,
    venueId: 2,
    speaker: "Anita Sharma",
    venue: "Hall A",
    startTime: "10:45 AM",
    endTime: "11:45 AM",
    description:
      "Applications of AI in renewable energy systems.",
    registered: false,
  },

  {
    id: 3,
    type: "Workshop",
    title: "Leadership for Women Engineers",
    speaker: "Emily Davis",
    venue: "Hall B",
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    description:
      "Interactive leadership workshop.",
    registered: false,
  },

  {
    id: 4,
    type: "Poster Presentation",
    title: "Student Research Showcase",
    speaker: "Multiple Participants",
    venue: "Expo Hall",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    description:
      "Poster presentations from students.",
    registered: false,
  },

  {
    id: 5,
    type: "Paper Presentation",
    title: "Emerging Technologies",
    speaker: "Research Committee",
    venue: "Hall C",
    startTime: "03:15 PM",
    endTime: "04:15 PM",
    description:
      "Technical paper presentations.",
    registered: false,
  },

  {
    id: 6,
    type: "Panel Discussion",
    title: "Women Leading Innovation",
    speaker: "Industry Leaders",
    venue: "Main Auditorium",
    startTime: "04:30 PM",
    endTime: "05:30 PM",
    description:
      "Panel discussion with industry experts.",
    registered: false,
  },

  {
    id: 7,
    type: "Networking Event",
    title: "Coffee & Connect",
    speaker: "-",
    venue: "Networking Lounge",
    startTime: "05:30 PM",
    endTime: "06:30 PM",
    description:
      "Meet fellow engineers and leaders.",
    registered: false,
  },

  {
    id: 8,
    type: "Cultural Event",
    title: "Evening Cultural Program",
    speaker: "-",
    venue: "Open Amphitheatre",
    startTime: "06:45 PM",
    endTime: "08:00 PM",
    description:
      "Closing cultural celebration.",
    registered: false,
  },
];

export default agendaData;