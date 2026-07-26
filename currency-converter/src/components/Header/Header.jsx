import logo from "@/assets/images/logo.svg";

export default function Header({
   currencyCount,

 }) {
  

  return (
    <header className="flex w-full items-center justify-between px-2 sm:px-2">
      
        <img src={logo} alt="logo" className="h-8 w-auto md:h-9"/>
        

      <p className="hidden text-[11px] font-medium tracking-[0.22em] text-text-muted md:block">
        {currencyCount} CURRENCIES • DATA BY FRANKFURTER
      </p>
    
    </header>
  );
}