import { createContext, useContext, useState, type ReactNode } from "react";
import { states, type SeatSection } from "./mockSeatsData";
import { SeatSectionEnum } from "./enums/SeatSectionEnum";
import { SeatStatusEnum } from "./enums/SeatStatusEnum";
import { generateNextWeekDays } from "./mockSeatsData";

interface BookedDay {
  day: string;
  date: string;
  isDayBooked: boolean;
  selectedSeat?: string;
  selectedFood?: string;
}

interface BookingContextType {
  seats: SeatSection;
  selectSeat: (sectionName: SeatSectionEnum, seatId: string) => void;
  selectedSeatId: string | null;
  selectedSection: SeatSectionEnum | null;
  seatSelectedForWeek: boolean;
  setSeatSelectedForWeek: React.Dispatch<React.SetStateAction<boolean>>;
  nextWeekDays: BookedDay[];
  setNextWeekDays: React.Dispatch<React.SetStateAction<BookedDay[]>>;
}

const initialContext: BookingContextType = {
  seats: {} as SeatSection,
  selectSeat: () => {},
  selectedSeatId: "",
  selectedSection: null,
  seatSelectedForWeek: false,
  setSeatSelectedForWeek: () => {},
  nextWeekDays: [],
  setNextWeekDays: () => {},
};

export const BookingContext = createContext<BookingContextType>(initialContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [seats, setSeats] = useState<SeatSection>(states);
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<SeatSectionEnum | null>(null);
  const [seatSelectedForWeek, setSeatSelectedForWeek] = useState(false);
  const [nextWeekDays, setNextWeekDays] = useState<BookedDay[]>(
    generateNextWeekDays()
  );

  const selectSeat = (sectionName: SeatSectionEnum, seatId: string) => {
    // console.log(" Seat clicked:", sectionName, seatId);
    setSelectedSeatId(seatId);
    setSelectedSection(sectionName);
    setSeatSelectedForWeek(true);

    const updatedSeats = seats[sectionName].seats.map((seat) => ({
      ...seat,
      status:
        seat.id === seatId && seat.status === SeatStatusEnum.AVAILABLE
          ? SeatStatusEnum.BOOKED
          : seat.status,
    }));

    setSeats((prevSeats) => {
      return {
        ...prevSeats,
        [sectionName]: {
          ...prevSeats[sectionName],
          seats: updatedSeats,
        },
      };
    });

    setNextWeekDays((nextWeekDays) =>
      nextWeekDays.map((nextWeekDay) => ({
        ...nextWeekDay,
        isDayBooked: true,
      }))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        seats,
        selectSeat,
        selectedSeatId,
        selectedSection,
        seatSelectedForWeek,
        setSeatSelectedForWeek,
        nextWeekDays,
        setNextWeekDays,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useUser = () => useContext(BookingContext);
