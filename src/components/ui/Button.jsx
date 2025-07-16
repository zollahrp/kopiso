import clsx from "clsx";

/**
 * Button reusable Kopiso
 * 
 * Props:
 * - children: Isi text di dalam tombol
 * - className: Tambahan kelas styling
 * - type: "button" | "submit" | "reset"
 * - onClick: Event klik
 */
export default function Button({
  children,
  className = "",
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "inline-block font-semibold rounded-md transition-all duration-200",
        "bg-[#F9C06A] text-[#1E1E1E] hover:brightness-95 active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}
