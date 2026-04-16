import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  startDate: Date | null;
  endDate: Date | null;
  existingBookings?: any[];
  onChange: (start: Date | null, end: Date | null) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ startDate, endDate, existingBookings = [], onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateBooked = (date: Date) => {
    return existingBookings.some(booking => {
      const start = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      // Normalize dates to midnight for comparison
      const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const bStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const bEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      
      return checkDate >= bStart && checkDate <= bEnd;
    });
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (isDateBooked(selectedDate)) return;

    if (!startDate || (startDate && endDate)) {
      onChange(selectedDate, null);
    } else if (selectedDate < startDate) {
      onChange(selectedDate, null);
    } else if (selectedDate.getTime() === startDate.getTime()) {
      onChange(null, null);
    } else {
      // Check if any date in range is booked
      let hasBookedInRange = false;
      const temp = new Date(startDate);
      while (temp <= selectedDate) {
        if (isDateBooked(temp)) {
          hasBookedInRange = true;
          break;
        }
        temp.setDate(temp.getDate() + 1);
      }

      if (hasBookedInRange) {
        onChange(selectedDate, null);
      } else {
        onChange(startDate, selectedDate);
      }
    }
  };

  const isSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (startDate && date.getTime() === startDate.getTime()) return 'selected start';
    if (endDate && date.getTime() === endDate.getTime()) return 'selected end';
    if (startDate && endDate && date > startDate && date < endDate) return 'in-range';
    return '';
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if month is closed: Dec (11), Jan (0), Feb (1), Mar (2)
    const month = date.getMonth();
    const isClosedMonth = month === 11 || month === 0 || month === 1 || month === 2;
    
    return date < today || isClosedMonth;
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = (firstDayOfMonth(year, month) + 6) % 7; // Adjust to start Monday

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let d = 1; d <= days; d++) {
    const status = isSelected(d);
    const date = new Date(year, month, d);
    const booked = isDateBooked(date);
    const disabled = isPast(d) || booked;
    
    calendarDays.push(
      <div 
        key={d} 
        className={`calendar-day ${status} ${isToday(d) ? 'today' : ''} ${disabled ? 'disabled' : ''} ${booked ? 'booked' : ''}`}
        onClick={() => !disabled && handleDateClick(d)}
      >
        {d}
      </div>
    );
  }

  return (
    <div className="custom-calendar">
      <div className="calendar-header">
        <button type="button" onClick={handlePrevMonth}><ChevronLeft size={18} /></button>
        <h3>{monthNames[month]} {year}</h3>
        <button type="button" onClick={handleNextMonth}><ChevronRight size={18} /></button>
      </div>
      <div className="calendar-weekdays">
        <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
      </div>
      <div className="calendar-grid">
        {calendarDays}
      </div>

      <style>{`
        .custom-calendar {
          background: white;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 1rem;
          user-select: none;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .calendar-header h3 {
          font-size: 1rem;
          margin: 0;
          color: var(--color-stone);
        }
        .calendar-header button {
          color: var(--color-olive);
          padding: 0.2rem;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .calendar-header button:hover {
          background: #f0f0f0;
        }
        .calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-weight: 700;
          font-size: 0.7rem;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .calendar-day:not(.empty):not(.disabled):hover {
          background: var(--color-beige);
          color: var(--color-olive);
        }
        .calendar-day.today {
          font-weight: 800;
          color: var(--color-olive);
          text-decoration: underline;
        }
        .calendar-day.selected {
          background: var(--color-olive) !important;
          color: white !important;
        }
        .calendar-day.selected.start {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .calendar-day.selected.end {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .calendar-day.in-range {
          background: var(--color-beige);
          border-radius: 0;
        }
        .calendar-day.disabled {
          color: #ccc;
          cursor: not-allowed;
        }
        .calendar-day.booked {
          text-decoration: line-through;
          background: #f5f5f5;
          opacity: 0.5;
        }
        .calendar-day.empty {
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default CalendarPicker;
