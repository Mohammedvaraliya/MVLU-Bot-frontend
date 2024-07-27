import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

export interface ChatInputProps {
  variant: "landing" | "chat";
  onSubmit?: (query: string) => Promise<void>;
}

type Inputs = {
  query: string;
};

export default function ChatInput(props: ChatInputProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const submit = useSubmit();

  const { onSubmit } = props;

  const handleFormSubmit = async (data: Inputs) => {
    if (onSubmit) {
      reset();
      await onSubmit(data.query);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (formRef.current && e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      submit(e.currentTarget);
    }
  };

  if (props.variant === "chat") {
    return (
      <div className=" bg-white w-full  px-4 py-2  rounded-2xl focus-within:shadow-2xl transition-shadow ease-in duration-150 ">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex items-center"
        >
          <input
            className="grow focus:outline-none resize-none text-sm"
            placeholder="Enter your query here."
            {...register("query", { required: true })}
          />
          <button
            type="submit"
            className="h-7 aspect-square flex justify-center items-center rounded bg-[#29166F]"
          >
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.82379 1.22059C6.60504 1.00211 6.30852 0.879395 5.99935 0.879395C5.69018 0.879395 5.39365 1.00211 5.1749 1.22059L0.773459 5.6197C0.554596 5.83856 0.431641 6.13541 0.431641 6.44492C0.431641 6.75444 0.554596 7.05128 0.773459 7.27015C0.992322 7.48901 1.28916 7.61196 1.59868 7.61196C1.9082 7.61196 2.20504 7.48901 2.4239 7.27015L4.83268 4.86215V13.8338C4.83268 14.1432 4.9556 14.44 5.17439 14.6588C5.39318 14.8776 5.68993 15.0005 5.99935 15.0005C6.30877 15.0005 6.60551 14.8776 6.82431 14.6588C7.0431 14.44 7.16602 14.1432 7.16602 13.8338V4.86215L9.57402 7.27015C9.68239 7.37852 9.81104 7.46448 9.95263 7.52313C10.0942 7.58178 10.246 7.61196 10.3992 7.61196C10.5525 7.61196 10.7043 7.58178 10.8458 7.52313C10.9874 7.46448 11.1161 7.37852 11.2245 7.27015C11.3328 7.16178 11.4188 7.03312 11.4774 6.89153C11.5361 6.74994 11.5663 6.59818 11.5663 6.44492C11.5663 6.29167 11.5361 6.13991 11.4774 5.99832C11.4188 5.85673 11.3328 5.72807 11.2245 5.6197L6.82379 1.22059Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
      </div>
    );
  }

  if (props.variant === "landing") {
    return (
      <div className=" bg-white w-full  mt-10 px-6 py-6 rounded-2xl focus-within:shadow-2xl transition-shadow ease-in duration-150 ">
        <form
          ref={formRef}
          onSubmit={(event) => {
            submit(event.currentTarget);
          }}
          className="flex min-h-32"
          onKeyDown={handleKeyDown}
          method="post"
        >
          <textarea
            name="message"
            className="grow focus:outline-none resize-none text-sm"
            placeholder="Enter your query here."
          ></textarea>
          <button className=" h-7 aspect-square flex justify-center items-center rounded bg-[#29166F]">
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.82379 1.22059C6.60504 1.00211 6.30852 0.879395 5.99935 0.879395C5.69018 0.879395 5.39365 1.00211 5.1749 1.22059L0.773459 5.6197C0.554596 5.83856 0.431641 6.13541 0.431641 6.44492C0.431641 6.75444 0.554596 7.05128 0.773459 7.27015C0.992322 7.48901 1.28916 7.61196 1.59868 7.61196C1.9082 7.61196 2.20504 7.48901 2.4239 7.27015L4.83268 4.86215V13.8338C4.83268 14.1432 4.9556 14.44 5.17439 14.6588C5.39318 14.8776 5.68993 15.0005 5.99935 15.0005C6.30877 15.0005 6.60551 14.8776 6.82431 14.6588C7.0431 14.44 7.16602 14.1432 7.16602 13.8338V4.86215L9.57402 7.27015C9.68239 7.37852 9.81104 7.46448 9.95263 7.52313C10.0942 7.58178 10.246 7.61196 10.3992 7.61196C10.5525 7.61196 10.7043 7.58178 10.8458 7.52313C10.9874 7.46448 11.1161 7.37852 11.2245 7.27015C11.3328 7.16178 11.4188 7.03312 11.4774 6.89153C11.5361 6.74994 11.5663 6.59818 11.5663 6.44492C11.5663 6.29167 11.5361 6.13991 11.4774 5.99832C11.4188 5.85673 11.3328 5.72807 11.2245 5.6197L6.82379 1.22059Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
        <div className="text-xs text-[#9A9A9A] flex justify-between">
          <h4>MVLUBot 0.0.1 (Beta)</h4>
          <p className="hidden md:inline-block">
            Use <code className="px-2">shift + return</code>for new line
          </p>
        </div>
      </div>
    );
  }
}
