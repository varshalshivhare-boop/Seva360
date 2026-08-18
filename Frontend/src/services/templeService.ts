import { Temple, MOCK_TEMPLES } from '../data/mockTemples';

export const templeService = {
  async getTemples(): Promise<Temple[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [...MOCK_TEMPLES];
  },

  async getTempleById(id: string): Promise<Temple | undefined> {
    await new Promise((res) => setTimeout(res, 150));
    return MOCK_TEMPLES.find((t) => t.id === id);
  },

  async searchTemples(query: string, state?: string): Promise<Temple[]> {
    await new Promise((res) => setTimeout(res, 200));
    return MOCK_TEMPLES.filter((t) => {
      const matchesQuery = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.deity.toLowerCase().includes(query.toLowerCase());
      const matchesState = !state || state === 'All States' || t.state === state;
      return matchesQuery && matchesState;
    });
  }
};
