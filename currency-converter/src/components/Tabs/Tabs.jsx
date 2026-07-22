export default function Tabs({ activeTab, setActiveTab }) {
   
const tabs = [
  { id: "history", label: "History" },
  { id: "compare", label: "Compare" },
  { id: "favorites", label: "Favorites" },
  { id: "log", label: "Log" },
];
return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
  <div className="flex border-b border-border">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`relative px-5 py-3 font-medium transition ${
          activeTab === tab.id
            ? "text-accent"
            : "text-gray-500 hover:text-white"
        }`}
      >
        {tab.label}

        {activeTab === tab.id && (
          <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" />
        )}
      </button>
    ))}
  </div>

 
</section>
);
}
