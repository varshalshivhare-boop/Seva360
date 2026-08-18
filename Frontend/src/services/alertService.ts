import { SafetyAlert, MOCK_ALERTS } from '../data/mockAlerts';

export const alertService = {
  async getAlerts(): Promise<SafetyAlert[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [...MOCK_ALERTS];
  },

  async triggerEmergencySos(data: {
    type: 'medical' | 'police' | 'general' | 'lost_child';
    location: string;
    description: string;
    devoteePhone: string;
  }): Promise<{ success: boolean; alertId: string; estimatedArrival: string }> {
    await new Promise((res) => setTimeout(res, 400));
    const newAlert: SafetyAlert = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      type: data.type === 'medical' ? 'medical' : data.type === 'police' ? 'police' : 'critical',
      title: `EMERGENCY SOS: ${data.type.toUpperCase()}`,
      location: data.location || 'Current Devotee GPS Anchor',
      zone: 'Active Tracking Zone',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      timeAgo: 'Just now',
      status: 'active',
      assignedTeam: 'Rapid Response Medical/Police Unit 1',
      actionRequired: data.description || 'Devotee pressed SOS emergency trigger'
    };
    MOCK_ALERTS.unshift(newAlert);
    return {
      success: true,
      alertId: newAlert.id,
      estimatedArrival: '3 to 5 minutes'
    };
  },

  async resolveAlert(alertId: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 250));
    const item = MOCK_ALERTS.find((a) => a.id === alertId);
    if (item) {
      item.status = 'resolved';
      return true;
    }
    return false;
  }
};
