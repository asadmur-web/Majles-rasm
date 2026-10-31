'use client';

interface Player {
  id: string;
  name: string;
}

interface VotingModalProps {
  isOpen: boolean;
  onVote: (targetId: string) => void;
  onClose: () => void;
  players: Player[];
  currentPlayerId: string;
}

export default function VotingModal({ isOpen, onVote, onClose, players, currentPlayerId }: VotingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-700">
        <h2 className="text-2xl font-bold text-amber-400 mb-4 text-center">التصويت</h2>
        <p className="text-slate-300 text-center mb-6">اختر اللاعب الذي تعتقد أنه مزور</p>
        
        <div className="space-y-2 mb-6">
          {players
            .filter(p => p.id !== currentPlayerId)
            .map(player => (
              <button
                key={player.id}
                onClick={() => onVote(player.id)}
                className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-right transition border border-slate-700 hover:border-amber-500"
              >
                {player.name}
              </button>
            ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
