export interface ZoneMetric {
  id: string;
  name: string;
  code: string;
  currentCount: number;
  maxCapacity: number;
  densityPercentage: number;
  status: 'Normal' | 'Moderate' | 'Critical';
  avgFlowRate: string; // e.g. "82/min"
}

export interface StaffDeployment {
  id: string;
  name: string;
  role: string;
  zone: string;
  status: 'On Duty' | 'Dispatched' | 'On Break';
  batteryOrSignal?: string;
}

export const MOCK_AUTHORITY_DATA = {
  kpis: {
    totalDevoteesToday: 42890,
    currentFootfall: 14250,
    currentFootfallChange: '+12%',
    activeDensityPercent: 88,
    activeDensityStatus: 'Surge Warning',
    averageWaitMinutes: 38,
    averageWaitChange: '+5m',
    criticalIncidentsCount: 3,
    entryThroughputPerMin: 140,
    exitThroughputPerMin: 125,
  },
  zones: [
    { id: 'z1', name: 'Inner Sanctum (Garbhagriha)', code: 'Zone 1', currentCount: 450, maxCapacity: 500, densityPercentage: 90, status: 'Critical', avgFlowRate: '45/min' },
    { id: 'z2', name: 'Mahamandapa & Inner Queues', code: 'Zone 2', currentCount: 2200, maxCapacity: 2800, densityPercentage: 78, status: 'Moderate', avgFlowRate: '120/min' },
    { id: 'z3', name: 'South & North Holding Courtyards', code: 'Zone 3', currentCount: 3400, maxCapacity: 4500, densityPercentage: 75, status: 'Moderate', avgFlowRate: '160/min' },
    { id: 'z4', name: 'Main East Gopuram Entry & Security', code: 'Zone 4', currentCount: 1800, maxCapacity: 2000, densityPercentage: 90, status: 'Critical', avgFlowRate: '140/min' },
    { id: 'z5', name: 'Pradakshina Path & Outer Periphery', code: 'Zone 5', currentCount: 1200, maxCapacity: 3000, densityPercentage: 40, status: 'Normal', avgFlowRate: '95/min' }
  ] as ZoneMetric[],
  staff: [
    { id: 'st-1', name: 'Inspector R. Verma', role: 'Police Rapid Command', zone: 'Zone 4 (East Gate)', status: 'On Duty', batteryOrSignal: '98%' },
    { id: 'st-2', name: 'Dr. S. Nair', role: 'Chief Medical Officer', zone: 'Medical Bay 2', status: 'Dispatched', batteryOrSignal: '95%' },
    { id: 'st-3', name: 'K. Patel', role: 'Crowd Controller Lead', zone: 'Zone 2 (Mandapa)', status: 'On Duty', batteryOrSignal: '89%' },
    { id: 'st-4', name: 'Volunteer Squad 4', role: 'Hydration & Elderly Assist', zone: 'Zone 3 (Courtyard)', status: 'On Duty', batteryOrSignal: '100%' }
  ] as StaffDeployment[]
};
