import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-full md:w-[48%] lg:w-[360px] min-h-[300px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-white text-richblack-900 shadow-[12px_12px_0px_0px_#FFD60A]"
          : "bg-richblack-800 text-richblack-25 hover:bg-richblack-700 hover:scale-105"
      }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Section */}
      <div className="flex flex-col justify-between h-[80%] border-b border-dashed border-richblack-500 p-6">
        <div>
          <h3
            className={`text-xl font-semibold ${
              isActive ? "text-richblack-900" : "text-richblack-5"
            }`}
          >
            {cardData?.heading}
          </h3>

          <p
            className={`mt-4 text-sm leading-6 ${
              isActive ? "text-richblack-500" : "text-richblack-300"
            }`}
          >
            {cardData?.description}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`flex items-center justify-between px-6 py-4 text-sm font-medium ${
          isActive ? "text-blue-500" : "text-richblack-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <HiUsers className="text-lg" />
          <p>{cardData?.level}</p>
        </div>

        <div className="flex items-center gap-2">
          <ImTree className="text-lg" />
          <p>{cardData?.lessionNumber} Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;