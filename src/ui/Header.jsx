import ToggleSwitch from "../features/darkMode/ToggleSwitch";

function Header() {
  return (
    <div className="sticky top-0 z-50 flex justify-between p-3 pr-8 text-[22px] font-bold shadow-md backdrop-blur backdrop-filter sm:w-screen md:pr-20 dark:bg-slate-950/70 dark:text-white dark:shadow-slate-600">
      <div className="flex items-center">
        <img
          src="cryptoDashboardLogo.png"
          alt="almabetter logo"
          className="h-12"
        />
        <p>Crypto Dashboard</p>
      </div>
      <div>
        <ToggleSwitch />
      </div>
    </div>
  );
}

export default Header;
