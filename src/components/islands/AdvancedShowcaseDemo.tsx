// AdvancedShowcaseDemo.tsx - Interactive demo for Advanced Components
// Path: /src/components/islands/AdvancedShowcaseDemo.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type DemoType = 'calendar' | 'datepicker' | 'combobox' | 'command' | 'sonner' | 'popover' | 'combined';

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'event';
}

interface NotificationMessage {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

export default function AdvancedShowcaseDemo() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('combined');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', date: new Date(), type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: new Date(Date.now() + 86400000), type: 'deadline' },
    { id: 3, title: 'Conference Call', date: new Date(Date.now() + 172800000), type: 'meeting' }
  ]);

  // Accessibility state management
  const announceRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState('');

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '🔮' },
    { id: 'calendar' as DemoType, label: 'Calendar', icon: '📅' },
    { id: 'datepicker' as DemoType, label: 'Date Picker', icon: '📆' },
    { id: 'combobox' as DemoType, label: 'Combobox', icon: '🔍' },
    { id: 'command' as DemoType, label: 'Command', icon: '⌘' },
    { id: 'sonner' as DemoType, label: 'Sonner', icon: '🔔' },
    { id: 'popover' as DemoType, label: 'Popover', icon: '💬' }
  ];

  // Accessibility: Announce changes to screen readers
  const announceChange = (message: string) => {
    setAnnouncement(message);
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Accessibility: Handle keyboard navigation for demo selector
  const handleDemoKeydown = (event: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : demoTabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < demoTabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = demoTabs.length - 1;
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
        event.preventDefault();
        const shortcutIndex = parseInt(event.key) - 1;
        if (shortcutIndex < demoTabs.length) {
          newIndex = shortcutIndex;
        }
        break;
      default:
        return;
    }
    
    if (newIndex !== currentIndex) {
      setActiveDemo(demoTabs[newIndex].id);
      announceChange(`${demoTabs[newIndex].label} demo selected`);
    }
  };

  // Accessibility: Handle demo change
  const handleDemoChange = (demoId: DemoType, demoLabel: string) => {
    setActiveDemo(demoId);
    announceChange(`${demoLabel} demo activated`);
  };

  const addNotification = (type: NotificationMessage['type'], title: string, message: string) => {
    const newNotification: NotificationMessage = {
      id: Date.now(),
      title,
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
    // Accessibility: Announce notification to screen readers
    announceChange(`${type} notification: ${title}. ${message}`);
  };

  const CalendarDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">📅</span>
          Calendar Component
        </CardTitle>
        <CardDescription>
          Full-featured calendar for scheduling and event management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Calendar Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3" id="calendar-heading">Interactive Calendar:</h4>
            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  if (date) {
                    announceChange(`Date selected: ${date.toLocaleDateString()}`);
                  }
                }}
                className="rounded-md"
                aria-labelledby="calendar-heading"
                aria-describedby="calendar-instructions"
              />
              <div className="sr-only" id="calendar-instructions">
                Use arrow keys to navigate dates, Enter to select, Page Up/Down for months
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3" id="events-heading">Events for Selected Date:</h4>
              {selectedDate && (
                <div className="space-y-2" aria-labelledby="events-heading">
                  <p className="text-sm text-muted-foreground">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <div role="list" aria-label="Events for selected date">
                    {events
                      .filter(event => 
                        event.date.toDateString() === selectedDate.toDateString()
                      )
                      .map(event => (
                        <div key={event.id} className="flex items-center justify-between p-2 border rounded" role="listitem">
                          <span className="font-medium">{event.title}</span>
                          <Badge 
                            variant={event.type === 'meeting' ? 'default' : 'destructive'}
                            aria-label={`Event type: ${event.type}`}
                          >
                            {event.type}
                          </Badge>
                        </div>
                      ))
                    }
                  </div>
                  {events.filter(event => 
                    event.date.toDateString() === selectedDate.toDateString()
                  ).length === 0 && (
                    <p className="text-sm text-muted-foreground">No events for this date</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Actions:</h4>
              <div className="space-y-2" role="group" aria-label="Calendar quick actions">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNotification('success', 'Event Added', 'Meeting scheduled successfully')}
                  aria-describedby="add-event-desc"
                >
                  <span className="mr-2" aria-hidden="true">📅</span>
                  Add Event
                </Button>
                <div className="sr-only" id="add-event-desc">Add a new event to the calendar</div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedDate(new Date());
                    announceChange('Calendar navigated to today');
                  }}
                  aria-describedby="today-desc"
                >
                  <span className="mr-2" aria-hidden="true">📍</span>
                  Go to Today
                </Button>
                <div className="sr-only" id="today-desc">Navigate calendar to today's date</div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNotification('info', 'Calendar', 'View switched to month')}
                  aria-describedby="month-view-desc"
                >
                  <span className="mr-2" aria-hidden="true">👁️</span>
                  Month View
                </Button>
                <div className="sr-only" id="month-view-desc">Switch to month view layout</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Context Examples */}
        <div>
          <h4 className="font-semibold mb-3">Business Use Cases:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" role="list" aria-label="Business use cases">
            <div className="p-3 border rounded-lg" role="listitem">
              <div className="font-medium mb-2">🏢 Meeting Scheduler</div>
              <p className="text-muted-foreground">Room booking, team meetings, client appointments</p>
            </div>
            <div className="p-3 border rounded-lg" role="listitem">
              <div className="font-medium mb-2">🎯 Project Planning</div>
              <p className="text-muted-foreground">Milestones, deadlines, sprints, releases</p>
            </div>
            <div className="p-3 border rounded-lg" role="listitem">
              <div className="font-medium mb-2">📋 Event Management</div>
              <p className="text-muted-foreground">Conferences, webinars, training sessions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DatePickerDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">📆</span>
          Date Picker Component
        </CardTitle>
        <CardDescription>
          Precise date selection with formatting and validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="single-date">Single Date Selection:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                    aria-describedby="date-picker-desc"
                    aria-expanded="false"
                  >
                    <span className="mr-2" aria-hidden="true">📅</span>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        announceChange(`Date picker: ${date.toLocaleDateString()} selected`);
                      }
                    }}
                    initialFocus
                    aria-label="Select date"
                  />
                </PopoverContent>
              </Popover>
              <div className="sr-only" id="date-picker-desc">
                Open calendar to select a specific date
              </div>
            </div>

            <div>
              <Label htmlFor="formatted-date">Formatted Output:</Label>
              <Input 
                id="formatted-date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                readOnly 
                placeholder="YYYY-MM-DD"
                aria-describedby="format-desc"
              />
              <div className="sr-only" id="format-desc">
                Selected date in ISO format
              </div>
            </div>

            <div>
              <Label>Business Formats:</Label>
              <div className="space-y-2 text-sm" role="list" aria-label="Date format examples">
                <div className="flex justify-between p-2 bg-muted/30 rounded" role="listitem">
                  <span>US Format:</span>
                  <span>{selectedDate?.toLocaleDateString('en-US')}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded" role="listitem">
                  <span>EU Format:</span>
                  <span>{selectedDate?.toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded" role="listitem">
                  <span>ISO Format:</span>
                  <span>{selectedDate?.toISOString().split('T')[0]}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded" role="listitem">
                  <span>Long Format:</span>
                  <span>{selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Date Range Selection:</h4>
              <div className="space-y-2" role="group" aria-label="Date range selection">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => addNotification('info', 'Date Range', 'Feature available in specialized component')}
                  aria-describedby="start-date-desc"
                >
                  <span className="mr-2" aria-hidden="true">📅</span>
                  Start Date: {selectedDate?.toLocaleDateString()}
                </Button>
                <div className="sr-only" id="start-date-desc">
                  Set range start date to {selectedDate?.toLocaleDateString()}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => addNotification('info', 'Date Range', 'End date selection enabled')}
                  aria-describedby="end-date-desc"
                >
                  <span className="mr-2" aria-hidden="true">📅</span>
                  End Date: Select...
                </Button>
                <div className="sr-only" id="end-date-desc">
                  Select end date for range
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Validation Examples:</h4>
              <div className="space-y-2 text-sm" role="list" aria-label="Date validation examples">
                <div className="p-2 border rounded" role="listitem">
                  <div className="font-medium">✅ Valid Business Date</div>
                  <div className="text-muted-foreground">Weekday, future date</div>
                </div>
                <div className="p-2 border border-yellow-500 rounded" role="listitem">
                  <div className="font-medium">⚠️ Weekend Selected</div>
                  <div className="text-muted-foreground">Business hours validation</div>
                </div>
                <div className="p-2 border border-red-500 rounded" role="listitem">
                  <div className="font-medium">❌ Past Date</div>
                  <div className="text-muted-foreground">Cannot schedule in the past</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Presets:</h4>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Date preset buttons">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedDate(new Date());
                    addNotification('success', 'Date Selected', 'Today selected');
                  }}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setSelectedDate(tomorrow);
                    addNotification('success', 'Date Selected', 'Tomorrow selected');
                  }}
                >
                  Tomorrow
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    setSelectedDate(nextWeek);
                    addNotification('success', 'Date Selected', 'Next week selected');
                  }}
                >
                  Next Week
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const nextMonth = new Date();
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setSelectedDate(nextMonth);
                    addNotification('success', 'Date Selected', 'Next month selected');
                  }}
                >
                  Next Month
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ComboboxDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">🔍</span>
          Combobox Component
        </CardTitle>
        <CardDescription>
          Searchable selection with autocomplete and filtering
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="search-input">Search and Select:</Label>
            <Input
              id="search-input"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                announceChange(`Search updated: ${e.target.value || 'cleared'}`);
              }}
              aria-describedby="search-instructions"
              role="combobox"
              aria-expanded="true"
              aria-autocomplete="list"
            />
            <div className="sr-only" id="search-instructions">
              Type to filter options below. Use arrow keys to navigate results.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3" id="products-heading">Product Selection:</h4>
              <div 
                className="space-y-2" 
                role="listbox" 
                aria-labelledby="products-heading"
                aria-describedby="products-desc"
              >
                <div className="sr-only" id="products-desc">
                  Filtered product list based on search term
                </div>
                {[
                  'MacBook Pro 16"',
                  'iPhone 15 Pro',
                  'iPad Air',
                  'AirPods Pro',
                  'Apple Watch Ultra',
                  'iMac 24"'
                ]
                  .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(0, 4)
                  .map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setSearchTerm(item);
                        addNotification('success', 'Product Selected', `${item} added to selection`);
                      }}
                      role="option"
                      aria-selected={searchTerm === item}
                      aria-describedby={`product-${index}-desc`}
                    >
                      <span className="mr-2" aria-hidden="true">📱</span>
                      {item}
                    </Button>
                  ))
                }
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3" id="team-heading">Team Members:</h4>
              <div 
                className="space-y-2"
                role="listbox"
                aria-labelledby="team-heading"
                aria-describedby="team-desc"
              >
                <div className="sr-only" id="team-desc">
                  Filtered team member list based on search term
                </div>
                {[
                  'Sarah Johnson (Developer)',
                  'Michael Chen (Designer)',
                  'Emma Davis (Product Manager)',
                  'Alex Rodriguez (Backend)',
                  'Lisa Wang (DevOps)',
                  'David Kim (QA Engineer)'
                ]
                  .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(0, 4)
                  .map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setSearchTerm(item);
                        addNotification('success', 'Member Assigned', `${item.split(' ')[0]} assigned to task`);
                      }}
                      role="option"
                      aria-selected={searchTerm === item}
                      aria-describedby={`member-${index}-desc`}
                    >
                      <span className="mr-2" aria-hidden="true">👤</span>
                      {item}
                    </Button>
                  ))
                }
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Search Features:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" role="list" aria-label="Search features">
              <div className="p-3 border rounded-lg text-center" role="listitem">
                <div className="font-medium">🔍 Fuzzy Search</div>
                <div className="text-muted-foreground mt-1">Typo tolerance</div>
              </div>
              <div className="p-3 border rounded-lg text-center" role="listitem">
                <div className="font-medium">⚡ Instant Results</div>
                <div className="text-muted-foreground mt-1">Real-time filtering</div>
              </div>
              <div className="p-3 border rounded-lg text-center" role="listitem">
                <div className="font-medium">🎯 Smart Ranking</div>
                <div className="text-muted-foreground mt-1">Relevance scoring</div>
              </div>
              <div className="p-3 border rounded-lg text-center" role="listitem">
                <div className="font-medium">📝 Recent Items</div>
                <div className="text-muted-foreground mt-1">History tracking</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CommandDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">⌘</span>
          Command Palette
        </CardTitle>
        <CardDescription>
          Global search and quick actions (Press ⌘K to open)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="bg-muted/30 p-4 rounded-lg" role="region" aria-labelledby="command-demo-heading">
          <div className="text-center mb-4">
            <h4 id="command-demo-heading" className="sr-only">Command palette simulation</h4>
            <div className="text-2xl mb-2" aria-hidden="true">⌘K</div>
            <p className="text-sm text-muted-foreground">Command palette would open here</p>
          </div>
          
          <div className="space-y-2">
            <div 
              className="flex items-center gap-3 p-2 bg-background rounded border"
              role="button"
              tabIndex={0}
              aria-describedby="command-search-desc"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  addNotification('info', 'Command Palette', 'Global search activated');
                }
              }}
            >
              <span aria-hidden="true">🔍</span>
              <span className="font-medium">Search everything...</span>
              <Badge variant="outline" className="ml-auto" aria-label="Keyboard shortcut">⌘K</Badge>
            </div>
            <div className="sr-only" id="command-search-desc">
              Activate global search and command palette
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3" id="quick-actions-heading">Quick Actions:</h4>
            <div className="space-y-2" role="group" aria-labelledby="quick-actions-heading">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Action Executed', 'New project created')}
                aria-describedby="create-project-desc"
              >
                <span className="mr-2" aria-hidden="true">➕</span>
                Create New Project
              </Button>
              <div className="sr-only" id="create-project-desc">Create a new project in the system</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Switched to dashboard')}
                aria-describedby="dashboard-desc"
              >
                <span className="mr-2" aria-hidden="true">📊</span>
                Go to Dashboard
              </Button>
              <div className="sr-only" id="dashboard-desc">Navigate to main dashboard</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Search', 'Global search activated')}
                aria-describedby="search-files-desc"
              >
                <span className="mr-2" aria-hidden="true">🔍</span>
                Search Files
              </Button>
              <div className="sr-only" id="search-files-desc">Search across all files and documents</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Settings', 'Preferences opened')}
                aria-describedby="settings-desc"
              >
                <span className="mr-2" aria-hidden="true">⚙️</span>
                Open Settings
              </Button>
              <div className="sr-only" id="settings-desc">Open application settings and preferences</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3" id="navigation-heading">Navigation Commands:</h4>
            <div className="space-y-2" role="group" aria-labelledby="navigation-heading">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Switched to projects')}
                aria-describedby="projects-nav-desc"
              >
                <span className="mr-2" aria-hidden="true">📋</span>
                Projects
                <Badge variant="outline" className="ml-auto" aria-label="Keyboard shortcut">⌘P</Badge>
              </Button>
              <div className="sr-only" id="projects-nav-desc">Navigate to projects page. Keyboard shortcut: Command P</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Team page opened')}
                aria-describedby="team-nav-desc"
              >
                <span className="mr-2" aria-hidden="true">👥</span>
                Team
                <Badge variant="outline" className="ml-auto" aria-label="Keyboard shortcut">⌘T</Badge>
              </Button>
              <div className="sr-only" id="team-nav-desc">Navigate to team page. Keyboard shortcut: Command T</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Calendar opened')}
                aria-describedby="calendar-nav-desc"
              >
                <span className="mr-2" aria-hidden="true">📅</span>
                Calendar
                <Badge variant="outline" className="ml-auto" aria-label="Keyboard shortcut">⌘C</Badge>
              </Button>
              <div className="sr-only" id="calendar-nav-desc">Navigate to calendar. Keyboard shortcut: Command C</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Help center opened')}
                aria-describedby="help-nav-desc"
              >
                <span className="mr-2" aria-hidden="true">❓</span>
                Help
                <Badge variant="outline" className="ml-auto" aria-label="Keyboard shortcut">⌘?</Badge>
              </Button>
              <div className="sr-only" id="help-nav-desc">Open help center. Keyboard shortcut: Command Question Mark</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Command Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" role="list" aria-label="Command palette features">
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">⚡ Instant</div>
              <div className="text-muted-foreground mt-1">Zero-delay search</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🎯 Contextual</div>
              <div className="text-muted-foreground mt-1">Smart suggestions</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">⌨️ Keyboard</div>
              <div className="text-muted-foreground mt-1">Full navigation</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">📚 Learnable</div>
              <div className="text-muted-foreground mt-1">Shortcut hints</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SonnerDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">🔔</span>
          Sonner Notifications
        </CardTitle>
        <CardDescription>
          Toast notifications and real-time feedback system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="font-semibold mb-3">Generate Notifications:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="group" aria-label="Notification generators">
            <Button
              variant="outline"
              onClick={() => addNotification('success', 'Success!', 'Operation completed successfully')}
              aria-describedby="success-btn-desc"
            >
              ✅ Success
            </Button>
            <div className="sr-only" id="success-btn-desc">Generate a success notification</div>
            
            <Button
              variant="outline"
              onClick={() => addNotification('error', 'Error!', 'Something went wrong')}
              aria-describedby="error-btn-desc"
            >
              ❌ Error
            </Button>
            <div className="sr-only" id="error-btn-desc">Generate an error notification</div>
            
            <Button
              variant="outline"
              onClick={() => addNotification('warning', 'Warning!', 'Please review your action')}
              aria-describedby="warning-btn-desc"
            >
              ⚠️ Warning
            </Button>
            <div className="sr-only" id="warning-btn-desc">Generate a warning notification</div>
            
            <Button
              variant="outline"
              onClick={() => addNotification('info', 'Info', 'New information available')}
              aria-describedby="info-btn-desc"
            >
              ℹ️ Info
            </Button>
            <div className="sr-only" id="info-btn-desc">Generate an info notification</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3" id="notifications-heading">Recent Notifications:</h4>
          <div 
            className="space-y-2 max-h-60 overflow-y-auto"
            role="log"
            aria-labelledby="notifications-heading"
            aria-live="polite"
            aria-relevant="additions"
          >
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No notifications yet. Click the buttons above to generate some!
              </p>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border ${
                    notification.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950' :
                    notification.type === 'error' ? 'border-red-200 bg-red-50 dark:bg-red-950' :
                    notification.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950' :
                    'border-blue-200 bg-blue-50 dark:bg-blue-950'
                  }`}
                  role="status"
                  aria-label={`${notification.type} notification`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                    </div>
                    <div className="text-xs text-muted-foreground ml-2">
                      <time dateTime={notification.timestamp.toISOString()}>
                        {notification.timestamp.toLocaleTimeString()}
                      </time>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Business Notification Examples:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2" role="group" aria-label="Business notifications group 1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Order Confirmed', 'Order #12345 has been confirmed and will ship soon')}
                aria-describedby="order-notif-desc"
              >
                <span className="mr-2" aria-hidden="true">📦</span>
                Order Confirmation
              </Button>
              <div className="sr-only" id="order-notif-desc">Generate order confirmation notification</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'New Message', 'You have a new message from Sarah Johnson')}
                aria-describedby="message-notif-desc"
              >
                <span className="mr-2" aria-hidden="true">💬</span>
                New Message
              </Button>
              <div className="sr-only" id="message-notif-desc">Generate new message notification</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('warning', 'Payment Due', 'Invoice #INV-2024-001 is due in 3 days')}
                aria-describedby="payment-notif-desc"
              >
                <span className="mr-2" aria-hidden="true">💳</span>
                Payment Reminder
              </Button>
              <div className="sr-only" id="payment-notif-desc">Generate payment reminder notification</div>
            </div>
            <div className="space-y-2" role="group" aria-label="Business notifications group 2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Backup Complete', 'Daily backup completed successfully at 2:00 AM')}
                aria-describedby="backup-notif-desc"
              >
                <span className="mr-2" aria-hidden="true">💾</span>
                System Backup
              </Button>
              <div className="sr-only" id="backup-notif-desc">Generate system backup notification</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('error', 'Connection Lost', 'Unable to connect to server. Retrying...')}
                aria-describedby="connection-notif-desc"
              >
                <span className="mr-2" aria-hidden="true">🌐</span>
                Network Error
              </Button>
              <div className="sr-only" id="connection-notif-desc">Generate network error notification</div>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Update Available', 'Version 2.1.0 is available for download')}
                aria-describedby="update-notif-desc"
              >
                <span className="mr-2" aria-hidden="true">⬆️</span>
                Software Update
              </Button>
              <div className="sr-only" id="update-notif-desc">Generate software update notification</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Notification Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" role="list" aria-label="Notification features">
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">⏱️ Auto-dismiss</div>
              <div className="text-muted-foreground mt-1">Timed removal</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🎨 Themed</div>
              <div className="text-muted-foreground mt-1">Context colors</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">📱 Responsive</div>
              <div className="text-muted-foreground mt-1">Mobile-friendly</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🔧 Actionable</div>
              <div className="text-muted-foreground mt-1">Custom buttons</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PopoverDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">💬</span>
          Popover Component
        </CardTitle>
        <CardDescription>
          Contextual overlays and rich content popovers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">User Profile Popover:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    aria-describedby="profile-popover-desc"
                  >
                    <span className="mr-2" aria-hidden="true">👤</span>
                    View Profile
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" onOpenAutoFocus={(e) => e.preventDefault()}>
                  <div className="space-y-3" role="dialog" aria-labelledby="profile-title">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold"
                        aria-label="Sarah Johnson's avatar"
                      >
                        SJ
                      </div>
                      <div>
                        <div id="profile-title" className="font-semibold">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Lead Developer</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm" role="list" aria-label="Profile information">
                      <div className="flex justify-between" role="listitem">
                        <span>Department:</span>
                        <span>Engineering</span>
                      </div>
                      <div className="flex justify-between" role="listitem">
                        <span>Projects:</span>
                        <span>8 active</span>
                      </div>
                      <div className="flex justify-between" role="listitem">
                        <span>Status:</span>
                        <Badge variant="default" aria-label="Status: Available">Available</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2" role="group" aria-label="Profile actions">
                      <Button size="sm" className="flex-1">Message</Button>
                      <Button size="sm" variant="outline" className="flex-1">Schedule</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="sr-only" id="profile-popover-desc">
                Open detailed profile information for Sarah Johnson
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Actions:</h4>
              <div className="flex gap-2" role="group" aria-label="Quick action popovers">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      aria-describedby="settings-popover-desc"
                    >
                      <span className="mr-1" aria-hidden="true">⚙️</span>
                      Settings
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <div className="space-y-2" role="menu" aria-labelledby="settings-menu-title">
                      <div id="settings-menu-title" className="font-semibold mb-2">Quick Settings</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        role="menuitem"
                      >
                        <span className="mr-2" aria-hidden="true">🔔</span>
                        Notifications
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        role="menuitem"
                      >
                        <span className="mr-2" aria-hidden="true">🌙</span>
                        Dark Mode
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        role="menuitem"
                      >
                        <span className="mr-2" aria-hidden="true">🔒</span>
                        Privacy
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="sr-only" id="settings-popover-desc">
                  Open quick settings menu
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      aria-describedby="stats-popover-desc"
                    >
                      <span className="mr-1" aria-hidden="true">📊</span>
                      Stats
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <div className="space-y-3" role="region" aria-labelledby="stats-title">
                      <div id="stats-title" className="font-semibold">Performance Stats</div>
                      <div className="grid grid-cols-2 gap-4 text-center" role="list" aria-label="Performance statistics">
                        <div className="p-2 bg-muted/30 rounded" role="listitem">
                          <div className="text-lg font-bold">1,247</div>
                          <div className="text-xs text-muted-foreground">Active Users</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded" role="listitem">
                          <div className="text-lg font-bold">€45,678</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded" role="listitem">
                          <div className="text-lg font-bold">99.8%</div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded" role="listitem">
                          <div className="text-lg font-bold">4.9</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="sr-only" id="stats-popover-desc">
                  Open performance statistics overview
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Product Quick View:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    aria-describedby="product-popover-desc"
                  >
                    <span className="mr-2" aria-hidden="true">📱</span>
                    MacBook Pro 16"
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" onOpenAutoFocus={(e) => e.preventDefault()}>
                  <div className="space-y-3" role="dialog" aria-labelledby="product-title">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center"
                        aria-label="MacBook Pro product image"
                      >
                        💻
                      </div>
                      <div>
                        <div id="product-title" className="font-semibold">MacBook Pro 16"</div>
                        <div className="text-sm text-muted-foreground">Apple M3 Pro chip</div>
                        <div className="text-lg font-bold">€2,499</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm" role="list" aria-label="Product details">
                      <div className="flex justify-between" role="listitem">
                        <span>Stock:</span>
                        <Badge variant="default" aria-label="Stock status: 15 available">15 available</Badge>
                      </div>
                      <div className="flex justify-between" role="listitem">
                        <span>Rating:</span>
                        <span role="img" aria-label="4.8 out of 5 stars">⭐⭐⭐⭐⭐ 4.8/5</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2" role="group" aria-label="Product actions">
                      <Button size="sm" className="flex-1">Add to Cart</Button>
                      <Button size="sm" variant="outline">Details</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="sr-only" id="product-popover-desc">
                Open detailed product information for MacBook Pro 16"
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Help & Support:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    aria-describedby="help-popover-desc"
                  >
                    <span className="mr-2" aria-hidden="true">❓</span>
                    Need Help?
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72" onOpenAutoFocus={(e) => e.preventDefault()}>
                  <div className="space-y-3" role="menu" aria-labelledby="support-menu-title">
                    <div id="support-menu-title" className="font-semibold">Support Options</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      role="menuitem"
                    >
                      <span className="mr-2" aria-hidden="true">📚</span>
                      Documentation
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      role="menuitem"
                    >
                      <span className="mr-2" aria-hidden="true">💬</span>
                      Live Chat
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      role="menuitem"
                    >
                      <span className="mr-2" aria-hidden="true">📧</span>
                      Email Support
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      role="menuitem"
                    >
                      <span className="mr-2" aria-hidden="true">📞</span>
                      Call Support
                    </Button>
                    <div className="pt-2 border-t text-xs text-muted-foreground">
                      Average response time: 2 hours
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="sr-only" id="help-popover-desc">
                Open support options and help resources
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Popover Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" role="list" aria-label="Popover features">
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">📍 Smart Positioning</div>
              <div className="text-muted-foreground mt-1">Auto-placement</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🎨 Rich Content</div>
              <div className="text-muted-foreground mt-1">Any component</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">⌨️ Keyboard Nav</div>
              <div className="text-muted-foreground mt-1">Full accessibility</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">📱 Touch Friendly</div>
              <div className="text-muted-foreground mt-1">Mobile optimized</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* Project Management Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">📋</span>
            Project Management Dashboard
          </CardTitle>
          <CardDescription>
            Complete project management interface with all 6 advanced components working together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Top Bar with Command and Quick Actions */}
          <div 
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            role="toolbar"
            aria-label="Project management toolbar"
          >
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addNotification('info', 'Command Palette', 'Global search activated')}
                aria-describedby="global-search-desc"
              >
                <span className="mr-2" aria-hidden="true">⌘</span>
                Search & Commands
                <Badge variant="outline" className="ml-2" aria-label="Keyboard shortcut">⌘K</Badge>
              </Button>
              <div className="sr-only" id="global-search-desc">
                Activate global search and command palette
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    aria-describedby="profile-menu-desc"
                  >
                    <span className="mr-2" aria-hidden="true">👤</span>
                    Profile
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64" onOpenAutoFocus={(e) => e.preventDefault()}>
                  <div className="space-y-2" role="menu" aria-labelledby="profile-menu-title">
                    <div id="profile-menu-title" className="font-semibold">Project Manager</div>
                    <div className="text-sm text-muted-foreground">Emma Davis</div>
                    <div className="flex gap-2 pt-2" role="group" aria-label="Profile actions">
                      <Button size="sm" variant="outline" className="flex-1" role="menuitem">Settings</Button>
                      <Button size="sm" variant="outline" className="flex-1" role="menuitem">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="sr-only" id="profile-menu-desc">
                Open profile menu for Emma Davis
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNotification('success', 'Project Created', 'New project "Website Redesign" has been created')}
                aria-describedby="new-project-desc"
              >
                <span className="mr-2" aria-hidden="true">➕</span>
                New Project
              </Button>
              <div className="sr-only" id="new-project-desc">
                Create a new project in the system
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Calendar Section */}
            <div>
              <h4 className="font-semibold mb-3" id="timeline-heading">Project Timeline:</h4>
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      announceChange(`Project timeline: ${date.toLocaleDateString()} selected`);
                    }
                  }}
                  className="rounded-md"
                  aria-labelledby="timeline-heading"
                />
                <div className="mt-4 space-y-2" role="list" aria-label="Upcoming project events">
                  <div className="flex items-center justify-between text-sm" role="listitem">
                    <span>📅 Sprint Planning</span>
                    <Badge variant="default" aria-label="Event today">Today</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm" role="listitem">
                    <span>🎯 Milestone Review</span>
                    <Badge variant="secondary" aria-label="Event tomorrow">Tomorrow</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Actions */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3" id="quick-actions-section">Quick Actions:</h4>
                <div className="space-y-2" role="group" aria-labelledby="quick-actions-section">
                  <Input
                    placeholder="Search projects, tasks, team members..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      announceChange(`Search updated: ${e.target.value || 'cleared'}`);
                    }}
                    aria-label="Global search"
                    role="combobox"
                    aria-expanded="false"
                    aria-autocomplete="list"
                  />
                  
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label="Quick action buttons">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addNotification('success', 'Task Created', 'New task added to backlog')}
                    >
                      ➕ Add Task
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addNotification('info', 'Team', 'Team meeting scheduled')}
                    >
                      👥 Team Meet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addNotification('warning', 'Deadline', 'Project deadline in 3 days')}
                    >
                      ⏰ Deadlines
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addNotification('success', 'Report', 'Weekly report generated')}
                    >
                      📊 Reports
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3" id="team-assignment-section">Team Assignment:</h4>
                <div className="space-y-2" role="group" aria-labelledby="team-assignment-section">
                  {[
                    'Sarah Johnson (Frontend)',
                    'Michael Chen (Design)',
                    'Alex Rodriguez (Backend)'
                  ]
                    .filter(member => member.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((member, index) => (
                      <Popover key={index}>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start"
                            aria-describedby={`member-${index}-popover-desc`}
                          >
                            <span className="mr-2" aria-hidden="true">👤</span>
                            {member}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64" onOpenAutoFocus={(e) => e.preventDefault()}>
                          <div className="space-y-2" role="dialog" aria-labelledby={`member-${index}-title`}>
                            <div id={`member-${index}-title`} className="font-semibold">
                              {member.split(' ')[0]} {member.split(' ')[1]}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Current workload: 75%
                            </div>
                            <div className="flex gap-2 pt-2" role="group" aria-label="Team member actions">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => addNotification('success', 'Task Assigned', `Task assigned to ${member.split(' ')[0]}`)}
                              >
                                Assign Task
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                Message
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                        <div className="sr-only" id={`member-${index}-popover-desc`}>
                          Open team member details for {member.split(' ')[0]} {member.split(' ')[1]}
                        </div>
                      </Popover>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Area */}
          <div>
            <h4 className="font-semibold mb-3" id="activity-heading">Recent Activity:</h4>
            <div 
              className="space-y-2 max-h-32 overflow-y-auto"
              role="log"
              aria-labelledby="activity-heading"
              aria-live="polite"
              aria-relevant="additions"
            >
              {notifications.slice(0, 3).map((notification) => (
                <div 
                  key={notification.id} 
                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
                  role="status"
                  aria-label={`Activity: ${notification.title}`}
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true">
                      {notification.type === 'success' ? '✅' :
                       notification.type === 'error' ? '❌' :
                       notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </span>
                    <span>{notification.title}</span>
                  </div>
                  <time 
                    className="text-xs text-muted-foreground"
                    dateTime={notification.timestamp.toISOString()}
                  >
                    {notification.timestamp.toLocaleTimeString()}
                  </time>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E-commerce Admin Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">🛒</span>
            E-commerce Admin Dashboard
          </CardTitle>
          <CardDescription>
            Product management with advanced search and scheduling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Product Search */}
            <div>
              <h4 className="font-semibold mb-3" id="product-search-heading">Product Search:</h4>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  announceChange(`Product search: ${e.target.value || 'cleared'}`);
                }}
                className="mb-3"
                aria-labelledby="product-search-heading"
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
              />
              <div className="space-y-2" role="listbox" aria-label="Filtered products">
                {[
                  'MacBook Pro 16" - €2,499',
                  'iPhone 15 Pro - €999',
                  'AirPods Pro - €249'
                ]
                  .filter(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product, index) => (
                    <Popover key={index}>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-left"
                          role="option"
                          aria-selected={false}
                          aria-describedby={`product-${index}-popover-desc`}
                        >
                          <span className="mr-2" aria-hidden="true">📱</span>
                          {product}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64" onOpenAutoFocus={(e) => e.preventDefault()}>
                        <div className="space-y-2" role="dialog" aria-labelledby={`product-${index}-title`}>
                          <div id={`product-${index}-title`} className="font-semibold">
                            {product.split(' - ')[0]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Stock: 15 units
                          </div>
                          <div className="text-lg font-bold">{product.split(' - ')[1]}</div>
                          <div className="flex gap-2 pt-2" role="group" aria-label="Product actions">
                            <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                            <Button size="sm" variant="outline" className="flex-1">Stock</Button>
                          </div>
                        </div>
                      </PopoverContent>
                      <div className="sr-only" id={`product-${index}-popover-desc`}>
                        Open product details for {product.split(' - ')[0]}
                      </div>
                    </Popover>
                  ))
                }
              </div>
            </div>

            {/* Promotion Calendar */}
            <div>
              <h4 className="font-semibold mb-3" id="promotion-heading">Promotion Schedule:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    aria-describedby="promotion-calendar-desc"
                    aria-expanded="false"
                  >
                    <span className="mr-2" aria-hidden="true">📅</span>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        announceChange(`Promotion date selected: ${date.toLocaleDateString()}`);
                      }
                    }}
                    initialFocus
                    aria-labelledby="promotion-heading"
                  />
                </PopoverContent>
              </Popover>
              <div className="sr-only" id="promotion-calendar-desc">
                Select date for promotion scheduling
              </div>
              
              <div className="mt-3 space-y-2" role="group" aria-label="Promotion actions">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addNotification('success', 'Promotion Scheduled', 'Black Friday sale scheduled for November 24')}
                >
                  <span className="mr-2" aria-hidden="true">🏷️</span>
                  Schedule Sale
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addNotification('info', 'Promotion', 'Flash sale campaign created')}
                >
                  <span className="mr-2" aria-hidden="true">⚡</span>
                  Flash Sale
                </Button>
              </div>
            </div>

            {/* Order Notifications */}
            <div>
              <h4 className="font-semibold mb-3" id="order-alerts-heading">Order Alerts:</h4>
              <div className="space-y-2" role="group" aria-labelledby="order-alerts-heading">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNotification('success', 'New Order', 'Order #12345 - MacBook Pro 16" - €2,499')}
                >
                  <span className="mr-2" aria-hidden="true">📦</span>
                  New Order Alert
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNotification('warning', 'Low Stock', 'iPhone 15 Pro - Only 3 units remaining')}
                >
                  <span className="mr-2" aria-hidden="true">⚠️</span>
                  Stock Alert
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNotification('error', 'Payment Failed', 'Order #12344 - Payment processing failed')}
                >
                  <span className="mr-2" aria-hidden="true">💳</span>
                  Payment Issue
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'calendar':
        return <CalendarDemo />;
      case 'datepicker':
        return <DatePickerDemo />;
      case 'combobox':
        return <ComboboxDemo />;
      case 'command':
        return <CommandDemo />;
      case 'sonner':
        return <SonnerDemo />;
      case 'popover':
        return <PopoverDemo />;
      default:
        return <CombinedDemo />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Live Region for Screen Reader Announcements */}
      <div 
        ref={announceRef} 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {announcement}
      </div>

      {/* Demo Selector with Accessibility */}
      <div 
        className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg"
        role="tablist"
        aria-label="Advanced component demonstrations"
      >
        {demoTabs.map((demo, index) => (
          <Button
            key={demo.id}
            role="tab"
            variant={activeDemo === demo.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDemoChange(demo.id, demo.label)}
            onKeyDown={(e) => handleDemoKeydown(e, index)}
            className="flex items-center gap-2"
            tabIndex={activeDemo === demo.id ? 0 : -1}
            aria-selected={activeDemo === demo.id}
            aria-current={activeDemo === demo.id ? 'page' : undefined}
            aria-describedby={`demo-${demo.id}-description`}
          >
            <span aria-hidden="true">{demo.icon}</span>
            <span className="hidden sm:inline">{demo.label}</span>
          </Button>
        ))}
      </div>

      {/* Hidden descriptions for screen readers */}
      <div className="sr-only">
        <div id="demo-combined-description">All advanced components working together in business scenarios</div>
        <div id="demo-calendar-description">Full-featured calendar for scheduling and event management</div>
        <div id="demo-datepicker-description">Precise date selection with formatting and validation</div>
        <div id="demo-combobox-description">Searchable selection with autocomplete and filtering</div>
        <div id="demo-command-description">Global search and quick actions command palette</div>
        <div id="demo-sonner-description">Toast notifications and real-time feedback system</div>
        <div id="demo-popover-description">Contextual overlays and rich content popovers</div>
      </div>

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        <p>Use arrow keys to navigate between demo tabs, Home and End keys to jump to first or last tab, or number keys 1-7 for direct selection.</p>
      </div>

      {/* Demo Content */}
      <div 
        className="min-h-[400px]"
        role="tabpanel"
        aria-labelledby={`demo-${activeDemo}`}
        id={`panel-${activeDemo}`}
      >
        {renderDemo()}
      </div>

      {/* Advanced Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Component Integration Workflows</CardTitle>
          <CardDescription>
            How these 6 sophisticated components create premium user experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <article>
              <header>
                <h4 className="font-semibold mb-2">SaaS Dashboard Flow:</h4>
              </header>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• <strong>Command (⌘K):</strong> Global navigation and search</li>
                <li role="listitem">• <strong>Calendar:</strong> Event planning and scheduling</li>
                <li role="listitem">• <strong>Combobox:</strong> Smart data filtering</li>
                <li role="listitem">• <strong>Popover:</strong> Quick actions and previews</li>
                <li role="listitem">• <strong>Date Picker:</strong> Precise date selections</li>
                <li role="listitem">• <strong>Sonner:</strong> Real-time system feedback</li>
              </ul>
            </article>
            <article>
              <header>
                <h4 className="font-semibold mb-2">E-commerce Admin Flow:</h4>
              </header>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• <strong>Combobox:</strong> Product search and selection</li>
                <li role="listitem">• <strong>Calendar:</strong> Promotion and sale scheduling</li>
                <li role="listitem">• <strong>Date Picker:</strong> Campaign date planning</li>
                <li role="listitem">• <strong>Popover:</strong> Product quick edit and details</li>
                <li role="listitem">• <strong>Sonner:</strong> Order and inventory alerts</li>
                <li role="listitem">• <strong>Command:</strong> Admin quick actions</li>
              </ul>
            </article>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}