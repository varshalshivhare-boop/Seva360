import React from 'react';
import { MaterialIcon } from '../common/MaterialIcon';

export interface DarshanSlot {
  id: string;
  time: string;
  category: 'Morning' | 'Afternoon' | 'Evening';
  categoryLabel: string;
  availableCapacity: number;
  totalCapacity: number;
  pricePerPerson: number;
  isSpecialAarti?: boolean;
}

export const AVAILABLE_SLOTS: DarshanSlot[] = [
  { id: 's1', time: '06:00 AM - 07:00 AM', category: 'Morning', categoryLabel: 'MANGALA AARTI & DARSHAN', availableCapacity: 42, totalCapacity: 150, pricePerPerson: 300, isSpecialAarti: true },
  { id: 's2', time: '07:30 AM - 08:30 AM', category: 'Morning', categoryLabel: 'PRABHAT DARSHAN', availableCapacity: 85, totalCapacity: 200, pricePerPerson: 100 },
  { id: 's3', time: '09:00 AM - 10:00 AM', category: 'Morning', categoryLabel: 'REGULAR MORNING DARSHAN', availableCapacity: 120, totalCapacity: 250, pricePerPerson: 100 },
  { id: 's4', time: '12:00 PM - 01:00 PM', category: 'Afternoon', categoryLabel: 'RAJBHOG AARTI & DARSHAN', availableCapacity: 60, totalCapacity: 150, pricePerPerson: 250, isSpecialAarti: true },
  { id: 's5', time: '01:30 PM - 02:30 PM', category: 'Afternoon', categoryLabel: 'AFTERNOON SUGAM DARSHAN', availableCapacity: 140, totalCapacity: 200, pricePerPerson: 100 },
  { id: 's6', time: '06:30 PM - 07:30 PM', category: 'Evening', categoryLabel: 'SANDHYA AARTI DARSHAN', availableCapacity: 35, totalCapacity: 150, pricePerPerson: 300, isSpecialAarti: true },
  { id: 's7', time: '08:00 PM - 09:00 PM', category: 'Evening', categoryLabel: 'NIGHT SHAYAN AARTI', availableCapacity: 90, totalCapacity: 200, pricePerPerson: 100 }
];

interface BookingSlotPickerProps {
  selectedSlotId: string;
  onSelectSlot: (slot: DarshanSlot) => void;
}

export const BookingSlotPicker: React.FC<BookingSlotPickerProps> = ({ selectedSlotId, onSelectSlot }) => {
  const categories: ('Morning' | 'Afternoon' | 'Evening')[] = ['Morning', 'Afternoon', 'Evening'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {categories.map((cat) => {
        const catSlots = AVAILABLE_SLOTS.filter((s) => s.category === cat);
        return (
          <div key={cat}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <MaterialIcon
                name={cat === 'Morning' ? 'wb_sunny' : cat === 'Afternoon' ? 'light_mode' : 'bedtime'}
                size={18}
                style={{ color: 'var(--hm-secondary)' }}
              />
              <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--hm-on-surface)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {cat} Slots
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {catSlots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                const capacityPercent = Math.round((slot.availableCapacity / slot.totalCapacity) * 100);

                return (
                  <div
                    key={slot.id}
                    onClick={() => onSelectSlot(slot)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: isSelected ? 'var(--hm-surface-container)' : 'var(--hm-surface-container-lowest)',
                      border: isSelected ? '2px solid var(--hm-primary)' : '1px solid var(--hm-outline-variant)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 16px rgba(87, 0, 0, 0.08)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: isSelected ? 'var(--hm-primary)' : 'var(--hm-on-surface)' }}>
                        {slot.time}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--hm-primary)' }}>
                        ₹{slot.pricePerPerson}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--hm-on-surface-variant)', fontWeight: 600, marginBottom: '0.6rem' }}>
                      {slot.categoryLabel}
                    </div>

                    {/* Capacity Indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--hm-on-surface-variant)' }}>
                      <span>Available: {slot.availableCapacity} slots</span>
                      <span style={{ color: capacityPercent < 30 ? 'var(--hm-error)' : 'var(--hm-success)', fontWeight: 600 }}>
                        {capacityPercent < 30 ? 'Fast Filling' : 'Available'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
