import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-2 text-richblack-5">
      <h1 className="mb-10 text-4xl font-bold tracking-wide">
        My Profile
      </h1>

      {/* Section 1 */}
      <div className="flex flex-col gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg transition-all duration-300 hover:border-yellow-50 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="h-24 w-24 rounded-full border-2 border-yellow-50 object-cover shadow-lg"
          />

          <div className="space-y-2">
            <p className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-base text-richblack-300">
              {user?.email}
            </p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* Section 2 */}
      <div className="mt-8 rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg transition-all duration-300 hover:border-yellow-50">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xl font-semibold">
            About
          </p>

          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          />
        </div>

        <p className="leading-8 text-richblack-300">
          {user?.additionalDetails?.about ??
            "Write Something About Yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="mt-8 rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg transition-all duration-300 hover:border-yellow-50">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xl font-semibold">
            Personal Details
          </p>

          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="rounded-lg bg-richblack-900 p-4 transition-all duration-300 hover:bg-richblack-700">
              <p className="mb-2 text-xs uppercase tracking-wider text-richblack-400">
                First Name
              </p>

              <p className="text-base font-semibold text-richblack-5">
                {user?.firstName}
              </p>
            </div>

            <div className="rounded-lg bg-richblack-900 p-4 transition-all duration-300 hover:bg-richblack-700">
              <p className="mb-2 text-xs uppercase tracking-wider text-richblack-400">
                Email
              </p>

              <p className="text-base font-semibold text-richblack-5 break-all">
                {user?.email}
              </p>
            </div>

            <div className="rounded-lg bg-richblack-900 p-4 transition-all duration-300 hover:bg-richblack-700">
              <p className="mb-2 text-xs uppercase tracking-wider text-richblack-400">
                Gender
              </p>

              <p className="text-base font-semibold text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="rounded-lg bg-richblack-900 p-4 transition-all duration-300 hover:bg-richblack-700">
              <p className="mb-2 text-xs uppercase tracking-wider text-richblack-400">
                Last Name
              </p>

              <p className="text-base font-semibold text-richblack-5">
                {user?.lastName}
              </p>
            </div>

            <div className="rounded-lg bg-richblack-900 p-4 transition-all duration-300 hover:bg-richblack-700">
              <p className="mb-2 text-xs uppercase tracking-wider text-richblack-400">
                Phone Number
              </p>

              <p className="text-base font-semibold text-richblack-5">
                {user?.additionalDetails?.contactNumber ??
                  "Add Contact Number"}
              </p>
            </div>

            <div className="rounded-lg bg-richblack-900 p-4 transition-all duration-300 hover:bg-richblack-700">
              <p className="mb-2 text-xs uppercase tracking-wider text-richblack-400">
                Date Of Birth
              </p>

              <p className="text-base font-semibold text-richblack-5">
                {user?.additionalDetails?.dateOfBirth ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;