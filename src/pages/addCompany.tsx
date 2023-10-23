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
import { addData } from "../../backend/firebase";
import { useRouter } from "next/router";

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

  const router = useRouter();

  const handleSubmit = async () => {
    const name = (document.getElementById("name") as HTMLInputElement)?.value;
    const state = (document.getElementById("state") as HTMLInputElement)?.value;
    const district = (document.getElementById("district") as HTMLInputElement)?.value;
    const timeStart = (document.getElementById("timeStart") as HTMLInputElement)?.value;
    const timeEnd = (document.getElementById("timeEnd") as HTMLInputElement)?.value;
    const contact = (document.getElementById("contact") as HTMLInputElement)?.value;
    const dribbleUrl = (document.getElementById("dribbleUrl") as HTMLInputElement)?.value;
    const facebookUrl = (document.getElementById("FacebookUrl") as HTMLInputElement)?.value;
    const instagramUrl = (document.getElementById("instagramUrl") as HTMLInputElement)?.value;
    const twitterUrl = (document.getElementById("twitterUrl") as HTMLInputElement)?.value;
    const picture1 = (document.getElementById("picture1") as HTMLInputElement).value;
    const picture2 = (document.getElementById("picture2") as HTMLInputElement).value;
    const picture3 = (document.getElementById("picture3") as HTMLInputElement).value;
    const picture4 = (document.getElementById("picture4") as HTMLInputElement).value;
  
    const dataToSubmit = {
      name,
      state,
      district,
      time: `${timeStart} - ${timeEnd}`,
      contact,
      dribbleUrl,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      picture1,
      picture2,
      picture3,
      picture4,
    };
  
    // Call the function to add the data to Firebase
    addData(dataToSubmit);

    router.push("/");
  };  

  const title =
    "Baiki.com – Your One-Stop Gadget Services Hub in Malaysia!";
  const description =
    "The most comprehensive list for repair services in Malaysia. Find the closest repair centre for you!";

  return (
    <div className="flex flex-col">
      {/* Header Desktop */}
      <header className="relative z-10 flex items-center justify-between p-2" style={{ backgroundColor: "#F35252" }}>
        <div className="hidden sm:inline-flex justify-center w-full">
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
                      className={`${active && 'bg-red-500 text-white block rounded-md px-4 py-2' || 'block rounded-md px-4 py-2'}`}
                      href="/account-login"
                    >
                      Log Masuk
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-red-500 text-white block rounded-md px-4 py-2' || 'block rounded-md px-4 py-2'}`}
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

        {/* Header Mobile */}
        <div className="md:hidden inline-flex">
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
        <div className="md:hidden inline-flex">
          <Link href="/">
            <img
              src="/logo.png"
              className="h-[50px] md:h-[62px]"
              alt="Baiki logo"
            />
          </Link>
        </div>
        <Menu>
        <div className="md:hidden inline-flex md:space-x-4">
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
                    className={`${active && 'bg-red-500 text-white block rounded-md px-4 py-2' || 'block rounded-md px-4 py-2'}`}
                    href="/account-login"
                  >
                    Log Masuk
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && 'bg-red-500 text-white block rounded-md px-4 py-2' || 'block rounded-md px-4 py-2'}`}
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
      </header>

      <SEOHead title={title} description={description} path="/" />
      <main className="md:mt-4" style={{ backgroundColor: "#F5F5F5" }}>

        {/* desktop view */}
        <div className="mx-auto mb-16 mt-4 hidden max-w-6xl px-4 py-2 md:block bg-white">
          <div className="flex w-full items-center">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="state">State: </label>
            <input type="text" name="state" id="state" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="district">District: </label>
            <input type="text" name="district" id="district" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="time">Time: </label>
            <input type="time" name="time" id="timeStart" className="rounded-xl w-full ml-2">
            </input>
            <input type="time" name="time" id="timeEnd" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="contact">Contact: </label>
            <input type="tel" name="contact" id="contact" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="dribbleUrl">Dribble: </label>
            <input type="text" name="dribbleUrl" id="dribbleUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="facebookUrl">Facebook: </label>
            <input type="text" name="FacebookUrl" id="FacebookUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="instagramUrl">Instagram: </label>
            <input type="text" name="instagramUrl" id="instagramUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="twitterUrl">Twitter: </label>
            <input type="text" name="twitterUrl" id="twitterUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture1">Picture 1: </label>
            <input type="file" name="picture1" id="picture1" className="ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture2">Picture 2: </label>
            <input type="file" name="picture2" id="picture2" className="ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture3">Picture 3: </label>
            <input type="file" name="picture3" id="picture3" className="ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture4">Picture 4: </label>
            <input type="file" name="picture4" id="picture4" className="ml-2">
            </input>
          </div>
          <div className="flex md:inline-flex md:space-x-4 mt-2">
            <button className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-red focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" 
            onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        {/* mobile view */}
        <div className="mx-4 mb-16 mt-6 flex flex-col space-y-2 md:hidden">
          
        </div>
      </main>
    </div>
  );
}