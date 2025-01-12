# Calendar Implementation – Customer Use case (https://www.clarkcountynv.gov/calendar.php)
Edge Delivery Services Implementation - https://main--clarkcountynv--aemsites.aem.live/calendar

## Calender Demo URL's 
- Preview: https://main--calendar-demo--meejain.aem.page/calendar
- Live: https://main--calendar-demo--meejain.aem.live/calendar

## Presentation along with screenshots with all details
https://retrospect--whats-next--adobecom.hlx.page/calendar

## Customer Use Cases taken care
- 41 departments having their individual calendar events URL.
- Each department should NOT be able to edit other department’s events & having their own Division ID’s.
- All events of all departments should also land onto a Master Calendar.
- Calendar search functionality.
- 10+ different event formats.
- Individual Colour Coding which should be reflected on their respective calendar events, at the top & bottom sections of any event.
- Should have the option of Recurring events having “excluding dates” & DaysOfWeek as options.
- Need to have an option of “Read more”. If there is no “Read More” URL to be shared, then that should not reflect on that event.
- The admins of the site, should have the power to select the most important events from that entire bunch of events, which will then be reflected onto the main home page as County Featured Events.
- Layout in Desktop View & Mobile View should match exactly.
- Enablement of Featured Events.

## Thought Process to achive the above
- Event template – making Authoring as easy as possible.
- Start gauging blocks / sections which gives the same look and feel of the current set of 10+ events designs.
- Customer will have the ability to place these blocks anywhere, in order to meet the desired view of that event.
- Event metadata – which plays the most important part here which will carry all data to the calendar code.
- Avoid repeated things for the customer.
- 41 Departments ~ 41 SharePoint folders - Each department will have their own corresponding folder & each folder will have its own event template and default index file.
- Users just need to duplicate that event template, add data to it with all metadata updated, Preview & Publish & event will be reflected onto the Calendar.
- Indexing, Enablement of featured events & list of departments from 1 sheet.
- All those events for every department will be indexed onto an events sheet under raw_index.
- Those events will automatically be copied to shared-default sheet.
- We have added an extra column within shared-default – called “featured”.
- It will be site admins ONLY who will vet through the entire events list, validate & accordingly, mark “yes” to an important event row.
- Once the sheet is Previewed and Published, automatically those “YES” events will get listed in the form of cards on the home page.
- Making authoring as easy as possible in terms of addition of more departments in future.
- For addition of new departments in future, there is no need to touch the code.
- Simply add a row to the division – sheet with details, add its corresponding folder with its event sheet and index file – that's it.


## Step by Step Workflow

<img width="1644" alt="image" src="https://github.com/user-attachments/assets/7d43f833-3d9b-4acc-b0b3-750f5de26ecf" />


## Leveraging Full Calendar – free version for the calendar base code
https://fullcalendar.io/


