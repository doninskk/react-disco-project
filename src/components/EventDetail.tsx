import React, { useEffect, useState } from 'react';
import "../styles/EventDetail.css";
import { Link, useLocation, useParams } from 'react-router-dom';
import { Event } from './EventList';

const EventDetail = () => {

    const {eventId} = useParams(); //assegniamo la variabile che abbiamo passato tramite la navigazione da EventList 
    //setters
    const location = useLocation();
    const [eventDetail, setEventDetail] = useState<Event | null>(location.state?.event || null);
    const [slots, setSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState('');

    useEffect(() => {
        async function fetchEventDetails() {
          try {
            const response = await fetch(`https://its-events.davide-mantovani.workers.dev/events/${eventId}` );
            const data = await response.json(); // converte http in json 
            /*data in questo momento è un array in formato json, lo passo a setEvents 
            che tramite useState convertirà l'array in json in un array di Event*/
            setEventDetail(data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        }
    
        fetchEventDetails(); 
        if(eventDetail){
            setSlots(generateTimeSlots(eventDetail.date));//settiamo gli slot dopo averli generati tramite la funzione che richiede la data dell'evento
        }
      }, [eventDetail, eventId]); //il componente EventDetail dipende dalla variabile eventId 

      const formatDate = (dateString: string | number | Date) => { //format della data in ita
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('it-IT', options);
      };

      const generateTimeSlots = (startTime: string | number | Date) => { //creazione degli slot
        const slots = [];
        const eventStartTime = new Date(startTime); //utilizziamo la data dell'evento come punto di partenza 
    
        for (let i = 0; i < 6; i++) { //fa 6 slot ogni 15 min
          const slotTime = new Date(eventStartTime.getTime() + i * 15 * 60000); //slot + 15*60 sec
          slots.push(slotTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
        }
    
        return slots;
      };

      const handleBooking = () => {
        if (!selectedSlot) { //se non ci sono slot selezionati -> alert
          alert('Please select a time slot.');
          return;
        }
        alert(`Booking successful for slot: ${selectedSlot}`);
        // Se voglio usare firebase parto da qua, poi si vedrà
      };

    const handleSlotSelection = (slot: React.SetStateAction<string>) => {
      setSelectedSlot(slot);
    };

      if (eventDetail) {
        return (
          <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top opaque-navbar" data-bs-theme="dark" id="pippo">
              <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                  <img src="../img/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {/* Altri elementi della navbar, se presenti */}
              </div>
            </div>
          </nav>

          <section>
            <div className="event-detail-container">
              <img src={eventDetail.coverImage} alt={eventDetail.name} className="event-detail-image" />
                <h2 className="event-detail-title">{eventDetail.name}</h2>
                <p className="event-detail-date">{formatDate(eventDetail.date)}</p>
                <p className="event-detail-description">{eventDetail.description.long}</p> {/*descrizione lunga*/}
                <p><b>Dress Code:</b> {eventDetail.dresscode}</p>
                <p><b>Price:</b> ${eventDetail.price}</p>
                <p><b>Included Drinks:</b> {eventDetail.includedDrinks.join(', ')}</p>
                <p><b>Tags:</b> {eventDetail.tags.join(', ')}</p>
                <p><b>Aperitivo Included:</b> {eventDetail.isAperitivoIncluded ? '✅' : '❌'}</p>
                {eventDetail.includedDishes && (
                  <div>
                    <b>Included Dishes:</b>
                    {eventDetail.includedDishes.map((dish, index) => ( //iterazione della lista utilizzando l'indice per creare una lista
                      <p key={index}>{dish.name} - {dish.description}</p>
                    ))}
                  </div>
                )}

              <div className="event-booking">
                <h3>Select a time slot:</h3>
                <div className="slots-container">
                  {slots.map(slot => (
                    <button key={slot} onClick={() => handleSlotSelection(slot)} className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}>
                      {slot}
                    </button>
                  ))}
                </div>
                <button onClick={handleBooking} className="event-booking-button">Book Now</button>
              </div>
            </div>
          </section>
          </>
        );
      } else {
        // Render a loading state or some placeholder content
        return <div>Loading event details...</div>;
      }
    };

export default EventDetail;





