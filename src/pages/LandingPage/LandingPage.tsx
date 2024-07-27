import ChatInput from "../../components/ChatInput";
import OptionsButton from "../../components/OptionsButton";

// Assests import
import mvlu_logo from "../../assets/mvlu_logo.png";
import token_branded_chat from "../../assets/token-branded_chat.svg";
import carbon_education from "../../assets/carbon_education.svg";
import pajamas_work from "../../assets/pajamas_work.svg";
import icons8_library from "../../assets/icons8_library.svg";
import carbon_education_1 from "../../assets/carbon_education-1.svg";

import { ActionFunctionArgs, redirect } from "react-router-dom";
import useMessage from "../../hooks/useMessage";
import FullPageLoader from "../../components/FullPageLoader";
import { AnimatePresence } from "framer-motion";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries()) as { message: string };

  const params = new URLSearchParams();

  params.append("query", payload["message"]);

  return redirect("/chat?" + params.toString());
}

export default function LandingPage() {
  const { isLoading } = useMessage();
  return (
    <AnimatePresence mode="sync" initial={false}>
      {isLoading && <FullPageLoader />}
      <div>
        <header
          className={`container mx-auto max-w-[720px] pt-12 px-4 lg:px-0 space-y-8 `}
        >
          <div className="bg-white w-fit h-28 aspect-square flex justify-center items-center rounded-2xl shadow-lg">
            <img src={mvlu_logo} alt="MVLU Logo" />
          </div>
          <div>
            <h2 className="text-3xl leading-tight font-semibold">
              Welcome to
              <span className="inline-block md:pl-2 text-transparent font-bold bg-gradient-to-r from-[#29166F] to-[#6E52D8] bg-clip-text">
                MVLU College Bot
              </span>
            </h2>
            <p className="text-3xl font-semibold text-[#666666]">
              How can I help you today?
            </p>
          </div>
        </header>
        <main>
          <div className="container mx-auto max-w-[720px] px-4 md:px-0 flex justify-center items-center">
            <ChatInput variant="landing" />
          </div>
        </main>

        <div className="container mx-auto max-w-[720px] px-4 md:px-0 justify-center items-center mt-12">
          <div className="flex  mb-6">
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={token_branded_chat}
                alt="Get Started"
              />
              <p className="px-2 text-sm font-medium">Get Started</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <OptionsButton
              to="/chat?query=What%20are%20the%20courses%20offered%20by%20the%20college%3F%0A%0A"
              image={carbon_education}
              title="Course Information"
            />
            <OptionsButton
              image={pajamas_work}
              title="Internship Opportunities"
              to="/chat?query=Tell%20me%20something%20about%20the%20college%20Library%3F"
            />
            <OptionsButton
              to="/chat?query=Tell%20me%20something%20about%20the%20college%20Library%3F"
              image={icons8_library}
              title="Library Resources"
            />
            <OptionsButton
              to="/chat?query=Tell%20me%20something%20about%20the%20college%20Library%3F"
              image={carbon_education_1}
              title="Graduation Requirements"
            />
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
