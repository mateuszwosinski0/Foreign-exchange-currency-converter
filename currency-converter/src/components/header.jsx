import logo from "../assets/images/logo.svg"

export default function Header({ currencyCount }) {
  return (
    <header className="w-full flex items-center justify-between max-w-[1300px] mx-auto">
      
        <img src={logo} alt="logo" className="h-8"/>
        

      <div className="text-text-secondary uppercase text-sm tracking-widest">
        {currencyCount} CURRENCIES • DATA BY FRANKFURTER
      </div>
    </header>
  );
}