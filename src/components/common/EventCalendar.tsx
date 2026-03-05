import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from './Button';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  time?: string;
}

interface EventCalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent?: () => void;
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
};

export function EventCalendar({ 
  events = [], 
  onDateClick, 
  onEventClick,
  onAddEvent,
  className 
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const renderHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center rounded-md border border-gray-200 bg-white shadow-sm">
            <button 
              onClick={prevMonth}
              className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={goToToday}
              className="px-3 py-1.5 text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors"
            >
              Today
            </button>
            <button 
              onClick={nextMonth}
              className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        {onAddEvent && (
          <Button onClick={onAddEvent} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        )}
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEE'; // Mon, Tue, Wed
    const days = [];
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday

    for (let i = 0; i < 7; i++) {
      days.push(
        <div 
          key={i} 
          className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200"
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 bg-gray-50/50 rounded-t-xl">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        // Find events for this day
        const dayEvents = events.filter(e => isSameDay(e.date, cloneDay));

        days.push(
          <div
            key={day.toString()}
            onClick={() => onDateClick && onDateClick(cloneDay)}
            className={cn(
              "min-h-[120px] p-2 border-b border-r border-gray-100 transition-colors relative group",
              !isSameMonth(day, monthStart) ? "bg-gray-50/50 text-gray-400" : "bg-white text-gray-900",
              onDateClick ? "cursor-pointer hover:bg-gray-50" : "",
              // Remove right border for last day of week
              i === 6 ? "border-r-0" : ""
            )}
          >
            <div className="flex justify-between items-start">
              <span className={cn(
                "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mt-1 ml-1",
                isToday(day) ? "bg-primary text-white" : ""
              )}>
                {formattedDate}
              </span>
              
              {/* Optional counter for mobile or tight spaces */}
              {dayEvents.length > 3 && (
                <span className="text-[10px] font-medium text-gray-500 mt-2 mr-1">
                  +{dayEvents.length - 3}
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-col gap-1 overflow-y-auto max-h-[75px] scrollbar-hide">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEventClick) onEventClick(event);
                  }}
                  className={cn(
                    "px-2 py-1 text-xs truncate rounded-md border text-left",
                    colorMap[event.color || 'blue'],
                    onEventClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
                  )}
                  title={event.title}
                >
                  {event.time && <span className="font-semibold mr-1">{event.time}</span>}
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="border-l border-gray-200 bg-white shadow-sm rounded-b-xl overflow-hidden">{rows}</div>;
  };

  return (
    <div className={cn("w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm", className)}>
      {renderHeader()}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
