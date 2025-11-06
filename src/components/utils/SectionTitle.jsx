// SectionTitle.jsx
export default function SectionTitle({ children, viewAll }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl md:text-xl text-textDark uppercase font-medium">{children}</h2>
      {viewAll && (
        <a href="#" className="text-xl md:text-sm font-medium">
          VIEW ALL
        </a>
      )}
    </div>
  );
}