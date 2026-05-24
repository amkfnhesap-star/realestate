export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land';

export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  description: string;
  photos: string[];
  featured: boolean;
  agentId: string;
  coordinates: { lat: number; lng: number };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
  languagesSpoken: string[];
  specialization: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  photo: string;
}

const U = 'https://images.unsplash.com';

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Alexandru Ionescu',
    role: 'Senior Property Consultant',
    photo: `${U}/photo-1507003211169-0a1dd7228f2d?w=400&q=80`,
    phone: '+40 721 234 567',
    email: 'alexandru@roestate.ro',
    bio: 'With over 12 years in Romanian real estate, Alexandru specialises in premium residential properties in Bucharest. He has helped more than 300 families find their perfect home.',
    languagesSpoken: ['Romanian', 'English', 'French'],
    specialization: 'Luxury Residential',
  },
  {
    id: 'agent-2',
    name: 'Maria Popescu',
    role: 'Property Specialist',
    photo: `${U}/photo-1494790108377-be9c29b29330?w=400&q=80`,
    phone: '+40 731 345 678',
    email: 'maria@roestate.ro',
    bio: 'Maria brings eight years of expertise in new-build and off-plan properties across Cluj-Napoca and Brașov. Fluent in Turkish, she is a trusted guide for international buyers entering the Romanian market.',
    languagesSpoken: ['Romanian', 'English', 'Turkish'],
    specialization: 'New Developments',
  },
  {
    id: 'agent-3',
    name: 'Andrei Constantin',
    role: 'Investment Advisor',
    photo: `${U}/photo-1500648767791-00dcc994a43e?w=400&q=80`,
    phone: '+40 741 456 789',
    email: 'andrei@roestate.ro',
    bio: 'Andrei focuses on commercial real estate and investment portfolios, with a strong track record in Bucharest\'s emerging districts. He holds a Master\'s in Finance and a RICS qualification.',
    languagesSpoken: ['Romanian', 'English', 'German'],
    specialization: 'Commercial & Investment',
  },
  {
    id: 'agent-4',
    name: 'Elena Dumitrescu',
    role: 'Residential Expert',
    photo: `${U}/photo-1438761681033-6461ffad8d80?w=400&q=80`,
    phone: '+40 751 567 890',
    email: 'elena@roestate.ro',
    bio: 'Elena has been a trusted adviser for foreign buyers and expatriates relocating to Romania for over six years. She provides end-to-end support from property search to legal completion.',
    languagesSpoken: ['Romanian', 'English', 'Arabic'],
    specialization: 'Expat & Foreign Buyers',
  },
];

export const properties: Property[] = [
  {
    id: 'property-1',
    title: '3-Bedroom Apartment in Floreasca',
    price: 245000,
    city: 'București',
    neighborhood: 'Floreasca',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    yearBuilt: 2019,
    description:
      'A bright, modern apartment in the sought-after Floreasca district, featuring an open-plan living area with floor-to-ceiling windows and high-end finishes throughout. Steps from Herăstrău Park and top-rated international schools, this property offers an exceptional quality of life in one of Bucharest\'s most desirable addresses. Underground parking and a private storage room are included.',
    photos: [
      `${U}/photo-1568605114967-8130f3a36994?w=1200&q=80`,
      `${U}/photo-1502672260266-1c1ef2d93688?w=1200&q=80`,
      `${U}/photo-1484154218962-a197022b5858?w=1200&q=80`,
      `${U}/photo-1600210491892-03d54c0aaf87?w=1200&q=80`,
    ],
    featured: true,
    agentId: 'agent-1',
    coordinates: { lat: 44.4632, lng: 26.0922 },
  },
  {
    id: 'property-2',
    title: '2-Bedroom Apartment in Dorobanți',
    price: 185000,
    city: 'București',
    neighborhood: 'Dorobanți',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 72,
    yearBuilt: 2016,
    description:
      'Elegantly renovated apartment in the prestigious Dorobanți neighbourhood, one of Bucharest\'s most coveted addresses. Features a fully equipped kitchen, marble bathrooms, and a generous balcony overlooking tree-lined streets. Close to embassies, boutique shops, and fine dining.',
    photos: [
      `${U}/photo-1560448204-e02f11c3d0e2?w=1200&q=80`,
      `${U}/photo-1556909114-f6e7ad7d3136?w=1200&q=80`,
      `${U}/photo-1600566753086-00f18fb6b3ea?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-1',
    coordinates: { lat: 44.4596, lng: 26.0894 },
  },
  {
    id: 'property-3',
    title: 'Studio Apartment in Pipera',
    price: 87000,
    city: 'București',
    neighborhood: 'Pipera',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 47,
    yearBuilt: 2021,
    description:
      'A compact yet stylish studio in the dynamic Pipera tech hub, ideal for young professionals or as a buy-to-let investment. The building offers 24/7 security, underground parking, and a rooftop terrace with city views. Excellent public transport links and fast-fibre internet infrastructure.',
    photos: [
      `${U}/photo-1512918728675-ed5a585cf0a1?w=1200&q=80`,
      `${U}/photo-1600047509807-ba8f99d2cdde?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-4',
    coordinates: { lat: 44.4934, lng: 26.1127 },
  },
  {
    id: 'property-4',
    title: '4-Bedroom Villa in Băneasa',
    price: 495000,
    city: 'București',
    neighborhood: 'Băneasa',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    yearBuilt: 2018,
    description:
      'Exceptional family villa set in the exclusive Băneasa residential enclave, offering privacy and green surroundings just 15 minutes from central Bucharest. The property features a landscaped garden, private pool, double garage, and a fully equipped basement entertainment room. Bordered by Băneasa Forest, providing a peaceful retreat with all urban conveniences nearby.',
    photos: [
      `${U}/photo-1570129477492-45c003edd2be?w=1200&q=80`,
      `${U}/photo-1583608205776-bfd35f0d9f83?w=1200&q=80`,
      `${U}/photo-1600596542815-ffad4c1539a9?w=1200&q=80`,
      `${U}/photo-1600210492493-0946911123ea?w=1200&q=80`,
      `${U}/photo-1600121848594-d8644e57abab?w=1200&q=80`,
    ],
    featured: true,
    agentId: 'agent-1',
    coordinates: { lat: 44.4978, lng: 26.0712 },
  },
  {
    id: 'property-5',
    title: '3-Bedroom Apartment in Centru',
    price: 168000,
    city: 'Cluj-Napoca',
    neighborhood: 'Centru',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 88,
    yearBuilt: 2017,
    description:
      'Spacious apartment in the heart of Cluj-Napoca, Romania\'s fastest-growing city and a leading European tech hub. Walking distance to Babeș-Bolyai University, the central park, and the city\'s vibrant café and restaurant scene. High-end finishes and exceptional natural light throughout make this a standout in its category.',
    photos: [
      `${U}/photo-1558618666-fcd25c85cd64?w=1200&q=80`,
      `${U}/photo-1600607687939-ce8a6c25118c?w=1200&q=80`,
      `${U}/photo-1502672260266-1c1ef2d93688?w=1200&q=80`,
    ],
    featured: true,
    agentId: 'agent-2',
    coordinates: { lat: 46.7712, lng: 23.589 },
  },
  {
    id: 'property-6',
    title: 'Commercial Space in Floreasca Business Park',
    price: 320000,
    city: 'București',
    neighborhood: 'Floreasca',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 185,
    yearBuilt: 2015,
    description:
      'Prime ground-floor and mezzanine commercial space in a modern Floreasca business building, suitable for tech companies, professional services, or medical practices. Open-plan layout with two glass-fronted meeting rooms, a reception area, and private parking for 6 vehicles. Excellent visibility and foot traffic on one of Bucharest\'s main north-south arteries.',
    photos: [
      `${U}/photo-1582268611958-ebfd161ef9cf?w=1200&q=80`,
      `${U}/photo-1560185007-c5ca9d2c014d?w=1200&q=80`,
      `${U}/photo-1484154218962-a197022b5858?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-3',
    coordinates: { lat: 44.4641, lng: 26.0903 },
  },
  {
    id: 'property-7',
    title: 'Building Plot in Voluntari',
    price: 98000,
    city: 'București',
    neighborhood: 'Voluntari',
    type: 'land',
    bedrooms: 0,
    bathrooms: 0,
    area: 2000,
    yearBuilt: 0,
    description:
      'Prime building plot in the rapidly developing Voluntari area, just north of Bucharest\'s ring road. Zoned for residential construction (PUZ approved for up to two independent units). All utilities are available at the plot boundary. Easy access to IKEA, Băneasa Shopping City, and Henri Coandă International Airport.',
    photos: [
      `${U}/photo-1523217582562-09d0def993a6?w=1200&q=80`,
      `${U}/photo-1512917774080-9991f1c4c750?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-3',
    coordinates: { lat: 44.5205, lng: 26.1087 },
  },
  {
    id: 'property-8',
    title: '2-Bedroom Apartment in Centru',
    price: 112000,
    city: 'Brașov',
    neighborhood: 'Centru',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 70,
    yearBuilt: 2014,
    description:
      'Charming apartment steps from the famous Black Church and vibrant Piața Sfatului in Brașov\'s historic centre. The property blends period character with modern conveniences — original wood-beam ceilings, a renovated kitchen, and a private cellar. An ideal primary residence or short-term rental benefiting from Brașov\'s strong year-round tourism.',
    photos: [
      `${U}/photo-1568605114967-8130f3a36994?w=1200&q=80`,
      `${U}/photo-1560448204-e02f11c3d0e2?w=1200&q=80`,
      `${U}/photo-1556909114-f6e7ad7d3136?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-4',
    coordinates: { lat: 45.6427, lng: 25.5887 },
  },
  {
    id: 'property-9',
    title: '5-Bedroom Sea View Villa in Mamaia',
    price: 385000,
    city: 'Constanța',
    neighborhood: 'Mamaia',
    type: 'house',
    bedrooms: 5,
    bathrooms: 4,
    area: 290,
    yearBuilt: 2020,
    description:
      'Stunning contemporary villa overlooking the Black Sea in Romania\'s premier coastal resort of Mamaia. The property offers panoramic sea views, a private terrace, outdoor pool, and landscaped garden 200 metres from the beach. Perfect as a luxury summer residence or a high-yield seasonal rental during the busy summer months.',
    photos: [
      `${U}/photo-1600596542815-ffad4c1539a9?w=1200&q=80`,
      `${U}/photo-1570129477492-45c003edd2be?w=1200&q=80`,
      `${U}/photo-1600210492493-0946911123ea?w=1200&q=80`,
      `${U}/photo-1600047509807-ba8f99d2cdde?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-2',
    coordinates: { lat: 44.2469, lng: 28.6344 },
  },
  {
    id: 'property-10',
    title: '3-Bedroom Apartment in Mărăști',
    price: 138000,
    city: 'Cluj-Napoca',
    neighborhood: 'Mărăști',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 90,
    yearBuilt: 2018,
    description:
      'Well-appointed apartment in the popular Mărăști district, renowned for its connectivity and proximity to the Iulius Mall and the major technology company campuses. Two balconies, underground parking, and a practical layout with fully separated living and sleeping quarters. An excellent choice for professionals working in Cluj\'s thriving IT sector.',
    photos: [
      `${U}/photo-1512918728675-ed5a585cf0a1?w=1200&q=80`,
      `${U}/photo-1600566753086-00f18fb6b3ea?w=1200&q=80`,
      `${U}/photo-1484154218962-a197022b5858?w=1200&q=80`,
    ],
    featured: false,
    agentId: 'agent-2',
    coordinates: { lat: 46.7674, lng: 23.5945 },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'James Whitmore',
    role: 'UK Expat, Relocated to Bucharest',
    quote:
      'RoEstate made our relocation from London completely seamless. Their team understood exactly what we needed and found us a wonderful apartment in Dorobanți within two weeks. We could not be more grateful.',
    rating: 5,
    photo: `${U}/photo-1472099645785-5658abf4ff4e?w=200&q=80`,
  },
  {
    id: 't-2',
    name: 'Elif Şahin',
    role: 'Investor from Istanbul',
    quote:
      'As a foreign investor I had many concerns about buying property in Romania. The RoEstate team walked me through every legal step and found a fantastic commercial property in Cluj. Professional and completely trustworthy.',
    rating: 5,
    photo: `${U}/photo-1580489944761-15a19d654956?w=200&q=80`,
  },
  {
    id: 't-3',
    name: 'Dragoș Marinescu',
    role: 'First-Time Buyer, Bucharest',
    quote:
      'I was nervous about buying my first property, but Alexandru was patient and explained everything clearly. The whole process took three months from initial search to receiving the keys. Highly recommended.',
    rating: 5,
    photo: `${U}/photo-1570295999919-56ceb5ecca61?w=200&q=80`,
  },
  {
    id: 't-4',
    name: 'Anna Richter',
    role: 'German Buyer, Brașov Property',
    quote:
      'We bought a holiday apartment in Brașov through RoEstate and were impressed by how smoothly the international purchase went. Elena guided us through the notary process and recommended a reliable local lawyer.',
    rating: 4,
    photo: `${U}/photo-1544005313-94ddf0286df2?w=200&q=80`,
  },
  {
    id: 't-5',
    name: 'Radu Olariu',
    role: 'Property Seller, Cluj-Napoca',
    quote:
      'I listed my apartment with RoEstate and received three serious offers within the first week. Their marketing was excellent — professional photos and strong online presence — and they negotiated a price above my asking. Outstanding service.',
    rating: 5,
    photo: `${U}/photo-1527980965255-d3b416303d12?w=200&q=80`,
  },
];
