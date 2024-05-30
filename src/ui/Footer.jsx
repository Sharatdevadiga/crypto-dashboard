// eslint-disable-next-line no-unused-vars
import React from "react";
function Footer() {
  return (
    <footer className="border-t-4 bg-white p-6 text-center text-xs font-semibold leading-5 text-black text-opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
      <p>&copy; {new Date().getFullYear()} CryptoCurrency Dashboard</p>
      <p>@ Almabetter</p>
      <p>By: Sharath Devadiga</p>
    </footer>
  );
}

export default Footer;
