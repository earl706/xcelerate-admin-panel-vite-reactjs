// import React, { useEffect, useState } from "react";
// import {
//   Bracket,
//   Seed,
//   SeedItem,
//   SeedTeam,
//   SingleLineSeed,
// } from "react-brackets";

// const CustomSeed = ({ seed, title, breakpoint, roundIndex, seedIndex }) => {
//   // breakpoint passed to Bracket component
//   // to check if mobile view is triggered or not
//   // mobileBreakpoint is required to be passed down to a seed
//   const homeTeam = seed.teams[0];
//   const awayTeam = seed.teams[1];

//   return (
//     <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
//       <SeedItem>
//         <div>
//           <SeedTeam
//             style={{
//               backgroundColor: homeTeam.score > awayTeam.score && "red",
//             }}
//             onClick={() => alert(seedIndex)}
//           >
//             <div>{homeTeam.name ? homeTeam.name : "----"}</div>
//             <div>{homeTeam.score}</div>
//           </SeedTeam>
//           <SeedTeam
//             style={{
//               backgroundColor: homeTeam.score < awayTeam.score && "purple",
//             }}
//             onClick={() => alert(seedIndex)}
//           >
//             <div>{awayTeam.name ? awayTeam.name : "----"}</div>
//             <div>{awayTeam.score}</div>
//           </SeedTeam>
//         </div>
//       </SeedItem>
//       <div>2021/22</div>
//     </Seed>
//   );
// };

// export default function DynamicBracketComponent({ teams }) {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [rounds, setRounds] = useState([]);
//   const genMatches = (nTeams) => {
//     let matchArray = [];

//     while (nTeams > 1) {
//       let numMatches = Math.floor(nTeams / 2); // Number of matches
//       let numByes = nTeams % 2; // If odd, one team gets a bye
//       let matches = [];

//       for (let i = 0; i < numMatches; ++i) {
//         matches.push({
//           id: i,
//           date: new Date().toDateString(),
//           teams: [
//             { id: null, name: null },
//             { id: null, name: null },
//           ],
//         });
//       }

//       // Add a bye team if needed
//       if (numByes === 1) {
//         matches.push({
//           id: numMatches,
//           date: new Date().toDateString(),
//           teams: [{ id: null, name: "Bye" }], // Auto-advancing team
//         });
//       }

//       const roundTitle = matchArray.length + 1;
//       matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });

//       nTeams = numMatches + numByes; // Advance teams correctly
//     }

//     return matchArray;
//   };

//   const handleTabIndexChange = (index) => () => {
//     setTabIndex(index);
//   };

//   const handleSwipeChange = (index) => {
//     setTabIndex(index);
//   };

//   useEffect(() => {
//     setRounds(genMatches(teams.length));
//   }, []);

//   return (
//     <div className="App">
//       <div className="tabs">
//         <button onClick={handleTabIndexChange(0)}>8強</button>
//         <button onClick={handleTabIndexChange(1)}>4強</button>
//         <button onClick={handleTabIndexChange(2)}>冠亞</button>
//         <button onClick={handleTabIndexChange(3)}>季殿</button>
//       </div>
//       <Bracket
//         rounds={rounds}
//         renderSeedComponent={CustomSeed}
//         swipeableProps={{
//           enableMouseEvents: true,
//           animateHeight: true,
//           index: tabIndex,
//           onChangeIndex: handleSwipeChange,
//         }}
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const CustomSeed = ({ seed, breakpoint, seedIndex }) => {
  const homeTeam = seed.teams[0] || { name: "----", score: 0 };
  const awayTeam = seed.teams[1] || { name: "----", score: 0 };

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam
            style={{
              backgroundColor:
                homeTeam.score > awayTeam.score ? "red" : "transparent",
            }}
            onClick={() => alert(seedIndex)}
          >
            <div>{homeTeam.name}</div>
            <div>{homeTeam.score}</div>
          </SeedTeam>
          <SeedTeam
            style={{
              backgroundColor:
                homeTeam.score < awayTeam.score ? "purple" : "transparent",
            }}
            onClick={() => alert(seedIndex)}
          >
            <div>{awayTeam.name}</div>
            <div>{awayTeam.score}</div>
          </SeedTeam>
        </div>
      </SeedItem>
      <div>2021/22</div>
    </Seed>
  );
};

export default function DynamicBracketComponent({ teams = [] }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [rounds, setRounds] = useState([]);

  const genMatches = (nTeams) => {
    let matchArray = [];

    while (nTeams > 1) {
      let numMatches = Math.floor(nTeams / 2);
      let numByes = nTeams % 2;
      let matches = [];

      for (let i = 0; i < numMatches; ++i) {
        matches.push({
          id: i,
          date: new Date().toDateString(),
          teams: [
            { id: null, name: null },
            { id: null, name: null },
          ],
        });
      }

      if (numByes === 1) {
        matches.push({
          id: numMatches,
          date: new Date().toDateString(),
          teams: [{ id: null, name: "Bye" }, null], // Bye team
        });
      }

      const roundTitle = `Round ${matchArray.length + 1}`;
      matchArray.push({ title: roundTitle, seeds: matches });

      nTeams = numMatches + numByes;
    }

    return matchArray;
  };

  const handleTabIndexChange = (index) => () => {
    setTabIndex(index);
  };

  const handleSwipeChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (teams.length > 0) {
      setRounds(genMatches(teams.length));
    }
  }, [teams]); // Added `teams` as a dependency

  return (
    <div className="App">
      <div className="tabs">
        {rounds.map((_, index) => (
          <button key={index} onClick={handleTabIndexChange(index)}>
            {rounds[index]?.title || `Round ${index + 1}`}
          </button>
        ))}
      </div>
      <Bracket
        rounds={rounds}
        renderSeedComponent={CustomSeed}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          index: tabIndex,
          onChangeIndex: handleSwipeChange,
        }}
      />
    </div>
  );
}
