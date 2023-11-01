"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  MdOutlineHome,
  MdOutlineStadium,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaChalkboardTeacher, FaRegHandshake } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { TfiPencilAlt } from "react-icons/tfi";
import { BsCalendar3 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { TbPointFilled } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="fixed left-0 w-[260px] bg-white h-screen p-6">
      <div className="flex flex-nowrap">
        <div className="pr-2">
          <Image src={"/icon.svg"} width={40} height={40} alt={"logo"} />
        </div>
        <div className="w-3/4">
          <h1 className="text-[#636578] text-xl font-bold">Distrito INDER</h1>
        </div>
        <div className="mt-1 text-[#636578] text-2xl">
          <MdOutlineKeyboardDoubleArrowLeft />
        </div>
        {/* <div className="mt-1 text-[#636578] text-2xl">
          <MdOutlineKeyboardDoubleArrowRight />
        </div> */}
      </div>
      <section>
        <h2 className="text-[#9598A0] uppercase font-semibold py-4">
          dashboard
        </h2>
        <div>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <MdOutlineHome />
            </div>
            <Link href="/dashboard" className="text-lg capitalize">
              incio
            </Link>
          </section>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <MdOutlineStadium />
            </div>
            <p className="text-lg capitalize">escenarios</p>
          </section>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <FaChalkboardTeacher />
            </div>
            <p className="text-lg capitalize">clases</p>
          </section>
          <section className="flex flex-col my-1 ">
            <button className="flex p-2 rounded-lg hover:bg-slate-300">
              <div className="text-2xl mr-3">
                <FaRegHandshake />
              </div>
              <p className="text-lg capitalize">contractación</p>
              <div className="mt-1.5 pl-8  text-lg">
                <IoIosArrowForward />
              </div>
            </button>
            <ul className="flex flex-col text-lg capitalize">
              <Link
                href="/forms"
                className="flex p-2 rounded-lg hover:bg-slate-300"
              >
                <div className="mt-1.5">
                  <TbPointFilled />
                </div>
                <p>formulario</p>
              </Link>
              <Link
                href="/dependencies"
                className="flex p-2 rounded-lg hover:bg-slate-300"
              >
                <div className="mt-1.5">
                  <TbPointFilled />
                </div>
                <p>dependencia</p>
              </Link>
              <Link
                href="/hiring/registers"
                className="flex p-2 rounded-lg hover:bg-slate-300"
              >
                <div className="mt-1.5">
                  <TbPointFilled />
                </div>
                <p>registros</p>
              </Link>
            </ul>
          </section>
        </div>
      </section>
      <section>
        <h2 className="text-[#9598A0] uppercase font-semibold py-4">
          trámites
        </h2>
        <div>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <FaUsersGear />
            </div>
            <p className="text-lg capitalize">organismo</p>
          </section>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <BiBuildingHouse />
            </div>
            <p className="text-lg capitalize">bienes inmuebles</p>
          </section>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <TfiPencilAlt />
            </div>
            <p className="text-lg capitalize">solicitudes</p>
          </section>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <BsCalendar3 />
            </div>
            <p className="text-lg capitalize">eventos</p>
          </section>
        </div>
      </section>
      <section>
        <h2 className="text-[#9598A0] uppercase font-semibold py-4">
          configuración
        </h2>
        <div>
          <section className="flex my-1 p-2 cursor-pointer rounded-lg hover:bg-slate-300">
            <div className="text-2xl mr-2">
              <HiOutlineUser />
            </div>
            <p className="text-lg capitalize">usuarios</p>
          </section>
        </div>
      </section>
    </nav>
  );
}

export default Sidebar;
