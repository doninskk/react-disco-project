import React, { useEffect, useState } from 'react';
import "../styles/EventList.css";
import { useNavigate } from 'react-router-dom'; // import useNavigate


export interface Event { //struttura che definisce l'oggetto Evento 
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
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`https://its-events.davide-mantovani.workers.dev/events`);
          const data = await response.json(); // converte http in json 
          /*data in questo momento è un array in formato json, lo passo a setEvents 
          che tramite useState convertirà l'array in json in un array di Event*/
          setEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchEvents(); 
    }, []); //i parametri che 

    const handleEventClick = (event: Event) => {
        // Navigate to the EventDetail page with the event's id
        navigate(`/event/${event.id}`, { state: { event } });
      };

    return (
      <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top opaque-navbar" data-bs-theme="dark" id="pippo">
          <div className="container-fluid">
            <a className="navbar-brand" href="#top">
              <img src="../img/logo.png" alt="Logo" className="navbar-logo" />
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