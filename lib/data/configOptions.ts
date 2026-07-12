export type ConfigOption = {
  id: string;
  name: string;
  priceModifier: number;
  image?: string;
  description?: string;
};

export type ProductConfig = {
  products: ConfigOption[];
  sizes: ConfigOption[];
  materials: ConfigOption[];
  finishes: ConfigOption[];
};

export const configOptions: ProductConfig = {
  products: [
    { id: 'canvas', name: 'Canvas Print', priceModifier: 150 },
    { id: 'framed', name: 'Framed Fine Art', priceModifier: 200 },
    { id: 'poster', name: 'Premium Poster', priceModifier: 50 },
    { id: 'acrylic', name: 'Acrylic Print', priceModifier: 250 },
  ],
  sizes: [
    { id: '8x10', name: '8" x 10"', priceModifier: 0 },
    { id: '16x20', name: '16" x 20"', priceModifier: 40 },
    { id: '24x36', name: '24" x 36"', priceModifier: 90 },
    { id: '30x40', name: '30" x 40"', priceModifier: 150 },
  ],
  materials: [
    { id: 'matte', name: 'Standard Matte', priceModifier: 0 },
    { id: 'archival', name: 'Archival Museum', priceModifier: 60 },
    { id: 'baryta', name: 'Baryta Gloss', priceModifier: 40 },
  ],
  finishes: [
    { id: 'none', name: 'No Frame (Rolled)', priceModifier: 0 },
    { id: 'black_wood', name: 'Black Wood Frame', priceModifier: 80 },
    { id: 'oak', name: 'Natural Oak Frame', priceModifier: 100 },
    { id: 'gallery_wrap', name: 'Gallery Wrap (1.5")', priceModifier: 50 },
  ]
};
