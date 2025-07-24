import Armchair from "./images/Armchair.svg";
import {
  BaseButton,
  BaseCheckbox,
  // BaseInput,
  ModernSelect,
  useModal,
  // type ModernSelectOption,
} from "qore-components";
import Ad from "./images/Image.svg";
import "./BookingScreen.css";
import { useEffect } from "react";
import { SeatSectionEnum } from "./enums/SeatSectionEnum";
// import { SeatStatusEnum } from "./enums/SeatStatusEnum";
import { seatOptions, states } from "./mockSeatsData";
import { useContext } from "react";
import { BookingContext } from "./BookingContext";
import { foodSelectOptions } from "./mockSeatsData";
import { useNavigate } from "react-router-dom";
// import { BookingSummaryModal } from "./BookingSummary";
import { ModalEnum } from "./utilities/enums/modalEnum";

export const Booking = () => {
  const {
    selectedSeatId,
    seats,
    selectSeat,
    selectedSection,
    seatSelectedForWeek,
    setSeatSelectedForWeek,
    nextWeekDays,
    setNextWeekDays,
  } = useContext(BookingContext);

  const bookingModal = useModal(ModalEnum.BookingSummaryModal);

  // const [nextWeekDays, setNextWeekDays] = useState(generateNextWeekDays());

  const navigate = useNavigate();

  const getDefaultSeatValue = () => {
    if (!selectedSeatId || !selectedSection) return undefined;
    return `${selectedSection}-${selectedSeatId}`;
  };

  useEffect(() => {
    const allChecked = nextWeekDays.every((day) => day.isDayBooked);
    setSeatSelectedForWeek((prev) => {
      if (prev !== allChecked) {
        return allChecked;
      }
      return prev;
    });
  }, [nextWeekDays]);

  interface IconWithTextProps {
    text: string;
    imageSrc: string;
    alt?: string;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
    style?: object;
  }

  const IconWithText: React.FC<IconWithTextProps> = ({
    text,
    imageSrc,
    alt,
    selected = false,
    onClick,
    className,
    style,
  }) => {
    return (
      <button
        style={{ ...style }}
        className={`icon ${selected ? "icon-selected" : ""} ${className || ""}`}
        onClick={onClick}
      >
        <span className="icon-text">{text}</span>
        <div style={{ width: "25px", height: "25px" }}>
          <img className="seat-icon" src={imageSrc} alt={alt || text} />
        </div>
      </button>
    );
  };

  // console.log("seatOptions: ", seatOptions);
  return (
    <div className="booking-screen">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "210px",
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <img className="image" src={Ad} alt="Tesa Ad" />
      </div>

      <div
        style={{
          marginLeft: "210px",
          width: "calc(100% - 210px)",
          height: "100vh",
          overflowY: "auto",
        }}
        className="container"
      >
        <div className="header">
          <div className="header-items">
            <div className="welcome-div">
              <span className="header-main-text">
                Welcome back, <span className="olivia">Olivia</span>
              </span>
              <p>Nice having you back</p>
            </div>
            <BaseButton
              text="Log out"
              style={{ backgroundColor: "black" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>

          <div className="booking-section">
            <div className="seat-sections ">
              <div className="floor-plan left-column">
                {/* <div> */}
                <div key={states.SENEGAL.sectionName} className="sections">
                  <h3 className="sections-text">
                    {states.SENEGAL.sectionName}
                  </h3>
                  <div className="zambia-seat-grid senegal-seat-grid">
                    {states.SENEGAL.seats.map((seat) => (
                      <IconWithText
                        // style={{border:"2px solid red", overflow:"hidden", width:"100%", height:"100%"}}
                        key={seat.label}
                        text={seat.label}
                        imageSrc={Armchair}
                        selected={
                          selectedSeatId === seat.id &&
                          selectedSection === SeatSectionEnum.Senegal
                        }
                        onClick={() =>
                          selectSeat(SeatSectionEnum.Senegal, seat.id)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="sections dining">
                  <p style={{ fontSize: "16px" }}>DINING</p>
                </div>

                <div key={states.GHANA.sectionName} className="sections">
                  <h3 className="sections-text">{states.GHANA.sectionName}</h3>
                  <div className="zambia-seat-grid ghana-seat-grid">
                    {states.GHANA.seats.map((seat) => (
                      <IconWithText
                        key={seat.label}
                        text={seat.label}
                        imageSrc={Armchair}
                        selected={
                          selectedSeatId === seat.id &&
                          selectedSection === SeatSectionEnum.Ghana
                        }
                        onClick={() =>
                          selectSeat(SeatSectionEnum.Ghana, seat.id)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="floor-plan middle-column">
                <div key={states.NAMIBIA.sectionName} className="sections">
                  <h3 className="sections-text">
                    {states.NAMIBIA.sectionName}
                  </h3>
                  <div
                    className="zambia-seat-grid namibia-seat-grid"
                    style={{
                      padding: "0px",
                      paddingTop: "0px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid",
                      borderColor: "#D0D5DD",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingBottom: "10px",
                        borderBottom: "1px solid",
                        borderColor: "#D0D5DD",
                      }}
                    >
                      {states.NAMIBIA.seats.slice(0, 4).map((seat) => (
                        <IconWithText
                          // style={{backgroundColor:"red"}}
                          key={seat.label}
                          text={seat.label}
                          imageSrc={Armchair}
                          selected={
                            selectedSeatId === seat.id &&
                            selectedSection === SeatSectionEnum.Namibia
                          }
                          onClick={() =>
                            selectSeat(SeatSectionEnum.Namibia, seat.id)
                          }
                        />
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {states.NAMIBIA.seats.slice(4, 7).map((seat) => (
                        <IconWithText
                          // style={{backgroundColor:"red"}}
                          key={seat.label}
                          text={seat.label}
                          imageSrc={Armchair}
                          selected={
                            selectedSeatId === seat.id &&
                            selectedSection === SeatSectionEnum.Namibia
                          }
                          onClick={() =>
                            selectSeat(SeatSectionEnum.Namibia, seat.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div key={states.KENYA.sectionName} className="sections">
                  <h3 className="sections-text">{states.KENYA.sectionName}</h3>
                  <div
                    className="zambia-seat-grid kenya-seat-grid"
                    style={{
                      padding: "0px",
                      paddingTop: "0px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid",
                      borderColor: "#D0D5DD",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingBottom: "10px",
                        borderBottom: "1px solid",
                        borderColor: "#D0D5DD",
                      }}
                    >
                      {states.KENYA.seats.slice(0, 5).map((seat) => (
                        <IconWithText
                          key={seat.label}
                          text={seat.label}
                          imageSrc={Armchair}
                          selected={
                            selectedSeatId === seat.id &&
                            selectedSection === SeatSectionEnum.Kenya
                          }
                          onClick={() =>
                            selectSeat(SeatSectionEnum.Kenya, seat.id)
                          }
                        />
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {states.KENYA.seats.slice(5, 10).map((seat) => (
                        <IconWithText
                          key={seat.label}
                          text={seat.label}
                          imageSrc={Armchair}
                          selected={
                            selectedSeatId === seat.id &&
                            selectedSection === SeatSectionEnum.Kenya
                          }
                          onClick={() =>
                            selectSeat(SeatSectionEnum.Kenya, seat.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div key={states.ETIOPIA.sectionName} className="sections">
                  <h3 className="sections-text">
                    {states.ETIOPIA.sectionName}
                  </h3>
                  <div className="zambia-seat-grid etiopia-seat-grid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {states.ETIOPIA.seats.map((seat) => (
                        <IconWithText
                          key={seat.label}
                          text={seat.label}
                          imageSrc={Armchair}
                          selected={
                            selectedSeatId === seat.id &&
                            selectedSection === SeatSectionEnum.Etiopia
                          }
                          onClick={() =>
                            selectSeat(SeatSectionEnum.Etiopia, seat.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #D0D5DD",
                    paddingTop: "1rem",
                    borderRadius: "50%",
                    width: "100%",
                    paddingBottom: "3rem",
                    textAlign: "center",
                  }}
                >
                  LOBBY
                </div>
              </div>

              <div className="floor-plan right-column">
                <div className="sections reception">
                  <p style={{ fontSize: "16px" }}>RECEPTION</p>
                </div>

                <div
                  key={states.TOGO.sectionName}
                  className="sections"
                  style={{
                    padding: "0px",
                    paddingTop: "0px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid",
                    borderColor: "#D0D5DD",
                  }}
                >
                  <h3 className="sections-text">{states.TOGO.sectionName}</h3>
                  <div className="zambia-seat-grid senegal-seat-grid">
                    {states.TOGO.seats.map((seat) => (
                      <IconWithText
                        key={seat.label}
                        text={seat.label}
                        imageSrc={Armchair}
                        selected={
                          selectedSeatId === seat.id &&
                          selectedSection === SeatSectionEnum.Togo
                        }
                        onClick={() =>
                          selectSeat(SeatSectionEnum.Togo, seat.id)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div
                  key={states.MALI.sectionName}
                  className="sections"
                  style={{
                    padding: "0px",
                    paddingTop: "0px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid",
                    borderColor: "#D0D5DD",
                  }}
                >
                  <h3 className="sections-text">{states.MALI.sectionName}</h3>
                  <div className="zambia-seat-grid senegal-seat-grid">
                    {states.MALI.seats.map((seat) => (
                      <IconWithText
                        key={seat.label}
                        text={seat.label}
                        imageSrc={Armchair}
                        selected={
                          selectedSeatId === seat.id &&
                          selectedSection === SeatSectionEnum.Mali
                        }
                        onClick={() =>
                          selectSeat(SeatSectionEnum.Mali, seat.id)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div key={states.ZAMBIA.sectionName} className="sections">
                  <h3 className="sections-text">{states.ZAMBIA.sectionName}</h3>
                  <div className="zambia-seat-grid zambia">
                    {states.ZAMBIA.seats.map((seat) => (
                      <IconWithText
                        key={seat.label}
                        text={seat.label}
                        imageSrc={Armchair}
                        selected={
                          selectedSeatId === seat.id &&
                          selectedSection === SeatSectionEnum.Zambia
                        }
                        onClick={() =>
                          selectSeat(SeatSectionEnum.Zambia, seat.id)
                        }
                      />
                    ))}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>

            <div
              className="booking-details"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "90vh", // or adjust based on parent layout
                position: "relative",
                // height: "90vh",  Or whatever fits your layout
                // overflow: "hidden",
              }}
            >
              <div
                style={{
                  overflowY: "auto",
                  position: "relative",
                  paddingRight: "8px",
                  // paddingBottom: "16px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h3>Booking details</h3>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    border: "1px solid",
                    borderRadius: "8px",
                    borderColor: "#D0D5DD",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontSize: "0.9rem",
                    color: "#344054",
                  }}
                >
                  <p>Selected Seat: </p>
                  <div>
                    {selectedSeatId && selectedSection && (
                      <strong>
                        {
                          seats[selectedSection].seats.find(
                            (seat) => seat.id === selectedSeatId
                          )?.label
                        }
                      </strong>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "2px" }}>
                  <BaseCheckbox
                    checked={seatSelectedForWeek}
                    onChange={() => {
                      const newValue = !seatSelectedForWeek;
                      setSeatSelectedForWeek(newValue);
                      setNextWeekDays((nextWeekDays) =>
                        nextWeekDays.map((nextWeekDay) => ({
                          ...nextWeekDay,
                          isDayBooked: newValue,
                        }))
                      );
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#344054",
                      paddingBottom: "8px",
                    }}
                  >
                    Select this seat for the week
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#667085" }}>
                    Weekly Schedule
                  </p>
                  <div
                    style={{
                      // flex: 1,
                      // overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                      // maxHeight: "240px",
                    }}
                  >
                    {nextWeekDays.map((info) => (
                      <div
                        key={info.date}
                        style={{
                          border: "1px solid",
                          borderRadius: "8px",
                          borderColor: "#D0D5DD",
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: "18px",
                          paddingRight: "14px",
                          paddingTop: "32px",
                          paddingBottom: "24px",
                          gap: "24px",
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
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
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
                            <p style={{ fontSize: "12px", color: "#667085" }}>
                              {info.date}
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <ModernSelect
                            value={getDefaultSeatValue()}
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
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    paddingTop: "16px",
                    backgroundColor: "white",
                    position: "sticky",
                    bottom: 0,
                    borderTop: "1px solid #eee",
                    zIndex: 2,
                  }}
                >
                  <BaseButton
                    text="Cancel"
                    textStyle={{ color: "black" }}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid",
                      borderColor: "#D0D5DD",
                    }}
                  />
                  <BaseButton
                    text="Submit Booking"
                    onClick={() => bookingModal.open()}
                    style={{ backgroundColor: "black" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// <ModernSelect selectOptions={foodSelectOptions}  />
// <ModernSelect selectOptions={foodSelectOptions} />
