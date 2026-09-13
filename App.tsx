import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock3,
  Instagram,
  Menu as MenuIcon,
  Minus,
  Plus,
  Star,
  X,
} from 'lucide-react';

type Venue = 'restaurant' | 'bar';
type MenuTab = 'lunch' | 'dinner' | 'wine';

const foodImage = 'https://images.pexels.com/photos/33097101/pexels-photo-33097101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const tableImage = 'https://images.pexels.com/photos/3953852/pexels-photo-3953852.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const wineImage = 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

type MenuItem = { name: string; detail: string; price: string; tag?: string };

const menuItems: Record<MenuTab, MenuItem[]> = {
  lunch: [
    { name: 'Sourdough, cultured butter', detail: 'house seaweed salt', price: '5' },
    { name: 'Raw scallop', detail: 'green strawberry, sorrel, marigold', price: '16', tag: 'GF' },
    { name: 'Comté gougères', detail: 'black pepper, chive', price: '8', tag: 'V' },
    { name: 'Roasted hispi cabbage', detail: 'barley miso, hazelnut, burnt onion', price: '14', tag: 'V' },
    { name: 'Market fish', detail: 'courgette, shellfish bisque, basil', price: '24', tag: 'GF' },
  ],
  dinner: [
    { name: 'Sourdough, cultured butter', detail: 'house seaweed salt', price: '5' },
    { name: 'Chicken liver parfait', detail: 'blackberry, toast, pickled mustard', price: '13' },
    { name: 'Cornish crab', detail: 'tomato, nasturtium, smoked oil', price: '19', tag: 'GF' },
    { name: 'Potato agnolotti', detail: 'aged parmesan, cep, brown butter', price: '22', tag: 'V' },
    { name: 'Aged duck breast', detail: 'beetroot, plum, lovage', price: '29', tag: 'GF' },
  ],
  wine: [
    { name: 'Crispy, chilled & bright', detail: 'skin-contact whites, pét-nats and alpine reds', price: 'from 9' },
    { name: 'The Levan classics', detail: 'grower Champagne, cool-climate Chardonnay', price: 'from 14' },
    { name: 'Low intervention', detail: 'bottles made with patience and a little wildness', price: 'from 42' },
    { name: 'Bar snacks', detail: 'gougères, anchovy toast, smoked almonds', price: 'from 5' },
  ],
};

const press = [
  ['The Guardian', '“A brilliantly considered, deeply pleasurable meal.”'],
  ['Michelin Guide', '“A Peckham original with serious culinary ambition.”'],
  ['Evening Standard', '“One of south London’s most exciting tables.”'],
];

function App() {
  const [venue, setVenue] = useState<Venue>('restaurant');
  const [menuTab, setMenuTab] = useState<MenuTab>('dinner');
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [privateHireOpen, setPrivateHireOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [partySize, setPartySize] = useState(2);
  const [newsletterSent, setNewsletterSent] = useState(false);

  const visibleItems = menuItems[menuTab].filter((item) => !vegetarian || item.tag === 'V');

  return (
    <div className="site-shell">
      <div className="announcement">Now accepting festive enquiries for December <ArrowUpRight size={14} /></div>
      <header className="nav-wrap">
        <a className="wordmark" href="#top" aria-label="Levan home">LEVAN<span>·</span></a>
        <nav className={`main-nav ${mobileNavOpen ? 'is-open' : ''}`}>
          <a href="#story" onClick={() => setMobileNavOpen(false)}>Our story</a>
          <a href="#menu" onClick={() => { setMobileNavOpen(false); setMenuOpen(true); }}>Menus</a>
          <a href="#visit" onClick={() => setMobileNavOpen(false)}>Find us</a>
          <button className="nav-book" onClick={() => { setBookingOpen(true); setMobileNavOpen(false); }}>Book a table <ArrowUpRight size={15} /></button>
        </nav>
        <button className="mobile-menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle menu">
          {mobileNavOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(23, 38, 31, .72) 0%, rgba(23, 38, 31, .2) 70%), url(${foodImage})` }} />
          <div className="hero-content">
            <p className="eyebrow light">Peckham · South London</p>
            <h1>Good food.<br /><em>Good mood.</em></h1>
            <p className="hero-copy">Seasonal, inventive cooking and low-intervention wines in a relaxed neighbourhood setting.</p>
            <div className="hero-actions">
              <button className="button button-cream" onClick={() => setBookingOpen(true)}>Book a table <ArrowUpRight size={16} /></button>
              <a className="text-link light-link" href="#menu">Explore the menus <ArrowDown size={16} /></a>
            </div>
          </div>
          <div className="hero-note"><span>Open Tuesday — Sunday</span><span>1 min from Peckham Rye</span></div>
        </section>

        <section className="venue-switcher section-pad">
          <div className="section-heading compact-heading"><p className="eyebrow">Two ways to spend an evening</p><h2>Choose your Levan</h2></div>
          <div className="venue-grid">
            <button className={`venue-card ${venue === 'restaurant' ? 'active' : ''}`} onClick={() => setVenue('restaurant')}>
              <div className="venue-card-image" style={{ backgroundImage: `url(${tableImage})` }} />
              <div className="venue-card-content"><div><p className="eyebrow">The restaurant</p><h3>Levan</h3><p>Refined, seasonal plates made for lingering over.</p></div><span className="circle-arrow"><ArrowUpRight size={18} /></span></div>
            </button>
            <button className={`venue-card ${venue === 'bar' ? 'active' : ''}`} onClick={() => setVenue('bar')}>
              <div className="venue-card-image" style={{ backgroundImage: `url(${wineImage})` }} />
              <div className="venue-card-content"><div><p className="eyebrow">Next door</p><h3>Bar Levan</h3><p>Natural wines, small plates and a good excuse to stay late.</p></div><span className="circle-arrow"><ArrowUpRight size={18} /></span></div>
            </button>
          </div>
          <div className="venue-status"><span className="status-dot" /> You’re viewing <strong>{venue === 'restaurant' ? 'Levan Restaurant' : 'Bar Levan'}</strong><span className="status-divider" /> {venue === 'restaurant' ? 'Bookings recommended' : 'Walk-ins always welcome'}</div>
        </section>

        <section className="booking-strip">
          <div><p className="eyebrow light">Make a night of it</p><h2>{venue === 'restaurant' ? 'Reserve your table at Levan.' : 'Drop into Bar Levan.'}</h2><p>{venue === 'restaurant' ? 'Lunch Tuesday–Sunday. Dinner Tuesday–Saturday.' : 'Wine, snacks and easy evenings next door.'}</p></div>
          <button className="button button-cream" onClick={() => setBookingOpen(true)}>{venue === 'restaurant' ? 'Book a table' : 'Book the bar'} <ArrowUpRight size={16} /></button>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="menu-top"><div className="section-heading"><p className="eyebrow">The good stuff</p><h2>Menus</h2><p>Our menus move with the seasons. Come hungry, leave happy.</p></div><button className="outline-button" onClick={() => setMenuOpen(true)}>View full menus <ArrowUpRight size={16} /></button></div>
          <div className="menu-tabs" role="tablist">{(['lunch', 'dinner', 'wine'] as MenuTab[]).map((tab) => <button key={tab} className={menuTab === tab ? 'selected' : ''} onClick={() => setMenuTab(tab)}>{tab === 'lunch' ? 'Lunch' : tab === 'dinner' ? 'Dinner' : 'Wine & snacks'}</button>)}</div>
          <div className="menu-controls"><p>{menuTab === 'wine' ? 'A moving list of bottles we love.' : 'A la carte · dishes from £5'}</p><button className={`diet-toggle ${vegetarian ? 'on' : ''}`} onClick={() => setVegetarian(!vegetarian)}><span className="toggle-track"><span /></span> Vegetarian only</button></div>
          <div className="menu-list">{visibleItems.map((item) => <div className="menu-item" key={item.name}><div><h3>{item.name} {item.tag && <small>{item.tag}</small>}</h3><p>{item.detail}</p></div><span>£{item.price}</span></div>)}</div>
          {visibleItems.length === 0 && <p className="empty-menu">No vegetarian dishes are listed in this section today. Try dinner for our full vegetarian selection.</p>}
        </section>

        <section className="story-section section-pad" id="story">
          <div className="story-image" style={{ backgroundImage: `url(${tableImage})` }}><span>Since 2018</span></div>
          <div className="story-copy"><p className="eyebrow">A little bit about us</p><h2>A neighbourhood restaurant with a curious mind.</h2><p>Levan is a place for generous food, thoughtful wine and the kind of service that makes you feel at home. Our cooking takes inspiration from everywhere, but starts with what’s growing around us now.</p><p>Come for a quick glass at the bar, settle in for dinner, or let us look after your next big occasion.</p><a className="text-link" href="#visit">More about Levan <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="press-section"><div className="press-title"><p className="eyebrow">Kind words</p><div className="rating"><Star size={14} fill="currentColor" /> 4.7 <span>Google rating</span></div></div><div className="press-grid">{press.map(([source, quote]) => <div className="press-card" key={source}><p>{quote}</p><span>{source}</span></div>)}</div></section>

        <section className="private-hire section-pad"><div><p className="eyebrow">Make it yours</p><h2>Private dinners,<br /><em>big celebrations.</em></h2></div><div><p>From intimate supper clubs to full venue takeovers, we can make a plan that feels like you.</p><button className="outline-button dark-button" onClick={() => setPrivateHireOpen(true)}>Plan your event <ArrowUpRight size={16} /></button></div></section>

        <section className="visit-section section-pad" id="visit"><div className="visit-content"><p className="eyebrow">Come and see us</p><h2>Find your way<br />to Blenheim Grove.</h2><p>Units 3–5, 12–16 Blenheim Grove<br />Peckham, London SE15 4QL</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Blenheim+Grove+Peckham" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a></div><div className="hours-card"><div><h3>Levan</h3><p>Tue–Sat<br />12–3pm · 6–10pm</p><p>Sun<br />12–3pm</p></div><div><h3>Bar Levan</h3><p>Tue–Thu<br />5pm–midnight</p><p>Fri–Sat<br />from 3pm–late</p></div><div className="contact"><p>020 7732 2256</p><p>hello@levanlondon.co.uk</p></div></div></section>
      </main>

      <footer><div className="footer-brand"><span className="wordmark">LEVAN<span>·</span></span><p>Food, wine, good times.</p></div><div className="newsletter"><p className="eyebrow light">Très cool news, straight to you</p>{newsletterSent ? <p className="sent-message"><Check size={16} /> You’re on the list. See you soon.</p> : <form onSubmit={(event) => { event.preventDefault(); setNewsletterSent(true); }}><input type="email" required placeholder="Your email address" aria-label="Your email address" /><button aria-label="Subscribe"><ArrowUpRight size={18} /></button></form>}</div><div className="footer-links"><a href="#menu">Menus</a><a href="#visit">Find us</a><a href="https://www.instagram.com/levanlondon/" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a></div><div className="footer-bottom"><span>© Levan 2026</span><span>Made in Peckham</span><a href="#top">Back to top <ArrowUp size={14} /></a></div></footer>

      {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}><div className="modal booking-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X size={20} /></button><p className="eyebrow">{venue === 'restaurant' ? 'Book Levan' : 'Book Bar Levan'}</p><h2>Find your table.</h2><p className="modal-intro">Choose your preferred date and party size. We’ll take you to our secure booking partner to finish.</p><div className="booking-fields"><label>Date<input type="date" defaultValue="2026-09-18" /></label><label>Time<select defaultValue="19:30"><option>18:00</option><option>19:30</option><option>20:30</option><option>21:00</option></select></label><label>Guests<div className="stepper"><button type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))}><Minus size={15} /></button><span>{partySize} guests</span><button type="button" onClick={() => setPartySize(Math.min(6, partySize + 1))}><Plus size={15} /></button></div></label></div><div className="notice"><Check size={16} /> Online bookings are for up to 6 guests. Counter and high-table seating may be available.</div><button className="button button-dark full-button" onClick={() => setBookingOpen(false)}>Continue to booking <ArrowUpRight size={16} /></button><p className="modal-foot">For groups of 7+, call 020 7732 2256 or <button onClick={() => { setBookingOpen(false); setPrivateHireOpen(true); }}>ask about private dining</button>.</p></div></div>}
      {privateHireOpen && <div className="modal-backdrop" onClick={() => setPrivateHireOpen(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setPrivateHireOpen(false)} aria-label="Close private hire"><X size={20} /></button><p className="eyebrow">Private hire</p><h2>Let’s make a plan.</h2><p className="modal-intro">Tell us a little about your event and the team will be in touch with ideas, menus and availability.</p><form className="hire-form" onSubmit={(event) => { event.preventDefault(); setPrivateHireOpen(false); }}><input required placeholder="Your name" /><input required type="email" placeholder="Email address" /><select defaultValue=""><option value="" disabled>What are you planning?</option><option>Private dinner</option><option>Birthday or celebration</option><option>Corporate gathering</option><option>Full venue hire</option></select><textarea required placeholder="Tell us about your plans" rows={4} /><button className="button button-dark full-button">Send enquiry <ArrowUpRight size={16} /></button></form></div></div>}
      {menuOpen && <div className="modal-backdrop" onClick={() => setMenuOpen(false)}><div className="modal menu-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setMenuOpen(false)} aria-label="Close menus"><X size={20} /></button><p className="eyebrow">Levan menus</p><h2>Come hungry.</h2><p className="modal-intro">Our menus change often. Here’s a taste of what’s on now.</p><div className="modal-menu-tabs">{(['lunch', 'dinner', 'wine'] as MenuTab[]).map((tab) => <button key={tab} className={menuTab === tab ? 'selected' : ''} onClick={() => setMenuTab(tab)}>{tab}</button>)}</div><div className="menu-list modal-list">{menuItems[menuTab].map((item) => <div className="menu-item" key={item.name}><div><h3>{item.name} {item.tag && <small>{item.tag}</small>}</h3><p>{item.detail}</p></div><span>£{item.price}</span></div>)}</div><p className="menu-note"><Clock3 size={15} /> Please let us know about allergies when booking. We can adapt most dishes with notice.</p></div></div>}
    </div>
  );
}

export default App;
