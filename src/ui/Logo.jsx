function Logo() {
  return (
    <div className="sticky top-0 z-50 flex  items-center p-3 text-[22px] font-bold shadow-md backdrop-blur backdrop-filter sm:w-screen">
      <img
        src="cryptoDashboardLogo.png"
        alt="almabetter logo"
        className="h-12"
      />
      <p>Crypto Dashboard</p>
    </div>
  );
}

export default Logo;
