import { useNavigate } from "react-router-dom";

export default function SectionTitle({ children, viewAll }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between mb-6  sm:px-2 md:px-12 lg:px-22">
      <h2 className="sm:text-[12px] sm:px-2 md:text-xl lg:text-2xl text-textDark uppercase font-medium">{children}</h2>
      {viewAll && (
        <button
          type="button"
          onClick={()=>navigate("/womenwear")}
          className="text-[10px] px-1 font-normal sm:text-[10px] sm:mx-4 md:text-[14px] lg:text-base uppercase"
        >
          view all
        </button>

      )}
    </div>
  );
}