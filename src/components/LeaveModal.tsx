'use client';

interface LeaveModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LeaveModal({ isOpen, onConfirm, onCancel }: LeaveModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-amber-500/10 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400 text-2xl font-bold">
          !
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">مغادرة المجلس</h3>
          <p className="text-amber-200/80 text-lg">هل تريد حقاً الخروج من المجلس؟</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-lg shadow-red-900/30"
          >
            نعم، خروج
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
