export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
          مجلس Canvas
        </h1>
        <h2 className="text-3xl text-white/80">لوحة المجلس</h2>
        <div className="space-y-4">
          <button className="w-full max-w-md py-4 px-8 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl transition">
            إنشاء غرفة
          </button>
          <button className="w-full max-w-md py-4 px-8 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition border border-slate-700">
            انضم برمز
          </button>
        </div>
      </div>
    </div>
  )
}
