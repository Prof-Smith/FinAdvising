from pathlib import Path
import re

p = Path('index.html')
if not p.exists():
    raise SystemExit('Place this script beside the current index.html.')

s = p.read_text(encoding='utf-8')

new_block = r'''function courseLevel(code){let m=String(code).match(/(\d{3})/);return m?Number(m[1]):0}
function isMajorCourse(c){return ['Finance','Economics','Analytics Choice','Major Elective'].includes(c.group)}
function isFlexibleCourse(c){return ['University Explorations','Elective'].includes(c.group)}
function courseIntensity(c){let level=courseLevel(c.code),score=1;if(level>=300)score+=1;if(level>=400)score+=1;if(['FIN410','FIN420','FIN450','FIN470','FIN498','ECO301','ECO302','ECO411','ECO422'].includes(c.code))score+=1;return score}
function score(c,mode,rem,termNumber=0){
 let seasonal=c.terms.length===1?10:0;
 let unlock=rem.filter(x=>x.pre.includes(c.code)).length*5;
 let major=isMajorCourse(c)?14:0;
 let earlyMajor=isMajorCourse(c)?Math.max(0,10-termNumber*2):0;
 let gateway=['FIN325','ECO201','ECO202','MAT201','GBA334','ECO311'].includes(c.code)?8:0;
 let flexible=isFlexibleCourse(c)?3:0;
 if(mode==='balanced') flexible+=7;
 if(mode==='accelerated') major+=3;
 return seasonal+unlock+major+earlyMajor+gateway+flexible;
}
function build(mode){
 let a=active(),done=new Set(a.filter(c=>['complete','progress'].includes(st(c.code))).map(c=>c.code)),rem=a.filter(c=>!done.has(c.code)),term=start.value,y=+year.value,cap=mode==='accelerated'?18:+load.value,out=[];
 for(let n=0;n<12&&rem.length;n++){
  let pool=rem.filter(c=>eligible(c,done,term));
  if(choiceMet(done)) pool=pool.filter(c=>!c.choice||required(c));
  pool.sort((x,z)=>score(z,mode,rem,n)-score(x,mode,rem,n));
  let pick=[],used=0,majorCredits=0,intensity=0;
  let majorTarget=mode==='balanced'?6:Math.min(9,cap-3);
  let intensityCap=mode==='accelerated'?14:mode==='balanced'?9:11;

  /* Pass 1: establish early major exposure without overloading the term. */
  for(let c of pool){
   if(!isMajorCourse(c)||used+c.credits>cap||majorCredits+c.credits>majorTarget||intensity+courseIntensity(c)>intensityCap)continue;
   if(c.choice&&choiceMet(new Set([...done,...pick.map(x=>x.code)]))&&!required(c))continue;
   pick.push(c);used+=c.credits;majorCredits+=c.credits;intensity+=courseIntensity(c);
  }

  /* Pass 2: balance the schedule with business, core, and flexible requirements. */
  for(let c of pool){
   if(pick.includes(c)||used+c.credits>cap||intensity+courseIntensity(c)>intensityCap)continue;
   if(c.choice&&choiceMet(new Set([...done,...pick.map(x=>x.code)]))&&!required(c))continue;
   pick.push(c);used+=c.credits;if(isMajorCourse(c))majorCredits+=c.credits;intensity+=courseIntensity(c);
  }

  /* Pass 3: if room remains, fill it while respecting the selected credit cap. */
  for(let c of pool){
   if(pick.includes(c)||used+c.credits>cap)continue;
   if(c.choice&&choiceMet(new Set([...done,...pick.map(x=>x.code)]))&&!required(c))continue;
   pick.push(c);used+=c.credits;
  }

  out.push({term,year:y,pick,credits:used,majorCredits,intensity});
  pick.forEach(c=>done.add(c.code));
  rem=a.filter(c=>!done.has(c.code)&&(required(c)||c.choice));
  term=term==='Fall'?'Spring':'Fall';if(term==='Fall')y++;
 }
 return out;
}'''

pattern = re.compile(r"function score\(c,mode,rem\).*?function generatePlans\(\)", re.S)
match = pattern.search(s)
if not match:
    raise SystemExit('Could not find the planning score/build block in index.html. No changes were made.')

s = s[:match.start()] + new_block + '\nfunction generatePlans()' + s[match.end():]

# Update visible strategy descriptions only, leaving the rest of the portal unchanged.
s = s.replace('Prioritizes seasonal courses and prerequisite chains.', 'Introduces eligible major coursework early while protecting seasonal courses and prerequisite chains.')
s = s.replace('Mixes major and flexible requirements to distribute course intensity.', 'Limits major concentration, mixes flexible requirements, and distributes course intensity.')
s = s.replace('Uses up to 18 eligible credits to shorten the projected sequence.', 'Uses up to 18 eligible credits, prioritizing major progress while retaining prerequisite and seasonal safeguards.')

p.write_text(s, encoding='utf-8')
print('Updated planning engine: early major exposure plus workload balancing.')
