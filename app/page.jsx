"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  { name: "Makkah & Madinah Essential", tag: "Most Popular", nights: "10 Nights Package", city: "New York (JFK)", departureCity: "new-york", travelMonth: "2026-12", maxTravelers: 4, maxInfants: 1, dates: "Dec 12 – Dec 22, 2026", hotels: "4-Star", price: "$2,895", rating: "4.8", reviews: "124", image: "/images/umrah-package-card1.jpg" },
  { name: "Madinah First Comfort Package", tag: "Comfort", nights: "14 Nights Package", city: "Chicago (ORD)", departureCity: "chicago", travelMonth: "2027-01", maxTravelers: 6, maxInfants: 2, dates: "Jan 4 – Jan 18, 2027", hotels: "5-Star", price: "$3,795", rating: "4.9", reviews: "87", image: "/images/umrah-package-card2.jpg" },
  { name: "Premium Close-to-Haram Stay", tag: "Premium", nights: "10 Nights Package", city: "Los Angeles (LAX)", departureCity: "los-angeles", travelMonth: "2027-02", maxTravelers: 5, maxInfants: 1, dates: "Feb 8 – Feb 18, 2027", hotels: "5-Star Deluxe", price: "$4,995", rating: "5.0", reviews: "56", image: "/images/umrah-package-card3.jpg" },
];

const searchCities = [
  { id: "new-york", label: "New York", airports: "JFK, EWR" },
  { id: "new-jersey", label: "New Jersey", airports: "EWR, JFK" },
  { id: "michigan", label: "Michigan", airports: "DTW" },
  { id: "houston", label: "Texas – Houston", airports: "IAH" },
  { id: "los-angeles", label: "Los Angeles", airports: "LAX" },
  { id: "chicago", label: "Chicago", airports: "ORD, MDW" },
  { id: "washington-dc", label: "Washington DC", airports: "IAD, DCA" },
  { id: "dallas", label: "Texas – Dallas", airports: "DFW" },
  { id: "philadelphia", label: "Philadelphia", airports: "PHL" },
  { id: "atlanta", label: "Atlanta", airports: "ATL" },
  { id: "boston", label: "Boston", airports: "BOS" },
  { id: "minneapolis", label: "Minneapolis", airports: "MSP" },
];

const searchMonths = [
  ["2026-12", "December 2026", "Dec", "2026"],
  ["2027-01", "January 2027", "Jan", "2027"],
  ["2027-02", "February 2027", "Feb", "2027"],
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
  { city: "New York", airport: "JFK", date: "Mar 15, 2025", duration: "10 nights", tier: "Essential", price: "$2,895" },
  { city: "Chicago", airport: "O’Hare", date: "Mar 22, 2025", duration: "14 nights", tier: "Comfort", price: "$3,795" },
  { city: "Houston", airport: "IAH", date: "Apr 5, 2025", duration: "7 nights", tier: "Essential", price: "$2,295" },
  { city: "Los Angeles", airport: "LAX", date: "Apr 12, 2025", duration: "10 nights", tier: "Premium", price: "$4,495" },
  { city: "Washington DC", airport: "IAD", date: "Apr 19, 2025", duration: "14 nights", tier: "Family", price: "$3,495" },
  { city: "Dallas", airport: "DFW", date: "May 3, 2025", duration: "7 nights", tier: "Essential", price: "$2,195" },
  { city: "Atlanta", airport: "ATL", date: "May 10, 2025", duration: "10 nights", tier: "Comfort", price: "$3,195" },
  { city: "Detroit", airport: "DTW", date: "May 17, 2025", duration: "14 nights", tier: "Family", price: "$3,295" },
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

function PackageIcon({ name }) {
  const icons = {
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    family: <><path d="M12 4a4 4 0 0 1 4 4c0 2.5-3 6-4 8-1-2-4-5.5-4-8a4 4 0 0 1 4-4z" /><path d="M7 14c-2 1-3 3-3 5h16c0-2-1-4-3-5" /></>,
    premium: <><path d="M2 4v16M2 8h20v12M2 17h20" /><path d="M6 8V5l3 2 3-2 3 2 3-2v3" /></>,
    ramadan: <path d="M12 2v4M4.93 10.93l2.83 2.83M2 18h20M20 18a8 8 0 0 0-16 0" />,
    group: <><path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M8 3h8l1 3H7l1-3z" /></>,
  };

  return <svg className="package-menu-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B3C3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function BrandLogo({ light = false }) {
  return <a className="brand-logo-link" href="#" aria-label="Tuyba home"><img className={`brand-logo${light ? " brand-logo-light" : ""}`} src={light ? "/images/logo-white.png" : "/images/logo.png"} alt="Tuyba" /></a>;
}

function Header({ onRequestQuote }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [signInComplete, setSignInComplete] = useState(false);
  const headerRef = useRef(null);
  const clickedDropdown = useRef(null);
  const packagesMenu = [
    ["moon", "7-Night Umrah"],
    ["moon", "10-Night Umrah"],
    ["moon", "14-Night Umrah"],
    ["family", "Family Umrah"],
    ["premium", "Premium Umrah"],
    ["ramadan", "Ramadan Umrah"],
    ["group", "Group Umrah"],
  ];
  const departureColumns = [
    [["New York", "JFK, EWR"], ["Michigan", "DTW"], ["California", "LAX"], ["Washington DC", "IAD, DCA"], ["Philadelphia", "PHL"], ["Boston", "BOS"]],
    [["New Jersey", "EWR, JFK"], ["Texas - Houston", "IAH"], ["Illinois", "ORD, MDW"], ["Texas - Dallas", "DFW"], ["Atlanta", "ATL"], ["Minneapolis", "MSP"]],
  ];

  useEffect(() => {
    if (!activeModal && !openDropdown) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
        setOpenDropdown(null);
        clickedDropdown.current = null;
      }
    };
    const handlePointerDown = (event) => {
      if (openDropdown && !headerRef.current?.contains(event.target)) {
        setOpenDropdown(null);
        clickedDropdown.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeModal, openDropdown]);

  useEffect(() => {
    if (!activeModal) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModal]);

  const closeModal = () => {
    setActiveModal(null);
  };

  const openSignIn = () => {
    setOpenDropdown(null);
    clickedDropdown.current = null;
    setActiveModal("sign-in");
    setSignInComplete(false);
  };

  const handleDropdownClick = (dropdown) => {
    if (clickedDropdown.current === dropdown) {
      clickedDropdown.current = null;
      setOpenDropdown(null);
      return;
    }
    clickedDropdown.current = dropdown;
    setOpenDropdown(dropdown);
  };

  const handleDropdownHover = (dropdown) => {
    if (clickedDropdown.current && clickedDropdown.current !== dropdown) {
      clickedDropdown.current = null;
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownLeave = (dropdown) => {
    if (clickedDropdown.current !== dropdown) setOpenDropdown(null);
  };

  return (
    <>
      <header ref={headerRef} className="site-header sticky top-0 z-50 border-b border-[#ece5d7] bg-[#fffdf5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 md:px-[5.4vw]">
        <BrandLogo />
        <nav className={`${menuOpen ? "flex" : "hidden"} header-nav absolute left-0 right-0 top-[71px] flex-col gap-2 border-b border-[#eee5d2] bg-[#fffdf5] px-4 py-4 md:static md:mr-auto md:ml-6 md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0`}>
          <div className="header-dropdown" onMouseEnter={() => handleDropdownHover("packages")} onMouseLeave={() => handleDropdownLeave("packages")}>
            <button type="button" className={`header-nav-trigger${openDropdown === "packages" ? " is-active" : ""}`} aria-expanded={openDropdown === "packages"} aria-controls="packages-dropdown" onClick={() => handleDropdownClick("packages")}>
              Packages <span className="nav-chevron" aria-hidden="true">{openDropdown === "packages" ? "⌃" : "⌄"}</span>
            </button>
            {openDropdown === "packages" && (
              <div id="packages-dropdown" className="dropdown-card packages-dropdown">
                {packagesMenu.map(([icon, label]) => (
                  <a key={label} className="package-menu-link" href="#packages" onClick={() => { setOpenDropdown(null); clickedDropdown.current = null; setMenuOpen(false); }}>
                    <span className="package-menu-icon"><PackageIcon name={icon} /></span>{label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="header-dropdown" onMouseEnter={() => handleDropdownHover("cities")} onMouseLeave={() => handleDropdownLeave("cities")}>
            <button type="button" className={`header-nav-trigger${openDropdown === "cities" ? " is-active" : ""}`} aria-expanded={openDropdown === "cities"} aria-controls="cities-dropdown" onClick={() => handleDropdownClick("cities")}>
              Departure Cities <span className="nav-chevron" aria-hidden="true">{openDropdown === "cities" ? "⌃" : "⌄"}</span>
            </button>
            {openDropdown === "cities" && (
              <div id="cities-dropdown" className="dropdown-card cities-dropdown">
                {departureColumns.map((column, columnIndex) => (
                  <div className="cities-dropdown-column" key={columnIndex}>
                    {column.map(([city, airports]) => (
                      <a key={city} href="#cities" className="city-menu-link" onClick={() => { setOpenDropdown(null); clickedDropdown.current = null; setMenuOpen(false); }}>
                        <strong>{city}</strong><span>{airports}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <a href="#how-it-works" onClick={() => { setOpenDropdown(null); clickedDropdown.current = null; setMenuOpen(false); }}>How It Works</a>
          <a href="#journal" onClick={() => { setOpenDropdown(null); clickedDropdown.current = null; setMenuOpen(false); }}>Journal</a>
        </nav>
        <div className="header-utilities flex items-center gap-2 md:gap-3">
          <a href="tel:18008892287" className="phone-link"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 3.5h3.2l1.6 4.1-2 1.7a15 15 0 0 0 6.9 6.9l1.7-2 4.1 1.6V19a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.7 2 2 0 0 1 5 3.5Z" /></svg> <span>1-800-TUYBA</span></a>
          <button type="button" className="btn btn-outline header-action-button" onClick={openSignIn}>Sign In</button>
          <button type="button" className="btn header-action-button" onClick={() => onRequestQuote({ title: "Get a Quote" })}>Get a Quote</button>
        </div>
        <button type="button" className="menu-toggle md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setOpenDropdown(null); clickedDropdown.current = null; }}>{menuOpen ? "×" : "☰"}</button>
      </div>
      </header>
      {activeModal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="active-modal-title">
            <div className="modal-header">
              <h2 id="active-modal-title">Sign In to Tuyba</h2>
              <button type="button" className="modal-close" aria-label="Close dialog" onClick={closeModal}>×</button>
            </div>
            {activeModal === "sign-in" && (
              signInComplete ? (
                <div className="sign-in-success">
                  <span className="success-check" aria-hidden="true">✓</span>
                  <h3>You are signed in</h3>
                  <p>Your saved packages and quotes are now available.</p>
                  <button type="button" className="btn btn-outline success-done" onClick={closeModal}>Done</button>
                </div>
              ) : (
                <form className="modal-form sign-in-form" onSubmit={(event) => { event.preventDefault(); setSignInComplete(true); }}>
                  <label>Email<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label>
                  <label>Password<input type="password" name="password" autoComplete="current-password" required /></label>
                  <button type="submit" className="btn modal-submit">Sign In</button>
                </form>
              )
            )}
          </section>
        </div>
      )}
    </>
  );
}

function QuoteRequestModal({ request, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const digitsInPhone = (phone.match(/\d/g) || []).length;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = digitsInPhone >= 7 && digitsInPhone <= 15;
  const departureCity = searchCities.find((city) => (
    city.id === request.city
    || city.label.toLowerCase() === request.city?.toLowerCase()
    || (request.airport && city.airports.split(", ").includes(request.airport))
  ));
  const departureMonth = request.month || "";
  const title = request.title || "Get a Quote";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal-card quote-request-card" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
        <div className="modal-header">
          <h2 id="quote-modal-title">{title}</h2>
          <button type="button" className="modal-close" aria-label="Close dialog" onClick={onClose}>×</button>
        </div>
        {submitted ? (
          <div className="sign-in-success quote-success">
            <span className="success-check" aria-hidden="true">✓</span>
            <h3>Request received</h3>
            <p>A Tuyba specialist will contact you to confirm availability and dates. You will not be charged yet.</p>
            <button type="button" className="btn btn-outline success-done" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            {request.name && (
              <div className="quote-package-summary">
                <div>
                  <strong>{request.name}</strong>
                  <span>{request.metadata || "Package details will be confirmed by a specialist."}</span>
                </div>
                {request.price && <b>{request.price}</b>}
              </div>
            )}
            <form className="modal-form quote-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <label>Full name<span className="validated-input"><input type="text" name="name" placeholder="First and last name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />{name.trim() && <span className="input-valid-check" aria-label="Valid full name"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" /><path d="m6.5 10 2.2 2.2 4.8-4.8" /></svg></span>}</span></label>
              <div className="modal-field-row">
                <label>Email<span className="validated-input"><input type="email" name="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />{emailValid && <span className="input-valid-check" aria-label="Valid email"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" /><path d="m6.5 10 2.2 2.2 4.8-4.8" /></svg></span>}</span></label>
                <label>Phone<span className="validated-input"><input type="tel" name="phone" placeholder="(555) 000-0000" autoComplete="tel" value={phone} onChange={(event) => { setPhone(event.target.value); const digits = (event.target.value.match(/\d/g) || []).length; event.currentTarget.setCustomValidity(!event.target.value || (digits >= 7 && digits <= 15) ? "" : "Enter a phone number with 7 to 15 digits."); }} onInvalid={(event) => { const digits = (event.currentTarget.value.match(/\d/g) || []).length; event.currentTarget.setCustomValidity(digits >= 7 && digits <= 15 ? "" : "Enter a phone number with 7 to 15 digits."); }} title="Enter a phone number with 7 to 15 digits." required />{phoneValid && <span className="input-valid-check" aria-label="Valid phone number"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" /><path d="m6.5 10 2.2 2.2 4.8-4.8" /></svg></span>}</span></label>
              </div>
              <div className="modal-field-row">
                <label>Departure city<select name="city" defaultValue={departureCity?.id || ""} required><option value="" disabled>Select a city</option>{searchCities.map((city) => <option key={city.id} value={city.id}>{city.label} ({city.airports})</option>)}</select></label>
                <label>Travel month <span className="optional-label">(Optional)</span><select name="month" defaultValue={departureMonth}><option value="">I’m flexible</option>{[...searchMonths, ["2026-10", "October 2026", "Oct", "2026"], ["2026-11", "November 2026", "Nov", "2026"], ["2027-03", "March 2027", "Mar", "2027"]].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              </div>
              <button type="submit" className="btn modal-submit">Request a Quote</button>
              <p className="quote-note">You will not be charged yet. A specialist confirms availability first.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Hero({ onSearch }) {
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
            <div className="hero-search"><SearchBar onSearch={onSearch} /></div>
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

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState({ adults: 2, children: 0, infants: 0 });
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchRef = useRef(null);
  const selectedCity = searchCities.find((item) => item.id === city);
  const selectedMonth = searchMonths.find(([value]) => value === month);
  const totalTravellers = travellers.adults + travellers.children + travellers.infants;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!searchRef.current?.contains(event.target)) setOpenDropdown(null);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const updateTravellers = (type, delta) => {
    setTravellers((current) => ({
      ...current,
      [type]: Math.max(type === "adults" ? 1 : 0, Math.min(type === "adults" ? 9 : 6, current[type] + delta)),
    }));
  };

  const submitSearch = (event) => {
    event.preventDefault();
    setOpenDropdown(null);
    onSearch({ city, month, ...travellers });
  };

  return (
    <form ref={searchRef} className="search-panel mt-10" onSubmit={submitSearch}>
      <div className="search-control-wrap">
        <button type="button" className={`search-field search-field-button${openDropdown === "city" ? " is-open" : ""}`} aria-label={`Departing from ${selectedCity ? `${selectedCity.label} (${selectedCity.airports})` : "Select city"}`} aria-expanded={openDropdown === "city"} onClick={() => setOpenDropdown(openDropdown === "city" ? null : "city")}>
          <svg className="search-field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
          <span className="search-field-copy"><small>Departing from</small><strong>{selectedCity ? selectedCity.label : "Select city"}</strong></span>
          <span className="search-field-chevron" aria-hidden="true">{openDropdown === "city" ? "⌃" : "⌄"}</span>
        </button>
        {openDropdown === "city" && (
          <div className="search-popover city-search-popover">
            {searchCities.map((item) => (
              <button type="button" key={item.id} className={`search-city-option${city === item.id ? " selected" : ""}`} onClick={() => { setCity(item.id); setOpenDropdown(null); }}>
                <span><strong>{item.label}</strong><small>{item.airports}</small></span>{city === item.id && <span className="search-selected-check" aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="search-control-wrap">
        <button type="button" className={`search-field search-field-button${openDropdown === "month" ? " is-open" : ""}`} aria-label={`When ${selectedMonth ? selectedMonth[1] : "Flexible dates"}`} aria-expanded={openDropdown === "month"} onClick={() => setOpenDropdown(openDropdown === "month" ? null : "month")}>
          <svg className="search-field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
          <span className="search-field-copy"><small>When</small><strong>{selectedMonth ? selectedMonth[1] : "Flexible dates"}</strong></span>
        </button>
        {openDropdown === "month" && (
          <div className="search-popover month-search-popover">
            <strong className="search-popover-title">Choose a travel month</strong>
            <div className="search-month-grid">
              {searchMonths.map(([value, label, shortMonth, year]) => (
                <button type="button" key={value} className={`search-month-option${month === value ? " selected" : ""}`} aria-label={label} aria-pressed={month === value} onClick={() => { setMonth(value); setOpenDropdown(null); }}>
                  <strong>{shortMonth}</strong><span>{year}</span>
                </button>
              ))}
            </div>
            <button type="button" className={`search-flexible-option${!month ? " selected" : ""}`} onClick={() => { setMonth(""); setOpenDropdown(null); }}>I’m flexible</button>
          </div>
        )}
      </div>
      <div className="search-control-wrap">
        <button type="button" className={`search-field search-field-button traveller-field${openDropdown === "travellers" ? " is-open" : ""}`} aria-label={`${totalTravellers} travellers`} aria-expanded={openDropdown === "travellers"} onClick={() => setOpenDropdown(openDropdown === "travellers" ? null : "travellers")}>
          <svg className="search-field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-7.5a4 4 0 0 1 0 7.75M20 15a4 4 0 0 1 2 3.5V21" /></svg>
          <span className="search-field-copy"><small>Travellers</small><span className="traveller-summary"><b>{totalTravellers}</b></span></span>
        </button>
        {openDropdown === "travellers" && (
          <div className="search-popover traveller-search-popover">
            {["adults", "children", "infants"].map((type) => (
              <div className="traveller-counter-row" key={type}>
                <span><strong>{type[0].toUpperCase() + type.slice(1)}</strong><small>{type === "adults" ? "Age 12+" : type === "children" ? "Age 2–11" : "Under 2"}</small></span>
                <div className="traveller-counter">
                  <button type="button" onClick={() => updateTravellers(type, -1)} aria-label={`Remove ${type.slice(0, -1)}`} disabled={travellers[type] <= (type === "adults" ? 1 : 0)}>−</button>
                  <b>{travellers[type]}</b>
                  <button type="button" onClick={() => updateTravellers(type, 1)} aria-label={`Add ${type.slice(0, -1)}`} disabled={travellers[type] >= (type === "adults" ? 9 : 6)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="btn search-submit"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>Search</button>
    </form>
  );
}

function PackagesSection({ searchFilters, onRequestQuote }) {
  const filteredPackages = packages.filter((item) => (
    (!searchFilters || !searchFilters.city || item.departureCity === searchFilters.city)
    && (!searchFilters || !searchFilters.month || item.travelMonth === searchFilters.month)
    && (!searchFilters || searchFilters.adults + searchFilters.children + searchFilters.infants <= item.maxTravelers)
    && (!searchFilters || searchFilters.infants <= item.maxInfants)
  ));
  const selectedCity = searchFilters?.city && searchCities.find((item) => item.id === searchFilters.city);
  const selectedMonth = searchFilters?.month && searchMonths.find(([value]) => value === searchFilters.month);
  const guestsChanged = searchFilters && (searchFilters.adults !== 2 || searchFilters.children > 0 || searchFilters.infants > 0);
  const childLabel = searchFilters?.children === 1 ? "child" : "children";
  const infantLabel = searchFilters?.infants === 1 ? "infant" : "infants";

  return (
    <section id="packages" className="section-pad bg-[#fff9e9]">
      <div className="section-heading-row">
        <div><Eyebrow>Featured packages</Eyebrow><h2 className="section-title">Umrah Packages from the USA</h2><p className="section-intro">Carefully coordinated packages including flights, hotels, and full ground support departing from your city.</p></div>
        <a href="#tiers" className="text-link">View all packages <span>→</span></a>
      </div>
      {searchFilters && (
        <div className="search-active-filters" aria-label="Active search filters">
          {selectedCity && <span className="search-filter-chip">Departure: {selectedCity.label} ({selectedCity.airports})</span>}
          {selectedMonth && <span className="search-filter-chip">When: {selectedMonth[1]}</span>}
          {guestsChanged && <span className="search-filter-chip">Guests: {searchFilters.adults} adults · {searchFilters.children} {childLabel} · {searchFilters.infants} {infantLabel}</span>}
        </div>
      )}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filteredPackages.map((item) => <article className="package-card" key={item.name}>
          <div className="package-image"><img src={item.image} alt="" /><span className="image-tag">{item.tag}</span><strong>{item.nights}</strong></div>
          <div className="package-content">
            <h3>{item.name}</h3><div className="rating"><span>★★★★★</span> {item.rating} <small>({item.reviews} reviews)</small></div>
            <div className="package-card-details">
              <div className="package-meta package-card-meta"><span className="package-card-info-item">⌖ {item.city}</span><span className="package-card-info-item">▢ {item.dates}</span></div>
              <div className="package-meta package-card-meta"><span className="package-card-info-item">5n Makkah · 4n Madinah</span><span className="package-card-info-item">{item.hotels}</span></div>
            </div>
            <div className="price-row"><strong>{item.price}</strong><span>/ person</span></div><small className="muted-caption">Per person, double occupancy</small>
            <button type="button" className="btn mt-5 w-full" onClick={() => onRequestQuote({
              title: "Request this package",
              name: item.name,
              metadata: `${item.city} · ${item.dates} · ${item.nights.replace(" Package", "")} · ${item.tag === "Most Popular" ? "Essential" : item.tag}`,
              city: item.departureCity,
              month: item.travelMonth,
              price: item.price,
            })}>View Package</button>
          </div>
        </article>)}
      </div>
      {searchFilters && filteredPackages.length === 0 && <p className="search-empty-state" role="status">No packages match these choices. Try another city, month, or traveller count.</p>}
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

function DeparturesSection({ onRequestQuote }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Essential", "Comfort", "Premium", "Family"];
  const visibleDepartures = departures.filter((departure) => activeFilter === "All" || departure.tier === activeFilter);

  return (
    <section id="departures" className="section-pad bg-[#fff9e9]">
      <div className="section-heading-row departure-heading"><div><Eyebrow>Schedule</Eyebrow><h2 className="section-title">Upcoming Departures</h2></div><div className="departure-filters" role="group" aria-label="Filter departures by package type">{filters.map((filter) => <button type="button" key={filter} className={`departure-filter${activeFilter === filter ? " active" : ""}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
      <div className="departure-table-wrap overflow-x-auto rounded-2xl border border-[#eee5d2] bg-[#fffef3] shadow-card">
        <table className="departure-table"><thead><tr>{["Departure city", "Airport", "Date", "Duration", "Package type", "Price from", ""].map((label) => <th key={label}>{label}</th>)}</tr></thead><tbody>
          {visibleDepartures.map((row) => <tr key={`${row.city}-${row.date}`}><td>{row.city}</td><td>{row.airport}</td><td>{row.date}</td><td>{row.duration}</td><td><span className={`type-pill ${row.tier.toLowerCase()}`}>{row.tier}</span></td><td><strong className="table-price">{row.price}<small> pp</small></strong></td><td><button type="button" className="book-btn" onClick={() => onRequestQuote({
            title: "Book this departure",
            name: `${row.city} (${row.airport}) · ${row.date}`,
            metadata: `${row.duration} · ${row.tier}`,
            city: row.city,
            airport: row.airport,
            price: row.price,
          })}>Book</button></td></tr>)}
        </tbody></table>
      </div>
      <div className="departure-schedule-link-wrap">
        <button
          type="button"
          className="view-schedule-link"
          onClick={() => onRequestQuote({
            title: "View Full Schedule",
            name: "Upcoming Umrah departures",
            metadata: "Get the complete list of departure cities, dates, durations, and package options.",
          })}
        >
          View full schedule <span className="arrow" aria-hidden="true">→</span>
        </button>
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

function PackageTiers({ onRequestQuote }) {
  const tiers = [
    ["Essential", "$2,895", "View Essential", "tier-essential"],
    ["Comfort", "$3,495", "View Comfort", "tier-comfort"],
    ["Premium", "$4,995", "View Premium", "tier-premium"],
    ["Family", "$3,295", "View Family", "tier-family"],
  ];
  return (
    <section id="tiers" className="section-pad bg-[#fff9e9]">
      <Eyebrow>Compare</Eyebrow><h2 className="section-title">Which Package Is Right for You?</h2><p className="section-intro">Compare our four package tiers side by side to find the best fit.</p>
      <div className="tier-wrap mt-8"><table className="tier-table"><thead><tr><th>Feature</th>{tiers.map(([name, price]) => <th key={name}><span className={name === "Family" ? "pink" : ""}>{name}{name === "Comfort" && <em className="recommended-badge">Recommended</em>}</span><strong>{price}</strong><small>from / person</small></th>)}</tr></thead><tbody>{features.map(([label, ...values]) => <tr key={label}><td>{label}</td>{values.map((value, i) => <td key={i}><span className={value === "✓" ? "yes" : value === "×" ? "no" : ""}>{value}</span></td>)}</tr>)}</tbody><tfoot><tr><td><div className="tier-action-cell" /></td>{tiers.map(([name, price, label, className]) => <td key={name}><div className="tier-action-cell"><button type="button" className={`tier-button ${className}`} onClick={() => onRequestQuote({ title: `${name} package`, name: `${name} package`, metadata: "Price from, per person", price })}>{label}</button></div></td>)}</tr></tfoot></table></div>
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

function FAQSection({ onRequestQuote }) {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="section-pad bg-[#fffef3]"><Eyebrow>FAQ</Eyebrow><h2 className="section-title">Frequently Asked Questions</h2><p className="section-intro !mt-2">Everything you need to know before booking your Umrah package.</p>
      <div className="faq-grid mt-8">{faqs.map(([question, answer], i) => <article className={`faq-item ${open === i ? "open" : ""}`} key={question}><button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}><span>{question}</span><b>{open === i ? "−" : "⌄"}</b></button>{open === i && <p>{answer}</p>}</article>)}</div>
      <div className="mt-8 text-center"><p className="text-[13px] text-[#79746c]">Still have questions? Our team is ready to help.</p><button type="button" className="btn mt-4 !text-[12px]" onClick={() => onRequestQuote({ title: "Contact Tuyba Support" })}>Contact Tuyba Support</button></div>
    </section>
  );
}

function CTAFooter({ onRequestQuote }) {
  return (
    <>
      <section id="contact" className="cta-section"><Eyebrow>Begin your journey</Eyebrow><h2 className="serif">Ready to Plan Your Umrah from<br className="hidden sm:block" /> the USA?</h2><p>Speak with a Tuyba specialist today. We’ll help you find the right<br className="hidden sm:block" /> package, departure date, and hotel tier for your journey.</p><div><button type="button" className="btn" onClick={() => onRequestQuote({ title: "Get a Free Quote" })}>Get a Free Quote</button><a href="tel:18008892287" className="btn btn-outline"><span>♧</span> Call 1-800-TUYBA</a></div><small>No commitment required. US-based team, available Mon–Sat 9am–8pm ET.</small></section>
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
  const [searchFilters, setSearchFilters] = useState(null);
  const [quoteRequest, setQuoteRequest] = useState(null);

  const closeQuoteModal = useCallback(() => setQuoteRequest(null), []);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    window.requestAnimationFrame(() => {
      document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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
      <Header onRequestQuote={setQuoteRequest} /><Hero onSearch={handleSearch} /><PackagesSection searchFilters={searchFilters} onRequestQuote={setQuoteRequest} /><JourneyTypes /><SeasonSection /><CitiesSection /><DeparturesSection onRequestQuote={setQuoteRequest} /><WhyCitySection /><PackageTiers onRequestQuote={setQuoteRequest} /><HowItWorks /><IncludedSection /><ItinerarySection /><ResourcesSection /><ReviewsSection /><FAQSection onRequestQuote={setQuoteRequest} /><CTAFooter onRequestQuote={setQuoteRequest} />
      {quoteRequest && <QuoteRequestModal request={quoteRequest} onClose={closeQuoteModal} />}
    </main>
  );
}
