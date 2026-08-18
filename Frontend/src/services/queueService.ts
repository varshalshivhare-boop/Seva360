import { LiveQueueData, MOCK_LIVE_QUEUE } from '../data/mockQueue';

export const queueService = {
  async getLiveQueueStatus(): Promise<LiveQueueData> {
    await new Promise((res) => setTimeout(res, 200));
    return { ...MOCK_LIVE_QUEUE };
  },

  async joinVirtualQueue(_templeId: string, _slotTime: string): Promise<LiveQueueData> {
    await new Promise((res) => setTimeout(res, 300));
    return { ...MOCK_LIVE_QUEUE };
  }
};
