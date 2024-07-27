import { Link } from "react-router-dom";

export interface OptionsProps {
  image: string;
  title: string;
  to: string;
}

export default function OptionsButton(props: OptionsProps) {
  const { image, title, to } = props;
  return (
    <Link
      to={to}
      className="px-4 py-6 text-left rounded-lg bg-white hover:shadow-xl focus:shadow-xl duration-150"
    >
      <div className="">
        <img className="h-6 w-6 " src={image} alt="image1" />
        <p className="font-semibold text-xs mt-3">{title}</p>
      </div>
    </Link>
  );
}
