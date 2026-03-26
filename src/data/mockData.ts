import { Pharmacy, BloodDonor, HealthSession, MedicineOrder } from "../types";

export const CITIES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];

export const PHARMACIES: Pharmacy[] = [
  {
    id: "1",
    name: "Lazz Pharma",
    city: "Dhaka",
    address: "Kalabagan, Mirpur Road",
    contact: "01711-223344",
    rating: 4.8,
    image: "https://picsum.photos/seed/medica-pharmacy-1/600/400"
  },
  {
    id: "2",
    name: "Tamanna Pharmacy",
    city: "Dhaka",
    address: "Dhanmondi 27",
    contact: "01811-334455",
    rating: 4.5,
    image: "https://picsum.photos/seed/medica-pharmacy-2/600/400"
  },
  {
    id: "3",
    name: "Khidmah Pharmacy",
    city: "Sylhet",
    address: "Zindabazar",
    contact: "01911-445566",
    rating: 4.6,
    image: "https://picsum.photos/seed/medica-pharmacy-3/600/400"
  },
  {
    id: "4",
    name: "Popular Pharmacy",
    city: "Chittagong",
    address: "GEC Circle",
    contact: "01611-556677",
    rating: 4.7,
    image: "https://picsum.photos/seed/medica-pharmacy-4/600/400"
  },
  {
    id: "5",
    name: "Khulna Pharma",
    city: "Khulna",
    address: "Sonadanga, Khulna",
    contact: "01711-111222",
    rating: 4.5,
    image: "https://picsum.photos/seed/medica-pharmacy-5/600/400"
  },
  {
    id: "6",
    name: "Boyra Medicine Point",
    city: "Khulna",
    address: "Boyra, Khulna",
    contact: "01811-222333",
    rating: 4.4,
    image: "https://picsum.photos/seed/medica-pharmacy-6/600/400"
  },
  {
    id: "7",
    name: "Moilapotah Drug House",
    city: "Khulna",
    address: "Moilapotah, Khulna",
    contact: "01911-333444",
    rating: 4.6,
    image: "https://picsum.photos/seed/medica-pharmacy-7/600/400"
  },
  {
    id: "8",
    name: "Dakbangla Pharmacy",
    city: "Khulna",
    address: "Dakbangla, Khulna",
    contact: "01611-444555",
    rating: 4.7,
    image: "https://picsum.photos/seed/medica-pharmacy-8/600/400"
  },
  {
    id: "9",
    name: "Gollamari Medicine Mart",
    city: "Khulna",
    address: "Gollamari, Khulna",
    contact: "01511-555666",
    rating: 4.3,
    image: "https://picsum.photos/seed/medica-pharmacy-9/600/400"
  },
  {
    id: "10",
    name: "Doulotpur Pharma Care",
    city: "Khulna",
    address: "Doulotpur, Khulna",
    contact: "01311-666777",
    rating: 4.5,
    image: "https://picsum.photos/seed/medica-pharmacy-10/600/400"
  },
  {
    id: "11",
    name: "Abu Naser Medical Pharmacy",
    city: "Khulna",
    address: "Abu Naser Mor, Khulna",
    contact: "01411-777888",
    rating: 4.8,
    image: "https://picsum.photos/seed/medica-pharmacy-11/600/400"
  }
];

export const BLOOD_DONORS: BloodDonor[] = [
  {
    id: "1",
    name: "Abidur Rahman",
    bloodGroup: "A+",
    city: "Dhaka",
    contact: "01700-112233",
    lastDonationDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Sabbir Ahmed",
    bloodGroup: "O-",
    city: "Sylhet",
    contact: "01800-223344",
    lastDonationDate: "2023-11-20"
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    bloodGroup: "B+",
    city: "Chittagong",
    contact: "01900-334455",
    lastDonationDate: "2024-02-10"
  }
];

export const HEALTH_SESSIONS: HealthSession[] = [
  {
    id: "1",
    title: "Diabetes Awareness Workshop",
    date: "2024-04-10",
    time: "10:00 AM",
    location: "Dhaka Medical College Auditorium",
    description: "A free workshop to learn about diabetes management and prevention.",
    speaker: "Dr. Mahbubur Rahman",
    image: "https://picsum.photos/seed/medica-session-1/800/500"
  },
  {
    id: "2",
    title: "Healthy Heart Seminar",
    date: "2024-04-15",
    time: "03:00 PM",
    location: "Online (Zoom)",
    description: "Learn how to keep your heart healthy with simple lifestyle changes.",
    speaker: "Dr. Farhana Yasmin",
    image: "https://picsum.photos/seed/medica-session-2/800/500"
  }
];

export const MEDICINE_PRICES: Record<string, number> = {
  "Napa": 1.2,
  "Napa Extend": 2.5,
  "Ace": 1.2,
  "Ace Plus": 2.5,
  "Sergel 20mg": 7,
  "Seclo 20mg": 6,
  "Pantonix 20mg": 7,
  "Fexo 120mg": 8,
  "Fexo 180mg": 12,
  "Monas 10mg": 16,
  "Entacyd Plus": 2,
  "Fenadin 120mg": 8,
  "Rivotril 0.5mg": 8,
  "Nexum 20mg": 7,
  "Maxpro 20mg": 7,
  "Finix 20mg": 7,
  "Napa Extra": 2.5,
  "Fast 500": 1.2,
  "Tofen": 3,
  "Alatrol": 3,
  "Histacin": 0.5,
  "Flagyl 400": 5,
  "Filmet 400": 5,
  "Ciprocin 500": 15,
  "Fixit 200": 35,
  "Zithrin 500": 35,
  "Azith 500": 35
};

export const MOCK_ORDERS: MedicineOrder[] = [
  {
    id: "ORD-001",
    customerName: "Rahim Uddin",
    customerAddress: "Sonadanga, Khulna",
    customerPhone: "01711-111222",
    pharmacyId: "5",
    medicineList: "Napa Extend (2 strips), Sergel 20mg (1 strip)",
    status: 'pending',
    totalAmount: 120,
    commission: 12
  },
  {
    id: "ORD-002",
    customerName: "Karim Ahmed",
    customerAddress: "Boyra, Khulna",
    customerPhone: "01811-222333",
    pharmacyId: "6",
    medicineList: "Fexo 120mg (1 strip), Monas 10mg (1 strip)",
    status: 'picked_up',
    totalAmount: 240,
    commission: 24
  }
];
