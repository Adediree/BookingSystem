import type { ModernSelectOption } from "qore-components";
import { SeatSectionEnum } from "./enums/SeatSectionEnum";
import { SeatStatusEnum } from "./enums/SeatStatusEnum";

export type Seat = {
  id: string;
  label: string;
  status: "available" | "booked";
};

export type BookedDay = {
  day: string;
  date: string;
  foodOptions: typeof foodSelectOptions;
  seatOptions: typeof seatOptions;
  isDayBooked: boolean;
}

export type SeatSection = {
  [K in SeatSectionEnum]: {
    sectionName: string;
    seats: Seat[];
  };
};

export const states: SeatSection = {
  [SeatSectionEnum.Senegal]: {
    sectionName: "SENEGAL",
    seats: [
      { id: "1", label: "S1", status: SeatStatusEnum.AVAILABLE },
      { id: "2", label: "S2", status: "booked" },
      { id: "3", label: "S3", status: "available" },
      { id: "4", label: "S4", status: "booked" },
    ],
  },

  GHANA: {
    sectionName: "GHANA",
    seats: [
      { id: "1", label: "G1", status: "available" },
      { id: "2", label: "G2", status: "booked" },
      { id: "3", label: "G3", status: "available" },
      { id: "4", label: "G4", status: "booked" },
      { id: "5", label: "G5", status: "booked" },
      { id: "6", label: "G6", status: "available" },
      { id: "7", label: "G7", status: "booked" },
      { id: "8", label: "G8", status: "available" },
      { id: "9", label: "G9", status: "booked" },
      { id: "10", label: "G10", status: "booked" },
      { id: "11", label: "G11", status: "booked" },
      { id: "12", label: "G12", status: "booked" },
    ],
  },

  NAMIBIA: {
    sectionName: "NAMIBIA",
    seats: [
      { id: "1", label: "N1", status: "available" },
      { id: "2", label: "N2", status: "booked" },
      { id: "3", label: "N3", status: "available" },
      { id: "4", label: "N4", status: "booked" },
      { id: "5", label: "N5", status: "booked" },
      { id: "6", label: "N6", status: "booked" },
      { id: "7", label: "N7", status: "booked" },
    ],
  },

  KENYA: {
    sectionName: "KENYA",
    seats: [
      { id: "1", label: "K1", status: "available" },
      { id: "2", label: "K2", status: "booked" },
      { id: "3", label: "K3", status: "available" },
      { id: "4", label: "K4", status: "booked" },
      { id: "5", label: "K5", status: "booked" },
      { id: "6", label: "K6", status: "available" },
      { id: "7", label: "K7", status: "booked" },
      { id: "8", label: "K8", status: "available" },
      { id: "9", label: "K9", status: "booked" },
      { id: "10", label: "K10", status: "booked" },
    ],
  },

  ETIOPIA: {
    sectionName: "ETIOPIA",
    seats: [
      { id: "1", label: "E1", status: "available" },
      { id: "2", label: "E2", status: "booked" },
      { id: "3", label: "E3", status: "available" },
      { id: "4", label: "E4", status: "booked" },
      { id: "5", label: "E5", status: "booked" },
    ],
  },

  TOGO: {
    sectionName: "TOGO",
    seats: [
      { id: "1", label: "T1", status: "available" },
      { id: "2", label: "T2", status: "booked" },
      { id: "3", label: "T3", status: "available" },
      { id: "4", label: "T4", status: "booked" },
    ],
  },

  MALI: {
    sectionName: "MALI",
    seats: [
      { id: "1", label: "M1", status: "available" },
      { id: "2", label: "M2", status: "booked" },
      { id: "3", label: "M3", status: "available" },
      { id: "4", label: "M4", status: "booked" },
    ],
  },

  ZAMBIA: {
    sectionName: "ZAMBIA",
    seats: [
      { id: "1", label: "Z1", status: "available" },
      { id: "2", label: "Z2", status: "booked" },
    ],
  },
};

// Get GPT to give you the days of the next week. then it should map over it to produce the output below:
// const seatOptions:ModernSelectOption[] = Object.entries(states).map(([key, value])=>{
// return value.seats.map
//})

// const seatSections = Object.keys(states); [[key,value], [key.value]
export const seatOptions: ModernSelectOption[] = Object.entries(states).reduce(
  (acc, [currentKey, currentValue]) => {
    const sectionSeat: ModernSelectOption[] = currentValue.seats.map(
      (seat) => ({
        label: `${currentKey}-${seat.label}`,
        value: `${currentKey}-${seat.id}`,

      })
    );
    return acc.concat(sectionSeat); //
  },
  [] as ModernSelectOption[]
);

export const foodSelectOptions: ModernSelectOption[] = [
  {
    label: "FriedFish",
    value: "friedFish",
  },

  {
    label: "JollofRice",
    value: "Jollof Rice",
  },

  {
    label: "YamAndEgg",
    value: "Yam And Egg",
  },
];


export const generateNextWeekDays = (): BookedDay[] => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const result = [];
  const today = new Date();

  // Find next Monday
  const dayOfWeek = today.getDay();
  const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7;
  let nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);

  for (let i = 0; i < 5; i++) {
    const date = new Date(nextMonday);
    date.setDate(nextMonday.getDate() + i);

    const dayName = weekdays[date.getDay()];
    const formattedDate = date
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-"); // DD-MM-YYYY

    result.push({
      day: dayName,
      date: formattedDate,
      foodOptions: foodSelectOptions,
      seatOptions: seatOptions,
      isDayBooked: false,
      selectedSeat: "",
      selectedFood: "",
    });
  }

  return result;
};




//  [
//    {
//      day: "Monday",
//      date: "12-07-2025",
//      foodOptions: foodSelectOptions,
//      seatOptions: seatOptions,

//    },
//    {
//      day: "Tuesday",
//      date: "12-07-2025",
//      foodOptions: foodSelectOptions,
//      seatOptions: seatOptions,
//    },
//    {
//      day: "Wednesday",
//      date: "12-07-2025",
//      foodOptions: foodSelectOptions,
//      seatOptions: seatOptions,
//    },
//    {
//      day: "Thursday",
//      date: "12-07-2025",
//      foodOptions: foodSelectOptions,
//      seatOptions: seatOptions,
//    },
//    {
//      day: "Friday",
//      date: "12-07-2025",
//      foodOptions: foodSelectOptions,
//      seatOptions: seatOptions,
//    },
//  ];

