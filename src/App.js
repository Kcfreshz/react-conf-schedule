import { useState } from "react";
const talks = [
  {
    id: 2,
    title: "State Management in React",
    speaker: "Dr. Demo",
    time: "11:00 AM",
  },

  {
    id: 1,
    title: "React Component",
    speaker: "KC Fresh",
    time: "10:00 AM",
  },

  {
    id: 3,
    title: "Controlled Element",
    speaker: "Dr. Francis N.",
    time: "4:00 PM",
  },
  {
    id: 4,
    title: "React Fragment",
    speaker: "Dr. Unique",
    time: "1:00 PM",
  },
];

function Button({ children, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "20px",
        padding: "10px 15px",
        backgroundColor: color,
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [see, setSee] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTalks = talks.filter(
    (talk) =>
      talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.time.includes(searchQuery.toLowerCase() || searchQuery.toUpperCase())
  );
  const sortedFilteredTalks = sortByTime(filteredTalks);

  function sortByTime(talks) {
    return [...talks].sort(
      (a, b) =>
        new Date("4/16/2025 " + a.time) - new Date("4/16/2025 " + b.time)
    );
  }

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

  function clearSchedule() {
    setSchedule([]);
  }

  const color = see ? "red" : "skyblue";

  return (
    <div className="conf">
      <Intro />

      <InputQuery searchQuery={searchQuery} onSearchQuery={setSearchQuery} />

      <AvailableTalks
        talks={sortedFilteredTalks}
        schedule={schedule}
        onSchedule={handleSchedule}
      />

      <hr style={{ margin: "30px 0" }} />

      {see && (
        <MySchedule
          schedule={schedule}
          talks={sortedFilteredTalks}
          onClearSchedule={clearSchedule}
          color={color}
        />
      )}

      <Button onClick={handleToggleSee} color={color}>
        {see ? "Close Schedule" : "See Schedule"}
      </Button>
    </div>
  );
}

function Intro() {
  return (
    <>
      <div style={{ margin: "15px" }}>
        <span>====================</span>
        <h1>React Conf 2025</h1>
        <span>====================</span>
      </div>
    </>
  );
}

function InputQuery({ searchQuery, onSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="🔎 Search speaker or time..."
      style={{
        padding: "10px",
        width: "100%",
        margin: "20px 0",
        fontSize: "16px",
      }}
      value={searchQuery}
      onChange={(e) => onSearchQuery(e.target.value)}
    />
  );
}

function AvailableTalks({ talks, onSchedule, schedule }) {
  return (
    <div>
      <h4>📢 Available Talks</h4>
      <div>
        {talks.map((talk) => (
          <TalkLists
            talk={talk}
            key={talk.id}
            onSchedule={onSchedule}
            schedule={schedule}
          />
        ))}
      </div>
    </div>
  );
}

function TalkLists({ talk, schedule, onSchedule }) {
  const isScheduled = schedule.some((s) => s.id === talk.id);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        backgroundColor: isScheduled ? "#d1e7dd" : "#fff",
        cursor: "pointer",
      }}
      onClick={() => onSchedule(talk)}
    >
      <p>
        {talk.time} - {talk.title}
      </p>
      <p>👤 {talk.speaker}</p>
    </div>
  );
}

function MySchedule({ schedule, talks, onClearSchedule, color }) {
  const reSchedule = talks.filter((talk) => schedule.includes(talk));

  return (
    <div>
      <h3 style={{ margin: "15px 0" }}>⭐ My Schedule</h3>
      {reSchedule.length === 0 ? (
        <p>No preferred talk added yet.</p>
      ) : (
        <div>
          {reSchedule.map((s) => (
            <p key={s.id} style={{ margin: "10px 0" }}>
              ✅{s.time} - {s.title} - {s.speaker}
            </p>
          ))}

          <Button onClick={onClearSchedule} color={color}>
            Clear Schedule
          </Button>
        </div>
      )}
    </div>
  );
}
