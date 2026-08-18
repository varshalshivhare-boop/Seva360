import React, { useState } from 'react';
import { MaterialIcon } from '../common/MaterialIcon';
import { paymentService, PaymentReceipt } from '../../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAmount?: number;
  defaultSeva?: string;
  onPaymentSuccess?: (receipt: PaymentReceipt) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  defaultAmount = 250,
  defaultSeva = 'VIP Special Darshan Pass',
  onPaymentSuccess,
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [sevaType, setSevaType] = useState<string>(defaultSeva);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  // Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!isOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const res = await paymentService.processPayment({
        amount,
        sevaType,
        paymentMethod,
      });

      setTimeout(() => {
        setIsProcessing(false);
        setReceipt(res.receipt);
        if (onPaymentSuccess) {
          onPaymentSuccess(res.receipt);
        }
      }, 1200);
    } catch (err) {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl shadow-amber-500/10 text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MaterialIcon name="account_balance_wallet" size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-amber-400">Divine Payment & Seva Booking</h3>
              <p className="text-xs text-slate-400">Instant UPI & E-Receipt Confirmation</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <MaterialIcon name="close" size={18} />
          </button>
        </div>

        {/* Modal Content */}
        {!receipt ? (
          <div className="p-6 space-y-6">
            
            {/* Seva Type & Preset Amounts */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select Seva / Contribution
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'VIP Pass', price: 250, seva: 'VIP Special Darshan Pass' },
                  { label: 'Abhishekam', price: 501, seva: 'Special Abhishekam Seva' },
                  { label: 'Annadanam', price: 1008, seva: 'Mahaprasadam Annadanam' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setAmount(item.price);
                      setSevaType(item.seva);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      amount === item.price && sevaType === item.seva
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-xs text-slate-400">{item.label}</div>
                    <div className="text-base font-bold">₹{item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-bold text-lg">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-slate-100 font-bold text-lg focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: 'qr_code_scanner' },
                  { id: 'card', label: 'Card', icon: 'credit_card' },
                  { id: 'netbanking', label: 'Net Banking', icon: 'account_balance' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setPaymentMethod(mode.id as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      paymentMethod === mode.id
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <MaterialIcon name={mode.icon} size={22} />
                    <span className="text-xs mt-1">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Payment Method View */}
            {paymentMethod === 'upi' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white p-2 rounded-lg flex items-center justify-center">
                    {/* Simulated QR Code */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=darshan360@upi%26pn=Darshan360%26am=${amount}%26cu=INR`}
                      alt="UPI QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Scan & Pay with any UPI App</div>
                    <div className="text-xs text-amber-400/80 font-mono mt-0.5">UPI ID: darshan360@upi</div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 font-medium">GPay</span>
                      <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 font-medium">PhonePe</span>
                      <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 font-medium">Paytm</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number (e.g. 4532 •••• •••• 8912)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="grid grid-cols-2 gap-2">
                {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    className="p-2.5 text-xs bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-xl text-slate-300 hover:text-amber-400 text-left font-medium transition-colors"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}

            {/* Submit Pay Button */}
            <button
              type="button"
              disabled={isProcessing || amount <= 0}
              onClick={handlePay}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <MaterialIcon name="lock" size={20} />
                  <span>Pay ₹{amount} Securely</span>
                </>
              )}
            </button>

          </div>
        ) : (
          /* Receipt Confirmation View */
          <div className="p-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <MaterialIcon name="check_circle" size={36} />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-100">Payment Successful!</h4>
              <p className="text-xs text-slate-400 mt-1">Your Darshan & Seva booking is confirmed.</p>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Transaction ID</span>
                <span className="font-mono text-amber-400 font-bold">{receipt.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seva / Pass</span>
                <span className="text-slate-200 font-semibold">{receipt.sevaType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid</span>
                <span className="text-emerald-400 font-bold">₹{receipt.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Mode</span>
                <span className="text-slate-300 font-medium">{receipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time</span>
                <span className="text-slate-400 text-xs">{new Date(receipt.paidAt).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold transition-colors"
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
