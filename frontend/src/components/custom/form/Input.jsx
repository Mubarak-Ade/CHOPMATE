export const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="mt-5 w-full">
      {label ? <label className="text-sm font-semibold text-carbon-black">{label}</label> : null}
      <input
        {...props}
        className={`mt-2 w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-carbon-black outline-none placeholder:text-slate-grey/60 ${className}`}
      />
    </div>
  );
};
