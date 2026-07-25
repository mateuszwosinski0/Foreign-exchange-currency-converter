import { useEffect } from "react";


export default function useKeyboardShortcuts({
    setActiveTab,
    handleSwap,
    amountInputRef,
}) {
    useEffect(() => {
        function handleKeyDown(event) {
            if(!event.altKey){
                return
            }

            if (event.key === "h") {
                event.preventDefault();
                setActiveTab("history");
            }

            if(event.key === "c") {
                event.preventDefault();
                setActiveTab("compare");
            }

            if(event.key === "f") {
                event.preventDefault();
                setActiveTab("favorites");
            }

            if(event.key === "l"){
                event.preventDefault();
                setActiveTab("log");
            }

            if(event.key === "s"){
                event.preventDefault();
                handleSwap();
            }

            if(event.key === "k"){
                event.preventDefault();
                amountInputRef.current?.focus();
               
            }
        }
        

        window.addEventListener("keydown", handleKeyDown);

        return() => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setActiveTab, handleSwap, amountInputRef]);
}