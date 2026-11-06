import type { DrumSound } from "@/lib/drum-audio";

export default function DrumArtwork({ sound }: { sound: DrumSound }) {
  const cymbal = sound === "crash" || sound === "ride" || sound === "hihat";
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" className="drum-art" shapeRendering="crispEdges">
      {cymbal ? <>
        <g fill="none" stroke="#958d7c" strokeWidth="3">
          <path d="M100 62v228M100 238l-34 52m34-52 35 52" />
          <path d="M103 85v177" stroke="#d9d4c5" strokeWidth="2" />
          <path d="M94 152h12m-12 112h12" stroke="#706958" strokeWidth="5" />
          {sound === "hihat" && <path d="M100 268v20h18v8H92" stroke="#706958" strokeWidth="4" />}
        </g>
        <g stroke="#493c2c" strokeWidth="2.5" strokeLinejoin="miter">
          {sound === "hihat" && <path d="M20 66h20v-6h120v6h20v8h-20v5H40v-5H20Z" fill="#aa8747" />}
          <path d="M12 49h22v-7h41v-9h50v9h41v7h22v12h-22v7H34v-7H12Z" fill={sound === "ride" ? "#c69d55" : "#d7b770"} />
          <path d="M29 53h142M48 44h104" stroke="#f5dfa0" strokeWidth="4" />
          <path d="M82 43v-9h10v-6h16v6h10v9Z" fill="#b18c4e" />
          <path d="M100 20v16" strokeWidth="4" />
        </g>
      </> : sound === "kick" ? (
        <g stroke="#493c2c" strokeWidth="2.5" strokeLinejoin="miter">
          <path d="M49 78h78v8h22v12h14v22h9v74h-9v22h-14v12h-22v8H49v-8H29v-12H17v-22H9v-74h8V98h12V86h20Z" fill="#845846" />
          <path d="M60 73h77v8h22v12h14v22h9v75h-9v22h-14v12h-22v8H60v-8H38v-12H24v-22h-9v-75h9V93h14V81h22Z" fill="#bc8d6c" />
          <path d="M64 82h69v8h20v12h13v18h8v65h-8v20h-13v11h-20v8H64v-8H44v-11H31v-20h-8v-65h8v-18h13V90h20Z" fill="#f5efde" />
          <path d="M67 88h63v7h20v12h10v15h7" fill="none" stroke="#fffaf0" strokeWidth="3" />
          <path d="M133 176h14v5h5v14h-5v5h-14v-5h-5v-14h5Z" fill="#493c2c" stroke="none" />
          <g fill="#d4c9ad"><path d="M47 84h8v13h-8Zm101 5h8v13h-8ZM17 126h10v8H17Zm151 0h10v8h-10ZM24 187h10v8H24Zm139 0h10v8h-10ZM52 213h8v13h-8Zm90 0h8v13h-8Z" /></g>
          <path d="M37 201l-17 28h-9m150-28 17 28h9" fill="none" stroke="#797562" strokeWidth="5" />
        </g>
      ) : sound === "snare" ? <>
        <g fill="none" stroke="#958d7c" strokeWidth="3">
          <path d="M53 86l22 24h50l22-24M100 110v92m0-23-37 49m37-49 37 49m-37-49v49" />
          <path d="M103 121v54" stroke="#d9d4c5" strokeWidth="2" />
          <path d="M94 157h12" stroke="#706958" strokeWidth="5" />
        </g>
        <g stroke="#493c2c" strokeWidth="2.5">
          <path d="M26 49h148v34h-12v9H38v-9H26Z" fill="#8daa83" />
          <path d="M29 56h142m-134 27h126" stroke="#d8cfb9" strokeWidth="5" />
          <path d="M24 32h20v-8h112v8h20v20h-20v8H44v-8H24Z" fill="#f1ebdc" />
          <path d="M45 35h109M52 46h96" stroke="#d0c5ad" />
          <path d="M43 63v16m35-16v21m40-21v21m38-21v16" stroke="#665f4f" strokeWidth="5" />
          <path d="M46 63v16m35-16v21m40-21v21m38-21v16" stroke="#e4dfd0" strokeWidth="2" />
        </g>
      </> : <>
        {sound === "lowTom" && <g fill="none" stroke="#958d7c" strokeWidth="4"><path d="M45 104l-9 96h-9m123-96 12 96h9m-70-95v79" /></g>}
        {sound === "tom" && <g fill="#958d7c" stroke="#493c2c" strokeWidth="2"><path d="M100 113h9v11h14v9h-23Z" /></g>}
        <g stroke="#493c2c" strokeWidth="2.5" transform={sound === "lowTom" ? "scale(1 1.32)" : undefined}>
          <path d="M32 42h136v63h-12v10H44v-10H32Z" fill="#a7785e" />
          <path d="M34 53h132M44 104h112" stroke="#dacbb1" strokeWidth="5" />
          <path d="M29 27h19v-8h104v8h19v23h-19v8H48v-8H29Z" fill="#f1ebdc" />
          <path d="M49 31h102M58 43h84" stroke="#d0c5ad" />
          <path d="M48 65v27m32-27v34m40-34v34m32-34v27" stroke="#665247" strokeWidth="5" />
          <path d="M51 65v27m32-27v34m40-34v34m32-34v27" stroke="#e4d6bc" strokeWidth="2" />
        </g>
      </>}
    </svg>
  );
}
