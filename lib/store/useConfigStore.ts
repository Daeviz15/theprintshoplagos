import { create } from 'zustand';
import { configOptions } from '../data/configOptions';

type ConfigState = {
  selectedProduct: string;
  selectedSize: string;
  selectedMaterial: string;
  selectedFinish: string;
  quantity: number;
  
  // Actions
  setProduct: (id: string) => void;
  setSize: (id: string) => void;
  setMaterial: (id: string) => void;
  setFinish: (id: string) => void;
  setQuantity: (qty: number) => void;
  
  // Computed (handled via getter or derived in component, but good to have a helper)
  getTotalPrice: () => number;
};

export const useConfigStore = create<ConfigState>((set, get) => ({
  selectedProduct: 'canvas',
  selectedSize: '16x20',
  selectedMaterial: 'matte',
  selectedFinish: 'none',
  quantity: 1,
  
  setProduct: (id) => set({ selectedProduct: id }),
  setSize: (id) => set({ selectedSize: id }),
  setMaterial: (id) => set({ selectedMaterial: id }),
  setFinish: (id) => set({ selectedFinish: id }),
  setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),
  
  getTotalPrice: () => {
    const state = get();
    const product = configOptions.products.find(p => p.id === state.selectedProduct)?.priceModifier || 0;
    const size = configOptions.sizes.find(s => s.id === state.selectedSize)?.priceModifier || 0;
    const material = configOptions.materials.find(m => m.id === state.selectedMaterial)?.priceModifier || 0;
    const finish = configOptions.finishes.find(f => f.id === state.selectedFinish)?.priceModifier || 0;
    
    return (product + size + material + finish) * state.quantity;
  }
}));
