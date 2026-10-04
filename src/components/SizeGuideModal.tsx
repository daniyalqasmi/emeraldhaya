import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeTable = [
    { size: '50', height: "4'10\" - 5'0\" (147-152 cm)", lengthIn: '50"', bustIn: '40"-42"', sleeveIn: '26"' },
    { size: '52', height: "5'1\" - 5'2\" (153-157 cm)", lengthIn: '52"', bustIn: '42"-44"', sleeveIn: '27"' },
    { size: '54', height: "5'3\" - 5'4\" (158-162 cm)", lengthIn: '54"', bustIn: '44"-46"', sleeveIn: '28"' },
    { size: '56', height: "5'5\" - 5'6\" (163-168 cm)", lengthIn: '56"', bustIn: '46"-48"', sleeveIn: '28.5"' },
    { size: '58', height: "5'7\" - 5'8\" (169-173 cm)", lengthIn: '58"', bustIn: '48"-50"', sleeveIn: '29"' },
    { size: '60', height: "5'9\" - 6'0\" (174-183 cm)", lengthIn: '60"', bustIn: '50"-52"', sleeveIn: '29.5"' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-white border border-[#D4AF37]/40 shadow-2xl rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Ruler className="w-6 h-6 text-[#006B5B]" />
          <h2 className="font-serif text-2xl font-bold text-[#111111]">Emerald Haya Abaya Sizing Guide</h2>
        </div>
        <p className="text-xs text-neutral-600 mb-6">
          Abaya sizes are determined by the garment length in inches (from high shoulder point to floor).
          If you plan to wear high heels, we recommend ordering one size longer.
        </p>

        {/* Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#01453D] text-[#D4AF37] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Recommended Height</th>
                <th className="py-3 px-3">Garment Length</th>
                <th className="py-3 px-3">Bust Range</th>
                <th className="py-3 px-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {sizeTable.map((row, idx) => (
                <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FDFBF7]'}>
                  <td className="py-2.5 px-3 font-bold text-[#006B5B] font-mono">{row.size}</td>
                  <td className="py-2.5 px-3 font-medium text-neutral-800">{row.height}</td>
                  <td className="py-2.5 px-3 text-neutral-600 font-mono tabular-nums">{row.lengthIn}</td>
                  <td className="py-2.5 px-3 text-neutral-600 font-mono tabular-nums">{row.bustIn}</td>
                  <td className="py-2.5 px-3 text-neutral-600 font-mono tabular-nums">{row.sleeveIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advice Points */}
        <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
            <span><strong>Bespoke Tailoring:</strong> Need a custom length or altered sleeves? Mention your exact height and shoulder width in Order Notes or on WhatsApp.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
            <span><strong>Modest Cut:</strong> Our pieces are cut with a generous A-line silhouette to guarantee graceful modesty and comfortable movement.</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
