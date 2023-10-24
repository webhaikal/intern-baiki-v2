import SEOHead from "@/components/SEOHead";
import { Menu } from "@headlessui/react";
import { Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { addData } from "../../backend/firebase";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";

const sourceSerif4 = Source_Serif_4({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const storage = getStorage();

  const handleSubmit = async () => {
    const name = (document.getElementById("name") as HTMLInputElement)?.value || (document.getElementById("mobile_name") as HTMLInputElement)?.value;
    const state = (document.getElementById("state") as HTMLInputElement)?.value || (document.getElementById("mobile_state") as HTMLInputElement)?.value;
    const district = (document.getElementById("district") as HTMLInputElement)?.value || (document.getElementById("mobile_district") as HTMLInputElement)?.value;
    const description = (document.getElementById("description") as HTMLInputElement)?.value || (document.getElementById("mobile_description") as HTMLInputElement)?.value;
    const type = (document.getElementById("type") as HTMLInputElement)?.value || (document.getElementById("mobile_type") as HTMLInputElement)?.value; 
    const timeStart = (document.getElementById("timeStart") as HTMLInputElement)?.value || (document.getElementById("mobile_timeStart") as HTMLInputElement)?.value;
    const timeEnd = (document.getElementById("timeEnd") as HTMLInputElement)?.value || (document.getElementById("mobile_timeEnd") as HTMLInputElement)?.value;
    const contact = (document.getElementById("contact") as HTMLInputElement)?.value || (document.getElementById("mobile_contact") as HTMLInputElement)?.value;
    const dribbleUrl = (document.getElementById("dribbleUrl") as HTMLInputElement)?.value || (document.getElementById("mobile_dribbleUrl") as HTMLInputElement)?.value;
    const facebookUrl = (document.getElementById("FacebookUrl") as HTMLInputElement)?.value || (document.getElementById("mobile_FacebookUrl") as HTMLInputElement)?.value;
    const instagramUrl = (document.getElementById("instagramUrl") as HTMLInputElement)?.value || (document.getElementById("mobile_instagramUrl") as HTMLInputElement)?.value;
    const twitterUrl = (document.getElementById("twitterUrl") as HTMLInputElement)?.value || (document.getElementById("mobile_twitterUrl") as HTMLInputElement)?.value;
  
    // Initialize variables for picture URLs
    let picture1Url = "";
    let picture2Url = "";
    let picture3Url = "";
    let picture4Url = "";
    
     // Function to upload picture to Firebase Storage and get its URL
    const uploadPictureAndGetUrl = async (inputId: string, storagePath: string): Promise<string> => {
      const input = document.getElementById(inputId) as HTMLInputElement | null;

      if (input) {
        const file = input.files?.[0];

        if (file) {
          const pictureRef = ref(storage, storagePath);

          try {
            await uploadBytes(pictureRef, file);
            return await getDownloadURL(pictureRef);
          } catch (error) {
            console.error("Error uploading picture:", error);
            return "";
          }
        } else {
          console.error(`No file selected for ${inputId}`);
        }
      } else {
        console.error(`Element with ID '${inputId}' not found in the DOM`);
      }

      return "";
    };

    // Upload pictures and get their URLs
    picture1Url = await uploadPictureAndGetUrl("picture1", `images/${name}/picture1.jpg`);
    picture2Url = await uploadPictureAndGetUrl("picture2", `images/${name}/picture2.jpg`);
    picture3Url = await uploadPictureAndGetUrl("picture3", `images/${name}/picture3.jpg`);
    picture4Url = await uploadPictureAndGetUrl("picture4", `images/${name}/picture4.jpg`);

    // Handle checkboxes and create an array of selected types
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map((checkbox) => (checkbox as HTMLInputElement).value);
    
    const dataToSubmit = {
      name,
      state,
      district,
      description,
      type: selectedTypes, // Store selected types as an array
      time: `${timeStart} - ${timeEnd}`,
      contact,
      dribbleUrl,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      picture1: picture1Url,
      picture2: picture2Url,
      picture3: picture3Url,
      picture4: picture4Url,
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
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" id="description" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="type">Type: </label>
            <input type="checkbox" name="type" value="smartphone" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Telefon Pintar</label>
            <input type="checkbox" name="type" value="smartwatch" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Jam Pintar</label>
            <input type="checkbox" name="type" value="laptop" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Komputer Riba</label>
            <input type="checkbox" name="type" value="camera" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Kamera</label>
            <input type="checkbox" name="type" value="accessory" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Aksesori</label>
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
            <input type="file" name="picture1" id="picture1" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture2">Picture 2: </label>
            <input type="file" name="picture2" id="picture2" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture3">Picture 3: </label>
            <input type="file" name="picture3" id="picture3" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture4">Picture 4: </label>
            <input type="file" name="picture4" id="picture4" className="ml-2" accept="image/*">
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
          <div className="flex w-full items-center">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="mobile_name" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="state">State: </label>
            <input type="text" name="state" id="mobile_state" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="district">District: </label>
            <input type="text" name="district" id="mobile_district" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" id="mobile_description" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="type">Type: </label>
          </div>
          <div className="flex w-full items-center mt-2 justify-center">
            <input type="checkbox" name="type" value="smartphone" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Telefon Pintar</label>
            <input type="checkbox" name="type" value="smartwatch" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Jam Pintar</label>
            <input type="checkbox" name="type" value="laptop" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Komputer Riba</label>
          </div>
          <div className="flex w-full items-center mt-2 justify-center">
            <input type="checkbox" name="type" value="camera" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Kamera</label>
            <input type="checkbox" name="type" value="accessory" className="ml-2"></input>
            <label htmlFor="type" className="ml-2">Aksesori</label>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="time">Time: </label>
            <input type="time" name="time" id="mobile_timeStart" className="rounded-xl w-full ml-2">
            </input>
            <input type="time" name="time" id="mobile_timeEnd" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="contact">Contact: </label>
            <input type="tel" name="contact" id="mobile_contact" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="dribbleUrl">Dribble: </label>
            <input type="text" name="dribbleUrl" id="mobile_dribbleUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="facebookUrl">Facebook: </label>
            <input type="text" name="FacebookUrl" id="mobile_FacebookUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="instagramUrl">Instagram: </label>
            <input type="text" name="instagramUrl" id="mobile_instagramUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="twitterUrl">Twitter: </label>
            <input type="text" name="twitterUrl" id="mobile_twitterUrl" className="rounded-xl w-full ml-2">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture1">Picture 1: </label>
            <input type="file" name="picture1" id="mobile_picture1" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture2">Picture 2: </label>
            <input type="file" name="picture2" id="mobile_picture2" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture3">Picture 3: </label>
            <input type="file" name="picture3" id="mobile_picture3" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex w-full items-center mt-2">
            <label htmlFor="picture4">Picture 4: </label>
            <input type="file" name="picture4" id="mobile_picture4" className="ml-2" accept="image/*">
            </input>
          </div>
          <div className="flex md:inline-flex md:space-x-4 mt-2">
            <button className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-red focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" 
            onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}