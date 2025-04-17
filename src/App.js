import { useState } from "react";
const talks = [
  {
    id: 1,
    title: "React Component",
    speaker: "Dr. Onyeka",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "State Management in React",
    speaker: "Kc Fresh",
    time: "11:00 AM",
  },
  {
    id: 3,
    title: "Controlled Element",
    speaker: "Obika Uche",
    time: "1:00 PM",
  },
];

function Button({ children, onSee }) {
  return <button onClick={onSee}>{children}</button>;
}

export default function App() {
  const [see, setSee] = useState(false);
  const [schedule, setSchedule] = useState([]);

  function handleSchedule(talk) {
    setSchedule((currentSheduled) => {
      const alreadyScheduled = currentSheduled.find((t) => t.id === talk.id);
      if (alreadyScheduled) {
        // Remove Schedule
        return currentSheduled.filter((t) => t.id !== talk.id);
      } else {
        // Add Schedule
        return [...currentSheduled, talk];
      }
    });
  }

  function handleToggleSee() {
    setSee((s) => !s);
  }

  return (
    <div className="conf">
      <Intro />

      {talks.map((talk) => (
        <AvailableTalks
          talk={talk}
          key={talk.id}
          schedule={schedule}
          onSchedule={handleSchedule}
        />
      ))}

      {see && <MySchedule schedule={schedule} />}

      <Button onSee={handleToggleSee}>
        {see ? "Close Schedule" : "See Schedule"}
      </Button>
    </div>
  );
}

function Intro() {
  return (
    <>
      <div>
        <span>====================</span>
        <h1>React Conf 2025</h1>
        <span>====================</span>
      </div>
      <div>
        <h2>📢 Available Talks</h2>
        <span>-------------------------------------</span>
      </div>
    </>
  );
}

function AvailableTalks({ talk, onSchedule, schedule }) {
  return (
    <ul>
      <TalkLists talk={talk} onSchedule={onSchedule} schedule={schedule} />
    </ul>
  );
}

function TalkLists({ talk, schedule, onSchedule }) {
  const isScheduled = schedule.some((s) => s.id === talk.id);
  return (
    <li>
      <input
        type="checkbox"
        id={talk.id}
        checked={isScheduled}
        onChange={() => onSchedule(talk)}
      />
      <label htmlFor={talk.id}>
        {talk.time} - {talk.title} - {talk.speaker}
      </label>
    </li>
  );
}

function MySchedule({ schedule }) {
  return (
    <div>
      <h3>⭐ My Schedule</h3>
      {schedule.length === 0 ? (
        <p>No preferred talk added yet.</p>
      ) : (
        <ul>
          {schedule.map((s) => (
            <li key={s.id}>
              {s.time} - {s.title} - {s.speaker}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


