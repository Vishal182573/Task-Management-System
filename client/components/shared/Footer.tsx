import { DTULOGO } from "@/public";
import Image from "next/image";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa6";

import React from "react";

function Footer() {
  return (
    <footer className="bg-blueGray-200 relative pb-6 pt-60">
      <div className="px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <p className="mb-2">Developed by</p>
            <div className="flex gap-4">
              <Image src={DTULOGO} width={40} height={40} alt="dtu-logo" />
              <h4 className="text-blueGray-700 text-3xl font-semibold">
                Delhi Technological University
              </h4>
            </div>
            <div className="mb-6 mt-6 flex space-x-2 lg:mb-0">
              <a
                href="https://dtu.ac.in/"
                className="text-lightBlue-400 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
              >
                <CgWebsite />
              </a>
              <a
                href="https://www.linkedin.com/in/delhi-technological-university-delhi-397129209/"
                className="text-lightBlue-600 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="items-top mb-6 flex flex-wrap justify-end">
              {/* <div className="ml-auto w-full px-4 lg:w-4/12">
                <span className="text-blueGray-500 mb-2 block text-sm font-semibold uppercase">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className="w-full px-4 lg:w-4/12">
                <span className="text-blueGray-500 mb-2 block text-sm font-semibold uppercase">
                  Address
                </span>
                <ul className="list-unstyled">
                  <li>Shahbad Daulatpur, Main Bawana Road,</li>
                  <li>Delhi - 110042, India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-blueGray-300 my-6" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center md:w-4/12">
            <div className="text-blueGray-500 py-1 text-sm font-semibold">
              Copyright © {new Date().getFullYear()} Delhi Technological
              University. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
