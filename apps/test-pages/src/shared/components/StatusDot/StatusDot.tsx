const StatusDot = ({ className, status }: { className?: string; status: 0 | 1 | 2 }) => {
  return (
    <span
      className={`absolute bottom-0 right-0 rounded-full border-2 border-white h-4 w-4 ${
        status === 1 ? "bg-green-500" : status === 2 ? "bg-yellow-500" : "bg-slate-400"
      } ${className}`}
    />
  );
};

export default StatusDot;
