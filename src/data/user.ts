export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  joinDate: string;
  verified: boolean;
  savedProperties: string[];
}

export const currentUser: User = {
  id: 'user1',
  name: 'Abdullah Mohammed',
  email: 'abdullah@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  phone: '+966 50 123 4567',
  joinDate: '2023-01-15',
  verified: true,
  savedProperties: ['1', '3'],
}; 