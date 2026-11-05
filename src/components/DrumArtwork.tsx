import type { DrumSound } from "@/lib/drum-audio";

export default function DrumArtwork({ sound }: { sound: DrumSound }) {
  const cymbal = sound === "crash" || sound === "ride" || sound === "hihat";
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" className="drum-art" shapeRendering="crispEdges">
      {cymbal ? (
        <g stroke="#493c2c" strokeWidth="3" strokeLinejoin="miter">
          <path d="M12 53h15V43h37V33h72v10h37v10h15v17h-15v9H27v-9H12Z" fill="#d7b770" />
          <path d="M28 61h144M52 48h96" stroke="#f4df9c" strokeWidth="5" />
          <path d="M80 53V42h12v-9h16v9h12v11Z" fill="#b18c4e" />
          <path d="M100 23v17" strokeWidth="5" />
          <path d="M31 75h138" stroke="#9d7944" />
          {sound === "hihat" && <path d="M27 85h146v7H27Z" fill="#b18c4e" />}
        </g>
      ) : sound === "kick" ? (
        <g stroke="#493c2c" strokeWidth="3">
          <path d="M40 17h120v12h17v20h11v64h-11v20h-17v10H40v-10H23v-20H12V49h11V29h17Z" fill="#9b6753" />
          <path d="M48 24h104v12h17v20h9v50h-9v18h-17v10H48v-10H31v-18h-9V56h9V36h17Z" fill="#fcf8ec" />
          <path d="M82 61h12V49h12v12h12v12h12v12h-12V73h-12V61H94v12H82v12H70V73h12Z" fill="#8daa83" stroke="none" />
          <rect x="120" y="100" width="16" height="16" fill="#493c2c" stroke="none" />
          <path d="M35 129l-9 18m139-18 9 18" strokeWidth="7" />
        </g>
      ) : (
        <g stroke="#493c2c" strokeWidth="3">
          <path d="M25 38h150v65h-10v12H35v-12H25Z" fill={sound === "tom" ? "#a7785e" : "#8daa83"} />
          <path d="M25 48h150M35 99h130" stroke="#d8c9aa" strokeWidth="7" />
          <path d="M25 28h20V18h110v10h20v25h-20v9H45v-9H25Z" fill="#ede6d4" />
          <path d="M46 30h108M55 42h90" stroke="#d0c5ad" strokeWidth="3" />
          <path d="M43 68v24m40-24v30m36-30v30m38-30v24" stroke="#493c2c" strokeWidth="5" />
          <path d="M49 68v22m40-22v27m36-27v27m38-27v22" stroke="#e0cfae" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}


