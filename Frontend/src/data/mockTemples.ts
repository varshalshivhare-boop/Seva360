export interface SevaOption {
  id: string;
  name: string;
  time: string;
  price: number;
  duration: string;
  description: string;
  availableSlots: number;
}

export interface Temple {
  id: string;
  name: string;
  deity: string;
  location: string;
  state: string;
  rating: number;
  reviewsCount: number;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  crowdPercentage: number;
  waitTimeMinutes: number;
  imageUrl: string;
  darshanTimings: string;
  description: string;
  sevas: SevaOption[];
  featured?: boolean;
}

export const MOCK_TEMPLES: Temple[] = [
  {
    id: 'kashi-vishwanath',
    name: 'Shri Kashi Vishwanath Temple',
    deity: 'Lord Shiva',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    rating: 4.9,
    reviewsCount: 12450,
    crowdLevel: 'Moderate',
    crowdPercentage: 65,
    waitTimeMinutes: 25,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs-LOvyj31o7OT1xftyhhaF98Yv9uMQmK8X-jfAi9nWx7dXQWfJlV4wrAmtyJrY3bPg3e2rc934Cxj7DQoNVUr6kY_RzAHX95tDzK5sPojBJf55O45RVJlX9Kkq5bOrLnBn1W-TGv_8OM4n--k-7xRILB5YrQWPsfys4Rg4E5J19OmieqVeTJ089_JIPTrnXByN5n77WiHb0v5kMbQOk2Ec4ppRxhj5ZSIKlEHpNSK7GJfvdOsxGVeiw',
    darshanTimings: '03:00 AM - 11:00 PM',
    description: 'One of the twelve sacred Jyotirlingas standing on the western bank of holy river Ganga.',
    featured: true,
    sevas: [
      { id: 'kashi-mangala', name: 'Mangala Aarti', time: '03:00 AM - 04:00 AM', price: 500, duration: '60 min', description: 'Earliest sacred morning aarti welcoming the divine.', availableSlots: 45 },
      { id: 'kashi-rudra', name: 'Rudrabhishekam', time: '06:00 AM - 08:00 AM', price: 350, duration: '120 min', description: 'Sacred chanting and holy water bath of the Jyotirlinga.', availableSlots: 80 },
      { id: 'kashi-shringaar', name: 'Shringaar Bhog Aarti', time: '09:00 PM - 10:15 PM', price: 300, duration: '75 min', description: 'Evening ornamentation of the divine deity with flowers.', availableSlots: 110 }
    ]
  },
  {
    id: 'somnath-temple',
    name: 'Shree Somnath Jyotirlinga',
    deity: 'Lord Shiva',
    location: 'Prabhas Patan, Veraval',
    state: 'Gujarat',
    rating: 4.9,
    reviewsCount: 9820,
    crowdLevel: 'Low',
    crowdPercentage: 35,
    waitTimeMinutes: 15,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBmQ80ZO7Kf0e4Yl2bpToXgykmK3TjEqXRO19L7aHgj94F3Dn0aFwJrzL6oInzAxTD1qKy7k3bDOSNeVSrV-GU2hhFDTTjEFQyvETmzgDl8VNycOuaB1kW6LIZqjDvdR1hbQNptaqIMA1lgduldX2-opV0LXQbqepHK9DhgTy17eef9-66W_GqLx--7p0eFw6gxQkAoe0K9cUlXRapI7Za_mBCHB-2qSRhNKOiYU8FH3IriihBmAV3XQ',
    darshanTimings: '06:00 AM - 10:00 PM',
    description: 'The first among the twelve Aadi Jyotirlingas, situated serenely on the coast of the Arabian Sea.',
    featured: true,
    sevas: [
      { id: 'somnath-someshwar', name: 'Someshwar Mahapuja', time: '07:00 AM - 08:30 AM', price: 500, duration: '90 min', description: 'Complete Vedic rituals and panchamrit abhishekam.', availableSlots: 60 },
      { id: 'somnath-sandhya', name: 'Sandhya Aarti Darshan', time: '07:00 PM - 07:45 PM', price: 0, duration: '45 min', description: 'Grand evening twilight prayer with ocean breeze.', availableSlots: 250 }
    ]
  },
  {
    id: 'dwarkadhish-temple',
    name: 'Shree Dwarkadhish Jagat Mandir',
    deity: 'Lord Krishna',
    location: 'Dwarka',
    state: 'Gujarat',
    rating: 4.8,
    reviewsCount: 14200,
    crowdLevel: 'Moderate',
    crowdPercentage: 58,
    waitTimeMinutes: 20,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbLPNGw2IhYH1q0i5lTg0birhlP72Ca1fJIzwe1zOAqNfxEIn_oG3QXv0KrdR_I1XWqWRCIy3Gz95yPNFkrMiAF_euYYkTcsI9QuYYKvgVpvHeZmklUL42L3x8JEV1kPx7a5dsmajH3lNNh9gwtdoKMwD0-DKJURxN79ttrcUfVQYlRmHWLDRBjqs20zH-TFjDotjytPaAbou-mBFhNg4WUD8O_y013iaLeNfggtbQLZqzp2jO8Az6-w',
    darshanTimings: '06:30 AM - 01:00 PM, 05:00 PM - 09:30 PM',
    description: 'The sacred 5-story shrine known as Jagat Mandir, celebrating the King of Dwarka.',
    featured: true,
    sevas: [
      { id: 'dwarka-mangla', name: 'Mangla Aarti', time: '06:30 AM - 07:00 AM', price: 200, duration: '30 min', description: 'Morning awakening aarti for Lord Dwarkadhish.', availableSlots: 100 },
      { id: 'dwarka-dhwajarohan', name: 'Dhwajarohan Seva', time: '11:00 AM - 12:00 PM', price: 1100, duration: '60 min', description: 'Ceremonial hoisting of the holy 52-yard temple flag.', availableSlots: 5 }
    ]
  },
  {
    id: 'ambaji-temple',
    name: 'Shree Arasuri Ambaji Mata Temple',
    deity: 'Maa Ambe',
    location: 'Ambaji, Banaskantha',
    state: 'Gujarat',
    rating: 4.9,
    reviewsCount: 8900,
    crowdLevel: 'High',
    crowdPercentage: 82,
    waitTimeMinutes: 40,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkH8tmmhOpV8RdIpJgaHCfgzcX6tQYBahZjPkP9ZGmYfKg-wdjugHr6pgkp0wmhldpZqAj9_5zkbFB0t8gtC4xdSIQoADNjjNQjbYp8M1x-Jq1PP4NpcRdaCbtCO_s8jln88wt_Mtf0t8kavY6JHbJXKFOLibsTioQoAnfgwFuY5jS6PkioAR5mubIYxvUQpMRv2K_rjy4qAPQzpJDjZSJeySBZVLp7pB3AkHFK0DbiHSX2fWH4KbDoA',
    darshanTimings: '07:00 AM - 11:30 AM, 12:30 PM - 04:30 PM, 06:30 PM - 09:00 PM',
    description: 'Major Shakti Peeth where the Visoyantra is worshipped in the sacred Arasur hills.',
    featured: false,
    sevas: [
      { id: 'ambaji-shringaar', name: 'Chausath Yogini Puja', time: '08:00 AM - 09:30 AM', price: 450, duration: '90 min', description: 'Sacred yantra pujan for health and prosperity.', availableSlots: 35 }
    ]
  },
  {
    id: 'pavagadh-kalika',
    name: 'Maa Mahakalika Temple Pavagadh',
    deity: 'Maa Mahakali',
    location: 'Pavagadh, Panchmahal',
    state: 'Gujarat',
    rating: 4.8,
    reviewsCount: 7600,
    crowdLevel: 'Moderate',
    crowdPercentage: 60,
    waitTimeMinutes: 30,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjbMrnftMMw1DdK-UkNb8mfWhq_mLb6SrOh9TnYd57mtYiOXTO9FuY9PtCgMMszR71URDGdDe-t7tw7Q5FVNWFHBImw5yOj2BfZvoDej2FT8RiL6e0SBq2GmHkmJrHQh7IRncrvCeF_fKQUESgk1Jz3MLSGnlpBoD89ptUFonFgl2l1FPaeQJRfjdg5syVkzsxZlAd11aGNy91G2NqLuix-OQmaSPX68vDxj0vUdYg2krOXju0lQFx2A',
    darshanTimings: '05:00 AM - 07:00 PM',
    description: 'Historic hilltop Shakti Peeth overlooking Champaner archaeological heritage.',
    featured: false,
    sevas: [
      { id: 'pava-aarti', name: 'Kalyanotsavam Aarti', time: '05:30 AM - 06:30 AM', price: 250, duration: '60 min', description: 'Dawn aarti with hilltop panorama.', availableSlots: 50 }
    ]
  }
];
