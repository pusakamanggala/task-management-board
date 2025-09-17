import { Avatar, AvatarImage } from "../ui/avatar";
import { Member } from "@/types/task";

type Props = {
  members: Member[];
  maxVisible?: number; // default to 3
};

export default function MemberStack({ members, maxVisible = 3 }: Props) {
  const visibleMembers = members.slice(0, maxVisible);
  const remainingCount = members.length - visibleMembers.length;

  return (
    <div className="flex -space-x-2 items-center">
      {visibleMembers.map((member) => (
        <Avatar key={member.id} className="w-6 h-6">
          <AvatarImage src={member.avatarUrl || ""} alt={member.name} />
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-xs text-gray-800 font-medium ring-2 ring-background">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
