export interface Booking {
  id: string;
  venueName: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  sport: "Tennis" | "Padel" | "Pickleball";
  address: string;
  status: "upcoming" | "past" | "cancelled";
  price: number;
  rating?: number;
  reviewLeft?: boolean;
  cancellationReason?: string;
}

export const mockBookings: Booking[] = [
  {
    id: "1",
    venueName: "Elite Padel Club",
    courtName: "Court 4 (Indoor)",
    date: "Mar 20, 2026",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    sport: "Padel",
    address: "123 Sport Ave, Silicon Valley",
    status: "upcoming",
    price: 35,
  },
  {
    id: "2",
    venueName: "Sunset Tennis Center",
    courtName: "Hard Court 1",
    date: "Mar 22, 2026",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    sport: "Tennis",
    address: "456 Greenway Dr, Palo Alto",
    status: "upcoming",
    price: 45,
  },
  {
    id: "3",
    venueName: "Pickleball Hub",
    courtName: "Court 2",
    date: "Mar 10, 2026",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    sport: "Pickleball",
    address: "789 Active Way, San Jose",
    status: "past",
    price: 25,
    rating: 5,
    reviewLeft: true,
  },
  {
    id: "4",
    venueName: "Downtown Tennis",
    courtName: "Clay Court 3",
    date: "Mar 05, 2026",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    sport: "Tennis",
    address: "101 Urban St, San Francisco",
    status: "past",
    price: 40,
    reviewLeft: false,
  },
  {
    id: "5",
    venueName: "Beachside Padel",
    courtName: "Ocean View 1",
    date: "Feb 28, 2026",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    sport: "Padel",
    address: "202 Coast Hwy, Santa Cruz",
    status: "cancelled",
    price: 30,
    cancellationReason: "Weather conditions",
  },
];

export interface Venue {
  id: string;
  name: string;
  sports: string[];
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  priceFrom: number;
  image: string;
  isFavorite?: boolean;
}

export const mockVenues: Venue[] = [
  {
    id: "v1",
    name: "Elite Padel Club",
    sports: ["Padel", "Tennis"],
    rating: 4.9,
    reviewCount: 128,
    address: "123 Sport Ave, Silicon Valley",
    distance: "1.2 miles",
    priceFrom: 35,
    image: "/hero_1.webp",
    isFavorite: true,
  },
  {
    id: "v2",
    name: "Sunset Tennis Center",
    sports: ["Tennis"],
    rating: 4.7,
    reviewCount: 85,
    address: "456 Greenway Dr, Palo Alto",
    distance: "3.5 miles",
    priceFrom: 45,
    image: "/hero_1.webp",
  },
  {
    id: "v3",
    name: "Pickleball Hub",
    sports: ["Pickleball"],
    rating: 4.8,
    reviewCount: 210,
    address: "789 Active Way, San Jose",
    distance: "5.0 miles",
    priceFrom: 20,
    image: "/hero_1.webp",
    isFavorite: true,
  },
];

export interface Transaction {
  id: string;
  date: string;
  venueName: string;
  courtName: string;
  amount: number;
  status: "Paid" | "Refunded" | "Pending";
  method: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "TX-1001",
    date: "Mar 15, 2026",
    venueName: "Elite Padel Club",
    courtName: "Court 4 (Indoor)",
    amount: 35,
    status: "Paid",
    method: "Visa •••• 4242",
  },
  {
    id: "TX-1002",
    date: "Mar 12, 2026",
    venueName: "Sunset Tennis Center",
    courtName: "Hard Court 1",
    amount: 45,
    status: "Paid",
    method: "Apple Pay",
  },
  {
    id: "TX-1003",
    date: "Mar 05, 2026",
    venueName: "Beachside Padel",
    courtName: "Ocean View 1",
    amount: 30,
    status: "Refunded",
    method: "Visa •••• 4242",
  },
];
