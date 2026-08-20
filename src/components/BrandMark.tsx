export default function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center rounded-lg flex-shrink-0"
      style={{ width: size, height: size, background: 'linear-gradient(135deg, #16a34a, #65a30d)', boxShadow: '0 4px 12px rgba(22,163,74,0.22)' }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <path d="M19.5 3.5C12.5 3.5 6 7.2 6 14.1c0 2.9 1.9 5.1 4.9 5.1 5.7 0 8.6-6.1 8.6-15.7Z" fill="white" fillOpacity="0.96" />
        <path d="M4.5 20c2.8-4.1 6.1-6.8 11.1-9.6" stroke="#15803D" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  )
}
