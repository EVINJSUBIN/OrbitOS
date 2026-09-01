import{n as e,s as t,t as n}from"./jsx-runtime-B5yqYJvp.js";var r=t(e(),1),i=n(),a={help:()=>`Available commands:
  help       - Show this message
  whoami     - Who am I?
  about      - About OrbitOS
  skills     - My skills
  projects   - My projects
  contact    - Contact info
  neofetch   - System info
  clear      - Clear terminal
  kawaii     - Random kawaii face
  date       - Current date/time
  echo       - Echo text back
  matrix     - Matrix rain (type anything to stop)
  party      - Disco mode!
  cat        - Random cat
  fortune    - Random fortune
  weather    - Fake weather
  cowsay     - Cow says your text
  sudo       - Try it ;)`,whoami:()=>`orbit-user -- commander of the ISS, explorer of the digital cosmos`,about:()=>`OrbitOS v1.0.0
A space-themed web operating system built for the Hack Club.
Made with React, TypeScript, Tailwind CSS, and starry vibes.`,skills:()=>`Languages:    JavaScript, TypeScript, HTML/CSS
Frameworks:  React, Vite
Theme:       Space, Orbit, ISS`,projects:()=>`OrbitOS      A next-generation web operating system
ISS Tracker  Real-time satellite tracking`,contact:()=>`GitHub:   github.com/hackclub
Website:  hackclub.com`,neofetch:()=>`
     .  *  .    orbit-user@OrbitOS
  *   .   *     ------------------
   . *   .      OS: OrbitOS 1.0.0
 *   .   *      Kernel: React 19 + Vite
    .  *        Shell: OrbitShell 1.0
                Resolution: responsive
                DE: Space Desktop Environment
                WM: Framer Motion
                Theme: Orbit Dark Mode
                Terminal: OrbitTerm
                CPU: Cybernetic Brain
                Memory: Infinite`,kawaii:()=>{let e=[`(◕ᴗ◕✿)`,`(◠‿◠)`,`(ﾉ◕ヮ◕)ﾉ*:・ﾟ✿`,`(｡◕‿◕｡)`,`(✿╹◡╹)`,`♡(ӦｖӦ｡)`,`(っ˘ω˘ς )`,`(─‿─)`,`ヽ(>∀<☆)ノ`,`(★ω★)`];return e[Math.floor(Math.random()*e.length)]},date:()=>new Date().toString(),matrix:()=>`MATRIX MODE ACTIVATED
`+Array.from({length:8},()=>Array.from({length:40},()=>String.fromCharCode(12448+Math.random()*96)).join(``)).join(`
`),party:()=>{let e=[`🟥`,`🟧`,`🟨`,`🟩`,`🟦`,`🟪`,`🟥`,`🟧`,`🟨`,`🟩`,`🟦`,`🟪`];return e.join(``)+`
`+e.reverse().join(``)+`
PARTY MODE! ヽ(>∀<☆)ノ
`+e.reverse().join(``)},cat:()=>{let e=[`  /\\_/\\  
 ( o.o ) 
  > ^ <  
 /|   |\\ 
(_|   |_)`,`  /\\_/\\  
 ( =.= ) 
  > ^ <  zzz`,`  /\\_/\\  
 ( @.@ ) 
  > ^ <  * startled *`,`  /\\_/\\  
 ( ^.^ ) 
  > ♡ <  OrbitOS!`,`    |\\_/|  
    |o o|  
    | > |  meow~`];return e[Math.floor(Math.random()*e.length)]},fortune:()=>{let e=[`The best time to plant a tree was 20 years ago. The second best time is now.`,`Code is like humor. When you have to explain it, it's bad.`,`First, solve the problem. Then, write the code.`,`Any fool can write code that a computer can understand. Good programmers write code that humans can understand.`,`The only way to learn a new programming language is by writing programs in it.`,`Talk is cheap. Show me the code. - Linus Torvalds`,`Meow. - Every cat ever`,`The kawaii is strong with this one.`,`Your future is as bright as a sakura blossom in spring.`];return e[Math.floor(Math.random()*e.length)]},weather:()=>{let e=[`☀️ Sunny`,`🌤 Partly cloudy`,`🌧 Rainy`,`⛅ Cloudy`,`🌈 Rainbow`,`❄️ Snowy`,`🌙 Clear night`];return`OrbitOS Weather Service\n${e[Math.floor(Math.random()*e.length)]} | ${Math.floor(Math.random()*30+5)}°C\nHumidity: ${Math.floor(Math.random()*60+30)}%\nWind: ${Math.floor(Math.random()*20+1)} km/h\nVibes: Immaculate ✨`},cowsay:e=>{let t=e||`OrbitOS is kawaii!`;return`${` `+`_`.repeat(t.length+2)}\n${`< ${t} >`}\n${` `+`-`.repeat(t.length+2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`},sudo:()=>{let e=[`🚨 ALERT: You are not root. You are a cute kawaii user. Permission denied. (◕ᴗ◕✿)`,`Nice try! But this is a kawaii zone. No sudo for you! ♡`,`sudo: command not found in the kawaii dimension`,`Permission denied. Have you tried saying please? (◠‿◠)`,`You do not have sudo privileges. But you do have kawaii privileges! ヽ(>∀<☆)ノ`];return e[Math.floor(Math.random()*e.length)]}};function o(){let[e,t]=(0,r.useState)([{text:`Welcome to OrbitOSTerm v1.0.0`,type:`output`},{text:`Type "help" for available commands. (◕ᴗ◕✿)`,type:`output`},{text:``,type:`output`}]),[n,o]=(0,r.useState)(``),[s,c]=(0,r.useState)([]),[l,u]=(0,r.useState)(-1),d=(0,r.useRef)(null),f=(0,r.useRef)(null);(0,r.useEffect)(()=>{d.current?.scrollTo({top:d.current.scrollHeight})},[e]);let p=e=>{let n=e.trim();if(!n)return;let r=[{text:`$ ${n}`,type:`input`}];c(e=>[n,...e]),u(-1);let[i,...o]=n.split(` `);if(i===`clear`){t([]);return}if(i===`echo`)r.push({text:o.join(` `),type:`output`});else if(a[i]){let e=a[i](o.join(` `));r.push({text:e,type:`output`})}else r.push({text:`OrbitOSsh: command not found: ${i}`,type:`error`});r.push({text:``,type:`output`}),t(e=>[...e,...r])};return(0,i.jsxs)(`div`,{className:`app-terminal`,ref:d,onClick:()=>f.current?.focus(),children:[e.map((e,t)=>(0,i.jsx)(`div`,{className:`app-terminal-line`,children:e.type===`input`?(0,i.jsxs)(`span`,{children:[(0,i.jsx)(`span`,{className:`app-terminal-prompt`,children:e.text.slice(0,2)}),(0,i.jsx)(`span`,{children:e.text.slice(2)})]}):(0,i.jsx)(`span`,{style:{color:e.type===`error`?`#F38BA8`:`#CDD6F4`},children:e.text})},t)),(0,i.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`},children:[(0,i.jsx)(`span`,{className:`app-terminal-prompt`,children:`$ `}),(0,i.jsx)(`input`,{ref:f,className:`app-terminal-input`,value:n,onChange:e=>o(e.target.value),onKeyDown:e=>{if(e.key===`Enter`)p(n),o(``);else if(e.key===`ArrowUp`){if(e.preventDefault(),s.length>0){let e=Math.min(l+1,s.length-1);u(e),o(s[e])}}else if(e.key===`ArrowDown`){if(e.preventDefault(),l>0){let e=l-1;u(e),o(s[e])}else u(-1),o(``)}},autoFocus:!0,spellCheck:!1})]})]})}export{o as default};