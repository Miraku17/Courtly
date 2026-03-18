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
  city: string;
  distance: string;
  priceFrom: number;
  image: string;
  isFavorite?: boolean;
  amenities: string[];
  courtsCount: number;
  isOpen: boolean;
  openHours: string;
  surfaceType: string;
  featured?: boolean;
}

export const mockVenues: Venue[] = [
  {
    id: "v1",
    name: "Elite Padel Club",
    sports: ["Padel", "Tennis"],
    rating: 4.9,
    reviewCount: 128,
    address: "123 Sport Ave, Silicon Valley",
    city: "San Francisco",
    distance: "1.2 miles",
    priceFrom: 35,
    image: "/hero_1.webp",
    isFavorite: true,
    amenities: ["Indoor", "Parking", "Pro Shop", "Showers"],
    courtsCount: 8,
    isOpen: true,
    openHours: "6 AM – 11 PM",
    surfaceType: "Glass-enclosed",
    featured: true,
  },
  {
    id: "v2",
    name: "Sunset Tennis Center",
    sports: ["Tennis"],
    rating: 4.7,
    reviewCount: 85,
    address: "456 Greenway Dr, Palo Alto",
    city: "Palo Alto",
    distance: "3.5 miles",
    priceFrom: 45,
    image: "/hero_1.webp",
    amenities: ["Outdoor", "Lights", "Coaching"],
    courtsCount: 6,
    isOpen: true,
    openHours: "7 AM – 10 PM",
    surfaceType: "Hard Court",
  },
  {
    id: "v3",
    name: "Pickleball Hub",
    sports: ["Pickleball"],
    rating: 4.8,
    reviewCount: 210,
    address: "789 Active Way, San Jose",
    city: "San Jose",
    distance: "5.0 miles",
    priceFrom: 20,
    image: "/hero_1.webp",
    isFavorite: true,
    amenities: ["Indoor", "Cafe", "Equipment Rental"],
    courtsCount: 12,
    isOpen: true,
    openHours: "8 AM – 9 PM",
    surfaceType: "Sport Court",
  },
  {
    id: "v4",
    name: "Bay Area Racquet Club",
    sports: ["Tennis", "Padel", "Pickleball"],
    rating: 4.6,
    reviewCount: 312,
    address: "900 Marina Blvd, San Francisco",
    city: "San Francisco",
    distance: "2.8 miles",
    priceFrom: 55,
    image: "/hero_1.webp",
    amenities: ["Indoor", "Outdoor", "Parking", "Locker Rooms", "Cafe"],
    courtsCount: 16,
    isOpen: true,
    openHours: "5 AM – 11 PM",
    surfaceType: "Multiple",
  },
  {
    id: "v5",
    name: "Golden Gate Padel",
    sports: ["Padel"],
    rating: 4.9,
    reviewCount: 67,
    address: "1500 Presidio Ave, San Francisco",
    city: "San Francisco",
    distance: "4.1 miles",
    priceFrom: 40,
    image: "/hero_1.webp",
    amenities: ["Outdoor", "Parking", "Showers"],
    courtsCount: 4,
    isOpen: false,
    openHours: "7 AM – 9 PM",
    surfaceType: "Artificial Turf",
  },
  {
    id: "v6",
    name: "South Bay Tennis Academy",
    sports: ["Tennis"],
    rating: 4.5,
    reviewCount: 189,
    address: "2200 El Camino Real, Mountain View",
    city: "Mountain View",
    distance: "6.3 miles",
    priceFrom: 30,
    image: "/hero_1.webp",
    amenities: ["Outdoor", "Lights", "Coaching", "Pro Shop"],
    courtsCount: 10,
    isOpen: true,
    openHours: "6 AM – 10 PM",
    surfaceType: "Clay",
  },
  {
    id: "v7",
    name: "Mission Pickleball Courts",
    sports: ["Pickleball"],
    rating: 4.7,
    reviewCount: 143,
    address: "3100 Mission St, San Francisco",
    city: "San Francisco",
    distance: "1.8 miles",
    priceFrom: 15,
    image: "/hero_1.webp",
    amenities: ["Outdoor", "Equipment Rental"],
    courtsCount: 6,
    isOpen: true,
    openHours: "7 AM – 8 PM",
    surfaceType: "Concrete",
  },
  {
    id: "v8",
    name: "Peninsula Sports Complex",
    sports: ["Tennis", "Pickleball"],
    rating: 4.8,
    reviewCount: 256,
    address: "450 Woodside Rd, Redwood City",
    city: "Redwood City",
    distance: "8.2 miles",
    priceFrom: 25,
    image: "/hero_1.webp",
    amenities: ["Indoor", "Outdoor", "Parking", "Cafe", "Showers"],
    courtsCount: 14,
    isOpen: true,
    openHours: "6 AM – 11 PM",
    surfaceType: "Hard Court",
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
