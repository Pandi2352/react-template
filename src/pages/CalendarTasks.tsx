import { useState } from 'react';
import { addDays, subDays } from 'date-fns';
import { EventCalendar, type CalendarEvent } from '@/components/common/EventCalendar';
import { useUI } from '@/hooks';

export function CalendarTasks() {
  const { addToast } = useUI();
  
  // Create some initial events relative to today
  const today = new Date();
  
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Monthly Sync with Platform Team',
      date: today,
      time: '10:00 AM',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Q3 Roadmapping',
      date: addDays(today, 2),
      color: 'purple'
    },
    {
      id: '3',
      title: 'UI/UX Design Review',
      date: addDays(today, 2),
      time: '02:00 PM',
      color: 'purple'
    },
    {
      id: '4',
      title: 'Client Demo: Acme Corp',
      date: subDays(today, 1),
      time: '11:30 AM',
      color: 'green'
    },
    {
      id: '5',
      title: 'Production Deployment',
      date: addDays(today, 4),
      time: '11:00 PM',
      color: 'red'
    },
    {
      id: '6',
      title: 'Weekly Standup',
      date: today,
      time: '09:00 AM',
      color: 'yellow'
    },
    {
      id: '7',
      title: 'Lunch with Sarah',
      date: today,
      time: '12:30 PM',
      color: 'green'
    }
  ]);

  const handleDateClick = (date: Date) => {
    addToast({
      message: `You clicked on ${date.toDateString()}`,
      type: 'info'
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    addToast({
      message: `Viewing details for: ${event.title}`,
      type: 'success'
    });
  };

  const handleAddEvent = () => {
    addToast({
      message: 'Opening the event creation modal...',
      type: 'info'
    });
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar & Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Advanced, fully custom Tailwind calendar built with date-fns. Readily copy-pasteable.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <EventCalendar 
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          onAddEvent={handleAddEvent}
        />
      </div>
    </div>
  );
}
