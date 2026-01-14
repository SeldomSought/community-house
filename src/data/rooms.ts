/**
 * Room Configuration for Dollhouse Viewer
 *
 * To add/edit rooms:
 * 1. Add images to /static/property-tour/
 * 2. Update this configuration with room details
 *
 * Position (x, z): Grid coordinates where room sits
 * Size (w, d): Width and depth of the room box
 * Floor: 1 = ground floor, 2 = upper floor
 */

export interface RoomConfig {
  id: string;
  name: string;
  floor: 1 | 2;
  position: { x: number; z: number };
  size: { w: number; d: number };
  primaryImage: string;
  images: string[];
  color?: string;
}

export interface AerialConfig {
  id: string;
  name: string;
  images: string[];
}

const BASE_PATH = '/property-tour';

export const rooms: RoomConfig[] = [
  // Floor 1
  {
    id: 'living-dining',
    name: 'Living / Dining',
    floor: 1,
    position: { x: 0, z: 0 },
    size: { w: 4, d: 5 },
    primaryImage: `${BASE_PATH}/de6f8cfc2463cbe2a071a128904d9e49.svg`,
    images: [
      `${BASE_PATH}/de6f8cfc2463cbe2a071a128904d9e49.svg`,
      `${BASE_PATH}/43631d3715527f5e9bd1eedb65a3d078.svg`,
    ],
    color: '#38a169',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    floor: 1,
    position: { x: 4.5, z: 0 },
    size: { w: 3, d: 5 },
    primaryImage: `${BASE_PATH}/27801c178b5e8bc52517d44018bc1833.svg`,
    images: [
      `${BASE_PATH}/27801c178b5e8bc52517d44018bc1833.svg`,
    ],
    color: '#dd6b20',
  },
  {
    id: 'entry-stairs',
    name: 'Entry / Stairs',
    floor: 1,
    position: { x: 0, z: 5.5 },
    size: { w: 3, d: 2.5 },
    primaryImage: `${BASE_PATH}/4ad7b29b1c342128bd55966cdd00324b.svg`,
    images: [
      `${BASE_PATH}/4ad7b29b1c342128bd55966cdd00324b.svg`,
      `${BASE_PATH}/80f8a4991e283f0a67c0301f0bc4380f.svg`,
    ],
    color: '#805ad5',
  },
  // Floor 2
  {
    id: 'bedroom-a',
    name: 'Bedroom A',
    floor: 2,
    position: { x: 0, z: 0 },
    size: { w: 3, d: 3 },
    primaryImage: `${BASE_PATH}/2ca88f1157eb5a63e89b0ee4d40c40c7.svg`,
    images: [
      `${BASE_PATH}/2ca88f1157eb5a63e89b0ee4d40c40c7.svg`,
    ],
    color: '#4a5568',
  },
  {
    id: 'hall-bath',
    name: 'Hall / Bath Entry',
    floor: 2,
    position: { x: 3.2, z: 0 },
    size: { w: 2, d: 2 },
    primaryImage: `${BASE_PATH}/6d4f7b4524666238142221bf044b8f6f.svg`,
    images: [
      `${BASE_PATH}/6d4f7b4524666238142221bf044b8f6f.svg`,
    ],
    color: '#319795',
  },
  {
    id: 'bedroom-b',
    name: 'Bedroom B / Flex',
    floor: 2,
    position: { x: 0, z: 3.2 },
    size: { w: 5.2, d: 3 },
    primaryImage: `${BASE_PATH}/36e6704cbd4f961f01f61f3854339131.svg`,
    images: [
      `${BASE_PATH}/36e6704cbd4f961f01f61f3854339131.svg`,
      `${BASE_PATH}/fb5b608c7e9d97d495e564dc63eab27e.svg`,
    ],
    color: '#3182ce',
  },
];

export const aerial: AerialConfig = {
  id: 'aerial',
  name: 'Site Overview',
  images: [
    `${BASE_PATH}/710830308c8bdcee9710a264e010fc13.svg`,
  ],
};

// Helper to get rooms by floor
export const getRoomsByFloor = (floor: 1 | 2): RoomConfig[] => {
  return rooms.filter(room => room.floor === floor);
};

// Helper to get a room by ID
export const getRoomById = (id: string): RoomConfig | undefined => {
  return rooms.find(room => room.id === id);
};
