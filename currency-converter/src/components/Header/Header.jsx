import logo from "@/assets/images/logo.svg";

export default function Header({
   currencyCount,

 }) {
  

  return (
    <header className="flex h-[66px] w-full items-center justify-between px-4 sm:px-6">
      
        <img src={logo} alt="logo" className="h-8 w-auto sm:h-9"/>
        

      <p className="hidden text-[11px] font-medium tracking-[0.22em] text-text-muted md:block">
        {currencyCount} CURRENCIES • DATA BY FRANKFURTER
      </p>
    
    </header>
  );
}