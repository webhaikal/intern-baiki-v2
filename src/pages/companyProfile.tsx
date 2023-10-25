import SEOHead from "@/components/SEOHead";
import { Menu } from "@headlessui/react";
import { Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchCompanyData, fetchCompanyDataById } from "../../backend/firebase";

const sourceSerif4 = Source_Serif_4({ subsets: ["latin"] });

export default function CompanyProfile() {
  const router = useRouter();
  const { companyId } = router.query;

  useEffect(() => {
    if (companyId) {
      const companyIdValue = Array.isArray(companyId) ? companyId[0] : companyId;
      // Fetch data for the specified company using companyIdValue
      fetchCompanyDataById(companyIdValue)
        .then((companyData) => {
          // Handle the company data (e.g., set it in state)
        })
        .catch((error) => {
          // Handle errors
        });
    }
  }, [companyId]);

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
        <div className="mx-auto mb-16 mt-2 hidden max-w-4xl px-4 md:flex bg-white py-1 flex-row">
          <div className="flex flex-col">
            <div className="flex w-full focus:outline-none">
              <div className="flex px-10 mt-4">
                <a className="text-red-500">
                  Bukit Tinggi
                </a>
              </div>
            </div>
            <div className="flex w-full focus:outline-none px-10">
              <a className="font-semibold text-2xl">
                iFIXIT
              </a>
            </div>
            <div className="flex w-full focus:outline-none px-10">
              <a>
                Pusat penggantian dan pertukaran alat-alat untuk iPhone.
              </a>
            </div>
            <div className="flex w-full focus:outline-none px-10 gap-x-2 mt-6">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM5.14386 17.8201C3.81099 16.2515 3.00683 14.2197 3.00683 12L3.00683 11.9978C6.61307 11.9618 9.57567 11.4838 12.2422 10.5779C12.4668 11.0605 12.6847 11.5534 12.8956 12.0564C12.5555 12.1691 12.221 12.2949 11.8918 12.4335C9.24177 13.5489 7.00538 15.4612 5.14386 17.8201ZM6.60614 19.1967C8.10884 20.3248 9.97636 20.9932 12 20.9932C13.2188 20.9932 14.3809 20.7507 15.4409 20.3114C14.9668 18.0368 14.352 15.907 13.6265 13.9217C13.3003 14.0264 12.9807 14.1451 12.6677 14.2768C10.356 15.2499 8.33843 16.9649 6.60614 19.1967ZM15.5924 13.4765C16.2479 15.3019 16.8129 17.2399 17.267 19.2902C19.048 18.0013 20.338 16.0757 20.8032 13.8473C18.9143 13.3589 17.1821 13.2604 15.5924 13.4765ZM14.8575 11.5662C16.754 11.2412 18.7996 11.3067 20.9917 11.8332C20.9578 9.97415 20.3599 8.25291 19.3619 6.8334C17.6358 8.0531 15.9276 9.06168 14.1111 9.85398C14.3687 10.4121 14.6177 10.9829 14.8575 11.5662ZM11.3457 8.76846C8.99734 9.53429 6.39047 9.94463 3.2312 9.9948C3.85725 7.24565 5.74294 4.97565 8.24906 3.82401C9.34941 5.31262 10.3933 6.96064 11.3457 8.76846ZM13.2302 8.05623C14.8876 7.34152 16.4466 6.43089 18.0282 5.32624C16.4333 3.88469 14.3192 3.00683 12 3.00683C11.4014 3.00683 10.8165 3.06531 10.2506 3.17688C11.3103 4.66337 12.3129 6.28992 13.2302 8.05623Z" fill="#0F0F0F"/>
              </svg>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 6.47714 17.5229 1.99999 12 1.99999C6.47715 1.99999 2 6.47714 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79687C10.4375 7.29062 11.9304 5.90624 14.2146 5.90624C15.3087 5.90624 16.4531 6.10155 16.4531 6.10155V8.56249H15.1921C13.9499 8.56249 13.5625 9.33333 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" fill="#000000"/>
              </svg>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#0F0F0F"/>
                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0F0F0F"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#0F0F0F"/>
              </svg>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.7828 3.91825C20.1313 3.83565 20.3743 3.75444 20.5734 3.66915C20.8524 3.54961 21.0837 3.40641 21.4492 3.16524C21.7563 2.96255 22.1499 2.9449 22.4739 3.11928C22.7979 3.29366 23 3.6319 23 3.99986C23 5.08079 22.8653 5.96673 22.5535 6.7464C22.2911 7.40221 21.9225 7.93487 21.4816 8.41968C21.2954 11.7828 20.3219 14.4239 18.8336 16.4248C17.291 18.4987 15.2386 19.8268 13.0751 20.5706C10.9179 21.3121 8.63863 21.4778 6.5967 21.2267C4.56816 20.9773 2.69304 20.3057 1.38605 19.2892C1.02813 19.0108 0.902313 18.5264 1.07951 18.109C1.25671 17.6916 1.69256 17.4457 2.14144 17.5099C3.42741 17.6936 4.6653 17.4012 5.6832 16.9832C5.48282 16.8742 5.29389 16.7562 5.11828 16.6346C4.19075 15.9925 3.4424 15.1208 3.10557 14.4471C2.96618 14.1684 2.96474 13.8405 3.10168 13.5606C3.17232 13.4161 3.27562 13.293 3.40104 13.1991C2.04677 12.0814 1.49999 10.5355 1.49999 9.49986C1.49999 9.19192 1.64187 8.90115 1.88459 8.71165C1.98665 8.63197 2.10175 8.57392 2.22308 8.53896C2.12174 8.24222 2.0431 7.94241 1.98316 7.65216C1.71739 6.3653 1.74098 4.91284 2.02985 3.75733C2.1287 3.36191 2.45764 3.06606 2.86129 3.00952C3.26493 2.95299 3.6625 3.14709 3.86618 3.50014C4.94369 5.36782 6.93116 6.50943 8.78086 7.18568C9.6505 7.50362 10.4559 7.70622 11.0596 7.83078C11.1899 6.61019 11.5307 5.6036 12.0538 4.80411C12.7439 3.74932 13.7064 3.12525 14.74 2.84698C16.5227 2.36708 18.5008 2.91382 19.7828 3.91825ZM10.7484 9.80845C10.0633 9.67087 9.12171 9.43976 8.09412 9.06408C6.7369 8.56789 5.16088 7.79418 3.84072 6.59571C3.86435 6.81625 3.89789 7.03492 3.94183 7.24766C4.16308 8.31899 4.5742 8.91899 4.94721 9.10549C5.40342 9.3336 5.61484 9.8685 5.43787 10.3469C5.19827 10.9946 4.56809 11.0477 3.99551 10.9046C4.45603 11.595 5.28377 12.2834 6.66439 12.5135C7.14057 12.5929 7.49208 13.0011 7.49986 13.4838C7.50765 13.9665 7.16949 14.3858 6.69611 14.4805L5.82565 14.6546C5.95881 14.7703 6.103 14.8838 6.2567 14.9902C6.95362 15.4727 7.65336 15.6808 8.25746 15.5298C8.70991 15.4167 9.18047 15.6313 9.39163 16.0472C9.60278 16.463 9.49846 16.9696 9.14018 17.2681C8.49626 17.8041 7.74425 18.2342 6.99057 18.5911C6.63675 18.7587 6.24134 18.9241 5.8119 19.0697C6.14218 19.1402 6.48586 19.198 6.84078 19.2417C8.61136 19.4594 10.5821 19.3126 12.4249 18.6792C14.2614 18.0479 15.9589 16.9385 17.2289 15.2312C18.497 13.5262 19.382 11.1667 19.5007 7.96291C19.51 7.71067 19.6144 7.47129 19.7929 7.29281C20.2425 6.84316 20.6141 6.32777 20.7969 5.7143C20.477 5.81403 20.1168 5.90035 19.6878 5.98237C19.3623 6.04459 19.0272 5.94156 18.7929 5.70727C18.0284 4.94274 16.5164 4.43998 15.2599 4.77822C14.6686 4.93741 14.1311 5.28203 13.7274 5.89906C13.3153 6.52904 13 7.51045 13 8.9999C13 9.28288 12.8801 9.5526 12.6701 9.74221C12.1721 10.1917 11.334 9.92603 10.7484 9.80845Z" fill="#0F0F0F"/>
              </svg>
            </div>
            <div className="flex w-68 px-10 mt-6">
              <div className="border-2 border-black rounded w-80">
                <p className="py-1 text-center">
                  08.00 am - 09.00 pm
                </p>
              </div>
            </div>
            <div className="flex w-68 px-10 mt-4">
              <div className="border-2 border-black rounded w-80">
                <p className="py-1 text-center">
                  016 - 234 5678
                </p>
              </div>
            </div>
            <div className="flex w-68 px-10 mt-6">
              <a className="font-semibold">
                Lihat ulasan
              </a>
            </div>
            <div className="ml-10 rounded-md mb-16 mt-2 hidden max-w-md px-4 md:block bg-gray-200">
              <div className="flex w-full focus:outline-none">
                <div className="flex mt-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-8 fill-black stroke-primary" 
                    height="24" 
                    viewBox="0 -960 960 960" 
                    width="24"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                  </svg>
                  <p className="ml-4">
                    @Username
                  </p>
                </div>
              </div>
              <div className="flex w-full focus:outline-none mt-2 text-gray-500">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Purus semper eget duis at tellus at urna.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex mt-4 px-10">
              {/* Pictures here */}
              <img className="rounded-md" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
            </div>
          </div>
        </div>
        
        {/* mobile view */}
        <div className="mx-auto mb-16 mt-2 md:hidden px-0 bg-white py-1 flex-row">
          <div className="flex flex-col">
            <div className="flex w-full focus:outline-none">
              <div className="flex px-8 mt-4">
                <a className="text-red-500">
                  Bukit Tinggi
                </a>
              </div>
            </div>
            <div className="flex w-full focus:outline-none px-8">
              <a className="font-semibold text-2xl">
                iFIXIT
              </a>
            </div>
            <div className="flex w-full focus:outline-none px-8">
              <a>
                Pusat penggantian dan pertukaran alat-alat untuk iPhone.
              </a>
            </div>
            <div className="flex w-full focus:outline-none px-8 gap-x-2 mt-6">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM5.14386 17.8201C3.81099 16.2515 3.00683 14.2197 3.00683 12L3.00683 11.9978C6.61307 11.9618 9.57567 11.4838 12.2422 10.5779C12.4668 11.0605 12.6847 11.5534 12.8956 12.0564C12.5555 12.1691 12.221 12.2949 11.8918 12.4335C9.24177 13.5489 7.00538 15.4612 5.14386 17.8201ZM6.60614 19.1967C8.10884 20.3248 9.97636 20.9932 12 20.9932C13.2188 20.9932 14.3809 20.7507 15.4409 20.3114C14.9668 18.0368 14.352 15.907 13.6265 13.9217C13.3003 14.0264 12.9807 14.1451 12.6677 14.2768C10.356 15.2499 8.33843 16.9649 6.60614 19.1967ZM15.5924 13.4765C16.2479 15.3019 16.8129 17.2399 17.267 19.2902C19.048 18.0013 20.338 16.0757 20.8032 13.8473C18.9143 13.3589 17.1821 13.2604 15.5924 13.4765ZM14.8575 11.5662C16.754 11.2412 18.7996 11.3067 20.9917 11.8332C20.9578 9.97415 20.3599 8.25291 19.3619 6.8334C17.6358 8.0531 15.9276 9.06168 14.1111 9.85398C14.3687 10.4121 14.6177 10.9829 14.8575 11.5662ZM11.3457 8.76846C8.99734 9.53429 6.39047 9.94463 3.2312 9.9948C3.85725 7.24565 5.74294 4.97565 8.24906 3.82401C9.34941 5.31262 10.3933 6.96064 11.3457 8.76846ZM13.2302 8.05623C14.8876 7.34152 16.4466 6.43089 18.0282 5.32624C16.4333 3.88469 14.3192 3.00683 12 3.00683C11.4014 3.00683 10.8165 3.06531 10.2506 3.17688C11.3103 4.66337 12.3129 6.28992 13.2302 8.05623Z" fill="#0F0F0F"/>
              </svg>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 6.47714 17.5229 1.99999 12 1.99999C6.47715 1.99999 2 6.47714 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79687C10.4375 7.29062 11.9304 5.90624 14.2146 5.90624C15.3087 5.90624 16.4531 6.10155 16.4531 6.10155V8.56249H15.1921C13.9499 8.56249 13.5625 9.33333 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" fill="#000000"/>
              </svg>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#0F0F0F"/>
                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0F0F0F"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#0F0F0F"/>
              </svg>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.7828 3.91825C20.1313 3.83565 20.3743 3.75444 20.5734 3.66915C20.8524 3.54961 21.0837 3.40641 21.4492 3.16524C21.7563 2.96255 22.1499 2.9449 22.4739 3.11928C22.7979 3.29366 23 3.6319 23 3.99986C23 5.08079 22.8653 5.96673 22.5535 6.7464C22.2911 7.40221 21.9225 7.93487 21.4816 8.41968C21.2954 11.7828 20.3219 14.4239 18.8336 16.4248C17.291 18.4987 15.2386 19.8268 13.0751 20.5706C10.9179 21.3121 8.63863 21.4778 6.5967 21.2267C4.56816 20.9773 2.69304 20.3057 1.38605 19.2892C1.02813 19.0108 0.902313 18.5264 1.07951 18.109C1.25671 17.6916 1.69256 17.4457 2.14144 17.5099C3.42741 17.6936 4.6653 17.4012 5.6832 16.9832C5.48282 16.8742 5.29389 16.7562 5.11828 16.6346C4.19075 15.9925 3.4424 15.1208 3.10557 14.4471C2.96618 14.1684 2.96474 13.8405 3.10168 13.5606C3.17232 13.4161 3.27562 13.293 3.40104 13.1991C2.04677 12.0814 1.49999 10.5355 1.49999 9.49986C1.49999 9.19192 1.64187 8.90115 1.88459 8.71165C1.98665 8.63197 2.10175 8.57392 2.22308 8.53896C2.12174 8.24222 2.0431 7.94241 1.98316 7.65216C1.71739 6.3653 1.74098 4.91284 2.02985 3.75733C2.1287 3.36191 2.45764 3.06606 2.86129 3.00952C3.26493 2.95299 3.6625 3.14709 3.86618 3.50014C4.94369 5.36782 6.93116 6.50943 8.78086 7.18568C9.6505 7.50362 10.4559 7.70622 11.0596 7.83078C11.1899 6.61019 11.5307 5.6036 12.0538 4.80411C12.7439 3.74932 13.7064 3.12525 14.74 2.84698C16.5227 2.36708 18.5008 2.91382 19.7828 3.91825ZM10.7484 9.80845C10.0633 9.67087 9.12171 9.43976 8.09412 9.06408C6.7369 8.56789 5.16088 7.79418 3.84072 6.59571C3.86435 6.81625 3.89789 7.03492 3.94183 7.24766C4.16308 8.31899 4.5742 8.91899 4.94721 9.10549C5.40342 9.3336 5.61484 9.8685 5.43787 10.3469C5.19827 10.9946 4.56809 11.0477 3.99551 10.9046C4.45603 11.595 5.28377 12.2834 6.66439 12.5135C7.14057 12.5929 7.49208 13.0011 7.49986 13.4838C7.50765 13.9665 7.16949 14.3858 6.69611 14.4805L5.82565 14.6546C5.95881 14.7703 6.103 14.8838 6.2567 14.9902C6.95362 15.4727 7.65336 15.6808 8.25746 15.5298C8.70991 15.4167 9.18047 15.6313 9.39163 16.0472C9.60278 16.463 9.49846 16.9696 9.14018 17.2681C8.49626 17.8041 7.74425 18.2342 6.99057 18.5911C6.63675 18.7587 6.24134 18.9241 5.8119 19.0697C6.14218 19.1402 6.48586 19.198 6.84078 19.2417C8.61136 19.4594 10.5821 19.3126 12.4249 18.6792C14.2614 18.0479 15.9589 16.9385 17.2289 15.2312C18.497 13.5262 19.382 11.1667 19.5007 7.96291C19.51 7.71067 19.6144 7.47129 19.7929 7.29281C20.2425 6.84316 20.6141 6.32777 20.7969 5.7143C20.477 5.81403 20.1168 5.90035 19.6878 5.98237C19.3623 6.04459 19.0272 5.94156 18.7929 5.70727C18.0284 4.94274 16.5164 4.43998 15.2599 4.77822C14.6686 4.93741 14.1311 5.28203 13.7274 5.89906C13.3153 6.52904 13 7.51045 13 8.9999C13 9.28288 12.8801 9.5526 12.6701 9.74221C12.1721 10.1917 11.334 9.92603 10.7484 9.80845Z" fill="#0F0F0F"/>
              </svg>
            </div>
            <div className="flex w-68 px-8 mt-6">
              <div className="border-2 border-black rounded w-full">
                <p className="py-1 text-center">
                  08.00 am - 09.00 pm
                </p>
              </div>
            </div>
            <div className="flex w-68 px-8 mt-4">
              <div className="border-2 border-black rounded w-full">
                <p className="py-1 text-center">
                  016 - 234 5678
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex mt-4 px-10">
                {/* Pictures here */}
                <img className="rounded-md" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
              </div>
            </div>
            <div className="flex w-68 px-8 mt-6">
              <a className="font-semibold">
                Lihat ulasan
              </a>
            </div>
            <div className="rounded-md mb-16 mt-2 w-fit px-4 mx-8 md:hidden bg-gray-200">
              <div className="flex w-full focus:outline-none">
                <div className="flex mt-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-8 fill-black stroke-primary" 
                    height="24" 
                    viewBox="0 -960 960 960" 
                    width="24"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                  </svg>
                  <p className="ml-2">
                    @Username
                  </p>
                </div>
              </div>
              <div className="flex w-full focus:outline-none mt-2 text-gray-500">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Purus semper eget duis at tellus at urna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}