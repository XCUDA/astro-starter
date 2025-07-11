// AdvancedShowcaseDemo.tsx - CORRECTED - Real shadcn/ui Components Integration
// Path: /src/components/islands/AdvancedShowcaseDemo.tsx

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
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
import { 
  Calendar as CalendarIcon, 
  Check, 
  ChevronsUpDown,
  Search,
  User,
  Settings,
  BarChart3,
  FileText,
  Users,
  HelpCircle,
  Plus,
  Command as CommandIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type DemoType = 'calendar' | 'datepicker' | 'combobox' | 'command' | 'sonner' | 'popover' | 'combined';

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'event';
}

// Cross-platform keyboard shortcut detection - FIXED TypeScript safe
const getShortcutKey = () => {
  try {
    // Use userAgent as navigator.platform is deprecated
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    return userAgent.includes('mac') ? '⌘' : 'Ctrl';
  } catch (error) {
    console.warn('Platform detection failed, defaulting to Ctrl');
    return 'Ctrl';
  }
};

// Debug function for troubleshooting - FIXED TypeScript
const debugToast = (message: string) => {
  console.log('[TOAST DEBUG]:', message);
  // Fallback for debugging - no global window.toast dependency
  if (typeof window !== 'undefined') {
    console.log('Toast attempted:', message);
  }
};

// Sample data for demos
const products = [
  { value: 'macbook-pro', label: 'MacBook Pro 16"', price: '€2,499', category: 'laptop' },
  { value: 'iphone-15', label: 'iPhone 15 Pro', price: '€999', category: 'phone' },
  { value: 'ipad-air', label: 'iPad Air', price: '€649', category: 'tablet' },
  { value: 'airpods-pro', label: 'AirPods Pro', price: '€249', category: 'audio' },
  { value: 'apple-watch', label: 'Apple Watch Ultra', price: '€899', category: 'watch' },
  { value: 'imac-24', label: 'iMac 24"', price: '€1,499', category: 'desktop' },
];

const teamMembers = [
  { value: 'sarah-johnson', label: 'Sarah Johnson', role: 'Frontend Developer', avatar: 'SJ' },
  { value: 'michael-chen', label: 'Michael Chen', role: 'UI/UX Designer', avatar: 'MC' },
  { value: 'emma-davis', label: 'Emma Davis', role: 'Product Manager', avatar: 'ED' },
  { value: 'alex-rodriguez', label: 'Alex Rodriguez', role: 'Backend Engineer', avatar: 'AR' },
  { value: 'lisa-wang', label: 'Lisa Wang', role: 'DevOps Engineer', avatar: 'LW' },
  { value: 'david-kim', label: 'David Kim', role: 'QA Engineer', avatar: 'DK' },
];

export default function AdvancedShowcaseDemo() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('combined');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', date: new Date(), type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: new Date(Date.now() + 86400000), type: 'deadline' },
    { id: 3, title: 'Conference Call', date: new Date(Date.now() + 172800000), type: 'meeting' }
  ]);

  // Command Dialog State
  const [commandOpen, setCommandOpen] = useState(false);
  
  // Combobox States
  const [productComboOpen, setProductComboOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [teamComboOpen, setTeamComboOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState('');

  // Date Picker State
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Accessibility state management
  const announceRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState('');
  const shortcutKey = getShortcutKey();

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '🔮' },
    { id: 'calendar' as DemoType, label: 'Calendar', icon: '📅' },
    { id: 'datepicker' as DemoType, label: 'Date Picker', icon: '📆' },
    { id: 'combobox' as DemoType, label: 'Combobox', icon: '🔍' },
    { id: 'command' as DemoType, label: 'Command', icon: '⌘' },
    { id: 'sonner' as DemoType, label: 'Sonner', icon: '🔔' },
    { id: 'popover' as DemoType, label: 'Popover', icon: '💬' }
  ];

  // Global keyboard shortcut for Command Dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Accessibility: Announce changes to screen readers
  const announceChange = (message: string) => {
    setAnnouncement(message);
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // REAL Sonner Toast Integration
  const showToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => {
    switch (type) {
      case 'success':
        toast.success(title, { description: message });
        break;
      case 'error':
        toast.error(title, { description: message });
        break;
      case 'warning':
        toast.warning(title, { description: message });
        break;
      default:
        toast.info(title, { description: message });
    }
    announceChange(`${type} notification: ${title}${message ? `. ${message}` : ''}`);
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

  // Handle demo change
  const handleDemoChange = (demoId: DemoType, demoLabel: string) => {
    setActiveDemo(demoId);
    announceChange(`${demoLabel} demo activated`);
  };

  // REAL Calendar Component Demo
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
                    showToast('success', 'Date Selected', `${date.toLocaleDateString()} selected in calendar`);
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

            <div className="space-y-2" role="group" aria-label="Calendar quick actions">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => showToast('success', 'Event Added', 'Meeting scheduled successfully')}
              >
                <span className="mr-2" aria-hidden="true">📅</span>
                Add Event
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  setSelectedDate(new Date());
                  announceChange('Calendar navigated to today');
                  showToast('info', 'Calendar', 'Navigated to today');
                }}
              >
                <span className="mr-2" aria-hidden="true">📍</span>
                Go to Today
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // REAL Date Picker Component Demo
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
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                    aria-describedby="date-picker-desc"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setDatePickerOpen(false);
                      if (date) {
                        announceChange(`Date picker: ${format(date, "PPP")} selected`);
                        showToast('success', 'Date Selected', `${format(date, "PPP")} selected`);
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
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Quick Presets:</h4>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Date preset buttons">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedDate(new Date());
                    showToast('success', 'Date Selected', 'Today selected');
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
                    showToast('success', 'Date Selected', 'Tomorrow selected');
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
                    showToast('success', 'Date Selected', 'Next week selected');
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
                    showToast('success', 'Date Selected', 'Next month selected');
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

  // REAL Combobox Component Demo (Command + Popover pattern)
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="product-combobox">Product Selection:</Label>
            <Popover open={productComboOpen} onOpenChange={setProductComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={productComboOpen}
                  className="w-full justify-between"
                  aria-describedby="product-combobox-desc"
                >
                  {selectedProduct
                    ? products.find((product) => product.value === selectedProduct)?.label
                    : "Select product..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search products..." />
                  <CommandList>
                    <CommandEmpty>No product found.</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.value}
                          value={product.value}
                          onSelect={(currentValue) => {
                            setSelectedProduct(currentValue === selectedProduct ? "" : currentValue);
                            setProductComboOpen(false);
                            const productName = products.find(p => p.value === currentValue)?.label;
                            if (productName) {
                              showToast('success', 'Product Selected', `${productName} selected`);
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedProduct === product.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex items-center justify-between w-full">
                            <span>{product.label}</span>
                            <Badge variant="outline">{product.price}</Badge>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="sr-only" id="product-combobox-desc">
              Search and select a product from the list
            </div>
          </div>

          <div>
            <Label htmlFor="team-combobox">Team Member Assignment:</Label>
            <Popover open={teamComboOpen} onOpenChange={setTeamComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={teamComboOpen}
                  className="w-full justify-between"
                  aria-describedby="team-combobox-desc"
                >
                  {selectedTeamMember
                    ? teamMembers.find((member) => member.value === selectedTeamMember)?.label
                    : "Select team member..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search team members..." />
                  <CommandList>
                    <CommandEmpty>No team member found.</CommandEmpty>
                    <CommandGroup>
                      {teamMembers.map((member) => (
                        <CommandItem
                          key={member.value}
                          value={member.value}
                          onSelect={(currentValue) => {
                            setSelectedTeamMember(currentValue === selectedTeamMember ? "" : currentValue);
                            setTeamComboOpen(false);
                            const memberName = teamMembers.find(m => m.value === currentValue)?.label;
                            if (memberName) {
                              showToast('success', 'Member Assigned', `${memberName} assigned to task`);
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTeamMember === member.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                              {member.avatar}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{member.label}</span>
                              <span className="text-xs text-muted-foreground">{member.role}</span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="sr-only" id="team-combobox-desc">
              Search and select a team member to assign
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Combobox Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" role="list" aria-label="Combobox features">
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🔍 Search</div>
              <div className="text-muted-foreground mt-1">Real-time filtering</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">⌨️ Keyboard</div>
              <div className="text-muted-foreground mt-1">Full navigation</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🎯 Selection</div>
              <div className="text-muted-foreground mt-1">Clear feedback</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">♿ Accessible</div>
              <div className="text-muted-foreground mt-1">Screen reader ready</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // REAL Command Component Demo
  const CommandDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">⌘</span>
          Command Palette
        </CardTitle>
        <CardDescription>
          Global search and quick actions (Press {shortcutKey}+K to open)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="bg-muted/30 p-4 rounded-lg" role="region" aria-labelledby="command-demo-heading">
          <div className="text-center mb-4">
            <h4 id="command-demo-heading" className="sr-only">Command palette demo</h4>
            <Button 
              variant="outline" 
              onClick={() => setCommandOpen(true)}
              className="w-full justify-start text-muted-foreground"
            >
              <Search className="mr-2 h-4 w-4" />
              Search everything...
              <Badge variant="outline" className="ml-auto">
                {shortcutKey}+K
              </Badge>
            </Button>
          </div>
        </div>

        {/* REAL Command Dialog */}
        <CommandDialog 
          open={commandOpen} 
          onOpenChange={setCommandOpen}
          title="Command Palette"
          description="Search for commands and navigate quickly"
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                showToast('success', 'Project Created', 'New project has been created');
              }}>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create New Project</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                showToast('info', 'Navigation', 'Switched to dashboard');
              }}>
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Go to Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                showToast('success', 'Settings', 'Preferences opened');
              }}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Open Settings</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                showToast('info', 'Navigation', 'Switched to projects');
              }}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Projects</span>
                <Badge variant="outline" className="ml-auto">{shortcutKey}+P</Badge>
              </CommandItem>
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                showToast('info', 'Navigation', 'Team page opened');
              }}>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
                <Badge variant="outline" className="ml-auto">{shortcutKey}+T</Badge>
              </CommandItem>
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                showToast('info', 'Navigation', 'Help center opened');
              }}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
                <Badge variant="outline" className="ml-auto">{shortcutKey}+?</Badge>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Team Members">
              {teamMembers.slice(0, 3).map((member) => (
                <CommandItem 
                  key={member.value}
                  onSelect={() => {
                    setCommandOpen(false);
                    showToast('info', 'Team Member', `Viewing ${member.label} profile`);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{member.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{member.role}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

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
              <div className="font-medium">🌐 Cross-platform</div>
              <div className="text-muted-foreground mt-1">{shortcutKey}+K shortcut</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // REAL Sonner Component Demo
  const SonnerDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">🔔</span>
          Sonner Notifications
        </CardTitle>
        <CardDescription>
          Toast notifications and real-time feedback system using Sonner
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="font-semibold mb-3">Generate Real Notifications:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="group" aria-label="Notification generators">
            <Button
              variant="outline"
              onClick={() => showToast('success', 'Success!', 'Operation completed successfully')}
            >
              ✅ Success
            </Button>
            
            <Button
              variant="outline"
              onClick={() => showToast('error', 'Error!', 'Something went wrong')}
            >
              ❌ Error
            </Button>
            
            <Button
              variant="outline"
              onClick={() => showToast('warning', 'Warning!', 'Please review your action')}
            >
              ⚠️ Warning
            </Button>
            
            <Button
              variant="outline"
              onClick={() => showToast('info', 'Info', 'New information available')}
            >
              ℹ️ Info
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Business Notification Examples:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => showToast('success', 'Order Confirmed', 'Order #12345 has been confirmed and will ship soon')}
              >
                <span className="mr-2" aria-hidden="true">📦</span>
                Order Confirmation
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => showToast('info', 'New Message', 'You have a new message from Sarah Johnson')}
              >
                <span className="mr-2" aria-hidden="true">💬</span>
                New Message
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => showToast('warning', 'Payment Due', 'Invoice #INV-2024-001 is due in 3 days')}
              >
                <span className="mr-2" aria-hidden="true">💳</span>
                Payment Reminder
              </Button>
            </div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => showToast('success', 'Backup Complete', 'Daily backup completed successfully at 2:00 AM')}
              >
                <span className="mr-2" aria-hidden="true">💾</span>
                System Backup
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => showToast('error', 'Connection Lost', 'Unable to connect to server. Retrying...')}
              >
                <span className="mr-2" aria-hidden="true">🌐</span>
                Network Error
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => showToast('info', 'Update Available', 'Version 2.1.0 is available for download')}
              >
                <span className="mr-2" aria-hidden="true">⬆️</span>
                Software Update
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Advanced Toast Examples:</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: 'Uploading file...',
                    success: 'File uploaded successfully!',
                    error: 'Failed to upload file',
                  }
                );
              }}
            >
              Promise Toast (Upload Simulation)
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast.success('Task Completed', {
                  description: 'Your project has been saved',
                  action: {
                    label: 'View',
                    onClick: () => showToast('info', 'Viewing Project', 'Opening project details...')
                  }
                });
              }}
            >
              Action Toast (With Button)
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast('Custom Branded Toast', {
                  description: 'With custom colors and styling',
                  style: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: '1px solid #667eea',
                    fontWeight: '500',
                  }
                });
              }}
            >
              Custom Styled Toast
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Sonner Features:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" role="list" aria-label="Sonner features">
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">⏱️ Auto-dismiss</div>
              <div className="text-muted-foreground mt-1">Timed removal</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🎨 Themed</div>
              <div className="text-muted-foreground mt-1">Dark/light mode</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">📱 Responsive</div>
              <div className="text-muted-foreground mt-1">Mobile-friendly</div>
            </div>
            <div className="p-3 border rounded-lg text-center" role="listitem">
              <div className="font-medium">🔧 Actionable</div>
              <div className="text-muted-foreground mt-1">Custom actions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Popover Demo (already using real component)
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
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
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
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => showToast('info', 'Message', 'Opening chat with Sarah Johnson')}
                      >
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => showToast('info', 'Schedule', 'Opening calendar for Sarah Johnson')}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Quick Actions:</h4>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-1 h-4 w-4" />
                      Settings
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <div className="font-semibold mb-2">Quick Settings</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => showToast('info', 'Settings', 'Notifications settings opened')}
                      >
                        <span className="mr-2" aria-hidden="true">🔔</span>
                        Notifications
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => showToast('info', 'Settings', 'Theme settings opened')}
                      >
                        <span className="mr-2" aria-hidden="true">🌙</span>
                        Dark Mode
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => showToast('info', 'Settings', 'Privacy settings opened')}
                      >
                        <span className="mr-2" aria-hidden="true">🔒</span>
                        Privacy
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="mr-1 h-4 w-4" />
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

  // Combined Demo with all real components - FIXED
  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* REAL Command Dialog for Combined Demo */}
      <CommandDialog 
        open={commandOpen} 
        onOpenChange={setCommandOpen}
        title="Project Command Palette"
        description="Search and execute project commands quickly"
      >
        <CommandInput placeholder="Search projects, tasks, commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => {
              setCommandOpen(false);
              showToast('success', 'Project Created', 'New project "Website Redesign" has been created');
            }}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Project</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setCommandOpen(false);
              showToast('success', 'Task Created', 'New task added to current sprint');
            }}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Add Task</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              setCommandOpen(false);
              showToast('info', 'Team Meeting', 'Team meeting scheduled for tomorrow');
            }}>
              <Users className="mr-2 h-4 w-4" />
              <span>Schedule Team Meeting</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => {
              setCommandOpen(false);
              showToast('info', 'Navigation', 'Switched to dashboard view');
            }}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <Badge variant="outline" className="ml-auto">{shortcutKey}+D</Badge>
            </CommandItem>
            <CommandItem onSelect={() => {
              setCommandOpen(false);
              showToast('info', 'Navigation', 'Opened project timeline');
            }}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Timeline</span>
              <Badge variant="outline" className="ml-auto">{shortcutKey}+T</Badge>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Team Members">
            {teamMembers.slice(0, 3).map((member) => (
              <CommandItem 
                key={member.value}
                onSelect={() => {
                  setCommandOpen(false);
                  showToast('info', 'Team Member', `Viewing ${member.label} profile`);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                <span>{member.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{member.role}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Project Management Dashboard with ALL REAL components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">📋</span>
            Project Management Dashboard - All Real Components
          </CardTitle>
          <CardDescription>
            Complete project management interface with all 6 advanced components working together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Top Bar with REAL Command and Quick Actions */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCommandOpen(true)}
                aria-describedby="combined-command-desc"
              >
                <CommandIcon className="mr-2 h-4 w-4" />
                Search & Commands
                <Badge variant="outline" className="ml-2">{shortcutKey}+K</Badge>
              </Button>
              <div className="sr-only" id="combined-command-desc">
                Open command palette for quick project actions
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-2">
                    <div className="font-semibold">Project Manager</div>
                    <div className="text-sm text-muted-foreground">Emma Davis</div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => showToast('info', 'Settings', 'Opening project settings')}
                      >
                        Settings
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => showToast('info', 'Logout', 'Logging out of project dashboard...')}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('success', 'Project Created', 'New project "Website Redesign" has been created')}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Main Dashboard Grid with REAL components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* REAL Calendar Section - FIXED Timeline Integration */}
            <div>
              <h4 className="font-semibold mb-3" id="combined-timeline-heading">Project Timeline:</h4>
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      announceChange(`Project timeline: ${date.toLocaleDateString()} selected`);
                      showToast('info', 'Timeline Updated', `Selected ${date.toLocaleDateString()} for project planning`);
                      
                      // Update events based on selected date
                      const dayOfWeek = date.getDay();
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                      
                      if (isWeekend) {
                        showToast('warning', 'Weekend Selected', 'Note: Selected date is a weekend');
                      } else {
                        showToast('success', 'Business Day', 'Good choice for project activities');
                      }
                    }
                  }}
                  className="rounded-md"
                  aria-labelledby="combined-timeline-heading"
                />
                <div className="mt-4 space-y-2" role="list" aria-label="Project events for selected date">
                  {selectedDate && (
                    <>
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Events for {selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}:
                      </div>
                      {events
                        .filter(event => 
                          event.date.toDateString() === selectedDate.toDateString()
                        )
                        .map(event => (
                          <div key={event.id} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded" role="listitem">
                            <span className="flex items-center gap-2">
                              <span aria-hidden="true">
                                {event.type === 'meeting' ? '📅' : 
                                 event.type === 'deadline' ? '🎯' : '📋'}
                              </span>
                              {event.title}
                            </span>
                            <Badge variant={event.type === 'meeting' ? 'default' : 'secondary'}>
                              {event.type}
                            </Badge>
                          </div>
                        ))
                      }
                      {events.filter(event => 
                        event.date.toDateString() === selectedDate.toDateString()
                      ).length === 0 && (
                        <div className="text-sm text-muted-foreground text-center py-2">
                          No events scheduled for this date
                        </div>
                      )}
                      
                      {/* Quick event creation */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => {
                          const newEvent = {
                            id: Date.now(),
                            title: 'New Meeting',
                            date: selectedDate,
                            type: 'meeting' as const
                          };
                          setEvents(prev => [...prev, newEvent]);
                          showToast('success', 'Event Added', `Meeting scheduled for ${selectedDate.toLocaleDateString()}`);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event to {selectedDate.toLocaleDateString()}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* REAL Combobox and Actions */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Team Assignment:</h4>
                <Popover open={teamComboOpen} onOpenChange={setTeamComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={teamComboOpen}
                      className="w-full justify-between"
                    >
                      {selectedTeamMember
                        ? teamMembers.find((member) => member.value === selectedTeamMember)?.label
                        : "Assign team member..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search team members..." />
                      <CommandList>
                        <CommandEmpty>No team member found.</CommandEmpty>
                        <CommandGroup>
                          {teamMembers.map((member) => (
                            <CommandItem
                              key={member.value}
                              value={member.value}
                              onSelect={(currentValue) => {
                                setSelectedTeamMember(currentValue === selectedTeamMember ? "" : currentValue);
                                setTeamComboOpen(false);
                                const memberName = teamMembers.find(m => m.value === currentValue)?.label;
                                if (memberName) {
                                  showToast('success', 'Assignment Updated', `${memberName} assigned to current project`);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedTeamMember === member.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                                  {member.avatar}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">{member.label}</span>
                                  <span className="text-xs text-muted-foreground">{member.role}</span>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Quick Actions:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast('success', 'Task Created', 'New task added to current sprint backlog')}
                  >
                    ➕ Add Task
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast('info', 'Team Meeting', 'Team meeting scheduled for selected date')}
                  >
                    👥 Team Meet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast('warning', 'Deadline Alert', 'Project milestone deadline approaching')}
                  >
                    ⏰ Deadlines
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast('success', 'Report Generated', 'Weekly project report has been generated')}
                  >
                    📊 Reports
                  </Button>
                </div>
              </div>

              {/* Project Status */}
              <div>
                <h4 className="font-semibold mb-3">Project Status:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span>Active Tasks:</span>
                    <Badge variant="default">12</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span>Team Members:</span>
                    <Badge variant="secondary">{teamMembers.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span>Progress:</span>
                    <Badge variant="outline">68%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span>Next Deadline:</span>
                    <Badge variant="destructive">3 days</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Component Integration Summary */}
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

      {/* Demo Selector with Cross-platform Shortcuts */}
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
          >
            <span aria-hidden="true">{demo.icon}</span>
            <span className="hidden sm:inline">{demo.label}</span>
          </Button>
        ))}
      </div>

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        <p>Use arrow keys to navigate between demo tabs, Home and End keys to jump to first or last tab, or number keys 1-7 for direct selection. Press {shortcutKey}+K to open the command palette.</p>
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
    </div>
  );
}