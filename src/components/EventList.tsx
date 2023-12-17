import React, { useEffect, useState } from 'react';
import "../styles/EventList.css";
import { useNavigate } from 'react-router-dom'; 

//struttura che definisce l'oggetto Evento 
export interface Event { 
    id: number;
    name: string;
    coverImage: string;
    date: string;
    description: {
      short: string;
      long: string;
    };
    dresscode: string;
    price: number;
    includedDrinks: string[];
    tags: string[];
    isAperitivoIncluded: boolean;
    includedDishes?: {
      name: string;
      description: string;
      allergens: string[];
    }[];
  }

  const App: React.FC = () => {
    // Stato per memorizzare la lista degli eventi
    const [events, setEvents] = useState<Event[]>([]);
    // Hook di navigazione per spostarsi tra le pagine
    const navigate = useNavigate();
  
    // si attiva al caricamento del componente per recuperare gli eventi
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          // Chiamata API per recuperare la lista degli eventi
          const response = await fetch(`https://its-events.davide-mantovani.workers.dev/events`);
          const data = await response.json(); // converte http in json 
          /*data in questo momento è un array in formato json, lo passo a setEvents 
          che tramite useState convertirà l'array in json in un array di Event*/
          // Aggiorna lo stato con la lista degli eventi
          setEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      
      // Chiamata della funzione per recuperare gli eventi
      fetchEvents(); 
    }, []); // Il secondo parametro [] indica che l'effetto viene eseguito solo al montaggio del componente

    const handleEventClick = (event: Event) => {
         // Naviga alla pagina di dettaglio dell'evento con l'ID dell'evento come parametro
        navigate(`/event/${event.id}`, { state: { event } });
      };

    return (
      <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top opaque-navbar" data-bs-theme="dark" id="pippo">
          <div className="container-fluid">
            <a className="navbar-brand" href="#top">
              <img src="https://i.ibb.co/SffnyyC/logo.png" alt="Logo" className="navbar-logo" />
            </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
      </nav>

          <div className="custom-shape-divider-bottom-1702654749">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" className="shape-fill"></path>
            </svg>
          </div>
        </header>

        <section>
          <div className="event-list-container row">
            {events.map((event) => (
              <div key={event.id} className="event-card col-md-6" onClick={() => handleEventClick(event)}>
                <img src={event.coverImage} alt={event.name} className="event-image" />
                <div className="event-info">
                  <h2 className="event-title">{event.name}</h2>
                  <p className="event-description">{event.description.short}</p>
                  <p className="event-date">{event.date}</p>
                </div>
              </div>          
            ))}
          </div>
        </section>

      </>
      );
    };

export default App