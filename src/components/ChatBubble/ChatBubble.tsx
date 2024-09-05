import Markdown from "react-markdown";
import ChatLoader from "@/components/ChatLoader";

import mvlu_logo from "../../assets/mvlu_logo.png";
import Image from "next/image";

interface Member {
  name: string;
  initials: string;
}

const team: Member[] = [
  {
    initials: "SN",
    name: "Subhashish Nabajja",
  },
  {
    initials: "MV",
    name: "Mohammed Varaliya",
  },
  {
    initials: "PZ",
    name: "Piyush Zingade",
  },
  {
    initials: "SA",
    name: "Siddhita Acharekar",
  },
  {
    initials: "SS",
    name: "Sahil Singh",
  },
  {
    initials: "VR",
    name: "Vedika Raut",
  },
  {
    initials: "PD",
    name: "Purav Dhanki",
  },
];

const USER: Member = team[Math.floor(Math.random() * team.length)];

export interface ChatBubbleProps {
  user: "MVLUBOT" | "USER" | "ERROR";
  message: string;
  loading?: boolean;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { user, message, loading } = props;

  return (
    <div
      className={` flex items-center p-2 rounded-lg gap-4 max-w-full w-fit pr-8 from-[#29166F] to-[#6E52D8]  ${
        user === "USER"
          ? "bg-white text-black selection:bg-black selection:text-white"
          : "bg-gradient-to-br text-white selection:bg-white selection:text-black"
      }`}
    >
      {user === "USER" ? (
        <div
          className="bg-[#F2F2F2] h-9 self-start  aspect-square font-bold flex justify-center items-center p-2 rounded-md"
          title={USER.name}
        >
          {USER.initials}
        </div>
      ) : (
        <div className="bg-[#F2F2F2] h-9 self-start  aspect-square font-bold flex justify-center items-center p-2 rounded-md">
          <Image className="h-full w-full" src={mvlu_logo} alt="MVLU College" />
        </div>
      )}
      <div className="font-medium">
        <Markdown className="chat__bubble">{message}</Markdown>
        {loading && <ChatLoader />}
      </div>
    </div>
  );
}
