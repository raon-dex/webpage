# HAJUN’S WORLD 코드 공부 노트

이 노트의 목표는 드럼 포트폴리오를 보고 끝내는 게 아니라, **빈 화면에서 클릭 가능한 드럼 하나를 직접 만들고, 소리와 애니메이션을 붙여 다른 페이지까지 연결하는 것**이다. 뒤쪽에는 기존 프로젝트에 악기와 Skills 항목을 추가하는 실습도 있다.

## 1. 어떤 기술이 어디에 쓰이나

| 기술 | 역할 | 이 프로젝트에서 볼 곳 |
|---|---|---|
| HTML | 문서의 의미와 구조 | 제목, 내비게이션, 링크, 버튼, 진행 막대 |
| CSS | 배치와 모양, 움직임 | `src/app/globals.css` |
| JavaScript | 데이터 처리와 클릭 이후의 동작 | 배열 순회, 함수, 타이머 |
| TypeScript | 값이 어떤 형태인지 검사 | `DrumSound`, 악기 데이터의 타입 |
| React | 상태와 화면을 연결 | `DrumHome.tsx`, `AboutSection.tsx` |
| Next.js | 주소, 페이지, 공통 레이아웃 | `src/app/` |
| SVG | 좌표로 그리는 벡터 그림 | `DrumArtwork.tsx`, 킥 페달 |
| Web Audio API | 브라우저에서 소리 합성 | `src/lib/drum-audio.ts` |

HTML·CSS·JavaScript는 브라우저의 기본 재료다. TypeScript는 JavaScript에 타입 검사를 더한다. React는 화면을 컴포넌트로 나누고, Next.js는 React 프로젝트에 페이지와 서버 구조를 제공한다. SVG와 Web Audio는 각각 브라우저가 지원하는 그림 형식과 소리 API다.

## 2. 내 컴퓨터에서 시작하기

프로젝트 폴더를 VS Code로 열고 터미널에서 실행한다.

```powershell
npm install
npm run dev
```

이미 의존성이 설치됐다면 `npm run dev`만 실행해도 된다. 터미널에 나온 Local 주소를 연다. 보통 `http://localhost:3000`이다. 파일을 저장하면 개발 서버가 변경을 반영한다.

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

- `lint`는 코드 규칙을 검사한다.
- `tsc --noEmit`은 TypeScript의 타입을 검사하고 JavaScript 파일을 출력하지 않는다.
- `build`는 배포용 결과를 만든다. 개발 화면이 열려도 배포용 빌드에서 오류가 발견될 수 있다.

## 3. 파일 지도를 먼저 읽기

```text
src/
  app/
    layout.tsx                  모든 페이지의 공통 HTML과 소리 제공자
    page.tsx                    / 주소의 첫 화면
    globals.css                 색, 폰트, 악기 배치, 타격 애니메이션
    (portfolio)/
      layout.tsx                내부 페이지의 공통 레이아웃
      about/page.tsx            /about
      projects/page.tsx         /projects
      research/page.tsx         /research
      publications/page.tsx     /publications
      contact/page.tsx          /contact
      mid-tom/page.tsx           /mid-tom
      low-tom/page.tsx           /low-tom
      ride/page.tsx              /ride
  components/
    DrumHome.tsx                홈 화면과 악기별 이동 동작
    DrumArtwork.tsx             악기 SVG
    DrumSoundProvider.tsx       여러 화면이 공유하는 음소거와 오디오
    AboutSection.tsx            About 탭, Skills 선택, PP 표시
  lib/
    drum-audio.ts               음높이, 볼륨, 잡음으로 타격음 만들기
  data/
    projects.ts                 프로젝트 목록
    navigation.ts               내부 페이지의 텍스트 메뉴
public/
  images/                       사이트에서 사용하는 그림
```

`(portfolio)`는 **라우트 그룹**이다. 폴더를 묶어 공통 레이아웃을 적용할 수 있고, 이름은 URL에서 빠진다. 따라서 `src/app/(portfolio)/ride/page.tsx`의 주소는 `/ride`다.

`@/components/DrumHome`처럼 시작하는 import는 이 프로젝트에서 `src/components/DrumHome`을 가리킨다. `public/images/pixel-workspace.png`는 브라우저에서 `/images/pixel-workspace.png`로 요청한다.

## 4. JavaScript와 TypeScript. 데이터부터 만들기

### 객체와 배열

객체 하나는 악기 하나의 정보를 담는다. 배열은 그런 객체를 순서대로 모아둔다.

```ts
type Sound = "tom" | "ride";

type Instrument = {
  name: string;
  sound: Sound;
  href: string;
};

const instruments: Instrument[] = [
  { name: "High tom", sound: "tom", href: "/projects" },
  { name: "Ride", sound: "ride", href: "/ride" },
];

const first = instruments[0];
console.log(first.name); // High tom
```

- `const`는 변수에 다른 값을 다시 대입하지 않는다는 뜻이다. 객체 내부까지 자동으로 읽기 전용이 되지는 않는다.
- `Instrument[]`는 배열의 각 원소가 `Instrument` 형태여야 한다는 뜻이다.
- `"tom" | "ride"`는 두 문자열 중 하나만 허용하는 유니언 타입이다.
- `instruments[0]`은 첫 번째 원소다. 인덱스는 0부터 시작한다.
- `sound: "rdei"`는 허용된 이름이 아니므로 타입 검사가 잡아낸다. 반면 `href: "/riide"`는 여전히 문자열이라 이 타입만으로는 잘못된 주소를 잡지 못한다. 브라우저에서 링크도 확인해야 한다.

### 함수, 조건문, 배열 변환

```ts
function labelFor(instrument: Instrument) {
  return `Explore ${instrument.name}`;
}

const labels = instruments.map((instrument) => labelFor(instrument));
console.log(labels); // ["Explore High tom", "Explore Ride"]

function shouldPlay(muted: boolean) {
  if (muted) return false;
  return true;
}
```

`.map()`은 원소 하나마다 함수를 호출하고 반환값을 새 배열에 모은다. React에서는 문자열 대신 JSX를 반환해 목록을 만든다. 백틱 문자열 안의 `${...}`는 값을 문자열에 끼워 넣는다. `return`은 값을 돌려주면서 함수 실행을 끝낸다.

## 5. React. 데이터가 화면이 되고, 클릭이 상태를 바꾼다

**컴포넌트**는 화면 일부를 그리는 함수다. **props**는 부모가 내려주는 입력값이고, **state**는 컴포넌트가 렌더링 사이에 기억하는 값이다.

```tsx
function InstrumentName({ name }: { name: string }) {
  return <strong>{name}</strong>;
}

// 다른 컴포넌트에서 사용
<InstrumentName name="Ride" />
```

JSX의 `{name}`은 JavaScript 값을 화면에 넣는다. JSX에서 CSS 클래스는 `className`으로 쓴다. 반복 렌더링에서 `key`는 각 항목의 정체성을 React에 알려준다. 악기마다 주소가 고유하다면 `key={item.href}`처럼 안정적인 값을 쓸 수 있다.

```tsx
const [selected, setSelected] = useState("tom");

<button type="button" onClick={() => setSelected("ride")}>
  Ride
</button>

<p>선택한 악기: {selected}</p>
```

클릭 핸들러가 `setSelected`를 호출하면 React가 새 상태로 화면을 다시 계산한다. `onClick={setSelected("ride")}`라고 쓰면 렌더링 중에 함수를 실행해 버린다. 클릭할 때 실행할 함수를 전달해야 한다.

### useState, useRef, useEffect의 차이

| 도구 | 언제 쓰나 | 프로젝트 예 |
|---|---|---|
| `useState` | 값이 바뀌면 화면도 바뀌어야 할 때 | 선택한 스킬, 타격 중인 악기, 음소거 표시 |
| `useRef` | 렌더링 없이 값만 기억할 때 | 타이머 번호, 오디오 컨텍스트 |
| `useEffect` | React 외부 자원을 관리할 때 | 화면을 떠날 때 예약한 타이머 취소 |

이전 값을 기준으로 갱신할 때는 `setPedalHits((hits) => hits + 1)`처럼 함수 형태로 전달한다. 실제 페달은 이 숫자를 SVG의 `key`에도 사용한다. 숫자가 바뀔 때마다 **SVG만** 새로 만들어져 같은 CSS 애니메이션을 다시 시작한다. 바깥 버튼의 정체성은 그대로여서 클릭할 때마다 버튼 포커스가 사라지는 문제를 피한다.

## 6. Next.js. 주소와 화면 연결하기

주소를 열 수 있게 하려면 해당 폴더에 `page.tsx`를 둔다. 예를 들어 `src/app/(portfolio)/practice/page.tsx`를 만들면 `/practice`가 생긴다.

```tsx
import Link from "next/link";

export default function PracticePage() {
  return (
    <section>
      <h1>Practice</h1>
      <p>내 첫 번째 실습 페이지입니다.</p>
      <Link href="/">드럼 홈으로</Link>
    </section>
  );
}
```

- 다른 주소로 이동하는 요소는 링크로 만든다.
- 현재 화면에서 소리만 내거나 선택을 바꾸는 요소는 버튼으로 만든다.
- Next.js App Router의 페이지와 레이아웃은 기본적으로 서버 컴포넌트다. 상태, 클릭 핸들러, 브라우저 API를 쓰는 컴포넌트는 파일 맨 위에 `"use client";`를 둔다.
- `layout.tsx`의 `children`은 그 레이아웃 아래에 렌더링되는 페이지다. 루트 레이아웃은 `DrumSoundProvider`로 페이지를 감싸서 여러 화면에 소리 설정을 제공한다.

## 7. CSS와 SVG. 그림이 움직이는 원리

```tsx
<svg viewBox="0 0 100 80" width="120" aria-hidden="true">
  <g className="practice-stand">
    <path d="M50 45V70M50 62L36 76M50 62L64 76" stroke="#685d4e" fill="none" />
  </g>
  <g className="practice-drum-head">
    <path d="M14 30H86V48H14Z" fill="#aa785b" stroke="#493c2c" />
    <ellipse cx="50" cy="30" rx="36" ry="9" fill="#f3e4c7" stroke="#493c2c" />
  </g>
</svg>
```

`viewBox="0 0 100 80"`은 SVG 내부 좌표계를 설정한다. 화면에서 120px로 그려져도 도형을 정의하는 좌표는 그대로다. `M`은 시작점으로 이동, `L`은 선 그리기, `H`와 `V`는 가로·세로 선, `Z`는 경로 닫기다. `fill`은 안쪽 색, `stroke`는 선 색이다. `<g>`는 여러 도형을 한 그룹으로 묶는다.

```css
.practice-instrument[data-struck="true"] .practice-drum-head {
  animation: practice-hit 140ms ease-out;
}

@keyframes practice-hit {
  30% {
    transform: translateY(5px);
  }
}
```

여기서는 타격부만 아래로 5px 이동했다가 돌아온다. 스탠드는 별도 그룹이라 제자리에 있다. 실제 홈은 `.home-drum[data-struck="true"] .drum-art > g:last-child`로 마지막 그룹을 움직인다. 그 선택자는 현재 SVG 그룹 순서에 의존하므로 새 그룹을 추가하면 어느 부분이 움직이는지 다시 확인한다.

배치할 때는 부모에 `position: relative`, 악기에 `position: absolute`를 준다. 그러면 `left`, `top`의 기준이 드럼 세트 영역이 된다. `z-index`는 겹쳤을 때 그리는 순서를 정한다. 타격 때문에 악기 전체의 `z-index`를 올리면 뒤쪽 탐의 지지 구조가 앞으로 보일 수 있으니 움직임과 겹치는 순서는 따로 다룬다.

페달은 발판을 뒤꿈치 쪽에 고정하고 `scaleY(.76)`으로 눌리는 모양을 낸다. 비터는 회전축 쪽을 `transform-origin`으로 잡고 `scaleY(.82)`로 위로 길어지지 않게 움직인다. 모션 감소 설정이 켜져 있으면 사이트의 타격 애니메이션을 생략한다.

## 8. 핵심 로직. 악기를 누른 뒤 실제로 일어나는 일

1. 악기 링크의 `onNavigate`가 실행된다.
2. `event.preventDefault()`가 링크의 즉시 이동을 잠시 막는다.
3. 이전에 예약한 이동이 있으면 `clearTimeout`으로 취소한다.
4. `play(item.sound)`가 악기 소리를 요청한다.
5. `setStruck(item.sound)`가 어떤 악기를 쳤는지 기록한다.
6. React가 그 악기에만 `data-struck="true"`를 렌더링한다.
7. CSS가 이 속성을 보고 140ms 타격 애니메이션을 시작한다.
8. 타이머 콜백이 타격 상태를 비우고 `router.push(item.href)`로 이동한다.

`setTimeout(fn, 140)`은 함수 실행을 예약한다. JavaScript 실행 전체를 140ms 동안 멈추는 함수가 아니고, 브라우저 상황에 따라 콜백은 더 늦게 실행될 수 있다. 타이머를 ref에 담아둔 덕분에 연속 클릭하면 마지막으로 선택한 악기의 주소로 이동한다. Ctrl·Cmd 클릭처럼 일반적인 클라이언트 내비게이션이 아닌 경우는 이 `onNavigate` 흐름과 구분된다.

킥 **페달**은 별도 버튼이라 페이지 이동 타이머를 쓰지 않는다. `play("kick")`과 `setPedalHits`만 호출한다. 베이스 드럼 **본체**는 Contact 링크다.

## 9. Web Audio. 파일 없이 드럼 소리 내기

오디오 노드는 신호가 지나가는 부품이다.

| 부품 | 역할 |
|---|---|
| `AudioContext` | 오디오 시간과 장치를 관리 |
| `OscillatorNode` | 일정한 파형으로 음을 생성 |
| `AudioBufferSourceNode` | 샘플 배열을 재생 |
| `BiquadFilterNode` | 원하는 주파수 대역을 남김 |
| `GainNode` | 볼륨을 조절 |
| `context.destination` | 최종 출력 |

킥과 탐은 **오실레이터 → 볼륨 → 출력**으로 간다. 음높이가 빠르게 떨어지고 볼륨이 줄어들면서 타격음처럼 들린다. 스네어는 음과 잡음을 함께 사용한다. 크래시, 라이드, 하이햇은 무작위 샘플로 만든 잡음에 하이패스 필터를 적용한다. 하이패스는 낮은 주파수를 줄인다.

```ts
const now = context.currentTime;
oscillator.frequency.setValueAtTime(145, now);
oscillator.frequency.exponentialRampToValueAtTime(42, now + 0.18);

gain.gain.setValueAtTime(0.18, now);
gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
```

오디오 시간의 단위는 초다. `0.18`초는 180ms다. 주파수 단위는 Hz다. 지수 램프의 끝을 0으로 두면 사용할 수 없으므로 작은 양수인 `0.001`까지 줄인다. 실제 코드에서는 소스가 끝나면 연결을 끊어 사용이 끝난 노드를 정리한다.

브라우저는 자동 재생을 제한할 수 있다. 그래서 프로젝트는 버튼을 누를 때 `AudioContext`를 처음 만들고, 컨텍스트가 멈춰 있으면 `resume()`으로 재개한다. 음소거 상태는 Context로 공유하고, 음소거 중이면 재생 함수가 일찍 끝난다.

## 10. 처음부터 따라 만드는 미니 드럼

아래 두 파일을 만들면 기존 홈을 건드리지 않고 `/learn-drum`에서 연습할 수 있다. 현재 프로젝트의 소리 제공자를 재사용한다.

**파일 1. `src/app/(portfolio)/learn-drum/page.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useDrumSound } from "@/components/DrumSoundProvider";
import "./practice.css";

const drums = [
  { name: "High tom", sound: "tom", color: "#aa785b", href: "/projects" },
  { name: "Low tom", sound: "lowTom", color: "#879c62", href: "/low-tom" },
] as const;

export default function LearnDrumPage() {
  const { play } = useDrumSound();
  const [selected, setSelected] = useState<(typeof drums)[number]>(drums[0]);
  const [hits, setHits] = useState(0);

  return (
    <section className="page-width section-space">
      <h1>나의 첫 드럼</h1>
      <div className="practice-kit">
        {drums.map((drum) => (
          <button
            key={drum.sound}
            type="button"
            aria-pressed={selected.sound === drum.sound}
            onClick={() => {
              play(drum.sound);
              setSelected(drum);
              setHits((count) => count + 1);
            }}
          >
            <svg viewBox="0 0 100 80" width="120" aria-hidden="true">
              <path d="M50 45V70M50 62L36 76M50 62L64 76" stroke="#685d4e" fill="none" />
              <g key={selected.sound === drum.sound ? hits : "idle"}
                 data-hit={selected.sound === drum.sound && hits > 0}>
                <path d="M14 30H86V48H14Z" fill={drum.color} stroke="#493c2c" />
                <ellipse cx="50" cy="30" rx="36" ry="9" fill="#f3e4c7" stroke="#493c2c" />
              </g>
            </svg>
            {drum.name}
          </button>
        ))}
      </div>
      <p>선택한 악기: {selected.name}</p>
      <p>누른 횟수: {hits}</p>
      <Link href={selected.href}>선택한 악기의 페이지로 이동</Link>
    </section>
  );
}
```

**파일 2. `src/app/(portfolio)/learn-drum/practice.css`**

```css
.practice-kit {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-block: 20px;
}

.practice-kit button {
  display: grid;
  justify-items: center;
  padding: 12px;
  border: 1px solid #a78e72;
  border-radius: 8px;
  background: #fff7e6;
  cursor: pointer;
}

.practice-kit button[aria-pressed="true"] {
  background: #e8efce;
}

@media (prefers-reduced-motion: no-preference) {
  .practice-kit g[data-hit="true"] {
    animation: practice-hit 140ms ease-out;
  }
}

@keyframes practice-hit {
  30% { transform: translateY(5px); }
}
```

**직접 확인할 것**

1. `/learn-drum`을 열면 악기 두 개가 보인다.
2. Low tom을 누르면 선택 표시와 글자가 바뀌고 횟수가 1 증가한다.
3. 같은 악기를 연속으로 눌러도 매번 타격 애니메이션이 시작된다.
4. 선택 후 링크를 누르면 연결된 페이지가 열린다.

처음에는 이 예제처럼 **연주 버튼과 이동 링크를 따로** 만들어 각각 이해한다. 둘 다 동작한 뒤 실제 `DrumHome.tsx`의 `onNavigate`를 읽고 한 번의 입력으로 묶는다.

## 11. About 화면. 탭, 선택, PP

About에는 두 가지 상태가 있다. `view`는 About·Skills·Stats 중 현재 탭을, `selected`는 스킬 배열에서 선택한 항목의 인덱스를 기억한다. 기술 버튼이 `setSelected(index)`를 호출하면 `skills[selected]`가 바뀌고 설명도 바뀐다.

```tsx
const skill = { name: "Python", pp: 18, maxPp: 30 };
const percent = (skill.pp / skill.maxPp) * 100; // 60

<span>PP {skill.pp} / {skill.maxPp}</span>
<progress aria-hidden="true" value={skill.pp} max={skill.maxPp} />
```

텍스트로 이미 수치를 표시하므로 프로젝트에서는 막대를 화면 읽기 도구에 중복으로 읽히지 않게 숨긴다. `maxPp`는 양수, `pp`는 0 이상 최대치 이하로 둔다. PP는 프로필 데이터에 넣은 표시값이고, 드럼을 쳤다고 자동으로 소모되는 값은 아니다.

데스크톱에서는 기술 목록에 `max-height`와 `overflow-y: auto`를 주므로 항목이 많아지면 목록 내부만 스크롤된다. 모바일의 미디어 쿼리는 높이 제한을 풀고 선택한 기술 아래에 설명을 보여준다.

### 실습. 기술 하나 추가하기

`src/components/AboutSection.tsx`의 `skills` 배열 안에 다음 항목을 넣어본다.

```ts
{
  name: "CSS",
  mark: "CSS",
  type: "WEB",
  pp: 12,
  maxPp: 20,
  description: "Responsive layouts and motion for the drum kit.",
},
```

CSS를 선택하면 설명이 바뀌고 PP 막대는 60%가 되어야 한다. 브라우저 폭을 줄여 모바일에서 설명이 선택한 줄 바로 아래에 나타나는지 확인한다.

## 12. 기능을 추가할 때 어디를 고치는가

| 하고 싶은 일 | 고칠 곳 | 확인 방법 |
|---|---|---|
| 홈 제목이나 안내 바꾸기 | `DrumHome.tsx` | 홈을 다시 열어 문구 확인 |
| 라이드가 다른 페이지를 열게 하기 | `DrumHome.tsx`의 `menu`에서 `href` 변경 | 악기 링크와 아래 텍스트 링크 클릭 |
| 빈 라이드 페이지에 내용 채우기 | `src/app/(portfolio)/ride/page.tsx` | `/ride` 직접 열기 |
| 탐 소리의 시작과 끝 음높이 바꾸기 | `drum-audio.ts`의 `pitches` | 소리 켠 상태에서 악기 눌러 비교 |
| 악기 타격을 조금 크게 만들기 | `globals.css`의 `home-drum-hit` | 눌렀을 때 스탠드가 움직이지 않는지 확인 |
| 스킬·PP·설명 추가 | `AboutSection.tsx`의 `skills` | Skills 탭, 막대, 모바일 설명 확인 |
| 프로젝트 카드 추가 | `src/data/projects.ts`와 필요한 이미지 | Projects 페이지에서 카드와 링크 확인 |

새 악기까지 만들려면 **주소 → 메뉴 데이터 → 그림 → 배치 → 소리** 순서로 작업한다. 기존 `DrumSound`를 재사용하면 그 음색과 그림을 쓸 수 있다. 완전히 새 음색을 만들 때는 타입에 이름만 추가하지 말고 `playDrum`에서 실제 재생 분기를 연결한다. 새로운 그림을 만들었다면 `DrumArtwork.tsx`에서 그 이름이 해당 그림을 선택하도록 한다.

## 13. 막혔을 때 보는 곳

| 증상 | 확인할 곳 |
|---|---|
| 클릭했는데 아무 일도 없다 | 버튼에 핸들러를 함수로 전달했는지, 콘솔에 오류가 있는지 |
| 소리가 없다 | 음소거, 브라우저 탭 소리, 사용자 입력 후 AudioContext가 실행되는지 |
| 악기는 보이는데 클릭이 안 된다 | SVG의 `pointer-events`, 앞에 겹친 요소의 `z-index` |
| 페이지가 404다 | 폴더명과 `href`가 일치하는지, 폴더 안에 `page.tsx`가 있는지 |
| 애니메이션이 한 번만 된다 | 타격 상태를 다시 초기화하는지, 페달 SVG의 `key`가 매번 바뀌는지 |
| 그림이 움직이면서 받침대도 올라온다 | 애니메이션을 악기 전체 대신 타격부 그룹에 걸었는지 |
| 로컬만 바뀌고 공개 사이트는 그대로다 | 변경이 커밋·푸시됐는지, Vercel에서 새 배포가 성공했는지 |

개발자 도구의 **Elements**에서는 눌렀을 때 `data-struck`이나 `aria-pressed`가 어떻게 바뀌는지 보고, **Console**에서는 브라우저 오류를 확인한다. 수정이 끝나면 `git diff`로 의도한 부분만 바뀌었는지 살핀다. 이 프로젝트는 GitHub의 `main`과 Vercel을 연결해 둔 상태라 공개 반영은 해당 브랜치에 변경을 올린 뒤 배포가 성공해야 끝난다.

## 14. 연습 순서와 스스로 확인할 질문

- **1회차.** 제목을 바꾸고 Skills에 기술 하나를 추가한다. 배열에서 항목 하나를 더 넣었을 때 어디서 화면에 나타나는지 설명해본다.
- **2회차.** 미니 드럼 예제를 그대로 작성한 뒤 `translateY(5px)`를 바꿔본다. 버튼을 누르고 다시 렌더링할 때 어떤 값이 달라지는지 짚는다.
- **3회차.** 빈 연습 페이지를 추가하고 링크를 연결한다. 폴더 이름과 URL의 관계를 말로 설명한다.
- **4회차.** `DrumHome.tsx`에서 `onNavigate`부터 `router.push`까지 흐름을 따라간다. 타이머를 왜 ref에 저장했는지 설명한다.
- **5회차.** 탐 하나의 음높이 또는 심벌 하나의 지속 시간만 바꾸고 귀로 비교한다. 음높이, 볼륨, 소리 길이가 각각 어느 코드에서 정해지는지 찾는다.

연습 뒤에는 코드를 닫고 다음 흐름을 직접 써본다. **데이터에 악기를 추가하고 → React로 화면에 그려서 → 클릭 상태를 바꾸고 → CSS로 움직이고 → 소리를 낸 뒤 → 다른 페이지로 이동한다.** 막히는 단계가 있으면 그 단계만 다시 실습한다.
