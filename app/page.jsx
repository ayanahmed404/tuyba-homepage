"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const photos = {
  kaaba: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=85",
  makkah: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1100&q=85",
  madinah: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=85",
  mosque: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=85",
  prayer: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=900&q=85",
  city: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=85",
  city2: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=900&q=85",
  city3: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",
  city4: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=85",
};

const packages = [
  { name: "Makkah & Madinah Essential", tag: "Most Popular", nights: "10 Nights Package", city: "New York (JFK)", dates: "Mar 15 – Mar 25, 2025", hotels: "4-Star", price: "$2,895", rating: "4.8", reviews: "124", image: "/images/umrah-package-card1.jpg" },
  { name: "Madinah First Comfort Package", tag: "Comfort", nights: "14 Nights Package", city: "Chicago (O’Hare)", dates: "Apr 2 – Apr 16, 2025", hotels: "5-Star", price: "$3,795", rating: "4.9", reviews: "87", image: "/images/umrah-package-card2.jpg" },
  { name: "Premium Close-to-Haram Stay", tag: "Premium", nights: "10 Nights Package", city: "Los Angeles (LAX)", dates: "May 10 – May 20, 2025", hotels: "5-Star Deluxe", price: "$4,995", rating: "5.0", reviews: "56", image: "/images/umrah-package-card3.jpg" },
];

const cities = [
  ["New York", "JFK, EWR", photos.city], ["New Jersey", "EWR, JFK", photos.city2],
  ["Michigan", "DEPARTURES VIA DTW", photos.city3], ["Texas - Houston", "IAH", photos.city4],
  ["California", "LAX", photos.city2], ["Illinois", "ORD, MDW", photos.city3],
  ["Washington DC", "IAD, DCA", photos.city4], ["Texas — Dallas", "DFW", photos.city],
  ["Philadelphia", "PHL", photos.city3], ["Atlanta", "ATL", photos.city4],
  ["Boston", "BOS", photos.city], ["Minneapolis", "MSP", photos.city2],
];

const departures = [
  ["New York", "JFK", "Mar 15, 2025", "10 nights", "Essential", "$2,895"],
  ["Chicago", "O’Hare", "Mar 22, 2025", "14 nights", "Comfort", "$3,795"],
  ["Houston", "IAH", "Apr 5, 2025", "7 nights", "Essential", "$2,295"],
  ["Los Angeles", "LAX", "Apr 12, 2025", "10 nights", "Premium", "$4,495"],
  ["Washington DC", "IAD", "Apr 19, 2025", "14 nights", "Family", "$3,495"],
  ["Dallas", "DFW", "May 3, 2025", "7 nights", "Essential", "$2,195"],
  ["Atlanta", "ATL", "May 10, 2025", "10 nights", "Comfort", "$3,195"],
  ["Detroit", "DTW", "May 17, 2025", "14 nights", "Family", "$3,295"],
];

const features = [
  ["Round-Trip Flights", "✓", "✓", "✓", "✓"],
  ["Makkah Hotel", "4-Star", "5-Star", "5-Star Deluxe", "5-Star"],
  ["Madinah Hotel", "4-Star", "5-Star", "5-Star", "5-Star"],
  ["Hotel Proximity to Haram", "Walking distance", "Close", "Meters away", "Close"],
  ["Ground Transfers", "✓", "✓", "✓", "✓"],
  ["Visa Assistance", "✓", "✓", "✓", "✓"],
  ["Travel Support", "✓", "✓", "✓", "✓"],
  ["Private Airport Transfer", "×", "×", "✓", "×"],
  ["Journey Consultation", "×", "✓", "✓", "✓"],
  ["Family Room Config", "×", "×", "×", "✓"],
  ["Room Upgrade Option", "×", "✓", "✓", "✓"],
  ["Departure Cities", "12+", "10+", "8+", "10+"],
  ["Duration Options", "7–10n", "10–14n", "10–14n", "10–14n"],
];

const itinerary = [
  ["Day 1", "US Departure City", "Depart from your home city. Overnight flight to Saudi Arabia."],
  ["Day 2", "Madinah Arrival", "Arrive Madinah. Transfer to hotel. Visit Masjid an-Nabawi."],
  ["Days 3–5", "Madinah", "Prayers at Masjid an-Nabawi, Roza visits, and key Madinah sites."],
  ["Day 6", "Makkah", "Coach transfer to Makkah. Hotel check-in. Perform Tawaf al-Qudum."],
  ["Days 7–10", "Makkah", "Perform Umrah rites, Sai, Halq/Taqsir. Time for worship and reflection."],
  ["Day 10", "Jeddah Departure", "Transfer to Jeddah Airport. Return flight to your home city."],
];

const faqs = [
  ["What is included in a Tuyba Umrah package?", "Our packages include round-trip flights, hotel stays in Makkah and Madinah, ground transfers, visa assistance, and US-based travel support. Inclusions vary by tier; your specialist will walk you through every detail."],
  ["How do I apply for an Umrah visa?", "Our team guides you through the current visa requirements and application steps, and helps you prepare the documents needed for your journey."],
  ["Can I choose my departure city?", "Yes. Choose from more than 12 US departure cities. Flight availability, routing, and pricing are tailored to your origin."],
  ["What is the difference between Essential, Comfort, and Premium packages?", "Each tier offers a different hotel category and proximity to the Haram, with additional options such as private transfers and one-to-one journey consultation."],
  ["Are family packages available?", "Absolutely. We can coordinate family room configurations, child-friendly itineraries, and dates that work for your group."],
  ["When is the best time to perform Umrah from the USA?", "Umrah is available throughout the year. Your best dates depend on your schedule, preferred weather, budget, and whether you would like to travel during Ramadan."],
  ["What is your cancellation and refund policy?", "Cancellation terms depend on your selected itinerary, airline, and hotel. Your booking specialist will explain the applicable terms before you confirm."],
  ["Is there 24/7 support during the journey?", "You’ll have access to our US-based support team before you travel and throughout your journey, with on-the-ground coordination when you need it."],
];

function Icon({ children, className = "" }) {
  return <span aria-hidden="true" className={`icon ${className}`}>{children}</span>;
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function BrandLogo({ light = false }) {
  return <a className="brand-logo-link" href="#" aria-label="Tuyba home"><img className={`brand-logo${light ? " brand-logo-light" : ""}`} src={light ? "/images/logo-white.png" : "/images/logo.png"} alt="Tuyba" /></a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [["Packages", "#packages"], ["Departure Cities", "#cities"], ["How It Works", "#how-it-works"], ["Journal", "#journal"]];
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[#ece5d7] bg-[#fffdf5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-[5.4vw]">
        <BrandLogo />
        <nav className={`${menuOpen ? "flex" : "hidden"} header-nav absolute left-0 right-0 top-[71px] flex-col gap-5 border-b border-[#eee5d2] bg-[#fffdf5] px-6 py-6 md:static md:mr-auto md:ml-6 md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href="tel:18008892287" className="phone-link"><Icon>♧</Icon> 1-800-TUYBA</a>
          <a href="#faq" className="btn btn-outline !min-h-[40px] !px-4 !text-[12px]">Sign In</a>
          <a href="#contact" className="btn !min-h-[40px] !px-4 !text-[12px]">Get a Quote</a>
        </div>
        <button className="menu-toggle md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="hero-story">
        <div className="hero-stage relative isolate overflow-hidden text-white">
          <div className="hero-photo absolute inset-0 -z-20" />
          <div className="hero-shade absolute inset-0 -z-10" />
          <div className="hero-content mx-auto grid h-full max-w-[1440px] content-center px-6 pb-10 pt-12 md:px-[5.4vw] md:pb-12">
            <div className="hero-copy max-w-[720px]">
              <p className="hero-kicker mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-[#aee5e6]">Umrah packages from the USA</p>
              <h1 className="hero-title serif max-w-[690px] text-[clamp(42px,6.5vw,78px)] leading-[1.03] tracking-[-.04em] text-white">Your Umrah Journey<br /><span className="hero-title-accent">Starts Here</span></h1>
              <p className="hero-description mt-5 max-w-[440px] text-[14px] leading-7 text-white/80">Carefully coordinated Umrah packages departing from over 12 US cities. Flights, hotels, and visa assistance all in one place.</p>
            </div>
            <div className="hero-search"><SearchBar /></div>
          </div>
          <div className="hero-about">
            <p className="hero-about-eyebrow">A journey built around you</p>
            <h2>More than a booking.<br />A guide for your <span>journey.</span></h2>
            <p className="hero-about-copy">From your departure city to the holy mosques, we plan around your family and stay by your side every step of the way.</p>
            <div className="hero-about-stats">
              <div><strong data-story-count="12" data-story-suffix="+">12+</strong><span>US departure cities</span></div>
              <div><strong data-story-count="2400" data-story-suffix="+">2,400+</strong><span>Travellers served</span></div>
              <div><strong data-story-count="100" data-story-suffix="%">100%</strong><span>Human support</span></div>
            </div>
          </div>
        </div>
      </section>
      <TrustStrip />
    </>
  );
}

function TrustStrip() {
  return (
    <div className="trust-strip grid grid-cols-2 gap-y-4 px-6 py-5 md:grid-cols-6 md:px-[5.4vw]">
      {["US-Based Support", "Visa Assistance", "Flights Coordinated", "Makkah & Madinah Hotels", "Ground Transportation", "Travel Support"].map((item, i) =>
        <div key={item}><Icon>{["♧", "♢", "✈", "▤", "♧", "◉"][i]}</Icon>{item}</div>)}
    </div>
  );
}

function SearchBar() {
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState(2);
  return (
    <form className="search-panel mt-10 grid max-w-[850px] grid-cols-1 items-center md:grid-cols-[1.15fr_1fr_.85fr_auto]" onSubmit={(event) => { event.preventDefault(); document.querySelector("#departures")?.scrollIntoView({ behavior: "smooth" }); }}>
      <label className="search-field"><Icon>⌖</Icon><span><small>Departing from</small><select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Select departure city"><option value="">Select your city</option>{cities.map(([name]) => <option key={name}>{name}</option>)}</select></span></label>
      <label className="search-field"><Icon>▢</Icon><span><small>When</small><input value={month} onChange={(event) => setMonth(event.target.value)} placeholder="Travel Month" aria-label="Travel month" onFocus={(event) => { event.target.type = "month"; }} /></span></label>
      <div className="search-field"><Icon>♙</Icon><span><small>Travellers</small><span className="traveller-control"><button type="button" onClick={() => setTravellers(Math.max(1, travellers - 1))} aria-label="Remove traveller">−</button><b>{travellers}</b><button type="button" onClick={() => setTravellers(travellers + 1)} aria-label="Add traveller">+</button></span></span></div>
      <button type="submit" className="btn !min-h-[48px] !rounded-lg"><span>⌕</span> Search</button>
    </form>
  );
}

function PackagesSection() {
  return (
    <section id="packages" className="section-pad bg-[#fff9e9]">
      <div className="section-heading-row">
        <div><Eyebrow>Featured packages</Eyebrow><h2 className="section-title">Umrah Packages from the USA</h2><p className="section-intro">Carefully coordinated packages including flights, hotels, and full ground support departing from your city.</p></div>
        <a href="#tiers" className="text-link">View all packages <span>→</span></a>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {packages.map((item) => <article className="package-card" key={item.name}>
          <div className="package-image"><img src={item.image} alt="" /><span className="image-tag">{item.tag}</span><strong>{item.nights}</strong></div>
          <div className="package-content">
            <h3>{item.name}</h3><div className="rating"><span>★★★★★</span> {item.rating} <small>({item.reviews} reviews)</small></div>
            <div className="package-meta"><span>⌖ {item.city}</span><span>▢ {item.dates}</span></div>
            <div className="package-meta"><span>5n Makkah · 4n Madinah</span><span>{item.hotels}</span></div>
            <div className="price-row"><strong>{item.price}</strong><span>/ person</span></div><small className="muted-caption">Per person, double occupancy</small>
            <a className="btn mt-5 w-full" href="#contact">View Package</a>
          </div>
        </article>)}
      </div>
    </section>
  );
}

function JourneyTypes() {
  const options = ["7 Nights", "10 Nights", "14 Nights", "Family", "Premium", "Ramadan", "Group"];
  const [active, setActive] = useState("Group");
  const descriptions = {
    "7 Nights": "A focused one-week journey with the essentials thoughtfully taken care of.",
    "10 Nights": "A balanced itinerary with time for worship in both Makkah and Madinah.",
    "14 Nights": "A slower-paced journey with extra time for prayer, reflection, and rest.",
    Family: "Comfortable, flexible arrangements designed to make travelling together easier.",
    Premium: "Elevated stays close to the Haram, with more personalized support.",
    Ramadan: "Perform Umrah during the holiest month of the year. Enquire early for availability.",
    Group: "Organised group departures with a dedicated Tuyba journey leader and shared itinerary.",
  };
  return (
    <section className="section-pad bg-[#fffef3]">
      <Eyebrow>Journey types</Eyebrow><h2 className="section-title">Find the Right Umrah Journey</h2>
      <div className="mt-7 flex flex-wrap gap-2">{options.map((option, i) => <button key={option} onClick={() => setActive(option)} className={`filter-pill ${active === option ? "active" : ""}`}><span>{["☾", "☾", "☾", "♡", "♙", "✺", "♧"][i]}</span>{option}</button>)}</div>
      <div className="journey-callout mt-7">
        <div><h3>{active === "Group" ? "Group Umrah" : `${active} Umrah`}</h3><p>{descriptions[active]}</p><a href="#departures" className="btn mt-4 !min-h-[42px] !text-[12px]">Explore {active} Packages</a></div>
        <img src={photos.prayer} alt="Umrah pilgrims gathered together at the Grand Mosque" />
      </div>
    </section>
  );
}

function SeasonSection() {
  const seasons = [
    ["March – April", "Ramadan Umrah", "Perform Umrah during the holiest month of the year. Ramadan packages fill quickly — enquire early.", photos.mosque],
    ["Year-Round", "Family Umrah", "Designed for families travelling with children. Flexible itineraries and family-room configurations.", photos.madinah],
    ["Dec 20 – Jan 5", "December Departures", "Travel during the holiday season. Limited departures available from all major US cities.", photos.city],
    ["21+ Nights", "Long-Stay Umrah", "Extended stays for those wishing to immerse themselves fully in worship and reflection.", photos.kaaba],
  ];
  return (
    <section className="section-pad bg-[#fff9e9]">
      <div className="section-heading-row"><div><Eyebrow>Seasonal departures</Eyebrow><h2 className="section-title">Packages by Season</h2></div><a href="#departures" className="text-link">All seasonal packages <span>→</span></a></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{seasons.map(([tag, title, body, image]) => <article className="season-card" key={title}><div><img src={image} alt="" /><span>{tag}</span></div><section><h3>{title}</h3><p>{body}</p><a href="#departures" className="text-link">View packages <span>›</span></a></section></article>)}</div>
    </section>
  );
}

function CitiesSection() {
  return (
    <section id="cities" className="section-pad bg-[#fffef3]">
      <Eyebrow>Departure cities</Eyebrow><h2 className="section-title">Departing From Your City</h2>
      <p className="section-intro">Your departure city determines your flight routing, available dates, and final package price. Select your city to see relevant departures.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cities.map(([name, code, image]) => <a className="city-card" href="#departures" key={name}><div><img src={image} alt="" /><span>{code}</span></div><section><div className="city-name"><span className="plane-icon">✈</span><span>{name}<small>{code}</small></span></div><p>Explore Departures <b>→</b></p></section></a>)}</div>
    </section>
  );
}

function DeparturesSection() {
  return (
    <section id="departures" className="section-pad bg-[#fff9e9]">
      <div className="section-heading-row"><div><Eyebrow>Schedule</Eyebrow><h2 className="section-title">Upcoming Departures</h2></div><a href="#contact" className="text-link">View full schedule <span>→</span></a></div>
      <div className="mt-7 overflow-x-auto rounded-2xl border border-[#eee5d2] bg-[#fffef3] shadow-card">
        <table className="departure-table"><thead><tr>{["Departure city", "Airport", "Date", "Duration", "Package type", "Price from", ""].map((label) => <th key={label}>{label}</th>)}</tr></thead><tbody>
          {departures.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{i === 4 ? <span className={`type-pill ${cell.toLowerCase()}`}>{cell}</span> : i === 5 ? <strong className="table-price">{cell}<small> pp</small></strong> : cell}</td>)}<td><a href="#contact" className="book-btn">Book</a></td></tr>)}
        </tbody></table>
      </div>
    </section>
  );
}

function WhyCitySection() {
  const reasons = [
    ["Airport routing affects your journey", "Your departure airport determines the airline, layover cities, and total travel time. Some US cities offer direct connections through hub airports, reducing journey time significantly."],
    ["Prices vary by departure", "Flight costs from New York differ from Los Angeles or Houston. Tuyba sources competitive fares from each departure city — your package price reflects your specific origin."],
    ["Departure dates are city-specific", "Not every city departs every week. Available departure dates depend on airline scheduling and group capacity from your city. Book early for best date selection."],
    ["Route and duration may differ", "Some departure routes include a Madinah-first itinerary. Others begin in Makkah. Your city may influence the recommended journey sequence."],
  ];
  return (
    <section className="section-pad grid items-center gap-10 bg-[#fffef3] lg:grid-cols-[1fr_.95fr] lg:gap-16">
      <div><Eyebrow>Why it matters</Eyebrow><h2 className="section-title">Why Your Departure City Matters</h2><p className="section-intro">Unlike many travel agencies that offer generic packages, Tuyba builds each package around your departure city. Your origin affects every element of the journey.</p>
        <div className="mt-7 space-y-5">{reasons.map(([title, text], i) => <div className="reason-row" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      </div>
      <div className="why-image"><img src={photos.kaaba} alt="Pilgrims walking around the Kaaba at Masjid al-Haram" /></div>
    </section>
  );
}

function PackageTiers() {
  const tiers = [
    ["Essential", "$2,895", "View Essential", "tier-essential"],
    ["Comfort", "$3,495", "View Comfort", "tier-comfort"],
    ["Premium", "$4,995", "View Premium", "tier-premium"],
    ["Family", "$3,295", "View Family", "tier-family"],
  ];
  return (
    <section id="tiers" className="section-pad bg-[#fff9e9]">
      <Eyebrow>Compare</Eyebrow><h2 className="section-title">Which Package Is Right for You?</h2><p className="section-intro">Compare our four package tiers side by side to find the best fit.</p>
      <div className="tier-wrap mt-8"><table className="tier-table"><thead><tr><th>Feature</th>{tiers.map(([name, price]) => <th key={name}><span className={name === "Family" ? "pink" : ""}>{name}</span><strong>{price}</strong><small>from / person</small></th>)}</tr></thead><tbody>{features.map(([label, ...values]) => <tr key={label}><td>{label}</td>{values.map((value, i) => <td key={i}><span className={value === "✓" ? "yes" : value === "×" ? "no" : ""}>{value}</span></td>)}</tr>)}</tbody><tfoot><tr><td></td>{tiers.map(([name, , label, className]) => <td key={name}><a href="#contact" className={`tier-button ${className}`}>{label}</a></td>)}</tr></tfoot></table></div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Tell us where you’re travelling from", "Select your departure city and preferred travel dates. Your origin determines flight options, pricing, and availability."],
    ["02", "Explore your Umrah options", "Browse packages filtered for your city. Compare duration, hotel category, and inclusions side by side."],
    ["03", "Speak with a Tuyba specialist", "Our US-based team will walk you through your chosen package, answer every question, and guide you through the booking process."],
    ["04", "Prepare for departure", "Tuyba handles visa assistance, provides pre-departure guides, and remains available throughout your journey."],
  ];
  return (
    <section id="how-it-works" className="section-pad process-section">
      <div className="text-center"><Eyebrow>Process</Eyebrow><h2 className="section-title text-white">How It Works</h2><p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-white/65">From first search to departure gate, four straightforward steps.</p></div>
      <div className="mx-auto mt-9 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, text]) => <article className="step-card" key={number}><strong>{number}</strong><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
  );
}

function IncludedSection() {
  const included = [["Round-Trip Flights", "From your departure city to Jeddah or Madinah"], ["Makkah Hotel", "4 or 5-star accommodation near Masjid al-Haram"], ["Madinah Hotel", "4 or 5-star accommodation near Masjid an-Nabawi"], ["Ground Transfers", "Airport to hotel and between Makkah and Madinah"], ["Visa Assistance", "Full Umrah visa processing support for US citizens"], ["Travel Support", "US-based team available before and during your journey"]];
  const upgrades = [["Room Upgrade", "Superior or suite-category rooms in Makkah or Madinah"], ["Closer Hotel", "Upgrade to a hotel within walking meters of the Haram"], ["Private Transfer", "Dedicated vehicle instead of shared ground transport"], ["Extended Stay", "Add extra nights in Makkah, Madinah, or both"], ["Journey Consultation", "One-to-one session with a Tuyba journey specialist"]];
  return (
    <section className="section-pad bg-[#fffef3]"><Eyebrow>What’s included</Eyebrow><h2 className="section-title">Included & Optional Upgrades</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="included-card"><h3><span>✓</span>Included in Every Package</h3>{included.map(([title, text]) => <div className="included-row" key={title}><span>✓</span><div><strong>{title}</strong><small>{text}</small></div></div>)}</div>
        <div className="included-card upgrades"><h3><span>♙</span>Optional Upgrades</h3>{upgrades.map(([title, text]) => <div className="included-row" key={title}><span>＋</span><div><strong>{title}</strong><small>{text}</small></div></div>)}<a href="#contact" className="btn btn-dark mt-4 w-full">Enquire About Upgrades</a></div>
      </div>
    </section>
  );
}

function ItinerarySection() {
  return (
    <section className="section-pad grid gap-10 bg-[#fff9e9] lg:grid-cols-[.92fr_1.08fr]">
      <div><Eyebrow>Sample itinerary</Eyebrow><h2 className="section-title">A Sample 10-Night Journey</h2><p className="section-intro">This is an example itinerary for a 10-night Madinah-first package departing New York. Actual routing may vary by departure city and package type.</p>
        <div className="itinerary-list mt-7">{itinerary.map(([day, place, desc], i) => <div className="itinerary-row" key={day}><span className="itinerary-icon">{["✈", "☾", "♧", "▤", "♧", "✈"][i]}</span><div><small>{day}</small><strong>{place}</strong><p>{desc}</p></div></div>)}</div>
      </div>
      <div className="itinerary-photos"><div className="madinah-photo"><img src={photos.madinah} alt="The Prophet’s Mosque in Madinah" /><span>Madinah <small>4 nights</small></span></div><div className="makkah-photo"><img src={photos.kaaba} alt="The Kaaba at Masjid al-Haram in Makkah" /><span>Makkah <small>5 nights</small></span><aside><strong>Note:</strong> Makkah-first routing is also available. The recommended sequence depends on your airline and departure city.</aside></div></div>
    </section>
  );
}

function ResourcesSection() {
  const articles = [
    ["First-Time Guide", "8 min read", "What to Expect on Your First Umrah", "A complete overview of the Umrah rites, what to pack, and how to prepare spiritually and practically for the journey.", photos.kaaba],
    ["Visa & Documents", "5 min read", "Umrah Visa Requirements for US Citizens", "Everything you need to know about the Umrah visa application process, required documents, and current Saudi regulations.", photos.mosque],
    ["Ramadan", "6 min read", "Performing Umrah During Ramadan: What You Need to Know", "Ramadan Umrah is spiritually profound but logistically demanding. This guide covers what to expect and how to prepare.", photos.city],
  ];
  return (
    <section id="journal" className="section-pad bg-[#fffef3]">
      <div className="section-heading-row"><div><Eyebrow>The journal</Eyebrow><h2 className="section-title">Guides & Resources</h2></div><a href="#faq" className="text-link">All articles <span>→</span></a></div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{articles.map(([tag, read, title, text, image]) => <article className="article-card" key={title}><img src={image} alt="" /><div><div className="article-meta"><span>{tag}</span><small>{read}</small></div><h3>{title}</h3><p>{text}</p><a href="#faq" className="text-link">Read article <span>→</span></a></div></article>)}</div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    ["“Tuyba made our first Umrah genuinely seamless. The visa support alone saved us weeks of stress. Hotels were excellent — exactly as described.”", "Ahmed K.", "New York, NY"],
    ["“We travelled as a family of five, including two young children. The team accommodated every request. The experience in Makkah exceeded our expectations.”", "Fatima R.", "Chicago, IL"],
    ["“Professional, transparent, and genuinely caring. Booking from Houston felt just as smooth as I imagine it would from any major city.”", "Ibrahim S.", "Houston, TX"],
  ];
  return (
    <section id="reviews" className="section-pad bg-[#fff9e9]"><div className="text-center"><Eyebrow>Reviews & trust</Eyebrow><h2 className="section-title">Real Reviews from Tuyba Travellers</h2><p className="mt-3 text-sm"><span className="rating-stars">★★★★★</span> &nbsp;4.9 / 5.0 &nbsp;<span className="text-[#969088]">Based on 124 verified reviews</span></p></div>
      <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-3">{reviews.map(([quote, author, city]) => <article className="review-card" key={author}><div className="rating-stars">★★★★★</div><p>{quote}</p><strong>{author}</strong><small>{city}</small></article>)}</div>
      <div className="certifications"><h3>License & Certifications</h3><div>{["IATA Accredited", "ASTA Member", "Saudi Ministry Registered", "Bonded & Insured"].map((item) => <span key={item}><b>◈</b>{item}</span>)}</div></div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="section-pad bg-[#fffef3]"><Eyebrow>FAQ</Eyebrow><h2 className="section-title">Frequently Asked Questions</h2><p className="section-intro !mt-2">Everything you need to know before booking your Umrah package.</p>
      <div className="faq-grid mt-8">{faqs.map(([question, answer], i) => <article className={`faq-item ${open === i ? "open" : ""}`} key={question}><button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}><span>{question}</span><b>{open === i ? "−" : "⌄"}</b></button>{open === i && <p>{answer}</p>}</article>)}</div>
      <div className="mt-8 text-center"><p className="text-[13px] text-[#79746c]">Still have questions? Our team is ready to help.</p><a href="tel:18008892287" className="btn mt-4 !text-[12px]">Contact Tuyba Support</a></div>
    </section>
  );
}

function CTAFooter() {
  return (
    <>
      <section id="contact" className="cta-section"><Eyebrow>Begin your journey</Eyebrow><h2 className="serif">Ready to Plan Your Umrah from<br className="hidden sm:block" /> the USA?</h2><p>Speak with a Tuyba specialist today. We’ll help you find the right<br className="hidden sm:block" /> package, departure date, and hotel tier for your journey.</p><div><a href="mailto:hello@tuyba.com" className="btn">Get a Free Quote</a><a href="tel:18008892287" className="btn btn-outline"><span>♧</span> Call 1-800-TUYBA</a></div><small>No commitment required. US-based team, available Mon–Sat 9am–8pm ET.</small></section>
      <footer className="footer"><div className="footer-main"><div className="footer-brand"><BrandLogo light /><p>Umrah packages from the USA. Flights, hotels, and visa assistance — coordinated for travellers from over 12 US cities.</p><small>© 2025 Tuyba. All rights reserved.</small></div>
        <div><h3>Departure Cities</h3><a href="#cities">New York</a><a href="#cities">Los Angeles</a><a href="#cities">Chicago</a><a href="#cities">Houston</a><a href="#cities">Washington DC</a><a href="#cities">All cities</a></div>
        <div><h3>Packages</h3><a href="#packages">7 Nights</a><a href="#packages">10 Nights</a><a href="#packages">14 Nights</a><a href="#packages">Family Umrah</a><a href="#packages">Premium</a><a href="#packages">Ramadan Umrah</a></div>
        <div><h3>Company</h3><a href="#how-it-works">About Tuyba</a><a href="#journal">The Journal</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a><a href="#faq">Privacy Policy</a><a href="#faq">Terms</a></div>
      </div><div className="footer-bottom"><span>IATA Accredited · ASTA Member · Saudi Ministry Registered</span><span>1-800-TUYBA · hello@tuyba.com</span></div></footer>
    </>
  );
}

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = pageRef.current;
    if (!page) return;

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const counters = gsap.utils.toArray("[data-story-count]");

      if (prefersReducedMotion) {
        counters.forEach((counter) => {
          const target = Number(counter.dataset.storyCount);
          const suffix = counter.dataset.storySuffix ?? "";
          const formatted = Number.isInteger(target) ? target.toLocaleString("en-US") : target.toFixed(1);
          counter.textContent = `${formatted}${suffix}`;
        });
        gsap.set(".hero-about", { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(".hero-shade", { opacity: 0.58 });
        return;
      }

      const heroIntro = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroIntro
        .from(".hero-kicker", { autoAlpha: 0, y: 18, duration: 0.65 })
        .from(".hero-title", { autoAlpha: 0, y: 28, duration: 0.8 }, "-=0.38")
        .from(".hero-description", { autoAlpha: 0, y: 18, duration: 0.65 }, "-=0.42")
        .from(".hero-search", { autoAlpha: 0, y: 22, duration: 0.7 }, "-=0.3");

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-story",
          start: "top top+=72",
          end: "bottom bottom",
          scrub: 0.8,
          pin: ".hero-stage",
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(".hero-about", { autoAlpha: 0, y: 54, scale: 0.97 });
      storyTimeline
        .to(".hero-content", { y: -100, autoAlpha: 0, scale: 0.97, ease: "power1.inOut", duration: 0.44 }, 0.04)
        .to(".hero-shade", { opacity: 0.38, ease: "none", duration: 0.52 }, 0)
        .to(".hero-photo", { yPercent: 6, scale: 1.08, ease: "none", duration: 1 }, 0)
        .to(".hero-about", { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.46 }, 0.39);

      counters.forEach((counter, index) => {
        const target = Number(counter.dataset.storyCount);
        const suffix = counter.dataset.storySuffix ?? "";
        const count = { value: 0 };

        storyTimeline.to(count, {
          value: target,
          duration: 0.24,
          ease: "power1.out",
          onUpdate: () => {
            const formatted = Math.floor(count.value).toLocaleString("en-US");
            counter.textContent = `${formatted}${suffix}`;
          },
          onComplete: () => {
            counter.textContent = `${target.toLocaleString("en-US")}${suffix}`;
          },
        }, 0.68 + index * 0.04);
      });

      gsap.utils.toArray(
        ".hero-about > *, .section-title, .section-intro, .package-card, .journey-callout, .season-card, .city-card, .reason-row, .tier-wrap, .step-card, .included-card, .itinerary-row, .article-card, .review-card, .certifications, .faq-item, .cta-section > *"
      ).forEach((element) => {
        gsap.from(element, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, page);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef}>
      <Header /><Hero /><PackagesSection /><JourneyTypes /><SeasonSection /><CitiesSection /><DeparturesSection /><WhyCitySection /><PackageTiers /><HowItWorks /><IncludedSection /><ItinerarySection /><ResourcesSection /><ReviewsSection /><FAQSection /><CTAFooter />
    </main>
  );
}
