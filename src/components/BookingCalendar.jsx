import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, User, Mail, MessageSquare } from 'lucide-react';

export const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock calendar logic
  const daysInMonth = 30;
  const startDay = 3; // 0 = Sun, 3 = Wed
  const today = 15;
  const days = Array.from({ length: 35 }, (_, i) => {
    const dayValue = i - startDay + 1;
    return (dayValue > 0 && dayValue <= daysInMonth) ? dayValue : null;
  });

  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const timeSlots = ['09:00', '10:30', '14:00', '15:30', '17:00'];

  const handleDateClick = (day) => {
    if (day && day >= today) {
      setSelectedDate(day);
      setSelectedTime(null);
      setShowForm(false);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
        setBookingSuccess(false);
        setShowForm(false);
        setSelectedDate(null);
        setSelectedTime(null);
    }, 3000);
  };

  if (bookingSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 mt-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Demande envoyée !</h3>
        <p className="text-slate-500 mb-6">Le freelance vous confirmera ce rendez-vous sous 24h.</p>
        <button 
          onClick={() => setBookingSuccess(false)}
          className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition"
        >
          Retour au profil
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 mt-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Disponibilités & Réservation</h3>
          <p className="text-sm text-slate-500">Planifiez un premier échange vidéo gratuitement</p>
        </div>
      </div>

      {!showForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar View */}
          <div>
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="font-semibold text-slate-800">Juin 2026</span>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full hover:bg-slate-100 text-slate-400"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-1 rounded-full hover:bg-slate-100 text-slate-800"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-xs font-medium text-slate-400 py-1">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-sm">
              {days.map((day, i) => {
                const isPast = day && day < today;
                const isToday = day === today;
                const isSelected = day === selectedDate;
                
                return (
                  <button
                    key={i}
                    onClick={() => handleDateClick(day)}
                    disabled={!day || isPast}
                    className={`
                      aspect-square flex items-center justify-center rounded-full transition
                      ${!day ? 'invisible' : ''}
                      ${isPast ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-indigo-50 hover:text-indigo-600'}
                      ${isToday ? 'font-bold bg-indigo-50 text-indigo-700' : ''}
                      ${isSelected ? '!bg-indigo-600 !text-white font-bold shadow-md' : 'text-slate-700'}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
            <h4 className="font-medium text-slate-800 mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-slate-400" />
              {selectedDate ? `Créneaux le ${selectedDate} Juin` : 'Sélectionnez une date'}
            </h4>
            
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`
                      py-2 px-4 rounded-xl border text-sm font-medium transition
                      ${selectedTime === time 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-50 pb-8">
                <Calendar className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">Aucune date sélectionnée</p>
              </div>
            )}

            {selectedDate && selectedTime && (
              <button 
                onClick={() => setShowForm(true)}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-sm transition"
              >
                Continuer
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Booking Form */
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <p className="text-sm text-slate-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" /> {selectedDate} Juin 2026 à {selectedTime}
              </p>
            </div>
            <button 
              onClick={() => setShowForm(false)}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Modifier
            </button>
          </div>

          <form onSubmit={submitBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Votre projet en quelques mots</label>
              <div className="relative">
                <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-slate-400" />
                <textarea 
                  required
                  rows="3"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Bonjour, je souhaite..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-sm transition"
              >
                Confirmer la demande
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
