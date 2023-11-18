import avatarSrc from "@public/images/user_avatar1.png";
import { Avatar, AvatarImage } from "@shadcn/avatar";

const user = {
  name: "Neil Simenson",
  activity: "Active 5 min ago",
  // avatar:"../../assets/user_avatar1.png"
};

function ContactProfile() {
  return (
    <Avatar>
      <AvatarImage src={avatarSrc} alt="@shadcn" />

      <div className="space-y-1 font-medium dark:text-white">
        <div>{user.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user.activity}
        </div>
      </div>
    </Avatar>
  );
}

export default ContactProfile;
