import { DIGITALINDIA,YEARS75,DELHIGOV} from "@/public";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <header className="p-2">
      <section className="h-20 shadow-lg">
        <figure className="p-2 flex justify-between items-center">
          <Image
            src={DIGITALINDIA}
            alt="digital-india-logo"
            width="180"
            height="100"
          />
          <div className="py-2 px-8 flex justify-center items-center space-x-2">
            <Image 
               src={DELHIGOV}
               alt="delhi-gov-logo"
               width="105"
            />
            <Image 
               src={YEARS75}
               alt="75-years-logo"
               width="80"
            />
          </div>
          <figcaption className="hidden">Digital India Logo</figcaption>
        </figure>
      </section>
      <section className="flex items-center justify-between px-5 py-1 shadow-xs border-b border-black/25">
        <div>
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-12 rounded px-3 py-2 text-font hover:bg-background-brand-subtlest hover:text-font-brand flex-[0.5]"
          >
            <IoArrowBackCircleOutline className="text-4xl" />
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-sm">Admin</span>
          <Avatar className="border">
            <AvatarImage src="" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </header>
  );
}
