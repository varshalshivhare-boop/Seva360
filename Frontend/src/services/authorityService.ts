import { MOCK_AUTHORITY_DATA, ZoneMetric, StaffDeployment } from '../data/mockAuthority';

export const authorityService = {
  async getDashboardMetrics() {
    await new Promise((res) => setTimeout(res, 200));
    return { ...MOCK_AUTHORITY_DATA };
  },

  async getZoneAnalytics(): Promise<ZoneMetric[]> {
    await new Promise((res) => setTimeout(res, 150));
    return [...MOCK_AUTHORITY_DATA.zones];
  },

  async getStaffDeployments(): Promise<StaffDeployment[]> {
    await new Promise((res) => setTimeout(res, 150));
    return [...MOCK_AUTHORITY_DATA.staff];
  },

  async dispatchStaffToZone(staffId: string, targetZone: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 300));
    const s = MOCK_AUTHORITY_DATA.staff.find((st) => st.id === staffId);
    if (s) {
      s.zone = targetZone;
      s.status = 'Dispatched';
      return true;
    }
    return false;
  }
};
