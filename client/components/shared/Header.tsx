"use client";
import { DIGITALINDIA, YEARS75, DELHIGOV, PROFILE } from "@/public";
import Image from "next/image";
import {
  IoArrowBackCircleOutline,
  IoNotifications,
  IoNotificationsCircle,
} from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserContext } from "@/global/userContext";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MdNotificationAdd } from "react-icons/md";
import Link from "next/link";
import { logout } from "@/lib/api";
import { useState } from "react";
import { RouteNameformatter } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function Header() {
  const path = usePathname();
  const { user, setUser } = useUserContext();
  const [accountVisible, setAccountVisible] = useState(false);
  const router = useRouter();

  const handleAccountBox = () => {
    setAccountVisible((prevState) => !prevState);
  };

  const handleSignout = async () => {
    const res = await logout();
    if (res) {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <header className="p-2">
      <MainHeader />
      <section className="flex-between px-5 py-4 shadow-xs border-b border-black/25">
        <Button
          onClick={() => router.back()}
          variant="link"
          className="flex-center"
        >
          <IoArrowBackCircleOutline className="text-4xl" />
        </Button>
        <div className="mt-2 text-xl font-semibold">
          {RouteNameformatter(path)}
        </div>
        <div className="flex gap-8 items-center justify-between relative">
          <Link className="mt-1" href="/notifications">
            <div className="relative">
              <IoNotifications />{" "}
              {true && (
                <Badge className="rounded-full absolute -top-1 -right-0.5 p-0.5 bg-black"></Badge>
              )}
            </div>
          </Link>
          <div className="flex gap-1 items-center">
            <span className="text-sm">{user?.name}</span>

            <Avatar className="border" onClick={handleAccountBox}>
              <AvatarImage src="" />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {accountVisible && (
              <AccountBox
                user={user}
                handleSignout={handleSignout}
                handleAccountBox={handleAccountBox}
              />
            )}
          </div>
        </div>
      </section>
    </header>
  );
}

export const MainHeader = () => (
  <section className="h-20 shadow-lg">
    <figure className="p-2 flex justify-between items-center">
    <Link href="/task-management-dashboard">
      <Image
        src={DIGITALINDIA}
        alt="digital-india-logo"
        width="180"
        height="100"
        />
    </Link>
      <div className="py-2 px-8 flex justify-center items-center space-x-2">
        <Image src={DELHIGOV} alt="delhi-gov-logo" width="105" />
        <Image src={YEARS75} alt="75-years-logo" width="80" />
      </div>
      <figcaption className="hidden">Digital India Logo</figcaption>
    </figure>
  </section>
);
type Handler = () => void;
interface Props {
  handleSignout: Handler;
  handleAccountBox: Handler;
  user?: any; // TODO
}

const AccountBox = ({ user, handleSignout, handleAccountBox }: Props) => (
  <>
    <div className="absolute top-8 right-6 sm:right-8 flex flex-col px-4 py-2 items-center z-50 bg-white shadow-lg rounded-md border w-[360px]">
      <div className="flex items-center gap-4 border-b">
        <Image src={PROFILE} alt="Profile" width="40" height="40" />

        <div className="text-primary">
          <h4 className="text-xl font-bold capitalize">{user?.name}</h4>
          <h5 className="text-sm text-gray-500 lowercase">{user?.email}</h5>
          
        </div>
      </div>

      <hr />
      <div className="flex justify-between items-center gap-4">
        <div className="mt-2">
          <Button onClick={handleSignout}>Sign Out</Button>
        </div>
        <Link href="/account" className="">
          My Account
        </Link>
      </div>
    </div>
    <div className="fixed inset-0 z-40" onClick={handleAccountBox} />
  </>
);
