export default function Loading() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-[#714b67]/20 rounded-full flex items-center justify-center">
          <svg className="w-16 h-16 text-[#714b67] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 