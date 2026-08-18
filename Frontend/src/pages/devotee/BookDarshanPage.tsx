import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { BookingSlotPicker, AVAILABLE_SLOTS, DarshanSlot } from '../../components/devotee/BookingSlotPicker';
import { PaymentModal } from '../../components/devotee/PaymentModal';
import { templeService } from '../../services/templeService';
import { bookingService } from '../../services/bookingService';
import { Temple } from '../../data/mockTemples';
import { DevoteeMember } from '../../data/mockBookings';
import { ROUTES } from '../../config/routes';

export const BookDarshanPage: React.FC = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [selectedTempleId, setSelectedTempleId] = useState<string>('kashi-vishwanath');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-22');
  const [selectedSlot, setSelectedSlot] = useState<DarshanSlot>(AVAILABLE_SLOTS[0]);
  const [devotees, setDevotees] = useState<DevoteeMember[]>([
    { id: 'dev-1', name: 'Arjun Sharma', age: 34, gender: 'Male', idType: 'Aadhaar', idNumber: 'XXXX-XXXX-4521' }
  ]);
  const [priorityType, setPriorityType] = useState<'Standard' | 'Senior' | 'Accessible' | 'VIP'>('Standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    templeService.getTemples().then((list) => {
      setTemples(list);
      if (list.length > 0) setSelectedTempleId(list[0].id);
    });
  }, []);

  const selectedTemple = temples.find((t) => t.id === selectedTempleId) || temples[0];

  const handleAddMember = () => {
    const newMember: DevoteeMember = {
      id: `dev-${Date.now()}`,
      name: '',
      age: 30,
      gender: 'Male',
      idType: 'Aadhaar',
      idNumber: ''
    };
    setDevotees([...devotees, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    if (devotees.length > 1) {
      setDevotees(devotees.filter((d) => d.id !== id));
    }
  };

  const handleUpdateMember = (id: string, field: keyof DevoteeMember, val: string | number | boolean) => {
    setDevotees(
      devotees.map((d) => (d.id === id ? { ...d, [field]: val } : d))
    );
  };

  const totalAmount = (selectedSlot?.pricePerPerson || 100) * devotees.length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentOpen(true);
  };

  const handleFinalBookingAfterPayment = async () => {
    setIsSubmitting(true);
    try {
      await bookingService.createBooking({
        templeId: selectedTempleId,
        templeName: selectedTemple?.name || 'Sacred Temple',
        sevaName: selectedSlot.categoryLabel,
        date: selectedDate,
        slotTime: selectedSlot.time,
        priorityType,
        devotees,
        totalAmount
      });
      navigate(ROUTES.DEVOTEE.VIRTUAL_QUEUE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hm-container">
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--hm-secondary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Darshan & Seva Scheduling
        </span>
        <h1 className="hm-header-title">Book Your Darshan</h1>
        <p className="hm-subtext">Reserve your virtual queuing pass and sacred rituals.</p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }} className="booking-layout-grid">
          {/* Left Column: Form Steps */}
          <div>
            {/* Step 1: Select Temple & Date */}
            <div className="ambient-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--hm-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                  1
                </span>
                <h3 className="hm-section-title">Select Temple & Date</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }} className="temple-date-grid">
                <div className="hm-input-group">
                  <label className="hm-label">Sacred Temple Destination</label>
                  <select
                    className="hm-input"
                    value={selectedTempleId}
                    onChange={(e) => setSelectedTempleId(e.target.value)}
                  >
                    {temples.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hm-input-group">
                  <label className="hm-label">Date of Visit</label>
                  <input
                    type="date"
                    className="hm-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Time Slot Picker */}
            <div className="ambient-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--hm-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                  2
                </span>
                <h3 className="hm-section-title">Select Darshan Time Slot</h3>
              </div>

              <BookingSlotPicker
                selectedSlotId={selectedSlot.id}
                onSelectSlot={(s) => setSelectedSlot(s)}
              />
            </div>

            {/* Step 3: Devotee & Priority Details */}
            <div className="ambient-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--hm-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                    3
                  </span>
                  <h3 className="hm-section-title">Devotee Details ({devotees.length})</h3>
                </div>

                <button
                  type="button"
                  onClick={handleAddMember}
                  className="btn-hm-secondary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  <MaterialIcon name="person_add" size={16} />
                  <span>+ Add Family Member</span>
                </button>
              </div>

              {/* Priority Category Selection */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--hm-surface-container-low)', borderRadius: '0.5rem' }}>
                <label className="hm-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Special Priority & Accessibility Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {[
                    { key: 'Standard', label: 'Standard Pass', icon: 'person' },
                    { key: 'Senior', label: 'Senior Citizen (60+ yrs)', icon: 'elderly' },
                    { key: 'Accessible', label: 'Differently Abled / Wheelchair', icon: 'accessible' },
                    { key: 'VIP', label: 'Sugam Fast Track', icon: 'workspace_premium' }
                  ].map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setPriorityType(p.key as any)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.85rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: priorityType === p.key ? '2px solid var(--hm-primary)' : '1px solid var(--hm-outline-variant)',
                        backgroundColor: priorityType === p.key ? 'var(--hm-primary-fixed)' : '#fff',
                        color: priorityType === p.key ? 'var(--hm-primary)' : 'var(--hm-on-surface)',
                        cursor: 'pointer'
                      }}
                    >
                      <MaterialIcon name={p.icon} size={16} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Member input forms */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {devotees.map((dev, idx) => (
                  <div
                    key={dev.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--hm-surface-container-lowest)',
                      border: '1px solid var(--hm-outline-variant)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--hm-primary)' }}>
                        Devotee #{idx + 1} {idx === 0 ? '(Primary Pilgrim)' : ''}
                      </span>
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(dev.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--hm-error)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}
                        >
                          <MaterialIcon name="delete" size={16} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }} className="member-inputs-grid">
                      <input
                        type="text"
                        className="hm-input"
                        placeholder="Full Name"
                        value={dev.name}
                        onChange={(e) => handleUpdateMember(dev.id, 'name', e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        className="hm-input"
                        placeholder="Age"
                        value={dev.age || ''}
                        onChange={(e) => handleUpdateMember(dev.id, 'age', parseInt(e.target.value) || 0)}
                        required
                      />
                      <select
                        className="hm-input"
                        value={dev.gender}
                        onChange={(e) => handleUpdateMember(dev.id, 'gender', e.target.value as any)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div className="ambient-card" style={{ padding: '1.75rem', boxShadow: '0 8px 32px rgba(87,0,0,0.08)' }}>
              <h3 className="hm-section-title" style={{ marginBottom: '1.25rem' }}>Booking Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', borderBottom: '1px solid var(--hm-surface-container-high)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--hm-on-surface-variant)' }}>Temple</span>
                  <span style={{ fontWeight: 700, color: 'var(--hm-on-surface)', textAlign: 'right' }}>{selectedTemple?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--hm-on-surface-variant)' }}>Date</span>
                  <span style={{ fontWeight: 600 }}>{selectedDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--hm-on-surface-variant)' }}>Slot Timing</span>
                  <span style={{ fontWeight: 700, color: 'var(--hm-primary)' }}>{selectedSlot?.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--hm-on-surface-variant)' }}>Seva Tier</span>
                  <span style={{ fontWeight: 600 }}>{selectedSlot?.categoryLabel}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--hm-on-surface-variant)' }}>Priority Class</span>
                  <span style={{ fontWeight: 600, color: 'var(--hm-secondary)' }}>{priorityType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--hm-on-surface-variant)' }}>Devotees</span>
                  <span style={{ fontWeight: 600 }}>{devotees.length} Person(s)</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1.1rem' }}>Total Contribution</span>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--hm-primary)' }}>
                  ₹{totalAmount}
                </span>
              </div>

              <button
                type="submit"
                className="btn-hm-primary"
                disabled={isSubmitting}
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              >
                <span>{isSubmitting ? 'Processing Payment...' : `Proceed to Pay (₹${totalAmount})`}</span>
                <MaterialIcon name="payments" size={20} />
              </button>

              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--hm-on-surface-variant)' }}>
                Secure UPI, Credit Card & Net Banking checkout.
              </div>
            </div>
          </div>
        </div>
      </form>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        defaultAmount={totalAmount}
        defaultSeva={selectedSlot?.categoryLabel || 'VIP Darshan Pass'}
        onPaymentSuccess={handleFinalBookingAfterPayment}
      />

      <style>{`
        @media (max-width: 960px) {
          .booking-layout-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .temple-date-grid, .member-inputs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
