import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ComboboxDemo } from '@/components/ui/combobox';
import { DatePickerDemo } from '@/components/ui/date-picker';
import {
  Command,
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { 
  CalendarIcon, 
  CommandIcon, 
  SearchIcon, 
  BellIcon,
  SettingsIcon,
  UserIcon,
  FileIcon,
  HelpCircleIcon
} from 'lucide-react';

export default function AdvancedDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [commandOpen, setCommandOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Toast notification examples
  const showSuccessToast = () => {
    toast.success('Operation completed successfully!', {
      description: 'Your changes have been saved to the database.',
    });
  };

  const showErrorToast = () => {
    toast.error('Something went wrong', {
      description: 'Please try again or contact support.',
      action: {
        label: 'Retry',
        onClick: () => toast.info('Retrying operation...'),
      },
    });
  };

  const showInfoToast = () => {
    toast.info('New feature available!', {
      description: 'Check out our latest dashboard updates.',
    });
  };

  const showLoadingToast = () => {
    const loadingToast = toast.loading('Processing your request...');
    
    // Simulate async operation
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Request processed successfully!');
    }, 3000);
  };

  return (
    <div className="space-y-12">
      {/* Toaster for notifications */}
      <Toaster position="top-right" />

      {/* Calendar Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" aria-hidden="true" />
            Calendar Component
          </CardTitle>
          <CardDescription>
            Advanced date selection for event planning, booking systems, and scheduling applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Interactive Calendar</h4>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                aria-label="Select a date for your event or appointment"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Use Cases:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li role="listitem">• <strong>Hotel Booking:</strong> Availability calendar with blocked dates</li>
                <li role="listitem">• <strong>Event Planning:</strong> Multi-date selection for conferences</li>
                <li role="listitem">• <strong>CRM Systems:</strong> Appointment scheduling interface</li>
                <li role="listitem">• <strong>Project Management:</strong> Deadline and milestone tracking</li>
              </ul>
              {selectedDate && (
                <div className="mt-4 p-3 bg-muted rounded-lg" role="status" aria-live="polite">
                  <strong>Selected:</strong> {selectedDate.toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Picker Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" aria-hidden="true" />
            Date Picker Component
          </CardTitle>
          <CardDescription>
            Compact date selection for forms and input fields with professional UX.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Form Integration</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="delivery-date">
                    Delivery Date:
                  </label>
                  <div className="mt-1">
                    <DatePickerDemo aria-label="Select delivery date for your order" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="meeting-date">
                    Meeting Date:
                  </label>
                  <div className="mt-1">
                    <DatePickerDemo aria-label="Select meeting date for appointment scheduling" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Applications:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li role="listitem">• <strong>E-commerce:</strong> Delivery date selection</li>
                <li role="listitem">• <strong>Service Booking:</strong> Appointment date picker</li>
                <li role="listitem">• <strong>Forms:</strong> Birth date, contract dates</li>
                <li role="listitem">• <strong>Reports:</strong> Date range filters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combobox Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
            Combobox Component
          </CardTitle>
          <CardDescription>
            Searchable dropdown with autocompletion for large datasets and user-friendly selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Framework Selection</h4>
              <ComboboxDemo aria-label="Select a framework from available options" />
              <div className="mt-4">
                <h4 className="font-semibold mb-3">Multiple Use Cases</h4>
                <div className="space-y-2">
                  <ComboboxDemo aria-label="Select primary technology stack" />
                  <ComboboxDemo aria-label="Select secondary framework or library" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Scenarios:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li role="listitem">• <strong>Product Search:</strong> E-commerce product selection</li>
                <li role="listitem">• <strong>Customer CRM:</strong> Client search and selection</li>
                <li role="listitem">• <strong>Location Picker:</strong> City/country selection</li>
                <li role="listitem">• <strong>Category Filter:</strong> Multi-level taxonomy navigation</li>
                <li role="listitem">• <strong>User Assignment:</strong> Team member selection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CommandIcon className="h-5 w-5" aria-hidden="true" />
            Command Palette
          </CardTitle>
          <CardDescription>
            Powerful command interface for navigation, actions, and search functionality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Interactive Command Palette</h4>
              <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    aria-label="Open command palette to search for commands and navigate quickly"
                    aria-expanded={commandOpen}
                    aria-haspopup="dialog"
                  >
                    <CommandIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    Search commands... 
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                      ⌘K
                    </kbd>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start" role="dialog" aria-label="Command palette">
                  <Command>
                    <CommandInput placeholder="Type a command or search..." aria-label="Search for commands or actions" />
                    <CommandList role="listbox">
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem aria-label="Open calendar to view and manage events">
                          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Calendar</span>
                        </CommandItem>
                        <CommandItem aria-label="Search for emojis to insert in text">
                          <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem aria-label="View and edit user profile information">
                          <UserIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Profile</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem aria-label="Open application settings and preferences">
                          <SettingsIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Settings</span>
                        </CommandItem>
                        <CommandItem aria-label="Manage notification preferences and alerts">
                          <BellIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Notifications</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Actions">
                        <CommandItem aria-label="Create a new file or document">
                          <FileIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>New File</span>
                        </CommandItem>
                        <CommandItem aria-label="Access help documentation and support">
                          <HelpCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>Help & Support</span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Applications:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li role="listitem">• <strong>SaaS Dashboards:</strong> Quick navigation and actions</li>
                <li role="listitem">• <strong>Admin Panels:</strong> System commands and shortcuts</li>
                <li role="listitem">• <strong>IDE/Editors:</strong> File search and command execution</li>
                <li role="listitem">• <strong>CRM Systems:</strong> Quick client and action lookup</li>
                <li role="listitem">• <strong>E-commerce:</strong> Product and order search</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sonner Toast Notifications Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" aria-hidden="true" />
            Sonner Toast Notifications
          </CardTitle>
          <CardDescription>
            Modern, accessible toast notifications for user feedback and system messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Toast Examples</h4>
              <div className="space-y-3">
                <Button 
                  onClick={showSuccessToast} 
                  variant="default" 
                  className="w-full"
                  aria-label="Trigger success notification to demonstrate positive feedback"
                >
                  Success Toast
                </Button>
                <Button 
                  onClick={showErrorToast} 
                  variant="destructive" 
                  className="w-full"
                  aria-label="Trigger error notification to demonstrate error handling feedback"
                >
                  Error Toast
                </Button>
                <Button 
                  onClick={showInfoToast} 
                  variant="outline" 
                  className="w-full"
                  aria-label="Trigger information notification to demonstrate general announcements"
                >
                  Info Toast
                </Button>
                <Button 
                  onClick={showLoadingToast} 
                  variant="secondary" 
                  className="w-full"
                  aria-label="Trigger loading notification to demonstrate progress feedback with automatic dismissal"
                >
                  Loading Toast (3s)
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Use Cases:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li role="listitem">• <strong>Form Validation:</strong> Success/error feedback</li>
                <li role="listitem">• <strong>API Operations:</strong> Loading and completion states</li>
                <li role="listitem">• <strong>User Actions:</strong> Save, delete, update confirmations</li>
                <li role="listitem">• <strong>System Alerts:</strong> Real-time notifications</li>
                <li role="listitem">• <strong>E-commerce:</strong> Cart updates, order confirmations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popover Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircleIcon className="h-5 w-5" aria-hidden="true" />
            Popover Component
          </CardTitle>
          <CardDescription>
            Contextual floating content for additional information and interactive elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Interactive Popovers</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span>User Profile:</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        aria-label="View user profile information with quick actions and details"
                        aria-haspopup="dialog"
                      >
                        <UserIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        View Profile
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" role="dialog" aria-label="User profile preview">
                      <div className="space-y-3">
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-muted-foreground">
                          Senior Developer at XCUDA. Working on modern web applications.
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            aria-label="Navigate to complete user profile page"
                          >
                            View Full Profile
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            aria-label="Send a direct message to this user"
                          >
                            Message
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-center gap-4">
                  <span>Help & Info:</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        aria-label="Get contextual help and access support resources"
                        aria-haspopup="dialog"
                      >
                        <HelpCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        Need Help?
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72" role="dialog" aria-label="Help and support options">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Quick Help</h4>
                        <p className="text-sm text-muted-foreground">
                          This feature allows you to manage your data efficiently. 
                          Click the buttons below for more options.
                        </p>
                        <div className="space-y-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            aria-label="Open comprehensive documentation and user guides"
                          >
                            📚 View Documentation
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            aria-label="Contact customer support team for assistance"
                          >
                            💬 Contact Support
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Applications:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li role="listitem">• <strong>User Profiles:</strong> Quick profile preview and actions</li>
                <li role="listitem">• <strong>Help Systems:</strong> Contextual help and tooltips</li>
                <li role="listitem">• <strong>Product Info:</strong> Additional product details</li>
                <li role="listitem">• <strong>Settings:</strong> Quick access to configuration options</li>
                <li role="listitem">• <strong>Notifications:</strong> Detailed notification content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprint 4 Summary */}
      <Card className="border-violet-200 dark:border-violet-800">
        <CardHeader>
          <CardTitle className="text-violet-800 dark:text-violet-200">
            🎊 Sprint 4 Complete - Advanced Components Mastery
          </CardTitle>
          <CardDescription>
            All 6 advanced components successfully integrated with business-ready examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="list" aria-label="Completed advanced components">
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded" role="listitem">
              <div className="font-semibold">Calendar</div>
              <div className="text-sm text-muted-foreground">Event Planning</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded" role="listitem">
              <div className="font-semibold">Date Picker</div>
              <div className="text-sm text-muted-foreground">Form Integration</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded" role="listitem">
              <div className="font-semibold">Combobox</div>
              <div className="text-sm text-muted-foreground">Search & Select</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded" role="listitem">
              <div className="font-semibold">Command</div>
              <div className="text-sm text-muted-foreground">Power User UX</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded" role="listitem">
              <div className="font-semibold">Sonner</div>
              <div className="text-sm text-muted-foreground">Modern Feedback</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded" role="listitem">
              <div className="font-semibold">Popover</div>
              <div className="text-sm text-muted-foreground">Contextual UI</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}