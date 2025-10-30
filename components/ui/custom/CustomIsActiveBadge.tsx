export interface isActiveBadgeProps {
  params: true | false;
  className?: any;
}

const CustomIsActiveBadge = ({ params, className }: isActiveBadgeProps) => {
  return (
    <span
      className={`${className} px-2 py-1 text-xs font-medium ${
        params ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {params ? "Active" : "Inactive"}
    </span>
  );
};

export default CustomIsActiveBadge;
