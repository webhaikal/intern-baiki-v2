function Footer() {
    return(
        <div className="flex flex-col">
          <div className="mx-auto mb-16 mt-8 max-w-screen-lg px-4 md:block">
          </div>
          <div className="flex-grow">
          </div>
          <footer className="relative z-10 flex w-full items-center h-12" style={{ backgroundColor: "#F35252" }}>
            <div className="flex justify-center w-full">
              <div className="font-semibold text-white">
                <p>Oxsgn 2023</p>
              </div>
            </div>
          </footer>
        </div>
    );
}

export default Footer;