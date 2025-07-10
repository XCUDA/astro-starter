// AdvancedShowcaseDemo.tsx - Interactive demo for Advanced Components
// Path: /src/components/islands/AdvancedShowcaseDemo.tsx

import React, { useState, useEffect } from 'react';
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

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '🔮' },
    { id: 'calendar' as DemoType, label: 'Calendar', icon: '📅' },
    { id: 'datepicker' as DemoType, label: 'Date Picker', icon: '📆' },
    { id: 'combobox' as DemoType, label: 'Combobox', icon: '🔍' },
    { id: 'command' as DemoType, label: 'Command', icon: '⌘' },
    { id: 'sonner' as DemoType, label: 'Sonner', icon: '🔔' },
    { id: 'popover' as DemoType, label: 'Popover', icon: '💬' }
  ];

  const addNotification = (type: NotificationMessage['type'], title: string, message: string) => {
    const newNotification: NotificationMessage = {
      id: Date.now(),
      title,
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const CalendarDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📅</span>
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
            <h4 className="font-semibold mb-3">Interactive Calendar:</h4>
            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Events for Selected Date:</h4>
              {selectedDate && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {events
                    .filter(event => 
                      event.date.toDateString() === selectedDate.toDateString()
                    )
                    .map(event => (
                      <div key={event.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{event.title}</span>
                        <Badge variant={event.type === 'meeting' ? 'default' : 'destructive'}>
                          {event.type}
                        </Badge>
                      </div>
                    ))
                  }
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
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNotification('success', 'Event Added', 'Meeting scheduled successfully')}
                >
                  <span className="mr-2">📅</span>
                  Add Event
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setSelectedDate(new Date())}
                >
                  <span className="mr-2">📍</span>
                  Go to Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNotification('info', 'Calendar', 'View switched to month')}
                >
                  <span className="mr-2">👁️</span>
                  Month View
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Context Examples */}
        <div>
          <h4 className="font-semibold mb-3">Business Use Cases:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border rounded-lg">
              <div className="font-medium mb-2">🏢 Meeting Scheduler</div>
              <p className="text-muted-foreground">Room booking, team meetings, client appointments</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium mb-2">🎯 Project Planning</div>
              <p className="text-muted-foreground">Milestones, deadlines, sprints, releases</p>
            </div>
            <div className="p-3 border rounded-lg">
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
          <span>📆</span>
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
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <span className="mr-2">📅</span>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="formatted-date">Formatted Output:</Label>
              <Input 
                id="formatted-date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                readOnly 
                placeholder="YYYY-MM-DD"
              />
            </div>

            <div>
              <Label>Business Formats:</Label>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>US Format:</span>
                  <span>{selectedDate?.toLocaleDateString('en-US')}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>EU Format:</span>
                  <span>{selectedDate?.toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>ISO Format:</span>
                  <span>{selectedDate?.toISOString().split('T')[0]}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
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
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => addNotification('info', 'Date Range', 'Feature available in specialized component')}
                >
                  <span className="mr-2">📅</span>
                  Start Date: {selectedDate?.toLocaleDateString()}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => addNotification('info', 'Date Range', 'End date selection enabled')}
                >
                  <span className="mr-2">📅</span>
                  End Date: Select...
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Validation Examples:</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 border rounded">
                  <div className="font-medium">✅ Valid Business Date</div>
                  <div className="text-muted-foreground">Weekday, future date</div>
                </div>
                <div className="p-2 border border-yellow-500 rounded">
                  <div className="font-medium">⚠️ Weekend Selected</div>
                  <div className="text-muted-foreground">Business hours validation</div>
                </div>
                <div className="p-2 border border-red-500 rounded">
                  <div className="font-medium">❌ Past Date</div>
                  <div className="text-muted-foreground">Cannot schedule in the past</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Presets:</h4>
              <div className="grid grid-cols-2 gap-2">
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
          <span>🔍</span>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Product Selection:</h4>
              <div className="space-y-2">
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
                    >
                      <span className="mr-2">📱</span>
                      {item}
                    </Button>
                  ))
                }
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Team Members:</h4>
              <div className="space-y-2">
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
                    >
                      <span className="mr-2">👤</span>
                      {item}
                    </Button>
                  ))
                }
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Search Features:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">🔍 Fuzzy Search</div>
                <div className="text-muted-foreground mt-1">Typo tolerance</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">⚡ Instant Results</div>
                <div className="text-muted-foreground mt-1">Real-time filtering</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="font-medium">🎯 Smart Ranking</div>
                <div className="text-muted-foreground mt-1">Relevance scoring</div>
              </div>
              <div className="p-3 border rounded-lg text-center">
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
          <span>⌘</span>
          Command Palette
        </CardTitle>
        <CardDescription>
          Global search and quick actions (Press ⌘K to open)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-2xl mb-2">⌘K</div>
            <p className="text-sm text-muted-foreground">Command palette would open here</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-background rounded border">
              <span>🔍</span>
              <span className="font-medium">Search everything...</span>
              <Badge variant="outline" className="ml-auto">⌘K</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Quick Actions:</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Action Executed', 'New project created')}
              >
                <span className="mr-2">➕</span>
                Create New Project
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Switched to dashboard')}
              >
                <span className="mr-2">📊</span>
                Go to Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Search', 'Global search activated')}
              >
                <span className="mr-2">🔍</span>
                Search Files
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Settings', 'Preferences opened')}
              >
                <span className="mr-2">⚙️</span>
                Open Settings
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Navigation Commands:</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Switched to projects')}
              >
                <span className="mr-2">📋</span>
                Projects
                <Badge variant="outline" className="ml-auto">⌘P</Badge>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Team page opened')}
              >
                <span className="mr-2">👥</span>
                Team
                <Badge variant="outline" className="ml-auto">⌘T</Badge>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Calendar opened')}
              >
                <span className="mr-2">📅</span>
                Calendar
                <Badge variant="outline" className="ml-auto">⌘C</Badge>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Navigation', 'Help center opened')}
              >
                <span className="mr-2">❓</span>
                Help
                <Badge variant="outline" className="ml-auto">⌘?</Badge>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Command Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">⚡ Instant</div>
              <div className="text-muted-foreground mt-1">Zero-delay search</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">🎯 Contextual</div>
              <div className="text-muted-foreground mt-1">Smart suggestions</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">⌨️ Keyboard</div>
              <div className="text-muted-foreground mt-1">Full navigation</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
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
          <span>🔔</span>
          Sonner Notifications
        </CardTitle>
        <CardDescription>
          Toast notifications and real-time feedback system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="font-semibold mb-3">Generate Notifications:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              onClick={() => addNotification('success', 'Success!', 'Operation completed successfully')}
            >
              ✅ Success
            </Button>
            <Button
              variant="outline"
              onClick={() => addNotification('error', 'Error!', 'Something went wrong')}
            >
              ❌ Error
            </Button>
            <Button
              variant="outline"
              onClick={() => addNotification('warning', 'Warning!', 'Please review your action')}
            >
              ⚠️ Warning
            </Button>
            <Button
              variant="outline"
              onClick={() => addNotification('info', 'Info', 'New information available')}
            >
              ℹ️ Info
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Recent Notifications:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
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
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                    </div>
                    <div className="text-xs text-muted-foreground ml-2">
                      {notification.timestamp.toLocaleTimeString()}
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
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Order Confirmed', 'Order #12345 has been confirmed and will ship soon')}
              >
                <span className="mr-2">📦</span>
                Order Confirmation
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'New Message', 'You have a new message from Sarah Johnson')}
              >
                <span className="mr-2">💬</span>
                New Message
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('warning', 'Payment Due', 'Invoice #INV-2024-001 is due in 3 days')}
              >
                <span className="mr-2">💳</span>
                Payment Reminder
              </Button>
            </div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('success', 'Backup Complete', 'Daily backup completed successfully at 2:00 AM')}
              >
                <span className="mr-2">💾</span>
                System Backup
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('error', 'Connection Lost', 'Unable to connect to server. Retrying...')}
              >
                <span className="mr-2">🌐</span>
                Network Error
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => addNotification('info', 'Update Available', 'Version 2.1.0 is available for download')}
              >
                <span className="mr-2">⬆️</span>
                Software Update
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Notification Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">⏱️ Auto-dismiss</div>
              <div className="text-muted-foreground mt-1">Timed removal</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">🎨 Themed</div>
              <div className="text-muted-foreground mt-1">Context colors</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">📱 Responsive</div>
              <div className="text-muted-foreground mt-1">Mobile-friendly</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
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
          <span>💬</span>
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
                  <Button variant="outline" className="w-full">
                    <span className="mr-2">👤</span>
                    View Profile
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        SJ
                      </div>
                      <div>
                        <div className="font-semibold">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Lead Developer</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span>Engineering</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projects:</span>
                        <span>8 active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge variant="default">Available</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">Message</Button>
                      <Button size="sm" variant="outline" className="flex-1">Schedule</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Actions:</h4>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">⚙️</span>
                      Settings
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <div className="font-semibold mb-2">Quick Settings</div>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <span className="mr-2">🔔</span>
                        Notifications
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <span className="mr-2">🌙</span>
                        Dark Mode
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <span className="mr-2">🔒</span>
                        Privacy
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">📊</span>
                      Stats
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="space-y-3">
                      <div className="font-semibold">Performance Stats</div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-lg font-bold">1,247</div>
                          <div className="text-xs text-muted-foreground">Active Users</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-lg font-bold">€45,678</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-lg font-bold">99.8%</div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-lg font-bold">4.9</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Product Quick View:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <span className="mr-2">📱</span>
                    MacBook Pro 16"
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                        💻
                      </div>
                      <div>
                        <div className="font-semibold">MacBook Pro 16"</div>
                        <div className="text-sm text-muted-foreground">Apple M3 Pro chip</div>
                        <div className="text-lg font-bold">€2,499</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <Badge variant="default">15 available</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span>⭐⭐⭐⭐⭐ 4.8/5</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">Add to Cart</Button>
                      <Button size="sm" variant="outline">Details</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Help & Support:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <span className="mr-2">❓</span>
                    Need Help?
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="space-y-3">
                    <div className="font-semibold">Support Options</div>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="mr-2">📚</span>
                      Documentation
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="mr-2">💬</span>
                      Live Chat
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="mr-2">📧</span>
                      Email Support
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="mr-2">📞</span>
                      Call Support
                    </Button>
                    <div className="pt-2 border-t text-xs text-muted-foreground">
                      Average response time: 2 hours
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Popover Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">📍 Smart Positioning</div>
              <div className="text-muted-foreground mt-1">Auto-placement</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">🎨 Rich Content</div>
              <div className="text-muted-foreground mt-1">Any component</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="font-medium">⌨️ Keyboard Nav</div>
              <div className="text-muted-foreground mt-1">Full accessibility</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
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
            <span>📋</span>
            Project Management Dashboard
          </CardTitle>
          <CardDescription>
            Complete project management interface with all 6 advanced components working together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Top Bar with Command and Quick Actions */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addNotification('info', 'Command Palette', 'Global search activated')}
              >
                <span className="mr-2">⌘</span>
                Search & Commands
                <Badge variant="outline" className="ml-2">⌘K</Badge>
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <span className="mr-2">👤</span>
                    Profile
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-2">
                    <div className="font-semibold">Project Manager</div>
                    <div className="text-sm text-muted-foreground">Emma Davis</div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">Settings</Button>
                      <Button size="sm" variant="outline" className="flex-1">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNotification('success', 'Project Created', 'New project "Website Redesign" has been created')}
              >
                <span className="mr-2">➕</span>
                New Project
              </Button>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Calendar Section */}
            <div>
              <h4 className="font-semibold mb-3">Project Timeline:</h4>
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>📅 Sprint Planning</span>
                    <Badge variant="default">Today</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>🎯 Milestone Review</span>
                    <Badge variant="secondary">Tomorrow</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Actions */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Quick Actions:</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Search projects, tasks, team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
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
                <h4 className="font-semibold mb-3">Team Assignment:</h4>
                <div className="space-y-2">
                  {[
                    'Sarah Johnson (Frontend)',
                    'Michael Chen (Design)',
                    'Alex Rodriguez (Backend)'
                  ]
                    .filter(member => member.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((member, index) => (
                      <Popover key={index}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="w-full justify-start">
                            <span className="mr-2">👤</span>
                            {member}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          <div className="space-y-2">
                            <div className="font-semibold">{member.split(' ')[0]} {member.split(' ')[1]}</div>
                            <div className="text-sm text-muted-foreground">
                              Current workload: 75%
                            </div>
                            <div className="flex gap-2 pt-2">
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
                      </Popover>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Area */}
          <div>
            <h4 className="font-semibold mb-3">Recent Activity:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {notifications.slice(0, 3).map((notification) => (
                <div 
                  key={notification.id} 
                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {notification.type === 'success' ? '✅' :
                       notification.type === 'error' ? '❌' :
                       notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </span>
                    <span>{notification.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
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
            <span>🛒</span>
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
              <h4 className="font-semibold mb-3">Product Search:</h4>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
              />
              <div className="space-y-2">
                {[
                  'MacBook Pro 16" - €2,499',
                  'iPhone 15 Pro - €999',
                  'AirPods Pro - €249'
                ]
                  .filter(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product, index) => (
                    <Popover key={index}>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start text-left">
                          <span className="mr-2">📱</span>
                          {product}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="space-y-2">
                          <div className="font-semibold">{product.split(' - ')[0]}</div>
                          <div className="text-sm text-muted-foreground">
                            Stock: 15 units
                          </div>
                          <div className="text-lg font-bold">{product.split(' - ')[1]}</div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                            <Button size="sm" variant="outline" className="flex-1">Stock</Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ))
                }
              </div>
            </div>

            {/* Promotion Calendar */}
            <div>
              <h4 className="font-semibold mb-3">Promotion Schedule:</h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">📅</span>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="mt-3 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addNotification('success', 'Promotion Scheduled', 'Black Friday sale scheduled for November 24')}
                >
                  <span className="mr-2">🏷️</span>
                  Schedule Sale
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addNotification('info', 'Promotion', 'Flash sale campaign created')}
                >
                  <span className="mr-2">⚡</span>
                  Flash Sale
                </Button>
              </div>
            </div>

            {/* Order Notifications */}
            <div>
              <h4 className="font-semibold mb-3">Order Alerts:</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNotification('success', 'New Order', 'Order #12345 - MacBook Pro 16" - €2,499')}
                >
                  <span className="mr-2">📦</span>
                  New Order Alert
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNotification('warning', 'Low Stock', 'iPhone 15 Pro - Only 3 units remaining')}
                >
                  <span className="mr-2">⚠️</span>
                  Stock Alert
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNotification('error', 'Payment Failed', 'Order #12344 - Payment processing failed')}
                >
                  <span className="mr-2">💳</span>
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
      
      {/* Demo Selector */}
      <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
        {demoTabs.map((demo) => (
          <Button
            key={demo.id}
            variant={activeDemo === demo.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDemo(demo.id)}
            className="flex items-center gap-2"
          >
            <span>{demo.icon}</span>
            <span className="hidden sm:inline">{demo.label}</span>
          </Button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="min-h-[400px]">
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
            <div>
              <h4 className="font-semibold mb-2">SaaS Dashboard Flow:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Command (⌘K):</strong> Global navigation and search</li>
                <li>• <strong>Calendar:</strong> Event planning and scheduling</li>
                <li>• <strong>Combobox:</strong> Smart data filtering</li>
                <li>• <strong>Popover:</strong> Quick actions and previews</li>
                <li>• <strong>Date Picker:</strong> Precise date selections</li>
                <li>• <strong>Sonner:</strong> Real-time system feedback</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">E-commerce Admin Flow:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Combobox:</strong> Product search and selection</li>
                <li>• <strong>Calendar:</strong> Promotion and sale scheduling</li>
                <li>• <strong>Date Picker:</strong> Campaign date planning</li>
                <li>• <strong>Popover:</strong> Product quick edit and details</li>
                <li>• <strong>Sonner:</strong> Order and inventory alerts</li>
                <li>• <strong>Command:</strong> Admin quick actions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}