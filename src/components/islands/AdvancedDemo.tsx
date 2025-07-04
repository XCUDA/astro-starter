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
            <CalendarIcon className="h-5 w-5" />
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
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Use Cases:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Hotel Booking:</strong> Availability calendar with blocked dates</li>
                <li>• <strong>Event Planning:</strong> Multi-date selection for conferences</li>
                <li>• <strong>CRM Systems:</strong> Appointment scheduling interface</li>
                <li>• <strong>Project Management:</strong> Deadline and milestone tracking</li>
              </ul>
              {selectedDate && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
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
            <CalendarIcon className="h-5 w-5" />
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
                  <label className="text-sm font-medium">Delivery Date:</label>
                  <div className="mt-1">
                    <DatePickerDemo />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Meeting Date:</label>
                  <div className="mt-1">
                    <DatePickerDemo />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Applications:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>E-commerce:</strong> Delivery date selection</li>
                <li>• <strong>Service Booking:</strong> Appointment date picker</li>
                <li>• <strong>Forms:</strong> Birth date, contract dates</li>
                <li>• <strong>Reports:</strong> Date range filters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combobox Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5" />
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
              <ComboboxDemo />
              <div className="mt-4">
                <h4 className="font-semibold mb-3">Multiple Use Cases</h4>
                <div className="space-y-2">
                  <ComboboxDemo />
                  <ComboboxDemo />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Scenarios:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Product Search:</strong> E-commerce product selection</li>
                <li>• <strong>Customer CRM:</strong> Client search and selection</li>
                <li>• <strong>Location Picker:</strong> City/country selection</li>
                <li>• <strong>Category Filter:</strong> Multi-level taxonomy navigation</li>
                <li>• <strong>User Assignment:</strong> Team member selection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CommandIcon className="h-5 w-5" />
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
                  <Button variant="outline" className="w-full justify-start">
                    <CommandIcon className="mr-2 h-4 w-4" />
                    Search commands... <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">⌘K</kbd>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                          <SearchIcon className="mr-2 h-4 w-4" />
                          <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </CommandItem>
                        <CommandItem>
                          <BellIcon className="mr-2 h-4 w-4" />
                          <span>Notifications</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Actions">
                        <CommandItem>
                          <FileIcon className="mr-2 h-4 w-4" />
                          <span>New File</span>
                        </CommandItem>
                        <CommandItem>
                          <HelpCircleIcon className="mr-2 h-4 w-4" />
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
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>SaaS Dashboards:</strong> Quick navigation and actions</li>
                <li>• <strong>Admin Panels:</strong> System commands and shortcuts</li>
                <li>• <strong>IDE/Editors:</strong> File search and command execution</li>
                <li>• <strong>CRM Systems:</strong> Quick client and action lookup</li>
                <li>• <strong>E-commerce:</strong> Product and order search</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sonner Toast Notifications Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
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
                <Button onClick={showSuccessToast} variant="default" className="w-full">
                  Success Toast
                </Button>
                <Button onClick={showErrorToast} variant="destructive" className="w-full">
                  Error Toast
                </Button>
                <Button onClick={showInfoToast} variant="outline" className="w-full">
                  Info Toast
                </Button>
                <Button onClick={showLoadingToast} variant="secondary" className="w-full">
                  Loading Toast (3s)
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Business Use Cases:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Form Validation:</strong> Success/error feedback</li>
                <li>• <strong>API Operations:</strong> Loading and completion states</li>
                <li>• <strong>User Actions:</strong> Save, delete, update confirmations</li>
                <li>• <strong>System Alerts:</strong> Real-time notifications</li>
                <li>• <strong>E-commerce:</strong> Cart updates, order confirmations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popover Component Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircleIcon className="h-5 w-5" />
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
                      <Button variant="outline" size="sm">
                        <UserIcon className="h-4 w-4 mr-1" />
                        View Profile
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-muted-foreground">
                          Senior Developer at XCUDA. Working on modern web applications.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm">View Full Profile</Button>
                          <Button size="sm" variant="outline">Message</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-center gap-4">
                  <span>Help & Info:</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <HelpCircleIcon className="h-4 w-4 mr-1" />
                        Need Help?
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Quick Help</h4>
                        <p className="text-sm text-muted-foreground">
                          This feature allows you to manage your data efficiently. 
                          Click the buttons below for more options.
                        </p>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            📚 View Documentation
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
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
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>User Profiles:</strong> Quick profile preview and actions</li>
                <li>• <strong>Help Systems:</strong> Contextual help and tooltips</li>
                <li>• <strong>Product Info:</strong> Additional product details</li>
                <li>• <strong>Settings:</strong> Quick access to configuration options</li>
                <li>• <strong>Notifications:</strong> Detailed notification content</li>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded">
              <div className="font-semibold">Calendar</div>
              <div className="text-sm text-muted-foreground">Event Planning</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded">
              <div className="font-semibold">Date Picker</div>
              <div className="text-sm text-muted-foreground">Form Integration</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded">
              <div className="font-semibold">Combobox</div>
              <div className="text-sm text-muted-foreground">Search & Select</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded">
              <div className="font-semibold">Command</div>
              <div className="text-sm text-muted-foreground">Power User UX</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded">
              <div className="font-semibold">Sonner</div>
              <div className="text-sm text-muted-foreground">Modern Feedback</div>
            </div>
            <div className="text-center p-3 bg-violet-50 dark:bg-violet-950/30 rounded">
              <div className="font-semibold">Popover</div>
              <div className="text-sm text-muted-foreground">Contextual UI</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}