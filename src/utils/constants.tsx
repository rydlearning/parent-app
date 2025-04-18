export const homeTabs = [
  { name: "Profiles", icon: "profile.svg", id: 0 },
  { name: "Activity", icon: "activity.svg", id: 1 },
  { name: "Children", icon: "profile.svg", id: 2 },
  { name: "Report", icon: "activity.svg", id: 3 },
];

export const Days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat",]
export const Times = ["00:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM",
"11:00AM", "12:00PM", "13:00PM", "14:00PM", "15:00PM", "16:00PM", "17:00PM", "18:00PM", "19:00PM", "20:00PM", "21:00PM",
"22:00PM", "23:00PM"];

export const curriculum = {
  l1_basic:
    "https://drive.google.com/file/d/1MhtzIU4dDwfH07LJZShDGmCQkP1xSSsj/view?usp=sharing",
  l1_advanced:
    "https://drive.google.com/file/d/1jUrR2fisXL1sdduJR2Vpex4hjzVH1yxX/view?usp=sharing",
  l2_basic:
    "https://drive.google.com/file/d/1jkNaq5gKRgFTjonmzgJ9B-T_3WlY4cMc/view?usp=sharing",
  l2_advanced: "",
  l3_basic:
    "https://drive.google.com/file/d/1zdusl9lStagwiJt8jVqws1HvV2DoVC0Y/view?usp=sharing",
  l3_advanced: "",
};

export function formatDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const daySuffix = getDaySuffix(day);
  const formattedDate = `${day}${daySuffix} ${month} ${year}`;
  return formattedDate;
}

export const setCertificateData = (data: any) => {
  const certificateData = JSON.stringify(data);
  sessionStorage.removeItem("certificateData");
  sessionStorage.setItem("certificateData", certificateData);
};

export function getCertificateData() {
  const certificateData = sessionStorage.getItem("certificateData");

  if (certificateData) {
    return JSON.parse(certificateData);
  } else {
    return null;
  }
}

export function newFormatDate(isoDateString:any) {
  // Parse the ISO date string to a Date object
  const date = new Date(isoDateString);

  // Array of month names
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  // Get the day, month, and year
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Function to get the day suffix (st, nd, rd, th)
  function getDaySuffix(day:any) {
      if (day >= 11 && day <= 13) return 'th'; // Special case for 11th, 12th, 13th
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  }

  // Format the date as "14th September 2024"
  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}


export function formatDateWithCurrentYear(dateString:string) {
  const currentYear = new Date().getFullYear();
  const dateRangeMatch = dateString.match(/(\w+ \d+)(?: & (\w+ \d+))?/);

  if (dateRangeMatch) {
    const lastDateString = dateRangeMatch[2] || dateRangeMatch[1]; 
    const formattedDate = new Date(lastDateString + ` ${currentYear}`);
    return formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  const singleDateFormatted = new Date(dateString + ` ${currentYear}`);
  
  return singleDateFormatted.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function FormatEndDate(inputDate: string): string {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);

    // Define an array of month names
    const months: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract the day, month, and year from the Date object
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    // Format the date as "day Month year"
    return `${day} ${month} ${year}`;
}



export const SPECIAL_COHORT_NUM = 4
