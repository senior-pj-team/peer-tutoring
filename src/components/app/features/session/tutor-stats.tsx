import React from "react";
import { BookOpen, Mail, Pencil, Phone, Star, Users } from "lucide-react";
import Expandable from "../../shared/expandable-text";
import Image from "next/image";

const TutorStats = ({ data }: { data: TTutorStats }) => {
  return (
    <div>
      <div className="flex flex-col mb-2 text">
        <span className="max-w-[full] font-bold text-2xl truncate">
          {data}
        </span>
      </div>
      <div className="flex items-center mt-5">
        <div className="relative w-30 h-30 rounded-full overflow-hidden me-3">
          <Image
            src={tutor_profile_url ?? "/profile.jpg"}
            alt="Tutor avatar"
            fill
          />
        </div>
        <div>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center gap-7">
                <Star className="w-3 h-3 text-black" fill="currentColor" />
                <span className="text-sm">
                  {tutor_rating ?? 0} Tutor rating
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-7">
                <Pencil className="w-3 h-3 text-black" fill="currentColor" />
                <span className="text-sm">{reviews_count ?? 0} Reviews</span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-7">
                <Users className="w-3 h-3 text-black" fill="currentColor" />
                <span className="text-sm">{students_count ?? 0} Students</span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-7">
                <BookOpen className="w-3 h-3 text-black" fill="currentColor" />
                <span className="text-sm">{session_count ?? 0} Sessions</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="text-xs font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5 mt-5">
          <Mail size={12} />
          <span className="text-gray-700 font-extrabold">{email}</span>
        </div>
        <div className="text-xs font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
          <Phone size={12} />
          <span className="text-gray-700 font-extrabold">{phone_number}</span>
        </div>
      </div>
      {bio_highlight && <div className="mt-5 text-sm"> {bio_highlight} </div>}
      {biography && (
        <Expandable text={biography} className="mt-5 text-sm" max={300} />
      )}
    </div>
  );
};

export default TutorStats;
