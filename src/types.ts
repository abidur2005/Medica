export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'delivery' | 'pharmacy';
}

export interface CartItem {
  pharmacyId: string;
  pharmacyName: string;
  medicineName: string;
  quantity: number;
  price: number;
  prescriptionImage?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  city: string;
  address: string;
  contact: string;
  rating: number;
  image: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  city: string;
  contact: string;
  lastDonationDate: string;
}

export interface HealthSession {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speaker: string;
  image: string;
}

export interface MedicineOrder {
  id: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  pharmacyId: string;
  medicineList: string;
  status: 'pending' | 'picked_up' | 'delivered';
  totalAmount: number;
  commission: number;
}
