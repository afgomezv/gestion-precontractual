import { Spinner } from "@nextui-org/react";
import Image from "next/image";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-[93vh]">
      <div className="py-4">
        <Image src={"/icon.svg"} width={60} height={60} alt={"logo"} />
      </div>
      <div>
        <Spinner size="lg" />
      </div>
    </div>
  );
}

export default Loading;
