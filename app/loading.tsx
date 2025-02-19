export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lapd-primary">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 border-4 border-lapd-secondary rounded-full animate-spin border-t-transparent"></div>
          <h2 className="text-xl font-semibold text-white">West LAPD Yükleniyor...</h2>
        </div>
      </div>
    );
  }