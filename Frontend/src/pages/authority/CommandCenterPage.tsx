import React, { useState, useEffect } from 'react';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { KpiMetricCard } from '../../components/authority/KpiMetricCard';
import { ZoneHeatmap } from '../../components/authority/ZoneHeatmap';
import { AlertFeedItem } from '../../components/authority/AlertFeedItem';
import { authorityService } from '../../services/authorityService';
import { alertService } from '../../services/alertService';
import { SafetyAlert } from '../../data/mockAlerts';
import { ZoneMetric, StaffDeployment } from '../../data/mockAuthority';

export const CommandCenterPage: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [zones, setZones] = useState<ZoneMetric[]>([]);
  const [staff, setStaff] = useState<StaffDeployment[]>([]);
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);

  useEffect(() => {
    authorityService.getDashboardMetrics().then((data) => {
      setMetrics(data.kpis);
      setZones(data.zones);
      setStaff(data.staff);
    });
    alertService.getAlerts().then(setAlerts);
  }, []);

  const handleDispatch = async (alertId: string) => {
    await alertService.resolveAlert(alertId);
    alertService.getAlerts().then(setAlerts);
  };

  if (!metrics) return null;

  return (
    <div>
      {/* Top Header Information */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.6rem', color: '#ffffff' }}>
            Unified Pilgrimage Command Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#9d98a8' }}>
            Somnath & Jagat Mandir Zone Surveillance • Real-Time AI Computer Vision Tracking
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            style={{
              backgroundColor: '#22202a',
              border: '1px solid #363242',
              color: '#e5c378',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <MaterialIcon name="tune" size={16} />
            <span>Pacing Parameters</span>
          </button>
          <button
            type="button"
            style={{
              backgroundColor: 'var(--hm-error)',
              border: 'none',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <MaterialIcon name="emergency" size={16} />
            <span>Broadcast Alert</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }} className="kpi-grid">
        <KpiMetricCard
          title="Total Footfall Today"
          value={metrics.totalDevoteesToday}
          change="+14% vs avg"
          subtext="pacing on track"
          icon="groups"
        />
        <KpiMetricCard
          title="Active Crowd Density"
          value={`${metrics.activeDensityPercent}%`}
          change="Surge Alert"
          subtext="Mandapa Zone 4"
          icon="radar"
          accentColor="#ef4444"
        />
        <KpiMetricCard
          title="Avg Queue Wait Time"
          value={`${metrics.averageWaitMinutes}m`}
          change="+5m"
          subtext="peak slot"
          icon="hourglass_empty"
          accentColor="#f59e0b"
        />
        <KpiMetricCard
          title="Turnstile Throughput"
          value={`${metrics.entryThroughputPerMin}/m`}
          change="Optimal"
          subtext="Gate 2 & 4 active"
          icon="trending_up"
          accentColor="#10b981"
        />
      </div>

      {/* Main Command Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', alignItems: 'flex-start' }} className="command-grid">
        {/* Left Column: Zone Heatmap & CCTV Feeds */}
        <div>
          <ZoneHeatmap zones={zones} />

          {/* CCTV Feed Simulation */}
          <div
            style={{
              backgroundColor: '#18171f',
              border: '1px solid #2d2938',
              borderRadius: '0.6rem',
              padding: '1.25rem',
              marginTop: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MaterialIcon name="videocam" size={20} style={{ color: '#ef4444' }} />
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1rem', color: '#f3f0ea' }}>
                  AI Computer Vision Feed (YOLOv8 + DeepSORT)
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 600 }}>Cam 04 • Mandapa East</span>
            </div>

            <div
              style={{
                position: 'relative',
                height: '240px',
                backgroundColor: '#0a0a0d',
                borderRadius: '0.5rem',
                border: '1px solid #2d2938',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_NOblqxub7pX6VSALz85lvJ-7V0bf8_4EaDoLcYrQPF-8JKAM93MeZomhnWsB0QjCHQ_6d3T8ASy3hd1lspuEYrFdqn6I2M15aGmzFMjuaC7-8o1Yuz-a8GYYvbjpKHA4OXb3sgQ2LRZNzZ-mERw-glaWmCOm4zEBH95JKrJIgsnjNdkTgm2EVKhtc3zqfAdIunEWSBFlGi2hSAph-8Yp3AD_CC7mx-J9M21YGY2MaTLKUQezowBJxw"
                alt="CCTV Mandapa Stream"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />

              {/* Bounding Box Visual Overlays */}
              <div
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '35%',
                  width: '90px',
                  height: '110px',
                  border: '2px solid #4ade80',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(74, 222, 128, 0.15)'
                }}
              >
                <span style={{ position: 'absolute', top: '-18px', left: '0', backgroundColor: '#4ade80', color: '#000', fontSize: '0.65rem', fontWeight: 800, padding: '0 4px' }}>
                  PILGRIM 98%
                </span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '30%',
                  right: '25%',
                  width: '80px',
                  height: '100px',
                  border: '2px solid #f59e0b',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)'
                }}
              >
                <span style={{ position: 'absolute', top: '-18px', left: '0', backgroundColor: '#f59e0b', color: '#000', fontSize: '0.65rem', fontWeight: 800, padding: '0 4px' }}>
                  DENSITY 84%
                </span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  color: '#fff'
                }}
              >
                FPS: 29.8 • Headcount in Frame: 48 Devotees
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alert Feed & Staff Allocation */}
        <div>
          {/* Live Incident Alerts Feed */}
          <div
            style={{
              backgroundColor: '#18171f',
              border: '1px solid #2d2938',
              borderRadius: '0.6rem',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MaterialIcon name="notifications_active" size={20} style={{ color: '#ef4444' }} />
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1rem', color: '#f3f0ea' }}>
                  Real-Time Incident Feed
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 700 }}>{alerts.filter(a => a.status === 'active').length} Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {alerts.map((alert) => (
                <AlertFeedItem key={alert.id} alert={alert} onDispatch={handleDispatch} />
              ))}
            </div>
          </div>

          {/* Staff Deployments Table */}
          <div
            style={{
              backgroundColor: '#18171f',
              border: '1px solid #2d2938',
              borderRadius: '0.6rem',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MaterialIcon name="badge" size={20} style={{ color: '#e5c378' }} />
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1rem', color: '#f3f0ea' }}>
                  On-Ground Responders
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#9d98a8' }}>{staff.length} Units</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {staff.map((st) => (
                <div
                  key={st.id}
                  style={{
                    backgroundColor: '#121118',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#f3f0ea' }}>{st.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9d98a8' }}>{st.role} • {st.zone}</div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.4rem',
                      borderRadius: '3px',
                      backgroundColor: st.status === 'On Duty' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: st.status === 'On Duty' ? '#4ade80' : '#f59e0b'
                    }}
                  >
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .command-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
