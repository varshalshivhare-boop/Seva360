import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { TempleCard } from '../../components/devotee/TempleCard';
import { templeService } from '../../services/templeService';
import { Temple } from '../../data/mockTemples';
import { ROUTES } from '../../config/routes';

export const TemplesDirectoryPage: React.FC = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const navigate = useNavigate();

  useEffect(() => {
    templeService.searchTemples(searchQuery, selectedState).then(setTemples);
  }, [searchQuery, selectedState]);

  const stateOptions = ['All States', 'Gujarat', 'Uttar Pradesh', 'Uttarakhand', 'Tamil Nadu'];

  const handleSelectTemple = (_temple: Temple) => {
    navigate(ROUTES.DEVOTEE.BOOK_DARSHAN);
  };

  return (
    <div className="hm-container">
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--hm-secondary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Pilgrimage Explorer
        </span>
        <h1 className="hm-header-title">Discover Divine Destinations</h1>
        <p className="hm-subtext">Real-time crowd intelligence, darshan slots, and Vedic rituals across India.</p>
      </div>

      {/* Search & State Filter Bar */}
      <div
        className="ambient-card"
        style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1, minWidth: '260px' }}>
          <div className="hm-input-with-icon">
            <MaterialIcon name="search" size={20} className="input-icon" />
            <input
              type="text"
              className="hm-input"
              placeholder="Search by temple, deity, or holy city (Somnath, Dwarka, Kashi...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* State Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {stateOptions.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedState(st)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                border: selectedState === st ? '1px solid var(--hm-primary)' : '1px solid var(--hm-outline-variant)',
                backgroundColor: selectedState === st ? 'var(--hm-primary-fixed)' : 'transparent',
                color: selectedState === st ? 'var(--hm-primary)' : 'var(--hm-on-surface)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Temples Grid */}
      <div className="hm-grid-3" style={{ gap: '1.75rem' }}>
        {temples.map((temple) => (
          <TempleCard key={temple.id} temple={temple} onSelect={handleSelectTemple} />
        ))}
      </div>
    </div>
  );
};
