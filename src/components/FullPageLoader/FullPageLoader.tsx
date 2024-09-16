import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
// Asset Imports
import mvlu_logo from "@/assets/mvlu_logo.png";
import Image from "next/image";

export default function FullPageLoader() {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-[100]"
      exit={{
        y: "100%",
      }}
    >
      <div className="container mx-auto max-w-[720px] h-screen pt-12 px-4 lg:px-0 space-y-8 flex items-center flex-col justify-center">
        <div className="bg-white w-auto h-28 aspect-square flex justify-center items-center rounded-2xl shadow-lg">
          <Image src={mvlu_logo} alt="MVLU Logo" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl leading-tight font-semibold ">
            Welcome to
            <span className="inline-block md:pl-2 text-transparent font-bold bg-gradient-to-r from-[#29166F] to-[#6E52D8] bg-clip-text">
              MVLU College Bot
            </span>
          </h2>
          <p className="text-3xl font-semibold text-[#666666]">
            Please Wait...
          </p>
        </div>
        <LoaderCircle className="animate-spin mx-auto" />
      </div>
    </motion.div>
  );
}
