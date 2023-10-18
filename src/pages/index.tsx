import SEOHead from "@/components/SEOHead";
import { locations, servicesType } from "@/constants";
import { AdvetisementResponse, ServiceResponse } from "@/types";
import { Menu } from "@headlessui/react";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { Source_Serif_4 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import queryString from "query-string";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useSWR, { Fetcher } from "swr";

const sourceSerif4 = Source_Serif_4({ subsets: ["latin"] });

const fetcher: Fetcher<ServiceResponse[], string> = (url: string) =>
  fetch(url).then((r) => r.json());

export const getStaticProps: GetStaticProps<{
  initialServices: ServiceResponse[];
  ads: AdvetisementResponse[];
}> = async () => {
  const serviceRes = await fetch("https://api.pakejkahwin.com/services");
  const initialServices: ServiceResponse[] = await serviceRes.json();

  const advertisementRes = await fetch("https://api.pakejkahwin.com/ads");
  const ads: AdvetisementResponse[] = await advertisementRes.json();
  return {
    props: {
      initialServices: initialServices.reverse(),
      ads,
    },
    // revalidate every 1 minute
    revalidate: 60 * 1,
  };
};

export default function Home({
  initialServices,
  ads,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const query = queryString.stringify(
    {
      q: search,
      "location.state": state,
      "location.district": district,
      typeId: servicesType.find((s) => s.label === service)?.id,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data } = useSWR(`/api/services?${query}`, fetcher);

  let filterTimeout: NodeJS.Timeout;
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

  const onReset = () => {
    // clear uncontrolled search input
    if (searchRef.current) {
      searchRef.current.value = "";
    }

    setServices(initialServices);
    setSearch("");
    setService("");
    setState("");
    setDistrict("");
  };

  useEffect(() => {
    if (data) {
      const dataCopy = [...data];
      setServices(dataCopy.reverse());
    } else {
      setServices(initialServices);
    }
  }, [data]);

  const title =
    "Baiki.com – Your One-Stop Gadget Services Hub in Malaysia!";
  const description =
    "The most comprehensive list for repair services in Malaysia. Find the closest repair centre for you!";

  return (
    // Header
    <div className="flex flex-col">
      <header className="relative z-10 flex items-center justify-between p-2" style={{ backgroundColor: "#F35252" }}>
        <div className="flex justify-center w-full">
          <Link href="/">
            <img
              src="/logo.png"
              className="h-[50px] md:h-[62px] ml-10"
              alt="Baiki logo"
            />
          </Link>
        </div>

        <div className="hidden md:inline-flex md:space-x-4">
          {/* Add the Search Icon button with no background */}
          <button className="btn-normal-case">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-8 fill-white stroke-primary"
            height="24" 
            viewBox="0 -960 960 960" 
            width="24"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
          </button>
        </div>

        <Menu>
          <div className="hidden md:inline-flex md:space-x-4">
            {/* Profile icon without a background */}
            <Menu.Button>
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-8 fill-white stroke-primary" 
                height="24" 
                viewBox="0 -960 960 960" 
                width="24"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
              </svg>
            </Menu.Button>
            <Menu.Items className="absolute text-center right-3 z-10 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-0">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${active && 'bg-red-500 text-white block px-4 py-2' || 'block px-4 py-2'}`}
                      href="/account-login"
                    >
                      Log Masuk
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-red-500 text-white block px-4 py-2' || 'block px-4 py-2'}`}
                      href="/account-signup"
                    >
                      Daftar
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </div>
        </Menu>

        <div className="drawer drawer-end m-0 w-auto p-0 md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2 h-6 w-6 fill-none stroke-primary"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-20">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>

            <ul className="menu h-full w-80 gap-2 bg-base-200 p-4 text-base-content">
              <Link
                href="/submit"
                className="btn-primary btn text-xs normal-case"
              >
                Submit Service
              </Link>
              <Link
                href="/profile"
                className="btn-primary btn text-xs normal-case"
              >
                Profile
              </Link>
            </ul>
          </div>
        </div>
      </header>

      <SEOHead title={title} description={description} path="/" />
      <main className="md:mt-4" style={{ backgroundColor: "#F5F5F5" }}>

        {/* desktop view */}
        <div className="mx-auto mb-16 mt-8 hidden max-w-6xl px-4 md:block">
          <div className="flex w-full justify-between">
            <p className="mt-10">
              <a className="text-[#F35252] font-semibold text-xl">Baiki.</a>
              <a className="text-xl"> Hub carian untuk baiki dan ganti gajet.</a>
            </p>

            <div className="flex gap-4">
              {/* Rounded Square Buttons */}
              <button className="rounded-lg bg-white hover:bg-red-500 p-3 focus:outline-none w-32 group active:bg-red-600">
                <div className="flex flex-col items-center">
                  <div className="rounded-full p-2 mb-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48" // Adjust the width as needed
                      height="48" // Adjust the height as needed
                      fill="black" // Set the fill color to black
                      viewBox="0 -960 960 960" // Adjust the viewBox as needed
                      className="group-hover:fill-white"
                    >
                      <path 
                        d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z"
                      />
                    </svg>
                  </div>
                  {/* Button Label */}
                  <span className="text-black group-hover:text-white">Telefon Pintar</span>
                </div>
              </button>

              <button className="rounded-lg bg-white hover:bg-red-500 p-3 focus:outline-none w-32 group active:bg-red-600">
                <div className="flex flex-col items-center">
                  <div className="rounded-full p-2 mb-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48" // Adjust the width as needed
                      height="48" // Adjust the height as needed
                      fill="black" // Set the fill color to black
                      viewBox="0 -960 960 960" // Adjust the viewBox as needed
                      className="group-hover:fill-white"
                    >
                      <path 
                        d="m360-80-54-182q-48-38-77-95t-29-123q0-66 29-123t77-95l54-182h240l54 182q48 38 77 95t29 123q0 66-29 123t-77 95L600-80H360Zm120-200q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm-76-470q20-5 38.5-8t37.5-3q19 0 37.5 3t38.5 8l-16-50H420l-16 50Zm16 590h120l16-50q-20 5-38.5 7.5T480-200q-19 0-37.5-2.5T404-210l16 50Zm-16-640h152-152Zm16 640h-16 152-136Z"
                      />
                    </svg>
                  </div>
                  {/* Button Label */}
                  <span className="text-black group-hover:text-white">Jam Pintar</span>
                </div>
              </button>
              
              <button className="rounded-lg bg-white hover:bg-red-500 p-3 focus:outline-none w-34 group active:bg-red-600">
                <div className="flex flex-col items-center">
                  <div className="rounded-full p-2 mb-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48" // Adjust the width as needed
                      height="48" // Adjust the height as needed
                      fill="black" // Set the fill color to black
                      viewBox="0 -960 960 960" // Adjust the viewBox as needed
                      className="group-hover:fill-white"
                    >
                      <path 
                      d="M80-120q-17 0-28.5-11.5T40-160q0-17 11.5-28.5T80-200h800q17 0 28.5 11.5T920-160q0 17-11.5 28.5T880-120H80Zm80-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z"
                      />
                    </svg>
                  </div>
                  {/* Button Label */}
                  <span className="text-black group-hover:text-white">Komputer Riba</span>
                </div>
              </button>

              <button className="rounded-lg bg-white hover:bg-red-500 p-3 focus:outline-none w-32 group active:bg-red-600">
                <div className="flex flex-col items-center">
                  <div className="rounded-full p-2 mb-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48" // Adjust the width as needed
                      height="48" // Adjust the height as needed
                      fill="black" // Set the fill color to black
                      viewBox="0 -960 960 960" // Adjust the viewBox as needed
                      className="group-hover:fill-white"
                    >
                      <path 
                      d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"
                      />
                    </svg>
                  </div>
                  {/* Button Label */}
                  <span className="text-black group-hover:text-white">Kamera</span>
                </div>
              </button>

              <button className="rounded-lg bg-white hover:bg-red-500 p-3 focus:outline-none w-32 group active:bg-red-600">
                <div className="flex flex-col items-center">
                  <div className="rounded-full p-2 mb-2">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48" // Adjust the width as needed
                      height="48" // Adjust the height as needed
                      fill="black" // Set the fill color to black
                      viewBox="0 -960 960 960" // Adjust the viewBox as needed
                      className="group-hover:fill-white"
                    >
                      <path 
                      d="M160-760h320v-40H160v40Zm0 680q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h320q33 0 56.5 23.5T560-800v154q-23 12-43 27.5T480-584v-96H160v400h257q8 22 18.5 42t24.5 38H160v40h320v-16q15 17 32 31t37 25q-11 18-28.5 29T480-80H160Zm540-160q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41ZM600-80v-104q-54-27-87-79t-33-117q0-65 33-117t87-79v-104h200v104q54 27 87 79t33 117q0 65-33 117t-87 79v104H600ZM160-200v40-40Zm0-560v-40 40Z"
                      />
                    </svg>
                  </div>
                  {/* Button Label */}
                  <span className="text-black group-hover:text-white">Aksesori</span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex w-full mt-4">
            <p>
              <a className="font-semibold">Semua kedai. </a>
              <a>Pilih kedai berdekatan anda.</a>
            </p>
          </div>
          <div className="relative mt-8">
            <div className="relative w-full flex gap-4 snap-x snap-mandatory overflow-x-auto">
              <div className="snap-start shrink-0">
                <button className="rounded-lg bg-white p-3 focus:outline-none h-full">
                  <div className="flex flex-col items-center p-2 mb-2">
                    <div className="relative mt-6">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24" 
                        viewBox="0 -960 960 960" 
                        width="24">
                        <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                  <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <div className="rounded-lg bg-white p-3 focus:outline-none">
                <p className="text-center font-semibold">
                    iFIXIT
                  </p>
                  <p className="text-center">
                    Bukit Tinggi, Pahang
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full p-2 mb-2">
                      {/* Image */}
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>
                    {/* Button Label */}
                    <button className="rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2">Profil</button>
                  </div>
                </div>
              </div>
              <div className="snap-start shrink-0">
                <button className="rounded-lg bg-white p-3 focus:outline-none h-full">
                  <div className="flex flex-col items-center p-2 mb-2">
                    <div className="relative mt-6">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24" 
                        viewBox="0 -960 960 960" 
                        width="24">
                        <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div className="mx-4 mb-16 mt-6 flex flex-col space-y-2 md:hidden">
          {services?.map((service) => (
            <div
              key={service.id}
              className="w-full rounded-md bg-white p-4 shadow"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium capitalize text-gray-900">
                    {service.name.toLowerCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {service.location.district}, {service.location.state}
                  </p>
                </div>
                <div className="relative h-11 w-11 flex-shrink-0">
                  <ServiceLogo service={service} />
                </div>
              </div>
              <div className="mt-2">
                <Badge typeId={service.typeId} />
              </div>
              <div className="mt-6 flex space-x-1">
                {service.socials
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .filter((s) => !!s.link)
                  .map((social) => (
                    <a
                      key={social.link}
                      href={social.link}
                      className="mt-2 rounded outline-none focus:ring-2 focus:ring-primary"
                      target="_blank"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Badge({ typeId }: { typeId: number }) {
  const colorVariants = {
    slate: "ring-slate-600/20 bg-slate-50 text-slate-700",
    gray: "ring-gray-600/20 bg-gray-50 text-gray-700",
    zinc: "ring-zinc-600/20 bg-zinc-50 text-zinc-700",
    neutral: "ring-neutral-600/20 bg-neutral-50 text-neutral-700",
    stone: "ring-stone-600/20 bg-stone-50 text-stone-700",
    red: "ring-red-600/20 bg-red-50 text-red-700",
    orange: "ring-orange-600/20 bg-orange-50 text-orange-700",
    amber: "ring-amber-600/20 bg-amber-50 text-amber-700",
    yellow: "ring-yellow-600/20 bg-yellow-50 text-yellow-700",
    lime: "ring-lime-600/20 bg-lime-50 text-lime-700",
    green: "ring-green-600/20 bg-green-50 text-green-700",
    emerald: "ring-emerald-600/20 bg-emerald-50 text-emerald-700",
    teal: "ring-teal-600/20 bg-teal-50 text-teal-700",
    cyan: "ring-cyan-600/20 bg-cyan-50 text-cyan-700",
    sky: "ring-sky-600/20 bg-sky-50 text-sky-700",
    blue: "ring-blue-600/20 bg-blue-50 text-blue-700",
    indigo: "ring-indigo-600/20 bg-indigo-50 text-indigo-700",
    violet: "ring-violet-600/20 bg-violet-50 text-violet-700",
    purple: "ring-purple-600/20 bg-purple-50 text-purple-700",
    fuchsia: "ring-fuchsia-600/20 bg-fuchsia-50 text-fuchsia-700",
    pink: "ring-pink-600/20 bg-pink-50 text-pink-700",
    rose: "ring-rose-600/20 bg-rose-50 text-rose-700",
  };

  const service = servicesType.find((s) => s.id === typeId)!;

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        colorVariants[service?.color]
      }`}
    >
      {service?.label}
    </span>
  );
}

const ServiceLogo = ({ service }: { service: ServiceResponse }) => (
  <Image
    className="rounded-full border-2 border-primary object-cover object-center"
    src={service.image}
    alt={`${service.name} logo`}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
);

const SocialIcon = ({ name }: { name: string }) => {
  const size = "h-6 w-6";

  if (name === "facebook") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icon-tabler-brand-facebook fill-none stroke-stone-500 hover:stroke-stone-800 ${size}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icon-tabler-brand-instagram fill-none stroke-stone-500 hover:stroke-stone-800 ${size}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M16.5 7.5l0 .01" />
      </svg>
    );
  }

  if (name === "maps")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icon-tabler-map-pin fill-none stroke-stone-500 hover:stroke-stone-800 ${size}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
      </svg>
    );

  if (name === "tiktok")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icon-tabler-brand-tiktok fill-none stroke-stone-500 hover:stroke-stone-800 ${size}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
      </svg>
    );

  if (name === "website")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icon-tabler-world fill-none stroke-stone-500 hover:stroke-stone-800 ${size}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h16.8" />
        <path d="M11.5 3a17 17 0 0 0 0 18" />
        <path d="M12.5 3a17 17 0 0 1 0 18" />
      </svg>
    );

  if (name === "whatsapp")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icon-tabler-brand-whatsapp fill-none stroke-stone-500 hover:stroke-stone-800 ${size}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
      </svg>
    );

  return null;
};
