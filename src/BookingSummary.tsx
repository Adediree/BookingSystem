import { useContext, useEffect } from "react";
import { BookingContext } from "./BookingContext";
import { foodSelectOptions, seatOptions } from "./mockSeatsData";
import { BaseButton, BaseCheckbox, ModernSelect } from "qore-components";
import tick from "./images/Featured icon.svg";

// export interface BookingSummaryModalProps {
//   // isOpen: boolean;
//   // onClose: () => void;
// }

export const BookingSummaryModal = () => {
  const {
    nextWeekDays,
    setNextWeekDays,
    selectedSeatId,
    selectedSection,
    setSeatSelectedForWeek,
  } = useContext(BookingContext);

  const getDefaultSeatValue = () => {
    if (!selectedSeatId || !selectedSection) return undefined;
    return `${selectedSection}-${selectedSeatId}`;
  };

  useEffect(() => {
    // console.log("nextWeekDays: ", nextWeekDays);

    const allChecked = nextWeekDays.every((day) => day.isDayBooked);
    setSeatSelectedForWeek((prev) => {
      if (prev !== allChecked) {
        return allChecked;
      }
      return prev;
    });
  }, [nextWeekDays]);

  return (
    <div
      style={{
        // flex: 1,
        overflowY: "auto",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        height: "100%",
        backgroundColor: "white",
        color: "black", // maxHeight: "240px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          paddingLeft: "18px",
          paddingRight: "14px",
        }}
      >
        <img src={tick} style={{ height: "48px", width: "48px" }} />
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#344054",
          }}
        >
          Booking Summary
        </h3>
        <p style={{ fontSize: "12px", color: "#667085" }}>
          Confirm your bookings
        </p>
      </div>
      {nextWeekDays.map((info) => (
        <div
          key={info.date}
          style={{
            // border: "1px solid",
            borderRadius: "8px",
            borderColor: "#D0D5DD",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "18px",
            paddingRight: "14px",
            // paddingTop: "32px",
            // paddingBottom: "24px",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "4px" }}>
            <BaseCheckbox
              checked={info.isDayBooked}
              onChange={() =>
                setNextWeekDays((nextWeekDays) =>
                  nextWeekDays.map((nextWeekDay) => {
                    return {
                      ...nextWeekDay,
                      isDayBooked:
                        nextWeekDay?.date == info?.date
                          ? !info.isDayBooked
                          : nextWeekDay.isDayBooked,
                    };
                  })
                )
              }
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#344054",
                }}
              >
                {info.day}
              </h3>
              <p style={{ fontSize: "12px", color: "#667085" }}>{info.date}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              // flexDirection: "column",
              gap: "8px",
            }}
          >
            <ModernSelect
              value={
                info.selectedSeat ? info.selectedSeat : getDefaultSeatValue()
              }
              onOptionSelect={(value) => {
                setNextWeekDays((prev) =>
                  prev.map((day) =>
                    day.date === info.date
                      ? { ...day, selectedSeat: value }
                      : day
                  )
                );
              }}
              selectOptions={seatOptions}
              size="small"
              label="Seat"
              style={{ fontSize: "2px", color: "#667085" }}
            />
            <ModernSelect
              value={info.selectedFood}
              placeholderLabel="Food"
              onOptionSelect={(value) => {
                setNextWeekDays((prev) =>
                  prev.map((day) =>
                    day.date === info.date
                      ? { ...day, selectedFood: value }
                      : day
                  )
                );
              }}
              selectOptions={foodSelectOptions}
              size="small"
              label="Food"
              style={{ fontSize: "16px", color: "#667085" }}
            />
          </div>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          paddingTop: "16px",
          paddingLeft: "18px",
          paddingRight: "14px",
          // backgroundColor: "white",
          // position: "sticky",
          // bottom: 0,
          borderTop: "1px solid #eee",
          // zIndex: 2,
        }}
      >
        <BaseButton
          text="Cancel"
          textStyle={{ color: "black" }}
          style={{
            backgroundColor: "white",
            border: "1px solid",
            borderColor: "#D0D5DD",
            maxWidth: "520px",
            width: "100%",
          }}
        />
        <BaseButton
          text="Submit Booking"
          style={{ backgroundColor: "black", maxWidth: "520px", width: "100%" }}
        />
      </div>
    </div>
  );
};
