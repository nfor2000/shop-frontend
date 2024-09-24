import { User } from "../context/ShopContextProvider";

const Profile = ({ userInfo }: { userInfo: User }) => {
     const individualNames = userInfo.username.split(" ");
     let initials = "";
     for (const initial of individualNames) {
          initials += initial.charAt(0).toLocaleUpperCase();
     }
     return (
          <div className="w-10 sm:flex h-10 rounded-full hidden justify-center items-center text-xl bg-slate-50 text-gray-900">
               {initials}
          </div>
     );
};

export default Profile;
