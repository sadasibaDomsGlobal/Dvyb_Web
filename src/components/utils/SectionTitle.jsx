// SectionTitle.jsx
export default function SectionTitle({ children, viewAll }) {
  return (
    <div className="flex items-center justify-between mb-6  sm:px-2 md:px-12 lg:px-22">
      <h2 className="sm:text-[12px] sm:px-2 md:text-xl lg:text-2xl text-textDark uppercase font-medium">{children}</h2>
      {viewAll && (
        <button type="button" className="sm:text-[8px] !sm:px-6 md:text-[14px] lg:text-base font-medium sm:font-normal">
          VIEW ALL
        </button>
      )}
    </div>
  );
}