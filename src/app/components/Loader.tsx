import React from "react";
import { ClockLoader } from "react-spinners";

interface Props {
  loading: boolean;
}

const Loader: React.FC<Props> = ({ loading }) => {
  if (!loading) return;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <ClockLoader size={58} color={"#000000"} />
    </div>
  );
};

export default Loader;
