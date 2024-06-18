import React from "react";

const UserProfile: React.FC = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">This page will grab params from URL</h1>
      <p className="m-2">
        You entered{" "}
        <span className="px-3 mx-2 mt-2 font-semibold text-black bg-gray-500 border-2 border-white rounded-lg">
          {params.id}
        </span>{" "}
        in URL
      </p>
    </div>
  );
};

export default UserProfile;
