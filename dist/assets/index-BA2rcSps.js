import{u as tl,r as ce,j as h,I as Jt}from"./index-tGhwASjr.js";const Ks=66743e-15,wa=198847e25,yn=149597870700,zi=86400,Ka={sun:{id:"sun",name:"Sun",mass:wa,radiusKm:696340,color:"#f59e0b",colorLight:"#d97706",displayRadius:16},planets:[{id:"mercury",name:"Mercury",mass:33011e19,semiMajorAxisAU:.387098,eccentricity:.20563,orbitalPeriodYears:.240846,meanVelocityKmS:47.36,radiusKm:2439.7,color:"#64748b",colorLight:"#475569",displayRadius:4,initialAngleDeg:45,type:"Terrestrial (Inner)"},{id:"venus",name:"Venus",mass:48675e20,semiMajorAxisAU:.723332,eccentricity:.00677,orbitalPeriodYears:.615197,meanVelocityKmS:35.02,radiusKm:6051.8,color:"#eab308",colorLight:"#b45309",displayRadius:5.5,initialAngleDeg:120,type:"Terrestrial (Inner)"},{id:"earth",name:"Earth",mass:59724e20,semiMajorAxisAU:1,eccentricity:.01671,orbitalPeriodYears:1,meanVelocityKmS:29.78,radiusKm:6371,color:"#0284c7",colorLight:"#0369a1",displayRadius:6,initialAngleDeg:210,type:"Terrestrial (Inner)"},{id:"mars",name:"Mars",mass:64171e19,semiMajorAxisAU:1.523679,eccentricity:.09341,orbitalPeriodYears:1.880816,meanVelocityKmS:24.07,radiusKm:3389.5,color:"#ef4444",colorLight:"#dc2626",displayRadius:4.8,initialAngleDeg:315,type:"Terrestrial (Inner)"},{id:"jupiter",name:"Jupiter",mass:18982e23,semiMajorAxisAU:5.2044,eccentricity:.04849,orbitalPeriodYears:11.8626,meanVelocityKmS:13.07,radiusKm:69911,color:"#d97706",colorLight:"#92400e",displayRadius:10,initialAngleDeg:75,type:"Gas Giant (Outer)"},{id:"saturn",name:"Saturn",mass:56834e22,semiMajorAxisAU:9.5826,eccentricity:.05551,orbitalPeriodYears:29.4571,meanVelocityKmS:9.69,radiusKm:58232,color:"#ca8a04",colorLight:"#854d0e",displayRadius:8.5,hasRings:!0,initialAngleDeg:190,type:"Gas Giant (Outer)"},{id:"uranus",name:"Uranus",mass:8681e22,semiMajorAxisAU:19.2184,eccentricity:.0463,orbitalPeriodYears:84.011,meanVelocityKmS:6.81,radiusKm:25362,color:"#06b6d4",colorLight:"#0e7490",displayRadius:7,initialAngleDeg:280,type:"Ice Giant (Outer)"},{id:"neptune",name:"Neptune",mass:10241e22,semiMajorAxisAU:30.07,eccentricity:.00946,orbitalPeriodYears:164.79,meanVelocityKmS:5.43,radiusKm:24622,color:"#2563eb",colorLight:"#1d4ed8",displayRadius:7,initialAngleDeg:350,type:"Ice Giant (Outer)"}]};function er(i=1,e=1,t={}){const n=Ks*i,s=Ka.sun,{isolatePlanetId:r=null,allowSunMotion:a=!1,customBodies:o=[],planetOverrides:c={}}=t,l={...s,isSun:!0,baseMass:s.mass,mass:s.mass,x:0,y:0,vx:0,vy:0,ax:0,ay:0,trail:[],allowMotion:a};let d=Ka.planets;r&&(d=d.filter(x=>x.id===r));const g=d.map(x=>{const S=c[x.id]||{},m=S.massMultiplier!==void 0?S.massMultiplier:1,u=(S.velocityMultiplier!==void 0?S.velocityMultiplier:1)*e,b=x.mass*m,w=x.semiMajorAxisAU*yn,E=x.eccentricity,R=w*(1-E),A=x.initialAngleDeg*Math.PI/180,_=R*Math.cos(A),y=R*Math.sin(A),I=Math.sqrt(n*wa*(1+E)/(w*(1-E))),N=I*u,U=-N*Math.sin(A),O=N*Math.cos(A);return{...x,isSun:!1,isCustom:!1,baseMass:x.mass,massMultiplier:m,velocityMultiplier:u,baseSpeed:I,mass:b,aMeters:w,x:_,y,vx:U,vy:O,ax:0,ay:0,trail:[],allowMotion:!0}});if(a&&g.length===1){const x=g[0];l.vx=-(x.mass*x.vx)/l.mass,l.vy=-(x.mass*x.vy)/l.mass}const f=o.map(x=>{const S=x.distanceAU*yn,m=x.angleDeg*Math.PI/180,u=S*Math.cos(m),b=S*Math.sin(m),w=x.speedKmS*1e3,E=x.isRetrograde?1:-1,R=E*w*Math.sin(m),A=-E*w*Math.cos(m);return{id:x.id,name:x.name,mass:x.mass,baseMass:x.mass,massMultiplier:1,velocityMultiplier:1,radiusKm:x.radiusKm||5e3,displayRadius:x.displayRadius||6,color:x.color||"#ec4899",colorLight:x.color||"#db2777",type:"Hypothetical (Custom)",isSun:!1,isCustom:!0,aMeters:S,x:u,y:b,vx:R,vy:A,ax:0,ay:0,trail:[],allowMotion:!0}}),p=[l,...g,...f];return nl(p,i),p}function nl(i,e=1){const t=Ks*e,n=i.length;for(let r=0;r<n;r++)i[r].ax=0,i[r].ay=0;const s=1e12;for(let r=0;r<n;r++){const a=i[r];for(let o=r+1;o<n;o++){const c=i[o],l=c.x-a.x,d=c.y-a.y,g=l*l+d*d+s,f=Math.sqrt(g),p=1/(g*f),x=t*c.mass*p,S=t*a.mass*p;a.ax+=l*x,a.ay+=d*x,c.ax-=l*S,c.ay-=d*S}}}function $a(i,e,t=1){const n=i.length;for(let s=0;s<n;s++){const r=i[s];r.isSun&&!r.allowMotion||(r.vx+=.5*r.ax*e,r.vy+=.5*r.ay*e,r.x+=r.vx*e,r.y+=r.vy*e)}nl(i,t);for(let s=0;s<n;s++){const r=i[s];r.isSun&&!r.allowMotion||(r.vx+=.5*r.ax*e,r.vy+=.5*r.ay*e)}}function Za(i,e,t=1,n=null){const s=Ks*t,r=n||e.find(W=>W.isSun)||{x:0,y:0,vx:0,vy:0,mass:wa},a=i.x-r.x,o=i.y-r.y,c=Math.sqrt(a*a+o*o),l=c/yn,d=c/1e3,g=i.vx-r.vx,f=i.vy-r.vy,p=Math.sqrt(g*g+f*f),x=p/1e3,S=g/1e3,m=f/1e3,u=Math.sqrt(i.ax*i.ax+i.ay*i.ay),b=s*r.mass*i.mass/(c*c),w=.5*i.mass*(p*p);let E=0;for(const W of e){if(W===i)continue;const se=W.x-i.x,q=W.y-i.y,te=Math.max(Math.sqrt(se*se+q*q),1e6);E-=s*i.mass*W.mass/te}const R=w+E,A=R/i.mass,_=a*f-o*g,y=s*r.mass,I=2/c-p*p/y,N=I>1e-18?1/I:1/0,U=N!==1/0?N/yn:1/0,O=1+2*A*(_*_)/(y*y),Y=O>0?Math.sqrt(O):0,P=Math.sqrt(y/c)/1e3,j=P*Math.SQRT2;let F=0;return N>0&&N!==1/0?F=2*Math.PI*Math.sqrt(Math.pow(N,3)/y)/zi:F=1/0,{distanceAU:l,distanceKm:d,distanceMeters:c,speedKmS:x,vxKmS:S,vyKmS:m,accelMs2:u,solarForceNewtons:b,kineticEnergyJoules:w,potentialEnergyJoules:E,totalEnergyJoules:R,specificEnergy:A,specificAngularMomentum:_,eccentricity:Y,semiMajorAxisEstAU:U,circularSpeedKmS:P,escapeVelocityKmS:j,theoreticalPeriodDays:F,theoreticalPeriodYears:F!==1/0?F/365.256:1/0}}function jl(i,e,t=1){const n=Ks*t,s=e.x-i.x,r=e.y-i.y,a=Math.max(Math.sqrt(s*s+r*r),1e3),o=a/yn,c=a/1e3,l=n*i.mass*e.mass/(a*a),d=l/i.mass,g=l/e.mass,f=s/a,p=r/a;return{distanceMeters:a,distanceKm:c,distanceAU:o,forceNewtons:l,accelAMs2:d,accelBMs2:g,unitX:f,unitY:p}}function ql({graphHistory:i,selectedPlanetName:e,isIsolatedTwoBody:t=!1}){const{isDark:n}=tl(),[s,r]=ce.useState("distance"),o={distance:{label:"Orbital Distance",unit:"AU",color:"#0284c7",getValue:F=>F.distanceAU,formatY:F=>`${F.toFixed(3)} AU`},speed:{label:"Orbital Velocity",unit:"km/s",color:"#10b981",getValue:F=>F.speedKmS,formatY:F=>`${F.toFixed(2)} km/s`},force:{label:"Solar Gravitational Force",unit:"N",color:"#f59e0b",getValue:F=>F.forceN,formatY:F=>`${F.toExponential(2)} N`},energy:{label:"Kinetic, Potential & Total Energy",unit:"Joules",color:"#8b5cf6",isMulti:!0,formatY:F=>`${F.toExponential(2)} J`}}[s];if(!i||i.length<2)return h.jsx("div",{className:"graph-container-card empty",children:h.jsxs("p",{className:"graph-empty-msg",children:["Collecting telemetry data for ",h.jsx("strong",{children:e}),"... (Press Play or advance simulation)"]})});const c=i[0],l=i[i.length-1];let d=0;c&&l&&Math.abs(c.totalEnergyJ)>0&&(d=(l.totalEnergyJ-c.totalEnergyJ)/Math.abs(c.totalEnergyJ)*100);const g=i[0].timeDays,f=Math.max(i[i.length-1].timeDays,g+.1);let p=1/0,x=-1/0;if(s==="energy")for(const F of i)p=Math.min(p,F.kineticJ,F.potentialJ,F.totalEnergyJ),x=Math.max(x,F.kineticJ,F.potentialJ,F.totalEnergyJ);else for(const F of i){const W=o.getValue(F);p=Math.min(p,W),x=Math.max(x,W)}const S=x-p||1,m=p-S*.1,u=x+S*.1,b=600,w=220,E=75,R=20,A=20,_=35,y=b-E-R,I=w-A-_,N=F=>E+(F-g)/(f-g)*y,U=F=>A+I-(F-m)/(u-m)*I,O=F=>i.reduce((W,se,q)=>{const te=N(se.timeDays),ae=U(F(se));return q===0?`M ${te.toFixed(1)} ${ae.toFixed(1)}`:`${W} L ${te.toFixed(1)} ${ae.toFixed(1)}`},""),Y=n?"#475569":"#cbd5e1",P=n?"rgba(255, 255, 255, 0.06)":"rgba(0, 0, 0, 0.06)",j=n?"#94a3b8":"#64748b";return h.jsxs("div",{className:"graph-container-card",children:[h.jsxs("div",{className:"graph-card-header",children:[h.jsxs("div",{className:"graph-title-group",children:[h.jsxs("h3",{className:"graph-title",children:["Live Telemetry Graphs — ",e]}),h.jsx("span",{className:"graph-subtitle",children:"Time series sampled directly from symplectic Velocity Verlet integration"})]}),h.jsxs("div",{className:"graph-metric-tabs",children:[h.jsx("button",{className:`metric-tab-btn ${s==="distance"?"active":""}`,onClick:()=>r("distance"),children:"Distance (r)"}),h.jsx("button",{className:`metric-tab-btn ${s==="speed"?"active":""}`,onClick:()=>r("speed"),children:"Velocity (v)"}),h.jsx("button",{className:`metric-tab-btn ${s==="force"?"active":""}`,onClick:()=>r("force"),children:"Force (Fg)"}),h.jsx("button",{className:`metric-tab-btn ${s==="energy"?"active":""}`,onClick:()=>r("energy"),children:"Energy (K, U, E)"})]})]}),h.jsx("div",{className:"graph-svg-wrapper",children:h.jsxs("svg",{viewBox:`0 0 ${b} ${w}`,className:"telemetry-chart-svg",children:[[0,.25,.5,.75,1].map((F,W)=>{const se=A+I*(1-F),q=m+F*(u-m);return h.jsxs("g",{children:[h.jsx("line",{x1:E,y1:se,x2:E+y,y2:se,stroke:P,strokeWidth:"1"}),h.jsx("text",{x:E-8,y:se+3.5,textAnchor:"end",fontSize:"9.5",fill:j,fontFamily:"monospace",children:o.formatY(q)})]},W)}),[0,.33,.66,1].map((F,W)=>{const se=E+y*F,q=g+F*(f-g);return h.jsxs("g",{children:[h.jsx("line",{x1:se,y1:A,x2:se,y2:A+I,stroke:P,strokeWidth:"1"}),h.jsxs("text",{x:se,y:A+I+16,textAnchor:"middle",fontSize:"9.5",fill:j,fontFamily:"monospace",children:[q.toFixed(1)," d"]})]},W)}),h.jsx("line",{x1:E,y1:A,x2:E,y2:A+I,stroke:Y,strokeWidth:"1.5"}),h.jsx("line",{x1:E,y1:A+I,x2:E+y,y2:A+I,stroke:Y,strokeWidth:"1.5"}),s==="energy"?h.jsxs(h.Fragment,{children:[h.jsx("path",{d:O(F=>F.kineticJ),fill:"none",stroke:"#10b981",strokeWidth:"1.8"}),h.jsx("path",{d:O(F=>F.potentialJ),fill:"none",stroke:"#ef4444",strokeWidth:"1.8"}),h.jsx("path",{d:O(F=>F.totalEnergyJ),fill:"none",stroke:"#06b6d4",strokeWidth:"2.2",strokeDasharray:"4 2"})]}):h.jsx("path",{d:O(o.getValue),fill:"none",stroke:o.color,strokeWidth:"2"})]})}),h.jsx("div",{className:"graph-footer-info",children:s==="energy"?h.jsxs("div",{className:"energy-legend-row",children:[h.jsxs("div",{className:"legend-item",children:[h.jsx("span",{className:"legend-line",style:{background:"#10b981"}}),h.jsx("span",{children:"Kinetic Energy (K = ½mv²)"})]}),h.jsxs("div",{className:"legend-item",children:[h.jsx("span",{className:"legend-line",style:{background:"#ef4444"}}),h.jsx("span",{children:"Potential Energy (U = -GMm/r)"})]}),h.jsxs("div",{className:"legend-item",children:[h.jsx("span",{className:"legend-line dashed",style:{background:"#06b6d4"}}),h.jsx("span",{children:"Total Energy (E = K + U)"})]}),h.jsxs("div",{className:"energy-drift-badge",children:[h.jsx("span",{children:"Energy Drift: "}),h.jsxs("strong",{className:"mono",children:[d.toFixed(4),"%"]}),h.jsx("span",{className:"drift-note",children:" (Diagnostic accuracy check)"})]})]}):h.jsxs("div",{className:"single-legend-row",children:[h.jsxs("span",{className:"current-val-pill",children:["Latest: ",h.jsx("strong",{className:"mono",children:o.formatY(o.getValue(l))})]}),h.jsxs("span",{className:"graph-time-span",children:["Time Window: ",(f-g).toFixed(1)," days (",((f-g)/365.25).toFixed(2)," yr)"]})]})})]})}function Yl({bodies:i,gravityMultiplier:e=1}){const[t,n]=ce.useState("sun"),[s,r]=ce.useState("earth"),a=i.find(l=>l.id===t)||i[0],o=i.find(l=>l.id===s)||i[3]||i[1],c=jl(a,o,e);return h.jsxs("div",{className:"two-body-force-card",children:[h.jsxs("div",{className:"card-header",children:[h.jsx("h3",{children:"Gravitational Force Pair Visualizer"}),h.jsx("span",{className:"card-subtitle",children:"Newton's Law of Universal Gravitation: F = G · (m₁ · m₂) / r²"})]}),h.jsxs("div",{className:"force-selectors-row",children:[h.jsxs("div",{className:"selector-field",children:[h.jsx("label",{htmlFor:"body-a-select",children:"Body A (Source/Attractor):"}),h.jsx("select",{id:"body-a-select",value:t,onChange:l=>n(l.target.value),className:"body-dropdown",children:i.map(l=>h.jsxs("option",{value:l.id,children:[l.name," (",l.isSun?"Star":l.type||"Planet",")"]},l.id))})]}),h.jsx("div",{className:"mutual-force-badge",children:h.jsx("span",{children:"⇄ Equal & Opposite Forces (Newton's 3rd Law)"})}),h.jsxs("div",{className:"selector-field",children:[h.jsx("label",{htmlFor:"body-b-select",children:"Body B (Interacting Object):"}),h.jsx("select",{id:"body-b-select",value:s,onChange:l=>r(l.target.value),className:"body-dropdown",children:i.map(l=>h.jsxs("option",{value:l.id,children:[l.name," (",l.isSun?"Star":l.type||"Planet",")"]},l.id))})]})]}),h.jsxs("div",{className:"force-metrics-grid",children:[h.jsxs("div",{className:"force-stat-box",children:[h.jsx("span",{className:"stat-title",children:"Separation Distance (r)"}),h.jsxs("strong",{className:"stat-val mono",children:[c.distanceAU.toFixed(3)," AU"]}),h.jsxs("span",{className:"stat-sub",children:["(",(c.distanceKm/1e6).toFixed(2)," Million km)"]})]}),h.jsxs("div",{className:"force-stat-box highlight",children:[h.jsx("span",{className:"stat-title",children:"Gravitational Force (F)"}),h.jsxs("strong",{className:"stat-val mono",children:[c.forceNewtons.toExponential(4)," N"]}),h.jsx("span",{className:"stat-sub",children:"Mutual attraction acting along center-line"})]}),h.jsxs("div",{className:"force-stat-box",children:[h.jsxs("span",{className:"stat-title",children:["Acceleration on ",a.name]}),h.jsxs("strong",{className:"stat-val mono",children:[c.accelAMs2.toExponential(3)," m/s²"]}),h.jsxs("span",{className:"stat-sub",children:["Mass: ",a.mass.toExponential(2)," kg"]})]}),h.jsxs("div",{className:"force-stat-box",children:[h.jsxs("span",{className:"stat-title",children:["Acceleration on ",o.name]}),h.jsxs("strong",{className:"stat-val mono",children:[c.accelBMs2.toExponential(3)," m/s²"]}),h.jsxs("span",{className:"stat-sub",children:["Mass: ",o.mass.toExponential(2)," kg"]})]})]}),h.jsxs("div",{className:"force-explanation-note",children:[h.jsx("strong",{children:"Physics Principle:"})," Even though the Sun and a planet exert identical gravitational force magnitudes on one another (|F_AB| = |F_BA|), the resulting acceleration of the Sun is tiny because a_Sun = F / M_Sun, whereas the planet experiences a vastly higher acceleration a_planet = F / m_planet."]})]})}function Kl({onApplyExperiment:i,onAddCustomBody:e,onRemoveCustomBody:t,customBodies:n=[],activeExperimentId:s}){const[r,a]=ce.useState("Planet X"),[o,c]=ce.useState(597e22),[l,d]=ce.useState(2.7),[g,f]=ce.useState(18),[p,x]=ce.useState(45),[S,m]=ce.useState(!1),[u,b]=ce.useState("#ec4899"),w=[{id:"escape_velocity",title:"Experiment 1: Hyperbolic Escape Trajectory",tag:"Kinematics & Escape Velocity",description:"Increase Earth's orbital velocity to 1.45× circular speed (exceeding √2 ≈ 1.414). Observe the eccentricity exceed 1.0 as Earth breaks free of the Sun's gravitational well and escapes into interstellar space.",actionLabel:"Launch Escape Trajectory",setup:{gravityMultiplier:1,selectedPlanetId:"earth",planetOverrides:{earth:{velocityMultiplier:1.45,massMultiplier:1}},allowSunMotion:!1,isolatePlanetId:null}},{id:"weak_gravity",title:"Experiment 2: Weakened Gravitational Constant",tag:"Universal Gravitation",description:"Reduce the universal gravitational constant G to 0.35×. Observe how weakening the central attraction causes all planetary orbits to expand dramatically into wider, slower elliptical paths.",actionLabel:"Apply Weak Gravity (0.35x)",setup:{gravityMultiplier:.35,planetOverrides:{},allowSunMotion:!1,isolatePlanetId:null}},{id:"strong_gravity",title:"Experiment 3: Supercharged Gravitational Attraction",tag:"Universal Gravitation",description:"Increase gravitational strength G to 2.2×. Observe the planets plunge inward towards the Sun, accelerating to extreme orbital velocities to supply the immense required centripetal force.",actionLabel:"Apply Strong Gravity (2.2x)",setup:{gravityMultiplier:2.2,planetOverrides:{},allowSunMotion:!1,isolatePlanetId:null}},{id:"massive_earth",title:"Experiment 4: Super-Earth Gravitational Perturbation",tag:"Multi-Body Perturbations",description:"Scale Earth's mass to 500× actual mass (approaching Jupiter's scale). Observe how mutual multi-body gravitational forces perturb the orbital paths of nearby Venus and Mars over time.",actionLabel:"Set Earth to 500x Mass",setup:{gravityMultiplier:1,selectedPlanetId:"earth",planetOverrides:{earth:{massMultiplier:500,velocityMultiplier:1}},allowSunMotion:!1,isolatePlanetId:null}},{id:"slow_mars",title:"Experiment 5: Orbital Velocity Reduction on Mars",tag:"Orbital Eccentricity",description:"Cut Mars's orbital velocity to 0.65× normal. Because velocity is insufficient for circular equilibrium, Mars drops into a highly eccentric orbit whose perihelion dives inside Earth's orbit close to the Sun.",actionLabel:"Decelerate Mars to 0.65x",setup:{gravityMultiplier:1,selectedPlanetId:"mars",planetOverrides:{mars:{velocityMultiplier:.65,massMultiplier:1}},allowSunMotion:!1,isolatePlanetId:null}},{id:"two_body_barycenter",title:"Experiment 6: Two-Body Binary Barycenter (Sun + Jupiter)",tag:"Two-Body Problem",description:"Isolate the Sun and Jupiter. Rather than holding the Sun stationary, both massive bodies orbit their mutual center of mass (barycenter), which lies just outside the Sun's physical radius.",actionLabel:"Run Isolated Two-Body System",setup:{gravityMultiplier:1,selectedPlanetId:"jupiter",isolatePlanetId:"jupiter",allowSunMotion:!0,planetOverrides:{}}}],E=R=>{R.preventDefault();const A={id:`custom_${Date.now()}`,name:r||"Custom Planet",mass:Number(o)||597e22,distanceAU:Number(l)||2.5,speedKmS:Number(g)||20,angleDeg:Number(p)||0,isRetrograde:!!S,color:u,radiusKm:6e3,displayRadius:6};e(A)};return h.jsxs("div",{className:"solar-experiments-container",children:[h.jsxs("div",{className:"experiments-intro",children:[h.jsx("h2",{children:"Gravitational Physics Laboratory Experiments"}),h.jsx("p",{children:"Select a pre-configured physical experiment to observe how altering fundamental constants, initial velocities, or celestial masses impacts the orbital stability of the solar system."})]}),h.jsx("div",{className:"experiments-cards-grid",children:w.map(R=>h.jsxs("div",{className:`experiment-card ${s===R.id?"active":""}`,children:[h.jsxs("div",{className:"exp-card-header",children:[h.jsx("span",{className:"exp-tag",children:R.tag}),h.jsx("h3",{children:R.title})]}),h.jsx("p",{className:"exp-desc",children:R.description}),h.jsxs("button",{className:"primary-btn exp-btn",onClick:()=>i(R),children:[h.jsx(Jt,{name:"atom",size:15}),h.jsx("span",{children:R.actionLabel})]})]},R.id))}),h.jsxs("div",{className:"custom-body-section",children:[h.jsxs("div",{className:"section-head",children:[h.jsx("span",{className:"exp-tag",children:"Experiment 7: Custom Body Simulation"}),h.jsx("h3",{children:"Add a Hypothetical Celestial Body"}),h.jsx("p",{children:"Inject a custom planet or asteroid with arbitrary mass, initial distance, speed, and inclination. The new body will fully participate in all N-body gravitational equations."})]}),h.jsxs("form",{className:"custom-body-form",onSubmit:E,children:[h.jsxs("div",{className:"form-grid",children:[h.jsxs("div",{className:"form-group",children:[h.jsx("label",{children:"Body Name:"}),h.jsx("input",{type:"text",value:r,onChange:R=>a(R.target.value),className:"input-text",placeholder:"e.g. Planet Nine",required:!0})]}),h.jsxs("div",{className:"form-group",children:[h.jsx("label",{children:"Mass (kg):"}),h.jsx("input",{type:"number",value:o,onChange:R=>c(R.target.value),step:"any",className:"input-text mono",required:!0}),h.jsx("span",{className:"input-hint",children:"Earth = 5.97e24 kg"})]}),h.jsxs("div",{className:"form-group",children:[h.jsx("label",{children:"Initial Distance (AU):"}),h.jsx("input",{type:"number",value:l,onChange:R=>d(R.target.value),step:"0.1",min:"0.2",max:"40",className:"input-text mono",required:!0})]}),h.jsxs("div",{className:"form-group",children:[h.jsx("label",{children:"Orbital Speed (km/s):"}),h.jsx("input",{type:"number",value:g,onChange:R=>f(R.target.value),step:"0.5",min:"1",max:"80",className:"input-text mono",required:!0}),h.jsx("span",{className:"input-hint",children:"Circular ~29.8 / √r km/s"})]}),h.jsxs("div",{className:"form-group",children:[h.jsx("label",{children:"Position Angle (°):"}),h.jsx("input",{type:"number",value:p,onChange:R=>x(R.target.value),min:"0",max:"360",className:"input-text mono"})]}),h.jsx("div",{className:"form-group checkbox-group",children:h.jsxs("label",{className:"toggle-label",children:[h.jsx("input",{type:"checkbox",checked:S,onChange:R=>m(R.target.checked)}),h.jsx("span",{children:"Retrograde Orbit (Clockwise)"})]})})]}),h.jsx("div",{className:"form-actions-row",children:h.jsx("button",{type:"submit",className:"primary-btn",children:h.jsx("span",{children:"+ Inject Celestial Body into System"})})})]}),n.length>0&&h.jsxs("div",{className:"custom-bodies-list",children:[h.jsxs("h4",{children:["Active Hypothetical Bodies (",n.length,"):"]}),h.jsx("div",{className:"custom-pills-row",children:n.map(R=>h.jsxs("div",{className:"custom-body-pill",children:[h.jsx("span",{className:"color-dot",style:{backgroundColor:R.color}}),h.jsx("strong",{children:R.name}),h.jsxs("span",{className:"mono",children:["(",R.distanceAU," AU, ",R.speedKmS," km/s)"]}),h.jsx("button",{className:"remove-pill-btn",onClick:()=>t(R.id),title:"Remove this custom body",children:"×"})]},R.id))})]})]})]})}function $l({selectedPlanet:i,detailedMetrics:e}){if(!i||!e)return null;const t=e.totalEnergyJoules<0,n=e.speedKmS>=e.escapeVelocityKmS;return h.jsxs("div",{className:"mechanics-info-card",children:[h.jsxs("div",{className:"card-header",children:[h.jsx("h3",{children:"Orbital Mechanics Analysis & Analytical Comparison"}),h.jsxs("span",{className:"card-subtitle",children:["Comparing ideal Keplerian two-body theory with instantaneous N-body numerical state for"," ",h.jsx("strong",{children:i.name})]})]}),h.jsxs("table",{className:"comparison-table",children:[h.jsx("thead",{children:h.jsxs("tr",{children:[h.jsx("th",{children:"Physical Quantity"}),h.jsx("th",{children:"Governing Formula"}),h.jsx("th",{children:"Theoretical Keplerian Value"}),h.jsx("th",{children:"Live Simulated Value"})]})}),h.jsxs("tbody",{children:[h.jsxs("tr",{children:[h.jsx("td",{children:h.jsx("strong",{children:"Circular Velocity (v_c)"})}),h.jsx("td",{className:"mono",children:"v_c = √(G·M / r)"}),h.jsxs("td",{className:"mono",children:[e.circularSpeedKmS.toFixed(2)," km/s"]}),h.jsxs("td",{className:"mono highlight",children:[e.speedKmS.toFixed(2)," km/s"]})]}),h.jsxs("tr",{children:[h.jsx("td",{children:h.jsx("strong",{children:"Escape Velocity (v_esc)"})}),h.jsx("td",{className:"mono",children:"v_esc = √2 · v_c"}),h.jsxs("td",{className:"mono",children:[e.escapeVelocityKmS.toFixed(2)," km/s"]}),h.jsx("td",{children:h.jsx("span",{className:`status-badge ${n?"escape":"bound"}`,children:n?"Trajectory Escaping":"Gravitationally Bound"})})]}),h.jsxs("tr",{children:[h.jsx("td",{children:h.jsx("strong",{children:"Orbital Period (T)"})}),h.jsx("td",{className:"mono",children:"T² = (4π² / GM) · a³"}),h.jsx("td",{className:"mono",children:i.orbitalPeriodYears?`${i.orbitalPeriodYears.toFixed(3)} yr`:"—"}),h.jsx("td",{className:"mono",children:e.theoreticalPeriodYears!==1/0?`${e.theoreticalPeriodYears.toFixed(3)} yr (${e.theoreticalPeriodDays.toFixed(1)} d)`:"Parabolic / Infinite"})]}),h.jsxs("tr",{children:[h.jsx("td",{children:h.jsx("strong",{children:"Specific Energy (ε)"})}),h.jsx("td",{className:"mono",children:"ε = v²/2 − GM/r"}),h.jsx("td",{className:"mono",children:t?"Negative (Bound Ellipse)":"Non-Negative (Unbound / Hyperbolic)"}),h.jsxs("td",{className:"mono",children:[(e.specificEnergy/1e6).toFixed(2)," MJ/kg"]})]}),h.jsxs("tr",{children:[h.jsx("td",{children:h.jsx("strong",{children:"Orbital Eccentricity (e)"})}),h.jsx("td",{className:"mono",children:"e = √(1 + 2εh² / (GM)²)"}),h.jsx("td",{className:"mono",children:i.eccentricity!==void 0?i.eccentricity.toFixed(4):"—"}),h.jsxs("td",{className:"mono highlight",children:[e.eccentricity.toFixed(4),e.eccentricity<.05?" (Nearly Circular)":e.eccentricity<1?" (Elliptical)":" (Hyperbolic Escape)"]})]}),h.jsxs("tr",{children:[h.jsx("td",{children:h.jsx("strong",{children:"Specific Angular Momentum (h)"})}),h.jsx("td",{className:"mono",children:"h = |r × v|"}),h.jsx("td",{className:"mono",children:"Conserved (Kepler\\'s 2nd Law)"}),h.jsxs("td",{className:"mono",children:[(Math.abs(e.specificAngularMomentum)/1e15).toFixed(3)," × 10¹⁵ m²/s"]})]})]})]}),h.jsx("div",{className:"mechanics-notes",children:h.jsxs("p",{children:[h.jsx("strong",{children:"Scientific Note on Multi-Body Gravitation:"})," In ideal two-body problem (Keplerian orbits), energy ε and angular momentum h are strictly constant, and orbits trace closed ellipses. In full N-body simulations, gravitational tugs from massive planets (especially Jupiter and Saturn) introduce small oscillations in eccentricity, semi-major axis, and orbital inclination (orbital resonance and precession)."]})})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="187",Zl=0,Ja=1,Jl=2,Ns=1,Ql=2,Hi=3,si=0,Yt=1,un=2,Ti=0,Vi=1,Fr=2,Qa=3,eo=4,ec=5,yi=100,tc=101,nc=102,ic=103,sc=104,rc=200,ac=201,oc=202,lc=203,il=204,sl=205,cc=206,dc=207,uc=208,hc=209,fc=210,pc=211,mc=212,gc=213,_c=214,Or=0,Br=1,Gr=2,ji=3,zr=4,Hr=5,kr=6,Vr=7,rl=0,xc=1,vc=2,In=0,al=1,ol=2,ll=3,Pa=4,cl=5,dl=6,ul=7,hl=300,Ri=301,qi=302,tr=303,nr=304,Bs=1e3,vn=1001,Wr=1002,Ot=1003,Mc=1004,ss=1005,Kt=1006,ir=1007,Xn=1008,Qt=1009,fl=1010,pl=1011,Yi=1012,Na=1013,Tn=1014,Mn=1015,An=1016,La=1017,Da=1018,wi=1020,ml=35902,gl=35899,_l=1021,xl=1022,Sn=1023,qn=1026,jn=1027,vl=1028,Ia=1029,ri=1030,Ua=1031,Fa=1033,Ls=33776,Ds=33777,Is=33778,Us=33779,Xr=35840,jr=35841,qr=35842,Yr=35843,Kr=36196,$r=37492,Zr=37496,Jr=37488,Qr=37489,Gs=37490,ea=37491,ta=37808,na=37809,ia=37810,sa=37811,ra=37812,aa=37813,oa=37814,la=37815,ca=37816,da=37817,ua=37818,ha=37819,fa=37820,pa=37821,ma=36492,ga=36494,_a=36495,xa=36283,va=36284,zs=36285,Ma=36286,Sc=3200,Sa=0,yc=1,Wn="",nn="srgb",Hs="srgb-linear",ks="linear",vt="srgb",sr=7680,Ec=519,bc=512,Tc=513,Ac=514,Ml=515,Rc=516,wc=517,Sl=518,yl=519,Cc=35044,to="300 es",fn=2e3,Ki=2001;function Pc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Nc(){const i=Vs("canvas");return i.style.display="block",i}const no={};function io(...i){const e="THREE."+i.shift();console.log(e,...i)}function El(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function je(...i){i=El(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function pt(...i){i=El(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Fs(...i){const e=i.join(" ");e in no||(no[e]=!0,je(...i))}function Lc(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Dc={[Or]:Or,[Gr]:kr,[zr]:zr,[ji]:Hr,[Br]:Br,[kr]:Gr,[Vr]:Vr,[Hr]:ji};class oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rr=Math.PI/180,ya=180/Math.PI;function Zi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function lt(i,e,t){return Math.max(e,Math.min(t,i))}function Ic(i,e){return(i%e+e)%e}function ar(i,e,t){return(1-t)*i+t*e}function Uc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Oa(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Fc(i,e){if(e.constructor===Float32Array)return i;const t=Oa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Oc(i,e){if(e.constructor===Float32Array)return i;const t=Oa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const Wa=class Wa{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Wa.prototype.isVector2=!0;let nt=Wa;class Ni{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],g=n[s+3],f=r[a+0],p=r[a+1],x=r[a+2],S=r[a+3];if(g!==S||c!==f||l!==p||d!==x){let m=c*f+l*p+d*x+g*S;m<0&&(f=-f,p=-p,x=-x,S=-S,m=-m);let u=1-o;if(m<.9995){const b=Math.acos(m),w=Math.sin(b);u=Math.sin(u*b)/w,o=Math.sin(o*b)/w,c=c*u+f*o,l=l*u+p*o,d=d*u+x*o,g=g*u+S*o}else{c=c*u+f*o,l=l*u+p*o,d=d*u+x*o,g=g*u+S*o;const b=1/Math.sqrt(c*c+l*l+d*d+g*g);c*=b,l*=b,d*=b,g*=b}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=g}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],g=r[a],f=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+d*g+c*p-l*f,e[t+1]=c*x+d*f+l*g-o*p,e[t+2]=l*x+d*p+o*f-c*g,e[t+3]=d*x-o*g-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),g=o(r/2),f=c(n/2),p=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=f*d*g+l*p*x,this._y=l*p*g-f*d*x,this._z=l*d*x+f*p*g,this._w=l*d*g-f*p*x;break;case"YXZ":this._x=f*d*g+l*p*x,this._y=l*p*g-f*d*x,this._z=l*d*x-f*p*g,this._w=l*d*g+f*p*x;break;case"ZXY":this._x=f*d*g-l*p*x,this._y=l*p*g+f*d*x,this._z=l*d*x+f*p*g,this._w=l*d*g-f*p*x;break;case"ZYX":this._x=f*d*g-l*p*x,this._y=l*p*g+f*d*x,this._z=l*d*x-f*p*g,this._w=l*d*g+f*p*x;break;case"YZX":this._x=f*d*g+l*p*x,this._y=l*p*g+f*d*x,this._z=l*d*x-f*p*g,this._w=l*d*g-f*p*x;break;case"XZY":this._x=f*d*g-l*p*x,this._y=l*p*g-f*d*x,this._z=l*d*x+f*p*g,this._w=l*d*g+f*p*x;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],g=t[10],f=n+o+g;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>g){const p=2*Math.sqrt(1+n-o-g);this._w=(d-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>g){const p=2*Math.sqrt(1+o-n-g);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+g-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Xa=class Xa{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(so.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(so.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),d=2*(o*t-r*s),g=2*(r*n-a*t);return this.x=t+c*l+a*g-o*d,this.y=n+c*d+o*l-r*g,this.z=s+c*g+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return or.copy(this).projectOnVector(e),this.sub(or)}reflect(e){return this.sub(or.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Xa.prototype.isVector3=!0;let H=Xa;const or=new H,so=new Ni,ja=class ja{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],g=n[7],f=n[2],p=n[5],x=n[8],S=s[0],m=s[3],u=s[6],b=s[1],w=s[4],E=s[7],R=s[2],A=s[5],_=s[8];return r[0]=a*S+o*b+c*R,r[3]=a*m+o*w+c*A,r[6]=a*u+o*E+c*_,r[1]=l*S+d*b+g*R,r[4]=l*m+d*w+g*A,r[7]=l*u+d*E+g*_,r[2]=f*S+p*b+x*R,r[5]=f*m+p*w+x*A,r[8]=f*u+p*E+x*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],g=d*a-o*l,f=o*c-d*r,p=l*r-a*c,x=t*g+n*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=g*S,e[1]=(s*l-d*n)*S,e[2]=(o*n-s*a)*S,e[3]=f*S,e[4]=(d*t-s*c)*S,e[5]=(s*r-o*t)*S,e[6]=p*S,e[7]=(n*c-l*t)*S,e[8]=(a*t-n*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Fs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(lr.makeScale(e,t)),this}rotate(e){return Fs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(lr.makeRotation(-e)),this}translate(e,t){return Fs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(lr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ja.prototype.isMatrix3=!0;let qe=ja;const lr=new qe,ro=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ao=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bc(){const i={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?ks:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Hs]:{primaries:e,whitePoint:n,transfer:ks,toXYZ:ro,fromXYZ:ao,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:ro,fromXYZ:ao,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}const ot=Bc();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ai(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let di;class Gc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{di===void 0&&(di=Vs("canvas")),di.width=e.width,di.height=e.height;const s=di.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=di}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Un(t[n]/255)*255):t[n]=Un(t[n]);return{data:t,width:e.width,height:e.height}}else return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zc=0;class Ba{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:zc++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cr(s[a].image)):r.push(cr(s[a]))}else r=cr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function cr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}let Hc=0;const dr=new H;class Wt extends oi{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,n=vn,s=vn,r=Kt,a=Xn,o=Sn,c=Qt,l=Wt.DEFAULT_ANISOTROPY,d=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hc++}),this.uuid=Zi(),this.name="",this.source=new Ba(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(dr).x}get height(){return this.source.getSize(dr).y}get depth(){return this.source.getSize(dr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){je(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case Wr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case Wr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=hl;Wt.DEFAULT_ANISOTROPY=1;const qa=class qa{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],d=c[4],g=c[8],f=c[1],p=c[5],x=c[9],S=c[2],m=c[6],u=c[10];if(Math.abs(d-f)<.01&&Math.abs(g-S)<.01&&Math.abs(x-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(g+S)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,E=(p+1)/2,R=(u+1)/2,A=(d+f)/4,_=(g+S)/4,y=(x+m)/4;return w>E&&w>R?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=A/n,r=_/n):E>R?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=A/s,r=y/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=_/r,s=y/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-x)*(m-x)+(g-S)*(g-S)+(f-d)*(f-d));return Math.abs(b)<.001&&(b=1),this.x=(m-x)/b,this.y=(g-S)/b,this.z=(f-d)/b,this.w=Math.acos((l+p+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};qa.prototype.isVector4=!0;let Tt=qa;class kc extends oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Wt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ba(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends kc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class bl extends Wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vc extends Wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Ys=class Ys{constructor(e,t,n,s,r,a,o,c,l,d,g,f,p,x,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,d,g,f,p,x,S,m)}set(e,t,n,s,r,a,o,c,l,d,g,f,p,x,S,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=d,u[10]=g,u[14]=f,u[3]=p,u[7]=x,u[11]=S,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ys().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ui.setFromMatrixColumn(e,0).length(),r=1/ui.setFromMatrixColumn(e,1).length(),a=1/ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),g=Math.sin(r);if(e.order==="XYZ"){const f=a*d,p=a*g,x=o*d,S=o*g;t[0]=c*d,t[4]=-c*g,t[8]=l,t[1]=p+x*l,t[5]=f-S*l,t[9]=-o*c,t[2]=S-f*l,t[6]=x+p*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*d,p=c*g,x=l*d,S=l*g;t[0]=f+S*o,t[4]=x*o-p,t[8]=a*l,t[1]=a*g,t[5]=a*d,t[9]=-o,t[2]=p*o-x,t[6]=S+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*d,p=c*g,x=l*d,S=l*g;t[0]=f-S*o,t[4]=-a*g,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*d,t[9]=S-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*d,p=a*g,x=o*d,S=o*g;t[0]=c*d,t[4]=x*l-p,t[8]=f*l+S,t[1]=c*g,t[5]=S*l+f,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,p=a*l,x=o*c,S=o*l;t[0]=c*d,t[4]=S-f*g,t[8]=x*g+p,t[1]=g,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*g+x,t[10]=f-S*g}else if(e.order==="XZY"){const f=a*c,p=a*l,x=o*c,S=o*l;t[0]=c*d,t[4]=-g,t[8]=l*d,t[1]=f*g+S,t[5]=a*d,t[9]=p*g-x,t[2]=x*g-p,t[6]=o*d,t[10]=S*g+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wc,e,Xc)}lookAt(e,t,n){const s=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Bn.crossVectors(n,$t),Bn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Bn.crossVectors(n,$t)),Bn.normalize(),rs.crossVectors($t,Bn),s[0]=Bn.x,s[4]=rs.x,s[8]=$t.x,s[1]=Bn.y,s[5]=rs.y,s[9]=$t.y,s[2]=Bn.z,s[6]=rs.z,s[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],g=n[5],f=n[9],p=n[13],x=n[2],S=n[6],m=n[10],u=n[14],b=n[3],w=n[7],E=n[11],R=n[15],A=s[0],_=s[4],y=s[8],I=s[12],N=s[1],U=s[5],O=s[9],Y=s[13],P=s[2],j=s[6],F=s[10],W=s[14],se=s[3],q=s[7],te=s[11],ae=s[15];return r[0]=a*A+o*N+c*P+l*se,r[4]=a*_+o*U+c*j+l*q,r[8]=a*y+o*O+c*F+l*te,r[12]=a*I+o*Y+c*W+l*ae,r[1]=d*A+g*N+f*P+p*se,r[5]=d*_+g*U+f*j+p*q,r[9]=d*y+g*O+f*F+p*te,r[13]=d*I+g*Y+f*W+p*ae,r[2]=x*A+S*N+m*P+u*se,r[6]=x*_+S*U+m*j+u*q,r[10]=x*y+S*O+m*F+u*te,r[14]=x*I+S*Y+m*W+u*ae,r[3]=b*A+w*N+E*P+R*se,r[7]=b*_+w*U+E*j+R*q,r[11]=b*y+w*O+E*F+R*te,r[15]=b*I+w*Y+E*W+R*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],g=e[6],f=e[10],p=e[14],x=e[3],S=e[7],m=e[11],u=e[15],b=c*p-l*f,w=o*p-l*g,E=o*f-c*g,R=a*p-l*d,A=a*f-c*d,_=a*g-o*d;return t*(S*b-m*w+u*E)-n*(x*b-m*R+u*A)+s*(x*w-S*R+u*_)-r*(x*E-S*A+m*_)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-n*(r*d-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],g=e[9],f=e[10],p=e[11],x=e[12],S=e[13],m=e[14],u=e[15],b=t*o-n*a,w=t*c-s*a,E=t*l-r*a,R=n*c-s*o,A=n*l-r*o,_=s*l-r*c,y=d*S-g*x,I=d*m-f*x,N=d*u-p*x,U=g*m-f*S,O=g*u-p*S,Y=f*u-p*m,P=b*Y-w*O+E*U+R*N-A*I+_*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/P;return e[0]=(o*Y-c*O+l*U)*j,e[1]=(s*O-n*Y-r*U)*j,e[2]=(S*_-m*A+u*R)*j,e[3]=(f*A-g*_-p*R)*j,e[4]=(c*N-a*Y-l*I)*j,e[5]=(t*Y-s*N+r*I)*j,e[6]=(m*E-x*_-u*w)*j,e[7]=(d*_-f*E+p*w)*j,e[8]=(a*O-o*N+l*y)*j,e[9]=(n*N-t*O-r*y)*j,e[10]=(x*A-S*E+u*b)*j,e[11]=(g*E-d*A-p*b)*j,e[12]=(o*I-a*U-c*y)*j,e[13]=(t*U-n*I+s*y)*j,e[14]=(S*w-x*R-m*b)*j,e[15]=(d*R-g*w+f*b)*j,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,g=o+o,f=r*l,p=r*d,x=r*g,S=a*d,m=a*g,u=o*g,b=c*l,w=c*d,E=c*g,R=n.x,A=n.y,_=n.z;return s[0]=(1-(S+u))*R,s[1]=(p+E)*R,s[2]=(x-w)*R,s[3]=0,s[4]=(p-E)*A,s[5]=(1-(f+u))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(x+w)*_,s[9]=(m-b)*_,s[10]=(1-(f+S))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ui.set(s[0],s[1],s[2]).length();const o=ui.set(s[4],s[5],s[6]).length(),c=ui.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ln.copy(this);const l=1/a,d=1/o,g=1/c;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=d,ln.elements[5]*=d,ln.elements[6]*=d,ln.elements[8]*=g,ln.elements[9]*=g,ln.elements[10]*=g,t.setFromRotationMatrix(ln),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=fn,c=!1){const l=this.elements,d=2*r/(t-e),g=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s);let x,S;if(c)x=r/(a-r),S=a*r/(a-r);else if(o===fn)x=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Ki)x=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=g,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=fn,c=!1){const l=this.elements,d=2/(t-e),g=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s);let x,S;if(c)x=1/(a-r),S=a/(a-r);else if(o===fn)x=-2/(a-r),S=-(a+r)/(a-r);else if(o===Ki)x=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=g,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ys.prototype.isMatrix4=!0;let yt=Ys;const ui=new H,ln=new yt,Wc=new H(0,0,0),Xc=new H(1,1,1),Bn=new H,rs=new H,$t=new H,oo=new yt,lo=new Ni;class Yn{constructor(e=0,t=0,n=0,s=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],g=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-g,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-lt(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return oo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(oo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lo.setFromEuler(this),this.setFromQuaternion(lo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class Ga{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jc=0;const co=new H,hi=new Ni,Cn=new yt,as=new H,Ii=new H,qc=new H,Yc=new Ni,uo=new H(1,0,0),ho=new H(0,1,0),fo=new H(0,0,1),po={type:"added"},Kc={type:"removed"},fi={type:"childadded",child:null},ur={type:"childremoved",child:null};class Bt extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jc++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new H,t=new Yn,n=new Ni,s=new H(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new yt},normalMatrix:{value:new qe}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(uo,e)}rotateY(e){return this.rotateOnAxis(ho,e)}rotateZ(e){return this.rotateOnAxis(fo,e)}translateOnAxis(e,t){return co.copy(e).applyQuaternion(this.quaternion),this.position.add(co.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(uo,e)}translateY(e){return this.translateOnAxis(ho,e)}translateZ(e){return this.translateOnAxis(fo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?as.copy(e):as.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ii.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(Ii,as,this.up):Cn.lookAt(as,Ii,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),hi.setFromRotationMatrix(Cn),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(pt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(po),fi.child=e,this.dispatchEvent(fi),fi.child=null):pt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kc),ur.child=e,this.dispatchEvent(ur),ur.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(po),fi.child=e,this.dispatchEvent(fi),fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,e,qc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,Yc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const g=c[l];r(e.shapes,g)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),g=a(e.shapes),f=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),g.length>0&&(n.shapes=g),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Bt.DEFAULT_UP=new H(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ei extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $c={type:"move"};class hr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,n),u=this._getHandJoint(l,S);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],f=d.position.distanceTo(g.position),p=.02,x=.005;l.inputState.pinching&&f>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($c)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ei;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Tl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},os={h:0,s:0,l:0};function fr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class tt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=Ic(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fr(a,r,e+1/3),this.g=fr(a,r,e),this.b=fr(a,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=nn){function n(r){r!==void 0&&parseFloat(r)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const n=Tl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Un(e.r),this.g=Un(e.g),this.b=Un(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return ot.workingToColorSpace(Vt.copy(this),e),Math.round(lt(Vt.r*255,0,255))*65536+Math.round(lt(Vt.g*255,0,255))*256+Math.round(lt(Vt.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Vt.copy(this),t);const n=Vt.r,s=Vt.g,r=Vt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const g=a-o;switch(l=d<=.5?g/(a+o):g/(2-a-o),a){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=nn){ot.workingToColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,s=Vt.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(os);const n=ar(Gn.h,os.h,t),s=ar(Gn.s,os.s,t),r=ar(Gn.l,os.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new tt;tt.NAMES=Tl;class Zc extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const cn=new H,Pn=new H,pr=new H,Nn=new H,pi=new H,mi=new H,mo=new H,mr=new H,gr=new H,_r=new H,xr=new Tt,vr=new Tt,Mr=new Tt;class hn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),cn.subVectors(e,t),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){cn.subVectors(s,t),Pn.subVectors(n,t),pr.subVectors(e,t);const a=cn.dot(cn),o=cn.dot(Pn),c=cn.dot(pr),l=Pn.dot(Pn),d=Pn.dot(pr),g=a*l-o*o;if(g===0)return r.set(0,0,0),null;const f=1/g,p=(l*c-o*d)*f,x=(a*d-o*c)*f;return r.set(1-p-x,x,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Nn.x),c.addScaledVector(a,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return xr.setScalar(0),vr.setScalar(0),Mr.setScalar(0),xr.fromBufferAttribute(e,t),vr.fromBufferAttribute(e,n),Mr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(xr,r.x),a.addScaledVector(vr,r.y),a.addScaledVector(Mr,r.z),a}static isFrontFacing(e,t,n,s){return cn.subVectors(n,t),Pn.subVectors(e,t),cn.cross(Pn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),cn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return hn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;pi.subVectors(s,n),mi.subVectors(r,n),mr.subVectors(e,n);const c=pi.dot(mr),l=mi.dot(mr);if(c<=0&&l<=0)return t.copy(n);gr.subVectors(e,s);const d=pi.dot(gr),g=mi.dot(gr);if(d>=0&&g<=d)return t.copy(s);const f=c*g-d*l;if(f<=0&&c>=0&&d<=0&&c-d>0)return a=c/(c-d),t.copy(n).addScaledVector(pi,a);_r.subVectors(e,r);const p=pi.dot(_r),x=mi.dot(_r);if(x>=0&&p<=x)return t.copy(r);const S=p*l-c*x;if(S<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(mi,o);const m=d*x-p*g;if(m<=0&&g-d>=0&&p-x>=0)return mo.subVectors(r,s),o=(g-d)/(g-d+(p-x)),t.copy(s).addScaledVector(mo,o);const u=1/(m+S+f);return a=S*u,o=f*u,t.copy(n).addScaledVector(pi,a).addScaledVector(mi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ji{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ls.copy(n.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),cs.subVectors(this.max,Ui),gi.subVectors(e.a,Ui),_i.subVectors(e.b,Ui),xi.subVectors(e.c,Ui),zn.subVectors(_i,gi),Hn.subVectors(xi,_i),ei.subVectors(gi,xi);let t=[0,-zn.z,zn.y,0,-Hn.z,Hn.y,0,-ei.z,ei.y,zn.z,0,-zn.x,Hn.z,0,-Hn.x,ei.z,0,-ei.x,-zn.y,zn.x,0,-Hn.y,Hn.x,0,-ei.y,ei.x,0];return!Sr(t,gi,_i,xi,cs)||(t=[1,0,0,0,1,0,0,0,1],!Sr(t,gi,_i,xi,cs))?!1:(ds.crossVectors(zn,Hn),t=[ds.x,ds.y,ds.z],Sr(t,gi,_i,xi,cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ln=[new H,new H,new H,new H,new H,new H,new H,new H],dn=new H,ls=new Ji,gi=new H,_i=new H,xi=new H,zn=new H,Hn=new H,ei=new H,Ui=new H,cs=new H,ds=new H,ti=new H;function Sr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),c=e.dot(ti),l=t.dot(ti),d=n.dot(ti);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Ct=new H,us=new nt;let Jc=0;class bn extends oi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jc++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Cc,this.updateRanges=[],this.gpuType=Mn,this.version=0,this._normalizationScale=e!==void 0?Oa(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)us.fromBufferAttribute(this,t),us.applyMatrix3(e),this.setXY(t,us.x,us.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Fc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Oc(e,this.array)}}class Al extends bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Rl extends bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Pt extends bn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Qc=new Ji,Fi=new H,yr=new H;class Qi{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Qc.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Fi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(yr)),this.expandByPoint(Fi.copy(e.center).sub(yr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ed=0;const tn=new yt,Er=new Bt,vi=new H,Zt=new Ji,Oi=new Ji,Ut=new H;class Xt extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pc(e)?Rl:Al)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,n){return tn.makeTranslation(e,t,n),this.applyMatrix4(tn),this}scale(e,t,n){return tn.makeScale(e,t,n),this.applyMatrix4(tn),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Zt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Oi.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(Zt.min,Oi.min),Zt.expandByPoint(Ut),Ut.addVectors(Zt.max,Oi.max),Zt.expandByPoint(Ut)):(Zt.expandByPoint(Oi.min),Zt.expandByPoint(Oi.max))}Zt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ut.fromBufferAttribute(o,l),c&&(vi.fromBufferAttribute(e,l),Ut.add(vi)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new bn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new H,c[I]=new H;const d=new H,g=new H,f=new H,p=new nt,x=new nt,S=new nt,m=new H,u=new H;function b(I,N,U){l[I]=l[N]=l[U]=1,d.fromBufferAttribute(n,I),g.fromBufferAttribute(n,N),f.fromBufferAttribute(n,U),p.fromBufferAttribute(r,I),x.fromBufferAttribute(r,N),S.fromBufferAttribute(r,U),g.sub(d),f.sub(d),x.sub(p),S.sub(p);const O=1/(x.x*S.y-S.x*x.y);isFinite(O)&&(m.copy(g).multiplyScalar(S.y).addScaledVector(f,-x.y).multiplyScalar(O),u.copy(f).multiplyScalar(x.x).addScaledVector(g,-S.x).multiplyScalar(O),o[I].add(m),o[N].add(m),o[U].add(m),c[I].add(u),c[N].add(u),c[U].add(u))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let I=0,N=w.length;I<N;++I){const U=w[I],O=U.start,Y=U.count;for(let P=O,j=O+Y;P<j;P+=3)b(e.getX(P+0),e.getX(P+1),e.getX(P+2))}const E=new H,R=new H,A=new H,_=new H;function y(I){A.fromBufferAttribute(s,I),_.copy(A);const N=o[I];E.copy(N),E.sub(A.multiplyScalar(A.dot(N))).normalize(),R.crossVectors(_,N);const O=R.dot(c[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,O)}for(let I=0,N=n.count;I<N;++I)l[I]&&y(I);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new H,r=new H,a=new H,o=new H,c=new H,l=new H,d=new H,g=new H;if(e)for(let f=0,p=e.count;f<p;f+=3){const x=e.getX(f+0),S=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),d.subVectors(a,r),g.subVectors(s,r),d.cross(g),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,S),l.fromBufferAttribute(n,m),o.add(d),c.add(d),l.add(d),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(S,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),g.subVectors(s,r),d.cross(g),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,g=o.normalized,f=new l.constructor(c.length*d);let p=0,x=0;for(let S=0,m=c.length;S<m;S++){o.isInterleavedBufferAttribute?p=c[S]*o.data.stride+o.offset:p=c[S]*d;for(let u=0;u<d;u++)f[x++]=l[p++]}return new bn(f,d,g)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,g=l.length;d<g;d++){const f=l[d],p=e(f,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let g=0,f=l.length;g<f;g++){const p=l[g];d.push(p.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],g=r[l];for(let f=0,p=g.length;f<p;f++)d.push(g[f].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const g=a[l];this.addGroup(g.start,g.count,g.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const br=new H,td=new H,nd=new qe;class Vn{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=br.subVectors(n,t).cross(td.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(br),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||nd.getNormalMatrix(e),s=this.coplanarPoint(br).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let id=0;class li extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Vi,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=il,this.blendDst=sl,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ec,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Vn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new nt().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new nt().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Dn=new H,Tr=new H,hs=new H,fs=new H;class $s{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Tr.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),fs.copy(this.origin).sub(Tr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(hs),o=fs.dot(this.direction),c=-fs.dot(hs),l=fs.lengthSq(),d=Math.abs(1-a*a);let g,f,p,x;if(d>0)if(g=a*c-o,f=a*o-c,x=r*d,g>=0)if(f>=-x)if(f<=x){const S=1/d;g*=S,f*=S,p=g*(g+a*f+2*o)+f*(a*g+f+2*c)+l}else f=r,g=Math.max(0,-(a*f+o)),p=-g*g+f*(f+2*c)+l;else f=-r,g=Math.max(0,-(a*f+o)),p=-g*g+f*(f+2*c)+l;else f<=-x?(g=Math.max(0,-(-a*r+o)),f=g>0?-r:Math.min(Math.max(-r,-c),r),p=-g*g+f*(f+2*c)+l):f<=x?(g=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(g=Math.max(0,-(a*r+o)),f=g>0?r:Math.min(Math.max(-r,-c),r),p=-g*g+f*(f+2*c)+l);else f=a>0?-r:r,g=Math.max(0,-(a*f+o)),p=-g*g+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Tr).addScaledVector(hs,f),p}intersectSphere(e,t){if(e.radius<0)return null;Dn.subVectors(e.center,this.origin);const n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,g=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),g>=0?(o=(e.min.z-f.z)*g,c=(e.max.z-f.z)*g):(o=(e.max.z-f.z)*g,c=(e.min.z-f.z)*g),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,d=o.z,g=e.x-a.x,f=e.y-a.y,p=e.z-a.z,x=t.x-a.x,S=t.y-a.y,m=t.z-a.z,u=n.x-a.x,b=n.y-a.y,w=n.z-a.z,E=Math.abs(c),R=Math.abs(l),A=Math.abs(d);let _,y,I,N,U,O,Y,P,j,F,W,se;if(E>=R&&E>=A?(I=c,O=g,j=x,se=u,c>=0?(_=l,y=d,N=f,U=p,Y=S,P=m,F=b,W=w):(_=d,y=l,N=p,U=f,Y=m,P=S,F=w,W=b)):R>=A?(I=l,O=f,j=S,se=b,l>=0?(_=d,y=c,N=p,U=g,Y=m,P=x,F=w,W=u):(_=c,y=d,N=g,U=p,Y=x,P=m,F=u,W=w)):(I=d,O=p,j=m,se=w,d>=0?(_=c,y=l,N=g,U=f,Y=x,P=S,F=u,W=b):(_=l,y=c,N=f,U=g,Y=S,P=x,F=b,W=u)),I===0)return null;const q=_/I,te=y/I,ae=1/I,we=N-q*O,Ve=U-te*O,ee=Y-q*j,_e=P-te*j,be=F-q*se,Le=W-te*se,ve=be*_e-Le*ee,Be=we*Le-Ve*be,Et=ee*Ve-_e*we;if(s){if(ve<0||Be<0||Et<0)return null}else if((ve<0||Be<0||Et<0)&&(ve>0||Be>0||Et>0))return null;const Ie=ve+Be+Et;if(Ie===0)return null;const it=ae*(ve*O+Be*j+Et*se);return(Ie>0?it<0:it>0)?null:this.at(it/Ie,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wi extends li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const go=new yt,ni=new $s,ps=new Qi,_o=new H,ms=new H,gs=new H,_s=new H,Ar=new H,xs=new H,xo=new H,vs=new H;class rn extends Bt{constructor(e=new Xt,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){xs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],g=r[c];d!==0&&(Ar.fromBufferAttribute(g,e),a?xs.addScaledVector(Ar,d):xs.addScaledVector(Ar.sub(t),d))}t.add(xs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(ps.containsPoint(ni.origin)===!1&&(ni.intersectSphere(ps,_o)===null||ni.origin.distanceToSquared(_o)>(e.far-e.near)**2))&&(go.copy(r).invert(),ni.copy(e.ray).applyMatrix4(go),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,g=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=f.length;x<S;x++){const m=f[x],u=a[m.materialIndex],b=Math.max(m.start,p.start),w=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=b,R=w;E<R;E+=3){const A=o.getX(E),_=o.getX(E+1),y=o.getX(E+2);s=Ms(this,u,e,n,l,d,g,A,_,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=x,u=S;m<u;m+=3){const b=o.getX(m),w=o.getX(m+1),E=o.getX(m+2);s=Ms(this,a,e,n,l,d,g,b,w,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,S=f.length;x<S;x++){const m=f[x],u=a[m.materialIndex],b=Math.max(m.start,p.start),w=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=b,R=w;E<R;E+=3){const A=E,_=E+1,y=E+2;s=Ms(this,u,e,n,l,d,g,A,_,y),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),S=Math.min(c.count,p.start+p.count);for(let m=x,u=S;m<u;m+=3){const b=m,w=m+1,E=m+2;s=Ms(this,a,e,n,l,d,g,b,w,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function sd(i,e,t,n,s,r,a,o){let c;if(e.side===Yt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===si,o),c===null)return null;vs.copy(o),vs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(vs);return l<t.near||l>t.far?null:{distance:l,point:vs.clone(),object:i}}function Ms(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ms),i.getVertexPosition(c,gs),i.getVertexPosition(l,_s);const d=sd(i,e,t,n,ms,gs,_s,xo);if(d){const g=new H;hn.getBarycoord(xo,ms,gs,_s,g),s&&(d.uv=hn.getInterpolatedAttribute(s,o,c,l,g,new nt)),r&&(d.uv1=hn.getInterpolatedAttribute(r,o,c,l,g,new nt)),a&&(d.normal=hn.getInterpolatedAttribute(a,o,c,l,g,new H),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new H,materialIndex:0};hn.getNormal(ms,gs,_s,f.normal),d.face=f,d.barycoord=g}return d}class rd extends Wt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Ot,d=Ot,g,f){super(null,a,o,c,l,d,s,r,g,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ii=new Qi,ad=new nt(.5,.5),Ss=new H;class $i{constructor(e=new Vn,t=new Vn,n=new Vn,s=new Vn,r=new Vn,a=new Vn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],g=r[5],f=r[6],p=r[7],x=r[8],S=r[9],m=r[10],u=r[11],b=r[12],w=r[13],E=r[14],R=r[15];if(s[0].setComponents(l-a,p-d,u-x,R-b).normalize(),s[1].setComponents(l+a,p+d,u+x,R+b).normalize(),s[2].setComponents(l+o,p+g,u+S,R+w).normalize(),s[3].setComponents(l-o,p-g,u-S,R-w).normalize(),n)s[4].setComponents(c,f,m,E).normalize(),s[5].setComponents(l-c,p-f,u-m,R-E).normalize();else if(s[4].setComponents(l-c,p-f,u-m,R-E).normalize(),t===fn)s[5].setComponents(l+c,p+f,u+m,R+E).normalize();else if(t===Ki)s[5].setComponents(c,f,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){ii.center.set(0,0,0);const t=ad.distanceTo(e.center);return ii.radius=.7071067811865476+t,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ss.x=s.normal.x>0?e.max.x:e.min.x,Ss.y=s.normal.y>0?e.max.y:e.min.y,Ss.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const vo=new yt;class za{constructor(){this.coordinateSystem=fn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];vo.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new $i),n[s].setFromProjectionMatrix(vo,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new $i),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new za().copy(this)}}class Ws extends li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xs=new H,js=new H,Mo=new yt,Bi=new $s,ys=new Qi,Rr=new H,So=new H;class Ea extends Bt{constructor(e=new Xt,t=new Ws){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Xs.fromBufferAttribute(t,s-1),js.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Xs.distanceTo(js);e.setAttribute("lineDistance",new Pt(n,1))}else je("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ys.copy(n.boundingSphere),ys.applyMatrix4(s),ys.radius+=r,e.ray.intersectsSphere(ys)===!1)return;Mo.copy(s).invert(),Bi.copy(e.ray).applyMatrix4(Mo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,f=n.attributes.position;if(d!==null){const p=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let S=p,m=x-1;S<m;S+=l){const u=d.getX(S),b=d.getX(S+1),w=Es(this,e,Bi,c,u,b,S);w&&t.push(w)}if(this.isLineLoop){const S=d.getX(x-1),m=d.getX(p),u=Es(this,e,Bi,c,S,m,x-1);u&&t.push(u)}}else{const p=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let S=p,m=x-1;S<m;S+=l){const u=Es(this,e,Bi,c,S,S+1,S);u&&t.push(u)}if(this.isLineLoop){const S=Es(this,e,Bi,c,x-1,p,x-1);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Es(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Xs.fromBufferAttribute(o,s),js.fromBufferAttribute(o,r),t.distanceSqToSegment(Xs,js,Rr,So)>n)return;Rr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Rr);if(!(l<e.near||l>e.far))return{distance:l,point:So.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class wl extends li{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const yo=new yt,ba=new $s,bs=new Qi,Ts=new H;class od extends Bt{constructor(e=new Xt,t=new wl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(s),bs.radius+=r,e.ray.intersectsSphere(bs)===!1)return;yo.copy(s).invert(),ba.copy(e.ray).applyMatrix4(yo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,g=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let x=f,S=p;x<S;x++){const m=l.getX(x);Ts.fromBufferAttribute(g,m),Eo(Ts,m,c,s,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(g.count,a.start+a.count);for(let x=f,S=p;x<S;x++)Ts.fromBufferAttribute(g,x),Eo(Ts,x,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Eo(i,e,t,n,s,r,a){const o=ba.distanceSqToPoint(i);if(o<t){const c=new H;ba.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Cl extends Wt{constructor(e=[],t=Ri,n,s,r,a,o,c,l,d){super(e,t,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pn extends Wt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ci extends Wt{constructor(e,t,n=Tn,s,r,a,o=Ot,c=Ot,l,d=qn,g=1){if(d!==qn&&d!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:g};super(f,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ba(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Pl extends Ci{constructor(e,t=Tn,n=Ri,s,r,a=Ot,o=Ot,c,l=qn){const d={width:e,height:e,depth:1},g=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Nl extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class es extends Xt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],g=[];let f=0,p=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Pt(l,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(g,2));function x(S,m,u,b,w,E,R,A,_,y,I){const N=E/_,U=R/y,O=E/2,Y=R/2,P=A/2,j=_+1,F=y+1;let W=0,se=0;const q=new H;for(let te=0;te<F;te++){const ae=te*U-Y;for(let we=0;we<j;we++){const Ve=we*N-O;q[S]=Ve*b,q[m]=ae*w,q[u]=P,l.push(q.x,q.y,q.z),q[S]=0,q[m]=0,q[u]=A>0?1:-1,d.push(q.x,q.y,q.z),g.push(we/_),g.push(1-te/y),W+=1}}for(let te=0;te<y;te++)for(let ae=0;ae<_;ae++){const we=f+ae+j*te,Ve=f+ae+j*(te+1),ee=f+(ae+1)+j*(te+1),_e=f+(ae+1)+j*te;c.push(we,Ve,_e),c.push(Ve,ee,_e),se+=6}o.addGroup(p,se,I),p+=se,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ha extends Xt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],g=[],f=[],p=[];let x=0;const S=[],m=n/2;let u=0;b(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new Pt(g,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(p,2));function b(){const E=new H,R=new H;let A=0;const _=(t-e)/n;for(let y=0;y<=r;y++){const I=[],N=y/r,U=N*(t-e)+e;for(let O=0;O<=s;O++){const Y=O/s,P=Y*c+o,j=Math.sin(P),F=Math.cos(P);R.x=U*j,R.y=-N*n+m,R.z=U*F,g.push(R.x,R.y,R.z),E.set(j,_,F).normalize(),f.push(E.x,E.y,E.z),p.push(Y,1-N),I.push(x++)}S.push(I)}for(let y=0;y<s;y++)for(let I=0;I<r;I++){const N=S[I][y],U=S[I+1][y],O=S[I+1][y+1],Y=S[I][y+1];(e>0||I!==0)&&(d.push(N,U,Y),A+=3),(t>0||I!==r-1)&&(d.push(U,O,Y),A+=3)}l.addGroup(u,A,0),u+=A}function w(E){const R=x,A=new nt,_=new H;let y=0;const I=E===!0?e:t,N=E===!0?1:-1;for(let O=1;O<=s;O++)g.push(0,m*N,0),f.push(0,N,0),p.push(.5,.5),x++;const U=x;for(let O=0;O<=s;O++){const P=O/s*c+o,j=Math.cos(P),F=Math.sin(P);_.x=I*F,_.y=m*N,_.z=I*j,g.push(_.x,_.y,_.z),f.push(0,N,0),A.x=j*.5+.5,A.y=F*.5*N+.5,p.push(A.x,A.y),x++}for(let O=0;O<s;O++){const Y=R+O,P=U+O;E===!0?d.push(P,P+1,Y):d.push(P+1,P,Y),y+=3}l.addGroup(u,y,E===!0?1:2),u+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ha(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ka extends Ha{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ka(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zs extends Xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,g=e/o,f=t/c,p=[],x=[],S=[],m=[];for(let u=0;u<d;u++){const b=u*f-a;for(let w=0;w<l;w++){const E=w*g-r;x.push(E,-b,0),S.push(0,0,1),m.push(w/o),m.push(1-u/c)}}for(let u=0;u<c;u++)for(let b=0;b<o;b++){const w=b+l*u,E=b+l*(u+1),R=b+1+l*(u+1),A=b+1+l*u;p.push(w,E,A),p.push(E,R,A)}this.setIndex(p),this.setAttribute("position",new Pt(x,3)),this.setAttribute("normal",new Pt(S,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.width,e.height,e.widthSegments,e.heightSegments)}}class Xi extends Xt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],d=[];let g=e;const f=(t-e)/s,p=new H,x=new nt;for(let S=0;S<=s;S++){for(let m=0;m<=n;m++){const u=r+m/n*a;p.x=g*Math.cos(u),p.y=g*Math.sin(u),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,d.push(x.x,x.y)}g+=f}for(let S=0;S<s;S++){const m=S*(n+1);for(let u=0;u<n;u++){const b=u+m,w=b,E=b+n+1,R=b+n+2,A=b+1;o.push(w,E,A),o.push(E,R,A)}}this.setIndex(o),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(l,3)),this.setAttribute("uv",new Pt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class bi extends Xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],g=new H,f=new H,p=[],x=[],S=[],m=[];for(let u=0;u<=n;u++){const b=[],w=u/n,E=a+w*o,R=e*Math.cos(E),A=Math.sqrt(e*e-R*R);let _=0;u===0&&a===0?_=.5/t:u===n&&c===Math.PI&&(_=-.5/t);for(let y=0;y<=t;y++){const I=y/t,N=s+I*r;g.x=-A*Math.cos(N),g.y=R,g.z=A*Math.sin(N),x.push(g.x,g.y,g.z),f.copy(g).normalize(),S.push(f.x,f.y,f.z),m.push(I+_,1-w),b.push(l++)}d.push(b)}for(let u=0;u<n;u++)for(let b=0;b<t;b++){const w=d[u][b+1],E=d[u][b],R=d[u+1][b],A=d[u+1][b+1];(u!==0||a>0)&&p.push(w,E,A),(u!==n-1||c<Math.PI)&&p.push(E,R,A)}this.setIndex(p),this.setAttribute("position",new Pt(x,3)),this.setAttribute("normal",new Pt(S,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Pi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(bo(s))s.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(bo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function qt(i){const e={};for(let t=0;t<i.length;t++){const n=Pi(i[t]);for(const s in n)e[s]=n[s]}return e}function bo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function ld(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ll(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const cd={clone:Pi,merge:qt};var dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dd,this.fragmentShader=ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=ld(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new tt().setHex(s.value);break;case"v2":this.uniforms[n].value=new nt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Tt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new yt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class hd extends ai{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class To extends li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fd extends li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class pd extends li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Dl extends Bt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const wr=new yt,Ao=new H,Ro=new H;class md{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $i,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Ao.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ao),Ro.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ro),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){wr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(wr,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ki||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(wr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const As=new H,Rs=new Ni,gn=new H;class Il extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(As,Rs,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(As,Rs,gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(As,Rs,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(As,Rs,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const kn=new H,wo=new nt,Co=new nt;class sn extends Il{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ya*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ya*2*Math.atan(Math.tan(rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,wo,Co),t.subVectors(Co,wo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(rr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class gd extends md{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}}class _d extends Dl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new gd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class xd extends Il{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class vd extends Dl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Mi=-90,Si=1;class Ta extends Bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn(Mi,Si,e,t);s.layers=this.layers,this.add(s);const r=new sn(Mi,Si,e,t);r.layers=this.layers,this.add(r);const a=new sn(Mi,Si,e,t);a.layers=this.layers,this.add(a);const o=new sn(Mi,Si,e,t);o.layers=this.layers,this.add(o);const c=new sn(Mi,Si,e,t);c.layers=this.layers,this.add(c);const l=new sn(Mi,Si,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ki)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,g=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=S,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(g,f,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Md extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}const Po=new yt;class Sd{constructor(e,t,n=0,s=1/0){this.ray=new $s(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):pt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Po.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Po),this}intersectObject(e,t=!0,n=[]){return Aa(e,this,n,t),n.sort(No),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Aa(e[s],this,n,t);return n.sort(No),n}}function No(i,e){return i.distance-e.distance}function Aa(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Aa(r[a],e,t,!0)}}const Lo=new H;let ws,Cr;class Pr extends Bt{constructor(e=new H(0,0,1),t=new H(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",ws===void 0&&(ws=new Xt,ws.setAttribute("position",new Pt([0,0,0,0,1,0],3)),Cr=new ka(.5,1,5,1),Cr.translate(0,-.5,0)),this.position.copy(t),this.line=new Ea(ws,new Ws({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new rn(Cr,new Wi({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Lo.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Lo,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}function Do(i,e,t,n){const s=yd(n);switch(t){case _l:return i*e;case vl:return i*e/s.components*s.byteLength;case Ia:return i*e/s.components*s.byteLength;case ri:return i*e*2/s.components*s.byteLength;case Ua:return i*e*2/s.components*s.byteLength;case xl:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case Fa:return i*e*4/s.components*s.byteLength;case Ls:case Ds:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Is:case Us:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jr:case Yr:return Math.max(i,16)*Math.max(e,8)/4;case Xr:case qr:return Math.max(i,8)*Math.max(e,8)/2;case Kr:case $r:case Jr:case Qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zr:case Gs:case ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case na:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ia:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case sa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ra:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case aa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case oa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case la:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ca:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case da:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ua:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ha:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case fa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case pa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ma:case ga:case _a:return Math.ceil(i/4)*Math.ceil(e/4)*16;case xa:case va:return Math.ceil(i/4)*Math.ceil(e/4)*8;case zs:case Ma:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function yd(i){switch(i){case Qt:case fl:return{byteLength:1,components:1};case Yi:case pl:case An:return{byteLength:2,components:1};case La:case Da:return{byteLength:2,components:4};case Tn:case Na:case Mn:return{byteLength:4,components:1};case ml:case gl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}}));typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ul(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ed(i){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,g=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:g}}function n(o,c,l){const d=c.array,g=c.updateRanges;if(i.bindBuffer(l,o),g.length===0)i.bufferSubData(l,0,d);else{g.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<g.length;p++){const x=g[f],S=g[p];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++f,g[f]=S)}g.length=f+1;for(let p=0,x=g.length;p<x;p++){const S=g[p];i.bufferSubData(l,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var bd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Td=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ad=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ld=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ud=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Od=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Wd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Xd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$d=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qd="gl_FragColor = linearToOutputTexel( gl_FragColor );",eu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,nu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,iu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,su=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ru=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,au=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ou=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,du=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,mu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,gu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_u=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Su=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Eu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Tu=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Au=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ru=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Du=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ou=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ku=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ju=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ku=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$u=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ju=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Qu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,th=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ih=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ah=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,oh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ch=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hh=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ph=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_h=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Eh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bh=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Th=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ah=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ch=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ph=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Dh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ih=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Oh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kh=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$h=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qh=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ef=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:bd,alphahash_pars_fragment:Td,alphamap_fragment:Ad,alphamap_pars_fragment:Rd,alphatest_fragment:wd,alphatest_pars_fragment:Cd,aomap_fragment:Pd,aomap_pars_fragment:Nd,batching_pars_vertex:Ld,batching_vertex:Dd,begin_vertex:Id,beginnormal_vertex:Ud,bsdfs:Fd,iridescence_fragment:Od,bumpmap_pars_fragment:Bd,clipping_planes_fragment:Gd,clipping_planes_pars_fragment:zd,clipping_planes_pars_vertex:Hd,clipping_planes_vertex:kd,color_fragment:Vd,color_pars_fragment:Wd,color_pars_vertex:Xd,color_vertex:jd,common:qd,defaultnormal_vertex:Yd,displacementmap_pars_vertex:Kd,displacementmap_vertex:$d,emissivemap_fragment:Zd,emissivemap_pars_fragment:Jd,colorspace_fragment:Qd,colorspace_pars_fragment:eu,envmap_fragment:tu,envmap_common_pars_fragment:nu,envmap_pars_fragment:iu,envmap_pars_vertex:su,envmap_physical_pars_fragment:mu,envmap_vertex:ru,fog_vertex:au,fog_pars_vertex:ou,fog_fragment:lu,fog_pars_fragment:cu,gradientmap_pars_fragment:du,lightmap_pars_fragment:uu,lights_lambert_fragment:hu,lights_lambert_pars_fragment:fu,lights_pars_begin:pu,lights_toon_fragment:gu,lights_toon_pars_fragment:_u,lights_phong_fragment:xu,lights_phong_pars_fragment:vu,lights_physical_fragment:Mu,lights_physical_pars_fragment:Su,lights_fragment_begin:yu,lights_fragment_maps:Eu,lights_fragment_end:bu,lightprobes_pars_fragment:Tu,logdepthbuf_fragment:Au,logdepthbuf_pars_fragment:Ru,logdepthbuf_pars_vertex:wu,logdepthbuf_vertex:Cu,map_fragment:Pu,map_pars_fragment:Nu,map_particle_fragment:Lu,map_particle_pars_fragment:Du,metalnessmap_fragment:Iu,metalnessmap_pars_fragment:Uu,morphinstance_vertex:Fu,morphcolor_vertex:Ou,morphnormal_vertex:Bu,morphtarget_pars_vertex:Gu,morphtarget_vertex:zu,normal_fragment_begin:Hu,normal_fragment_maps:ku,normal_pars_fragment:Vu,normal_pars_vertex:Wu,normal_vertex:Xu,normalmap_pars_fragment:ju,clearcoat_normal_fragment_begin:qu,clearcoat_normal_fragment_maps:Yu,clearcoat_pars_fragment:Ku,iridescence_pars_fragment:$u,opaque_fragment:Zu,packing:Ju,premultiplied_alpha_fragment:Qu,project_vertex:eh,dithering_fragment:th,dithering_pars_fragment:nh,roughnessmap_fragment:ih,roughnessmap_pars_fragment:sh,shadowmap_pars_fragment:rh,shadowmap_pars_vertex:ah,shadowmap_vertex:oh,shadowmask_pars_fragment:lh,skinbase_vertex:ch,skinning_pars_vertex:dh,skinning_vertex:uh,skinnormal_vertex:hh,specularmap_fragment:fh,specularmap_pars_fragment:ph,tonemapping_fragment:mh,tonemapping_pars_fragment:gh,transmission_fragment:_h,transmission_pars_fragment:xh,uv_pars_fragment:vh,uv_pars_vertex:Mh,uv_vertex:Sh,worldpos_vertex:yh,background_vert:Eh,background_frag:bh,backgroundCube_vert:Th,backgroundCube_frag:Ah,cube_vert:Rh,cube_frag:wh,depth_vert:Ch,depth_frag:Ph,distance_vert:Nh,distance_frag:Lh,equirect_vert:Dh,equirect_frag:Ih,linedashed_vert:Uh,linedashed_frag:Fh,meshbasic_vert:Oh,meshbasic_frag:Bh,meshlambert_vert:Gh,meshlambert_frag:zh,meshmatcap_vert:Hh,meshmatcap_frag:kh,meshnormal_vert:Vh,meshnormal_frag:Wh,meshphong_vert:Xh,meshphong_frag:jh,meshphysical_vert:qh,meshphysical_frag:Yh,meshtoon_vert:Kh,meshtoon_frag:$h,points_vert:Zh,points_frag:Jh,shadow_vert:Qh,shadow_frag:ef,sprite_vert:tf,sprite_frag:nf},ye={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},xn={basic:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:qt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:qt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new tt(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:qt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:qt([ye.points,ye.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:qt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:qt([ye.common,ye.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:qt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:qt([ye.sprite,ye.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:qt([ye.common,ye.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:qt([ye.lights,ye.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};xn.physical={uniforms:qt([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Cs={r:0,b:0,g:0},sf=new yt,Fl=new qe;Fl.set(-1,0,0,0,1,0,0,0,1);function rf(i,e,t,n,s,r){const a=new tt(0);let o=s===!0?0:1,c,l,d=null,g=0,f=null;function p(b){let w=b.isScene===!0?b.background:null;if(w&&w.isTexture){const E=b.backgroundBlurriness>0;w=e.get(w,E)}return w}function x(b){let w=!1;const E=p(b);E===null?m(a,o):E&&E.isColor&&(m(E,1),w=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(b,w){const E=p(w);E&&E.isCubeTexture?(l===void 0&&(l=new rn(new es(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:Pi(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,A,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sf.makeRotationFromEuler(w.backgroundRotation)).transpose(),E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Fl),l.material.toneMapped=ot.getTransfer(E.colorSpace)!==vt,(d!==E||g!==E.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,g=E.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new rn(new Zs(2,2),new ai({name:"BackgroundMaterial",uniforms:Pi(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ot.getTransfer(E.colorSpace)!==vt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||g!==E.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=E,g=E.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,w){b.getRGB(Cs,Ll(i)),t.buffers.color.setClear(Cs.r,Cs.g,Cs.b,w,r)}function u(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:x,addToRenderList:S,dispose:u}}function af(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(U,O,Y,P,j){let F=!1;const W=g(U,P,Y,O);r!==W&&(r=W,l(r.object)),F=p(U,P,Y,j),F&&x(U,P,Y,j),j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,E(U,O,Y,P),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function c(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function d(U){return i.deleteVertexArray(U)}function g(U,O,Y,P){const j=P.wireframe===!0;let F=n[O.id];F===void 0&&(F={},n[O.id]=F);const W=U.isInstancedMesh===!0?U.id:0;let se=F[W];se===void 0&&(se={},F[W]=se);let q=se[Y.id];q===void 0&&(q={},se[Y.id]=q);let te=q[j];return te===void 0&&(te=f(c()),q[j]=te),te}function f(U){const O=[],Y=[],P=[];for(let j=0;j<t;j++)O[j]=0,Y[j]=0,P[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Y,attributeDivisors:P,object:U,attributes:{},index:null}}function p(U,O,Y,P){const j=r.attributes,F=O.attributes;let W=0;const se=Y.getAttributes();for(const q in se)if(se[q].location>=0){const ae=j[q];let we=F[q];if(we===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(we=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(we=U.instanceColor)),ae===void 0||ae.attribute!==we||we&&ae.data!==we.data)return!0;W++}return r.attributesNum!==W||r.index!==P}function x(U,O,Y,P){const j={},F=O.attributes;let W=0;const se=Y.getAttributes();for(const q in se)if(se[q].location>=0){let ae=F[q];ae===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(ae=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(ae=U.instanceColor));const we={};we.attribute=ae,ae&&ae.data&&(we.data=ae.data),j[q]=we,W++}r.attributes=j,r.attributesNum=W,r.index=P}function S(){const U=r.newAttributes;for(let O=0,Y=U.length;O<Y;O++)U[O]=0}function m(U){u(U,0)}function u(U,O){const Y=r.newAttributes,P=r.enabledAttributes,j=r.attributeDivisors;Y[U]=1,P[U]===0&&(i.enableVertexAttribArray(U),P[U]=1),j[U]!==O&&(i.vertexAttribDivisor(U,O),j[U]=O)}function b(){const U=r.newAttributes,O=r.enabledAttributes;for(let Y=0,P=O.length;Y<P;Y++)O[Y]!==U[Y]&&(i.disableVertexAttribArray(Y),O[Y]=0)}function w(U,O,Y,P,j,F,W){W===!0?i.vertexAttribIPointer(U,O,Y,j,F):i.vertexAttribPointer(U,O,Y,P,j,F)}function E(U,O,Y,P){S();const j=P.attributes,F=Y.getAttributes(),W=O.defaultAttributeValues;for(const se in F){const q=F[se];if(q.location>=0){let te=j[se];if(te===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(te=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(te=U.instanceColor)),te!==void 0){const ae=te.normalized,we=te.itemSize,Ve=e.get(te);if(Ve===void 0)continue;const ee=Ve.buffer,_e=Ve.type,be=Ve.bytesPerElement,Le=_e===i.INT||_e===i.UNSIGNED_INT||te.gpuType===Na;if(te.isInterleavedBufferAttribute){const ve=te.data,Be=ve.isInterleavedBuffer===!0?ve.stride:ve.itemSize,Et=te.offset;if(ve.isInstancedInterleavedBuffer||ve.isInstancedBufferAttribute){for(let Ie=0;Ie<q.locationSize;Ie++)u(q.location+Ie,ve.meshPerAttribute);U.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ie=0;Ie<q.locationSize;Ie++)m(q.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let Ie=0;Ie<q.locationSize;Ie++)w(q.location+Ie,we/q.locationSize,_e,ae,Be*be,(Et+we/q.locationSize*Ie)*be,Le)}else{if(te.isInstancedBufferAttribute){for(let ve=0;ve<q.locationSize;ve++)u(q.location+ve,te.meshPerAttribute);U.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ve=0;ve<q.locationSize;ve++)m(q.location+ve);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let ve=0;ve<q.locationSize;ve++)w(q.location+ve,we/q.locationSize,_e,ae,we*be,we/q.locationSize*ve*be,Le)}}else if(W!==void 0){const ae=W[se];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(q.location,ae);break;case 3:i.vertexAttrib3fv(q.location,ae);break;case 4:i.vertexAttrib4fv(q.location,ae);break;default:i.vertexAttrib1fv(q.location,ae)}}}}b()}function R(){I();for(const U in n){const O=n[U];for(const Y in O){const P=O[Y];for(const j in P){const F=P[j];for(const W in F)d(F[W].object),delete F[W];delete P[j]}}delete n[U]}}function A(U){if(n[U.id]===void 0)return;const O=n[U.id];for(const Y in O){const P=O[Y];for(const j in P){const F=P[j];for(const W in F)d(F[W].object),delete F[W];delete P[j]}}delete n[U.id]}function _(U){for(const O in n){const Y=n[O];for(const P in Y){const j=Y[P];if(j[U.id]===void 0)continue;const F=j[U.id];for(const W in F)d(F[W].object),delete F[W];delete j[U.id]}}}function y(U){for(const O in n){const Y=n[O],P=U.isInstancedMesh===!0?U.id:0,j=Y[P];if(j!==void 0){for(const F in j){const W=j[F];for(const se in W)d(W[se].object),delete W[se];delete j[F]}delete Y[P],Object.keys(Y).length===0&&delete n[O]}}}function I(){N(),a=!0,r!==s&&(r=s,l(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:N,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:y,releaseStatesOfProgram:_,initAttributes:S,enableAttribute:m,disableUnusedAttributes:b}}function of(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),t.update(l,n,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let f=0;for(let p=0;p<d;p++)f+=l[p];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function lf(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==Sn&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const y=_===An&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==Qt&&_!==Mn&&!y&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(je("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&g===!1;t.reversedDepthBuffer===!0&&g===!1&&je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&g===!0&&je("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:g,maxTextures:p,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:E,maxSamples:R,samples:A}}function cf(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Vn,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,f){const p=g.length!==0||f||n!==0||s;return s=f,n=g.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,f){t=d(g,f,0)},this.setState=function(g,f,p){const x=g.clippingPlanes,S=g.clipIntersection,m=g.clipShadows,u=i.get(g);if(!s||x===null||x.length===0||r&&!m)r?d(null):l();else{const b=r?0:n,w=b*4;let E=u.clippingState||null;c.value=E,E=d(x,f,w,p);for(let R=0;R!==w;++R)E[R]=t[R];u.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(g,f,p,x){const S=g!==null?g.length:0;let m=null;if(S!==0){if(m=c.value,x!==!0||m===null){const u=p+S*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<u)&&(m=new Float32Array(u));for(let w=0,E=p;w!==S;++w,E+=4)a.copy(g[w]).applyMatrix4(b,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}class Va extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Cl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new es(5,5,5),r=new ai({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Ti});r.uniforms.tEquirect.value=t;const a=new rn(s,r),o=t.minFilter;return t.minFilter===Xn&&(t.minFilter=Kt),new Ta(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Io=256,df=3,uf=20,Ol=256,Bl=16,hf=3,ff=new H,pf=new tt;class qs{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ta(1,10,null),this._boxMesh=new rn(new es(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=ff}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,f=c.autoClearColor,p=c.autoClearDepth,x=c.autoClearStencil,S=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,S===null&&(e.background=c.getClearColor(pf));const m=new Ta(n,s,d);return m.position.copy(o),m.update(c,e),c.autoClear=g,c.autoClearColor=f,c.autoClearDepth=p,c.autoClearStencil=x,e.background=S,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Oo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Io,Uc(e))}_fromTexture(e,t){e.mapping===Ri||e.mapping===qi?this._setSize(e.image.length===0?Io:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=Uo(e,!1,!1),n=Math.log2(e)-df;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Uo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ri||e.mapping===qi?(this._cubemapMaterial===null&&(this._cubemapMaterial=Oo()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Fo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=mf(),this._integrationMaterial=gf());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Bl);for(let a=0;a<=n;a++){const o=qs.lodToRoughness(a,n);if(a>n-hf)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(Ol*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=_f());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function Uo(i,e,t){return new Va(i,{minFilter:Xn,generateMipmaps:e,type:An,colorSpace:Hs,depthBuffer:t})}function ts(i,e,t){return new ai({name:i,uniforms:e,vertexShader:et.cube_vert,fragmentShader:t,side:Yt,blending:Ti,depthTest:!1,depthWrite:!1})}function mf(){return ts("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Ol}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function gf(){return ts("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Bl}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function _f(){return ts("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${uf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Fo(){return ts("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Oo(){return ts("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function xf(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,p=!1){return f==null?null:p?a(f):r(f)}function r(f){if(f&&f.isTexture){const p=f.mapping;if(p===tr||p===nr)if(e.has(f)){const x=e.get(f).texture;return o(x,f.mapping)}else{const x=f.image;if(x&&x.height>0){const S=new Va(x.height);return S.fromEquirectangularTexture(i,f),e.set(f,S),f.addEventListener("dispose",l),o(S.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){const p=f.mapping,x=p===tr||p===nr,S=p===Ri||p===qi;if(x||S){let m=t.get(f);const u=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==u)return n===null&&(n=new qs(i)),m=x?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const b=f.image;return x&&b&&b.height>0||S&&b&&c(b)?(n===null&&(n=new qs(i)),m=x?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",d),m.texture):null}}}return f}function o(f,p){return p===tr?f.mapping=Ri:p===nr&&(f.mapping=qi),f}function c(f){let p=0;const x=6;for(let S=0;S<x;S++)f[S]!==void 0&&p++;return p===x}function l(f){const p=f.target;p.removeEventListener("dispose",l);const x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function d(f){const p=f.target;p.removeEventListener("dispose",d);const x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function g(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function vf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Fs("WebGLRenderer: "+n+" extension not supported."),s}}}function Mf(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(x=>delete s[x]);function o(x){c(x.target)}function c(x){x.index!==null&&e.remove(x.index);for(const m in x.attributes)e.remove(x.attributes[m]);x.removeEventListener("dispose",o),delete s[x.id],a.unregister(x);const S=r.get(x);S&&(e.remove(S),r.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function l(x,S){return s[S.id]!==void 0||(S.addEventListener("dispose",o),s[S.id]=new WeakRef(S),a.register(S,S.id,S),t.memory.geometries++),S}function d(x){const S=x.attributes;for(const m in S)e.update(S[m],i.ARRAY_BUFFER)}function g(x){const S=x.index,m=x.attributes.position;let u=0;if(m===void 0)return;const b=S!==null?S.array.length:m.array.length/3-1,w=m.count>=65535?Rl:Al,E=new w(Math.ceil(b/3)*6,1),R=E.array;if(S!==null){const _=S.array;u=S.version;for(let y=0,I=0;y<b;y+=3){const N=_[y+0],U=_[y+1],O=_[y+2];R[I++]=N,R[I++]=U,R[I++]=U,R[I++]=O,R[I++]=O,R[I++]=N}}else{u=m.version;for(let _=0,y=0;_<b;_+=3){const I=_+0,N=_+1,U=_+2;R[y++]=I,R[y++]=N,R[y++]=N,R[y++]=U,R[y++]=U,R[y++]=I}}E.version=u;const A=r.get(x);A&&e.remove(A),r.set(x,E)}function f(x){const S=r.get(x);if(S){const m=x.index;m!==null&&S.version<m.version&&g(x)}else g(x);return r.get(x)}function p(){for(const x in s){const S=s[x].deref();S!==void 0&&c(S)}}return{get:l,update:d,getWireframeAttribute:f,dispose:p}}function Sf(i,e,t){let n;function s(g){n=g}let r,a;function o(g){r=g.type,a=g.bytesPerElement}function c(g,f){i.drawElements(n,f,r,g*a),t.update(f,n,1)}function l(g,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,g*a,p),t.update(f,n,p))}function d(g,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,g,0,p);let S=0;for(let m=0;m<p;m++)S+=f[m];t.update(S,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function yf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:pt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ef(i,e,t){const n=new WeakMap,s=new Tt;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,g=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==g){let I=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",I)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let w=0;p===!0&&(w=1),x===!0&&(w=2),S===!0&&(w=3);let E=o.attributes.position.count*w,R=1;E>e.maxTextureSize&&(R=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const A=new Float32Array(E*R*4*g),_=new bl(A,E,R,g);_.type=Mn,_.needsUpdate=!0;const y=w*4;for(let N=0;N<g;N++){const U=m[N],O=u[N],Y=b[N],P=E*R*4*N;for(let j=0;j<U.count;j++){const F=j*y;p===!0&&(s.fromBufferAttribute(U,j),A[P+F+0]=s.x,A[P+F+1]=s.y,A[P+F+2]=s.z,A[P+F+3]=0),x===!0&&(s.fromBufferAttribute(O,j),A[P+F+4]=s.x,A[P+F+5]=s.y,A[P+F+6]=s.z,A[P+F+7]=0),S===!0&&(s.fromBufferAttribute(Y,j),A[P+F+8]=s.x,A[P+F+9]=s.y,A[P+F+10]=s.z,A[P+F+11]=Y.itemSize===4?s.w:1)}}f={count:g,texture:_,size:new nt(E,R)},n.set(o,f),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let S=0;S<l.length;S++)p+=l[S];const x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function bf(i,e,t,n,s){let r=new WeakMap;function a(l){const d=s.render.frame,g=l.geometry,f=e.get(l,g);if(r.get(f)!==d&&(e.update(f),r.set(f,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return f}function o(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Tf={[al]:"LINEAR_TONE_MAPPING",[ol]:"REINHARD_TONE_MAPPING",[ll]:"CINEON_TONE_MAPPING",[Pa]:"ACES_FILMIC_TONE_MAPPING",[dl]:"AGX_TONE_MAPPING",[ul]:"NEUTRAL_TONE_MAPPING",[cl]:"CUSTOM_TONE_MAPPING"};function Af(i,e,t,n,s,r){const a=new En(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const d=new Xt;d.setAttribute("position",new Pt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Pt([0,2,0,0,2,0],2));const g=new hd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new rn(d,g),p=new xd(-1,1,1,-1,0,1);let x=null,S=null,m=!1,u,b=null,w=[],E=!1;this.setSize=function(R,A){a.setSize(R,A),o!==null&&o.setSize(R,A),c!==null&&c.setSize(R,A);for(let _=0;_<w.length;_++){const y=w[_];y.setSize&&y.setSize(R,A)}},this.setEffects=function(R){w=R,E=w.length>0&&w[0].isRenderPass===!0;const A=a.width,_=a.height;w.length>0&&o===null&&(o=new En(A,_,{type:An,depthBuffer:!1,stencilBuffer:!1}),c=new En(A,_,{type:An,depthBuffer:!1,stencilBuffer:!1}));const y=s===!0&&w.some(I=>I.needsDepthTexture===!0);y!==(a.depthTexture!==null)&&(y===!0&&l===null&&(l=new Ci(A,_),r===!0&&(l.format=jn,l.type=wi)),a.dispose(),a.depthTexture=y?l:null,a.resolveDepthBuffer=y,a.storeMultisampledDepthBuffer=y);for(let I=0;I<w.length;I++){const N=w[I];N.setSize&&N.setSize(A,_),y&&N.needsDepthTexture===!0&&N.setDepthTexture&&N.setDepthTexture(l)}},this.begin=function(R,A){if(m||R.toneMapping===In&&w.length===0)return!1;if(b=A,A!==null){const _=A.width,y=A.height;(a.width!==_||a.height!==y)&&this.setSize(_,y)}return E===!1&&R.setRenderTarget(a),u=R.toneMapping,R.toneMapping=In,!0},this.hasRenderPass=function(){return E},this.end=function(R,A){R.toneMapping=u,m=!0;let _=a,y=o;for(let I=0;I<w.length;I++){const N=w[I];N.enabled!==!1&&(N.render(R,y,_,A),N.needsSwap!==!1&&(_=y,y=y===o?c:o))}if(x!==R.outputColorSpace||S!==R.toneMapping){x=R.outputColorSpace,S=R.toneMapping,g.defines={},ot.getTransfer(x)===vt&&(g.defines.SRGB_TRANSFER="");const I=Tf[S];I&&(g.defines[I]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=_.texture,R.setRenderTarget(b),R.render(f,p),b=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),d.dispose(),g.dispose()}}const Gl=new Wt,zl=new Ci(1,1),Hl=new Pl(1),kl=new bl,Vl=new Vc,Wl=new Cl,Bo=[],Go=[],zo=new Float32Array(16),Ho=new Float32Array(9),ko=new Float32Array(4);function Li(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Bo[s];if(r===void 0&&(r=new Float32Array(s),Bo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Js(i,e){let t=Go[e];t===void 0&&(t=new Int32Array(e),Go[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Rf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function Cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function Pf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function Nf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;ko.set(n),i.uniformMatrix2fv(this.addr,!1,ko),Dt(t,n)}}function Lf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Ho.set(n),i.uniformMatrix3fv(this.addr,!1,Ho),Dt(t,n)}}function Df(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;zo.set(n),i.uniformMatrix4fv(this.addr,!1,zo),Dt(t,n)}}function If(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function Ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function Of(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function Bf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function zf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function Hf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function Qs(i){return i.version===0&&(i.compareFunction=yl,i.needsUpdate=!0),i}function kf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Qs(zl):r=Gl,t.setTexture2D(e||r,s)}function Vf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Vl,s)}function Wf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Qs(Hl):r=Wl,t.setTextureCube(e||r,s)}function Xf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||kl,s)}function jf(i){switch(i){case 5126:return Rf;case 35664:return wf;case 35665:return Cf;case 35666:return Pf;case 35674:return Nf;case 35675:return Lf;case 35676:return Df;case 5124:case 35670:return If;case 35667:case 35671:return Uf;case 35668:case 35672:return Ff;case 35669:case 35673:return Of;case 5125:return Bf;case 36294:return Gf;case 36295:return zf;case 36296:return Hf;case 35678:case 36198:case 36298:case 36306:case 35682:return kf;case 35679:case 36299:case 36307:return Vf;case 35680:case 36300:case 36308:case 36293:return Wf;case 36289:case 36303:case 36311:case 36292:return Xf}}function qf(i,e){i.uniform1fv(this.addr,e)}function Yf(i,e){const t=Li(e,this.size,2);i.uniform2fv(this.addr,t)}function Kf(i,e){const t=Li(e,this.size,3);i.uniform3fv(this.addr,t)}function $f(i,e){const t=Li(e,this.size,4);i.uniform4fv(this.addr,t)}function Zf(i,e){const t=Li(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Jf(i,e){const t=Li(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Qf(i,e){const t=Li(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ep(i,e){i.uniform1iv(this.addr,e)}function tp(i,e){i.uniform2iv(this.addr,e)}function np(i,e){i.uniform3iv(this.addr,e)}function ip(i,e){i.uniform4iv(this.addr,e)}function sp(i,e){i.uniform1uiv(this.addr,e)}function rp(i,e){i.uniform2uiv(this.addr,e)}function ap(i,e){i.uniform3uiv(this.addr,e)}function op(i,e){i.uniform4uiv(this.addr,e)}function lp(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Qs(zl):a=Gl;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function cp(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Vl,r[a])}function dp(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Qs(Hl):a=Wl;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function up(i,e,t){const n=this.cache,s=e.length,r=Js(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||kl,r[a])}function hp(i){switch(i){case 5126:return qf;case 35664:return Yf;case 35665:return Kf;case 35666:return $f;case 35674:return Zf;case 35675:return Jf;case 35676:return Qf;case 5124:case 35670:return ep;case 35667:case 35671:return tp;case 35668:case 35672:return np;case 35669:case 35673:return ip;case 5125:return sp;case 36294:return rp;case 36295:return ap;case 36296:return op;case 35678:case 36198:case 36298:case 36306:case 35682:return lp;case 35679:case 36299:case 36307:return cp;case 35680:case 36300:case 36308:case 36293:return dp;case 36289:case 36303:case 36311:case 36292:return up}}class fp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jf(t.type)}}class pp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hp(t.type)}}class mp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Nr=/(\w+)(\])?(\[|\.)?/g;function Vo(i,e){i.seq.push(e),i.map[e.id]=e}function gp(i,e,t){const n=i.name,s=n.length;for(Nr.lastIndex=0;;){const r=Nr.exec(n),a=Nr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Vo(t,l===void 0?new fp(o,i,e):new pp(o,i,e));break}else{let g=t.map[o];g===void 0&&(g=new mp(o),Vo(t,g)),t=g}}}class Os{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);gp(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Wo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const _p=37297;let xp=0;function vp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Xo=new qe;function Mp(i){ot._getMatrix(Xo,ot.workingColorSpace,i);const e=`mat3( ${Xo.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case ks:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function jo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+vp(i.getShaderSource(e),o)}else return r}function Sp(i,e){const t=Mp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const yp={[al]:"Linear",[ol]:"Reinhard",[ll]:"Cineon",[Pa]:"ACESFilmic",[dl]:"AgX",[ul]:"Neutral",[cl]:"Custom"};function Ep(i,e){const t=yp[e];return t===void 0?(je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ps=new H;function bp(){ot.getLuminanceCoefficients(Ps);const i=Ps.x.toFixed(4),e=Ps.y.toFixed(4),t=Ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ki).join(`
`)}function Ap(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ki(i){return i!==""}function qo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Yo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(i){return i.replace(wp,Cp)}function Cp(i,e){const t=et[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Ra(t)}const Pp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ko(i){return i.replace(Pp,Np)}function Np(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $o(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Lp={[Ns]:"SHADOWMAP_TYPE_PCF",[Hi]:"SHADOWMAP_TYPE_VSM"};function Dp(i){return Lp[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ip={[qi]:"ENVMAP_MODE_REFRACTION"};function Up(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ip[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Fp={[rl]:"ENVMAP_BLENDING_MULTIPLY",[xc]:"ENVMAP_BLENDING_MIX",[vc]:"ENVMAP_BLENDING_ADD"};function Op(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Fp[i.combine]||"ENVMAP_BLENDING_NONE"}function Bp(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Dp(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=Up(t),g=Op(t),f=Tp(t),p=Ap(r),x=s.createProgram();let S,m,u=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ki).join(`
`),S.length>0&&(S+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ki).join(`
`),m.length>0&&(m+=`
`)):(S=[$o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ki).join(`
`),m=[$o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+g:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?et.tonemapping_pars_fragment:"",t.toneMapping!==In?Ep("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Sp("linearToOutputTexel",t.outputColorSpace),bp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ki).join(`
`)),a=Ra(a),a=qo(a,t),a=Yo(a,t),o=Ra(o),o=qo(o,t),o=Yo(o,t),a=Ko(a),o=Ko(o),t.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,S=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,m=["#define varying in",t.glslVersion===to?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===to?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=u+S+a,w=u+m+o,E=Wo(s,s.VERTEX_SHADER,b),R=Wo(s,s.FRAGMENT_SHADER,w);s.attachShader(x,E),s.attachShader(x,R),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(N){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(x)||"",O=s.getShaderInfoLog(E)||"",Y=s.getShaderInfoLog(R)||"",P=U.trim(),j=O.trim(),F=Y.trim();let W=!0,se=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,E,R);else{const q=jo(s,E,"vertex"),te=jo(s,R,"fragment");pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+P+`
`+q+`
`+te)}else P!==""?je("WebGLProgram: Program Info Log:",P):(j===""||F==="")&&(se=!1);se&&(N.diagnostics={runnable:W,programLog:P,vertexShader:{log:j,prefix:S},fragmentShader:{log:F,prefix:m}})}s.deleteShader(E),s.deleteShader(R),_=new Os(s,x),y=Rp(s,x)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(x,_p)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xp++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=R,this}let Gp=0;class zp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Hp(e),t.set(e,n)),n}}class Hp{constructor(e){this.id=Gp++,this.code=e,this.usedTimes=0}}function kp(i){return i===ri||i===Gs||i===zs}function Vp(i,e,t,n,s,r){const a=new Ga,o=new zp,c=new Set,l=[],d=new Map,g=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,y,I,N,U,O){const Y=N.fog,P=U.geometry,j=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?N.environment:null,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,W=e.get(_.envMap||j,F),se=f[_.type];let q=n.precision;_.precision!==null&&(q=n.getMaxPrecision(_.precision),q!==_.precision&&je("WebGLProgram.getParameters:",_.precision,"not supported, using",q,"instead."));const te=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,ae=te!==void 0?te.length:0;let we=0;P.morphAttributes.position!==void 0&&(we=1),P.morphAttributes.normal!==void 0&&(we=2),P.morphAttributes.color!==void 0&&(we=3);let Ve,ee,_e,be;if(se){const Me=xn[se];Ve=Me.vertexShader,ee=Me.fragmentShader}else{Ve=_.vertexShader,ee=_.fragmentShader;const Me=o.getVertexShaderStage(_),ft=o.getFragmentShaderStage(_);o.update(_,Me,ft),_e=Me.id,be=ft.id}const Le=i.getRenderTarget(),ve=i.state.buffers.depth.getReversed(),Be=U.isInstancedMesh===!0,Et=U.isBatchedMesh===!0,Ie=!!_.map,it=!!_.matcap,ut=!!W,Je=ut&&W.isPMREMTexture===!0,st=!!_.aoMap,fe=!!_.lightMap,Oe=!!_.bumpMap&&_.wireframe===!1,Ne=!!_.normalMap,We=!!_.displacementMap,me=!!_.emissiveMap,Se=!!_.metalnessMap,Ue=!!_.roughnessMap,$e=_.anisotropy>0,L=_.clearcoat>0,ht=_.diffuseRoughness>0,Xe=_.dispersion>0,He=_.retroreflectivity>0,le=_.iridescence>0,mt=_.sheen>0,Ae=_.transmission>0,Fe=$e&&!!_.anisotropyMap,T=L&&!!_.clearcoatMap,v=L&&!!_.clearcoatNormalMap,G=L&&!!_.clearcoatRoughnessMap,Q=ht&&!!_.diffuseRoughnessMap,J=le&&!!_.iridescenceMap,de=le&&!!_.iridescenceThicknessMap,pe=mt&&!!_.sheenColorMap,z=mt&&!!_.sheenRoughnessMap,Z=!!_.specularMap,ne=!!_.specularColorMap,C=!!_.specularIntensityMap,K=Ae&&!!_.transmissionMap,B=Ae&&!!_.thicknessMap,re=!!_.gradientMap,oe=!!_.alphaMap,he=_.alphaTest>0,Re=!!_.alphaHash,Ye=!!_.extensions;let ue=In;_.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(ue=i.toneMapping);const Ge=Je?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,Ze={shaderID:se,shaderType:_.type,shaderName:_.name,vertexShader:Ve,fragmentShader:ee,defines:_.defines,customVertexShaderID:_e,customFragmentShaderID:be,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:q,batching:Et,batchingColor:Et&&U._colorsTexture!==null,instancing:Be,instancingColor:Be&&U.instanceColor!==null,instancingMorph:Be&&U.morphTexture!==null,outputColorSpace:Le===null?i.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ie,matcap:it,envMap:ut,envMapMode:ut&&W.mapping,envMapPMREM:Je,envMapMaxLod:Je?Ge.length-1:null,envMapSize:Je?Ge[0].width:null,aoMap:st,lightMap:fe,bumpMap:Oe,normalMap:Ne,displacementMap:We,emissiveMap:me,normalMapObjectSpace:Ne&&_.normalMapType===yc,normalMapTangentSpace:Ne&&_.normalMapType===Sa,packedNormalMap:Ne&&_.normalMapType===Sa&&kp(_.normalMap.format),metalnessMap:Se,roughnessMap:Ue,anisotropy:$e,anisotropyMap:Fe,clearcoat:L,clearcoatMap:T,clearcoatNormalMap:v,clearcoatRoughnessMap:G,diffuseRoughness:ht,diffuseRoughnessMap:Q,dispersion:Xe,retroreflection:He,iridescence:le,iridescenceMap:J,iridescenceThicknessMap:de,sheen:mt,sheenColorMap:pe,sheenRoughnessMap:z,specularMap:Z,specularColorMap:ne,specularIntensityMap:C,transmission:Ae,transmissionMap:K,thicknessMap:B,gradientMap:re,opaque:_.transparent===!1&&_.blending===Vi&&_.alphaToCoverage===!1,alphaMap:oe,alphaTest:he,alphaHash:Re,combine:_.combine,mapUv:Ie&&p(_.map.channel),aoMapUv:st&&p(_.aoMap.channel),lightMapUv:fe&&p(_.lightMap.channel),bumpMapUv:Oe&&p(_.bumpMap.channel),normalMapUv:Ne&&p(_.normalMap.channel),displacementMapUv:We&&p(_.displacementMap.channel),emissiveMapUv:me&&p(_.emissiveMap.channel),metalnessMapUv:Se&&p(_.metalnessMap.channel),roughnessMapUv:Ue&&p(_.roughnessMap.channel),anisotropyMapUv:Fe&&p(_.anisotropyMap.channel),clearcoatMapUv:T&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:v&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&p(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Q&&p(_.diffuseRoughnessMap.channel),iridescenceMapUv:J&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:de&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:z&&p(_.sheenRoughnessMap.channel),specularMapUv:Z&&p(_.specularMap.channel),specularColorMapUv:ne&&p(_.specularColorMap.channel),specularIntensityMapUv:C&&p(_.specularIntensityMap.channel),transmissionMapUv:K&&p(_.transmissionMap.channel),thicknessMapUv:B&&p(_.thicknessMap.channel),alphaMapUv:oe&&p(_.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Ne||$e),vertexNormals:!!P.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!P.attributes.uv&&(Ie||oe),fog:!!Y,useFog:_.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||P.attributes.normal===void 0&&Ne===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:ve,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:we,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:O.filter(Me=>Me.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:Ie&&_.map.isVideoTexture===!0&&ot.getTransfer(_.map.colorSpace)===vt,decodeVideoTextureEmissive:me&&_.emissiveMap.isVideoTexture===!0&&ot.getTransfer(_.emissiveMap.colorSpace)===vt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===un,flipSided:_.side===Yt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Ye&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&_.extensions.multiDraw===!0||Et)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ze.vertexUv1s=c.has(1),Ze.vertexUv2s=c.has(2),Ze.vertexUv3s=c.has(3),c.clear(),Ze}function S(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const I in _.defines)y.push(I),y.push(_.defines[I]);return _.isRawShaderMaterial===!1&&(m(y,_),u(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function m(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapPMREM),_.push(y.envMapMaxLod),_.push(y.envMapSize),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.diffuseRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.numSunLights),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numSunLightShadows),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.numLightProbeGrids),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function u(_,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.retroreflection&&a.enable(24),y.diffuseRoughness&&a.enable(25),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),y.packedNormalMap&&a.enable(22),y.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),y.numLightProbeGrids>0&&a.enable(22),y.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function b(_){const y=f[_.type];let I;if(y){const N=xn[y];I=cd.clone(N.uniforms)}else I=_.uniforms;return I}function w(_,y){let I=d.get(y);return I!==void 0?++I.usedTimes:(I=new Bp(i,y,_,s),l.push(I),d.set(y,I)),I}function E(_){if(--_.usedTimes===0){const y=l.indexOf(_);l[y]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function R(_){o.remove(_)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:S,getUniforms:b,acquireProgram:w,releaseProgram:E,releaseShaderCache:R,programs:l,dispose:A}}function Wp(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Xp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Zo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Jo(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function o(f,p,x,S,m,u){let b=i[e];return b===void 0?(b={id:f.id,object:f,geometry:p,material:x,materialVariant:a(f),groupOrder:S,renderOrder:f.renderOrder,z:m,group:u},i[e]=b):(b.id=f.id,b.object=f,b.geometry=p,b.material=x,b.materialVariant=a(f),b.groupOrder=S,b.renderOrder=f.renderOrder,b.z=m,b.group=u),e++,b}function c(f,p,x,S,m,u,b){b.reversedDepth===!0&&(m=-m);const w=o(f,p,x,S,m,u);x.transmission>0?n.push(w):x.transparent===!0?s.push(w):t.push(w)}function l(f,p,x,S,m,u){const b=o(f,p,x,S,m,u);x.transmission>0?n.unshift(b):x.transparent===!0?s.unshift(b):t.unshift(b)}function d(f,p){t.length>1&&t.sort(f||Xp),n.length>1&&n.sort(p||Zo),s.length>1&&s.sort(p||Zo)}function g(){for(let f=e,p=i.length;f<p;f++){const x=i[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:d}}function jp(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Jo,i.set(n,[a])):s>=r.length?(a=new Jo,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function qp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new tt};break;case"SpotLight":t={position:new H,direction:new H,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function Yp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Kp=0;function $p(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Zp(i){const e=new qp,t=Yp(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);const s=new H,r=new yt,a=new yt;function o(l){let d=0,g=0,f=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,x=0,S=0,m=0,u=0,b=0,w=0,E=0,R=0,A=0,_=0,y=0,I=0,N=0;l.sort($p);for(let O=0,Y=l.length;O<Y;O++){const P=l[O],j=P.color,F=P.intensity,W=P.distance;let se=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ri?se=P.shadow.map.texture:se=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=j.r*F,g+=j.g*F,f+=j.b*F;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],F);N++}else if(P.isSunLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,ae=t.get(P);ae.shadowIntensity=te.intensity,ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[x]=ae,n.sunShadowMap[x]=se;const we=te.getViewportCount();for(let Ve=0;Ve<we;Ve++)n.sunShadowMatrix[S+Ve]=te.getMatrix(Ve),n.sunShadowCascade[S+Ve]=te._cascadeData[Ve];S+=we,x++}n.sun[p]=q,p++}else if(P.isDirectionalLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,ae=t.get(P);ae.shadowIntensity=te.intensity,ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize=te.mapSize,n.directionalShadow[m]=ae,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=P.shadow.matrix,R++}n.directional[m]=q,m++}else if(P.isSpotLight){const q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(j).multiplyScalar(F),q.distance=W,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[b]=q;const te=P.shadow;if(P.map&&(n.spotLightMap[y]=P.map,y++,te.updateMatrices(P),P.castShadow&&I++),n.spotLightMatrix[b]=te.matrix,P.castShadow){const ae=t.get(P);ae.shadowIntensity=te.intensity,ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize=te.mapSize,n.spotShadow[b]=ae,n.spotShadowMap[b]=se,_++}b++}else if(P.isRectAreaLight){const q=e.get(P);q.color.copy(j).multiplyScalar(F),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[w]=q,w++}else if(P.isPointLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const te=P.shadow,ae=t.get(P);ae.shadowIntensity=te.intensity,ae.shadowBias=te.bias,ae.shadowNormalBias=te.normalBias,ae.shadowRadius=te.radius,ae.shadowMapSize=te.mapSize,ae.shadowCameraNear=te.camera.near,ae.shadowCameraFar=te.camera.far,n.pointShadow[u]=ae,n.pointShadowMap[u]=se,n.pointShadowMatrix[u]=P.shadow.matrix,A++}n.point[u]=q,u++}else if(P.isHemisphereLight){const q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(F),q.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[E]=q,E++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=g,n.ambient[2]=f;const U=n.hash;(U.sunLength!==p||U.directionalLength!==m||U.pointLength!==u||U.spotLength!==b||U.rectAreaLength!==w||U.hemiLength!==E||U.numSunShadows!==x||U.numDirectionalShadows!==R||U.numPointShadows!==A||U.numSpotShadows!==_||U.numSpotMaps!==y||U.numLightProbes!==N)&&(n.sun.length=p,n.directional.length=m,n.spot.length=b,n.rectArea.length=w,n.point.length=u,n.hemi.length=E,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.directionalShadowMatrix.length=R,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+y-I,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=N,U.sunLength=p,U.directionalLength=m,U.pointLength=u,U.spotLength=b,U.rectAreaLength=w,U.hemiLength=E,U.numSunShadows=x,U.numDirectionalShadows=R,U.numPointShadows=A,U.numSpotShadows=_,U.numSpotMaps=y,U.numLightProbes=N,n.version=Kp++)}function c(l,d){let g=0,f=0,p=0,x=0,S=0,m=0;const u=d.matrixWorldInverse;for(let b=0,w=l.length;b<w;b++){const E=l[b];if(E.isSunLight){const R=n.sun[g];R.direction.setFromMatrixPosition(E.matrixWorld),R.direction.transformDirection(u),g++}else if(E.isDirectionalLight){const R=n.directional[f];R.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(u),f++}else if(E.isSpotLight){const R=n.spot[x];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(u),R.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(u),x++}else if(E.isRectAreaLight){const R=n.rectArea[S];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(u),a.identity(),r.copy(E.matrixWorld),r.premultiply(u),a.extractRotation(r),R.halfWidth.set(E.width*.5,0,0),R.halfHeight.set(0,E.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),S++}else if(E.isPointLight){const R=n.point[p];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(u),p++}else if(E.isHemisphereLight){const R=n.hemi[m];R.direction.setFromMatrixPosition(E.matrixWorld),R.direction.transformDirection(u),m++}}}return{setup:o,setupView:c,state:n}}function Qo(i){const e=new Zp(i),t=[],n=[],s=[];function r(g){d.camera=g,t.length=0,n.length=0,s.length=0}function a(g){g.isLightProbeGrid?s.push(g):t.push(g)}function o(g){n.push(g)}function c(){e.setup(t),s.sort((g,f)=>g.priority-f.priority||g.id-f.id)}function l(g){e.setupView(t,g)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Jp(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Qo(i),e.set(s,[o])):r>=a.length?(o=new Qo(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,em=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,tm=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],nm=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],el=new yt,Gi=new H,Lr=new H;function im(i,e,t){let n=new $i;const s=new nt,r=new nt,a=new Tt,o=new fd,c=new pd,l={},d=t.maxTextureSize,g={[si]:Yt,[Yt]:si,[un]:un},f=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Qp,fragmentShader:em}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const x=new Xt;x.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new rn(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ns;let u=this.type;this.render=function(A,_,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Ql&&(je("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ns);const I=i.getRenderTarget(),N=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Ti),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const Y=u!==this.type;Y&&_.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(j=>j.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,j=A.length;P<j;P++){const F=A[P],W=F.shadow;if(W===void 0){je("WebGLShadowMap:",F,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const se=W.getFrameExtents();s.multiply(se),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/se.x),s.x=r.x*se.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/se.y),s.y=r.y*se.y,W.mapSize.y=r.y));const q=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=q,W.map===null||Y===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Hi){if(F.isPointLight){je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new En(s.x,s.y,{format:ri,type:An,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),W.map.texture.name=F.name+".shadowMap",W.map.depthTexture=new Ci(s.x,s.y,Mn),W.map.depthTexture.name=F.name+".shadowMapDepth",W.map.depthTexture.format=qn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ot,W.map.depthTexture.magFilter=Ot}else F.isPointLight?(W.map=new Va(s.x),W.map.depthTexture=new Pl(s.x,Tn)):(W.map=new En(s.x,s.y),W.map.depthTexture=new Ci(s.x,s.y,Tn)),W.map.depthTexture.name=F.name+".shadowMap",W.map.depthTexture.format=qn,this.type===Ns?(W.map.depthTexture.compareFunction=q?Sl:Ml,W.map.depthTexture.minFilter=Kt,W.map.depthTexture.magFilter=Kt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ot,W.map.depthTexture.magFilter=Ot);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const te=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();F.isPointLight!==!0&&W.updateMatrices(F,y);const ae=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:y.layers;for(let we=0;we<te;we++){const Ve=W.getCamera(we);if(F.isPointLight){const ee=W.camera,_e=W.matrix,be=F.distance||ee.far;be!==ee.far&&(ee.far=be,ee.updateProjectionMatrix()),Gi.setFromMatrixPosition(F.matrixWorld),ee.position.copy(Gi),Lr.copy(ee.position),Lr.add(tm[we]),ee.up.copy(nm[we]),ee.lookAt(Lr),ee.updateMatrixWorld(),_e.makeTranslation(-Gi.x,-Gi.y,-Gi.z),el.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),W._frustum.setFromProjectionMatrix(el,ee.coordinateSystem,ee.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,we),i.clear();else{we===0&&(i.setRenderTarget(W.map),i.clear());const ee=W.getViewport(we);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),O.viewport(a)}n=W.getFrustum(we),E(_,y,Ve,F,ae,this.type)}W.isPointLightShadow!==!0&&this.type===Hi&&b(W,y),W.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(I,N,U)};function b(A,_){const y=e.update(S);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new En(s.x,s.y,{format:ri,type:An}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(_,null,y,f,S,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(_,null,y,p,S,null)}function w(A,_,y,I){let N=null;const U=y.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)N=U;else if(N=y.isPointLight===!0?c:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const O=N.uuid,Y=_.uuid;let P=l[O];P===void 0&&(P={},l[O]=P);let j=P[Y];j===void 0&&(j=N.clone(),P[Y]=j,_.addEventListener("dispose",R)),N=j}if(N.visible=_.visible,N.wireframe=_.wireframe,I===Hi?N.side=_.shadowSide!==null?_.shadowSide:_.side:N.side=_.shadowSide!==null?_.shadowSide:g[_.side],N.alphaMap=_.alphaMap,N.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,N.map=_.map,N.clipShadows=_.clipShadows,N.clippingPlanes=_.clippingPlanes,N.clipIntersection=_.clipIntersection,N.displacementMap=_.displacementMap,N.displacementScale=_.displacementScale,N.displacementBias=_.displacementBias,N.wireframeLinewidth=_.wireframeLinewidth,N.linewidth=_.linewidth,y.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const O=i.properties.get(N);O.light=y}return N}function E(A,_,y,I,N,U){if(A.visible===!1)return;if(A.layers.test(N)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&U===Hi)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,A.matrixWorld);const P=e.update(A),j=A.material;if(Array.isArray(j)){const F=P.groups;for(let W=0,se=F.length;W<se;W++){const q=F[W],te=j[q.materialIndex];if(te&&te.visible){const ae=w(A,te,I,U);A.onBeforeShadow(i,A,_,y,P,ae,q),i.renderBufferDirect(y,null,P,ae,A,q),A.onAfterShadow(i,A,_,y,P,ae,q)}}}else if(j.visible){const F=w(A,j,I,U);A.onBeforeShadow(i,A,_,y,P,F,null),i.renderBufferDirect(y,null,P,F,A,null),A.onAfterShadow(i,A,_,y,P,F,null)}}const Y=A.children;for(let P=0,j=Y.length;P<j;P++)E(Y[P],_,y,I,N,U)}function R(A){A.target.removeEventListener("dispose",R);for(const y in l){const I=l[y],N=A.target.uuid;N in I&&(I[N].dispose(),delete I[N])}}}function sm(i,e){function t(){let C=!1;const K=new Tt;let B=null;const re=new Tt(0,0,0,0);return{setMask:function(oe){B!==oe&&!C&&(i.colorMask(oe,oe,oe,oe),B=oe)},setLocked:function(oe){C=oe},setClear:function(oe,he,Re,Ye,ue){ue===!0&&(oe*=Ye,he*=Ye,Re*=Ye),K.set(oe,he,Re,Ye),re.equals(K)===!1&&(i.clearColor(oe,he,Re,Ye),re.copy(K))},reset:function(){C=!1,B=null,re.set(-1,0,0,0)}}}function n(){let C=!1,K=!1,B=null,re=null,oe=null;return{setReversed:function(he){if(K!==he){const Re=e.get("EXT_clip_control");he?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),K=he;const Ye=oe;oe=null,this.setClear(Ye)}},getReversed:function(){return K},setTest:function(he){he?ve(i.DEPTH_TEST):Be(i.DEPTH_TEST)},setMask:function(he){B!==he&&!C&&(i.depthMask(he),B=he)},setFunc:function(he){if(K&&(he=Dc[he]),re!==he){switch(he){case Or:i.depthFunc(i.NEVER);break;case Br:i.depthFunc(i.ALWAYS);break;case Gr:i.depthFunc(i.LESS);break;case ji:i.depthFunc(i.LEQUAL);break;case zr:i.depthFunc(i.EQUAL);break;case Hr:i.depthFunc(i.GEQUAL);break;case kr:i.depthFunc(i.GREATER);break;case Vr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=he}},setLocked:function(he){C=he},setClear:function(he){oe!==he&&(oe=he,K&&(he=1-he),i.clearDepth(he))},reset:function(){C=!1,B=null,re=null,oe=null,K=!1}}}function s(){let C=!1,K=null,B=null,re=null,oe=null,he=null,Re=null,Ye=null,ue=null;return{setTest:function(Ge){C||(Ge?ve(i.STENCIL_TEST):Be(i.STENCIL_TEST))},setMask:function(Ge){K!==Ge&&!C&&(i.stencilMask(Ge),K=Ge)},setFunc:function(Ge,Ze,Me){(B!==Ge||re!==Ze||oe!==Me)&&(i.stencilFunc(Ge,Ze,Me),B=Ge,re=Ze,oe=Me)},setOp:function(Ge,Ze,Me){(he!==Ge||Re!==Ze||Ye!==Me)&&(i.stencilOp(Ge,Ze,Me),he=Ge,Re=Ze,Ye=Me)},setLocked:function(Ge){C=Ge},setClear:function(Ge){ue!==Ge&&(i.clearStencil(Ge),ue=Ge)},reset:function(){C=!1,K=null,B=null,re=null,oe=null,he=null,Re=null,Ye=null,ue=null}}}const r=new t,a=new n,o=new s;let c={};const l=new WeakMap;let d={},g={},f={},p=new WeakMap,x=[],S=null,m=!1,u=null,b=null,w=null,E=null,R=null,A=null,_=null,y=new tt(0,0,0),I=0,N=!1,U=null,O=null,Y=null,P=null,j=null;const F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,se=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=se>=1):q.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=se>=2);let te=null,ae={};const we=i.getParameter(i.SCISSOR_BOX),Ve=i.getParameter(i.VIEWPORT),ee=new Tt().fromArray(we),_e=new Tt().fromArray(Ve);function be(C,K,B,re){const oe=new Uint8Array(4),he=i.createTexture();i.bindTexture(C,he),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<B;Re++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,re,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(K+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return he}const Le={};Le[i.TEXTURE_2D]=be(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[i.TEXTURE_2D_ARRAY]=be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ve(i.DEPTH_TEST),a.setFunc(ji),Oe(!1),Ne(Ja),ve(i.CULL_FACE),st(Ti);function ve(C){d[C]!==!0&&(i.enable(C),d[C]=!0)}function Be(C){d[C]!==!1&&(i.disable(C),d[C]=!1)}function Et(C,K){return f[C]!==K?(i.bindFramebuffer(C,K),f[C]=K,C===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=K),C===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=K),!0):!1}function Ie(C,K){let B=x,re=!1;if(C){B=p.get(K),B===void 0&&(B=[],p.set(K,B));const oe=C.textures;if(B.length!==oe.length||B[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Re=oe.length;he<Re;he++)B[he]=i.COLOR_ATTACHMENT0+he;B.length=oe.length,re=!0}}else B[0]!==i.BACK&&(B[0]=i.BACK,re=!0);re&&i.drawBuffers(B)}function it(C){return S!==C?(i.useProgram(C),S=C,!0):!1}const ut={[yi]:i.FUNC_ADD,[tc]:i.FUNC_SUBTRACT,[nc]:i.FUNC_REVERSE_SUBTRACT};ut[ic]=i.MIN,ut[sc]=i.MAX;const Je={[rc]:i.ZERO,[ac]:i.ONE,[oc]:i.SRC_COLOR,[il]:i.SRC_ALPHA,[fc]:i.SRC_ALPHA_SATURATE,[uc]:i.DST_COLOR,[cc]:i.DST_ALPHA,[lc]:i.ONE_MINUS_SRC_COLOR,[sl]:i.ONE_MINUS_SRC_ALPHA,[hc]:i.ONE_MINUS_DST_COLOR,[dc]:i.ONE_MINUS_DST_ALPHA,[pc]:i.CONSTANT_COLOR,[mc]:i.ONE_MINUS_CONSTANT_COLOR,[gc]:i.CONSTANT_ALPHA,[_c]:i.ONE_MINUS_CONSTANT_ALPHA};function st(C,K,B,re,oe,he,Re,Ye,ue,Ge){if(C===Ti){m===!0&&(Be(i.BLEND),m=!1);return}if(m===!1&&(ve(i.BLEND),m=!0),C!==ec){if(C!==u||Ge!==N){if((b!==yi||R!==yi)&&(i.blendEquation(i.FUNC_ADD),b=yi,R=yi),Ge)switch(C){case Vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFunc(i.ONE,i.ONE);break;case Qa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:pt("WebGLState: Invalid blending: ",C);break}else switch(C){case Vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Qa:pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eo:pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:pt("WebGLState: Invalid blending: ",C);break}w=null,E=null,A=null,_=null,y.set(0,0,0),I=0,u=C,N=Ge}return}oe=oe||K,he=he||B,Re=Re||re,(K!==b||oe!==R)&&(i.blendEquationSeparate(ut[K],ut[oe]),b=K,R=oe),(B!==w||re!==E||he!==A||Re!==_)&&(i.blendFuncSeparate(Je[B],Je[re],Je[he],Je[Re]),w=B,E=re,A=he,_=Re),(Ye.equals(y)===!1||ue!==I)&&(i.blendColor(Ye.r,Ye.g,Ye.b,ue),y.copy(Ye),I=ue),u=C,N=!1}function fe(C,K){C.side===un?Be(i.CULL_FACE):ve(i.CULL_FACE);let B=C.side===Yt;K&&(B=!B),Oe(B),C.blending===Vi&&C.transparent===!1?st(Ti):st(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const re=C.stencilWrite;o.setTest(re),re&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),me(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ve(i.SAMPLE_ALPHA_TO_COVERAGE):Be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(C){U!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),U=C)}function Ne(C){C!==Zl?(ve(i.CULL_FACE),C!==O&&(C===Ja?i.cullFace(i.BACK):C===Jl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Be(i.CULL_FACE),O=C}function We(C){C!==Y&&(W&&i.lineWidth(C),Y=C)}function me(C,K,B){C?(ve(i.POLYGON_OFFSET_FILL),(P!==K||j!==B)&&(P=K,j=B,a.getReversed()&&(K=-K,B=-B),i.polygonOffset(K,B))):Be(i.POLYGON_OFFSET_FILL)}function Se(C){C?ve(i.SCISSOR_TEST):Be(i.SCISSOR_TEST)}function Ue(C){C===void 0&&(C=i.TEXTURE0+F-1),te!==C&&(i.activeTexture(C),te=C)}function $e(C,K,B){B===void 0&&(te===null?B=i.TEXTURE0+F-1:B=te);let re=ae[B];re===void 0&&(re={type:void 0,texture:void 0},ae[B]=re),(re.type!==C||re.texture!==K)&&(te!==B&&(i.activeTexture(B),te=B),i.bindTexture(C,K||Le[C]),re.type=C,re.texture=K)}function L(){const C=ae[te];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function ht(){try{i.compressedTexImage2D(...arguments)}catch(C){pt("WebGLState:",C)}}function Xe(){try{i.compressedTexImage3D(...arguments)}catch(C){pt("WebGLState:",C)}}function He(){try{i.texSubImage2D(...arguments)}catch(C){pt("WebGLState:",C)}}function le(){try{i.texSubImage3D(...arguments)}catch(C){pt("WebGLState:",C)}}function mt(){try{i.compressedTexSubImage2D(...arguments)}catch(C){pt("WebGLState:",C)}}function Ae(){try{i.compressedTexSubImage3D(...arguments)}catch(C){pt("WebGLState:",C)}}function Fe(){try{i.texStorage2D(...arguments)}catch(C){pt("WebGLState:",C)}}function T(){try{i.texStorage3D(...arguments)}catch(C){pt("WebGLState:",C)}}function v(){try{i.texImage2D(...arguments)}catch(C){pt("WebGLState:",C)}}function G(){try{i.texImage3D(...arguments)}catch(C){pt("WebGLState:",C)}}function Q(C){return g[C]!==void 0?g[C]:i.getParameter(C)}function J(C,K){g[C]!==K&&(i.pixelStorei(C,K),g[C]=K)}function de(C){ee.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),ee.copy(C))}function pe(C){_e.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),_e.copy(C))}function z(C,K){let B=l.get(K);B===void 0&&(B=new WeakMap,l.set(K,B));let re=B.get(C);re===void 0&&(re=i.getUniformBlockIndex(K,C.name),i.uniformBlockBinding(K,re,re),B.set(C,re))}function Z(C,K,B){const oe=l.get(K).get(C);c[oe]!==B&&(i.bindBufferBase(i.UNIFORM_BUFFER,oe,B),c[oe]=B)}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},g={},te=null,ae={},f={},c={},p=new WeakMap,x=[],S=null,m=!1,u=null,b=null,w=null,E=null,R=null,A=null,_=null,y=new tt(0,0,0),I=0,N=!1,U=null,O=null,Y=null,P=null,j=null,ee.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ve,disable:Be,bindFramebuffer:Et,drawBuffers:Ie,useProgram:it,setBlending:st,setMaterial:fe,setFlipSided:Oe,setCullFace:Ne,setLineWidth:We,setPolygonOffset:me,setScissorTest:Se,activeTexture:Ue,bindTexture:$e,unbindTexture:L,compressedTexImage2D:ht,compressedTexImage3D:Xe,texImage2D:v,texImage3D:G,pixelStorei:J,getParameter:Q,updateUBOMapping:z,uniformBlockBinding:Z,texStorage2D:Fe,texStorage3D:T,texSubImage2D:He,texSubImage3D:le,compressedTexSubImage2D:mt,compressedTexSubImage3D:Ae,scissor:de,viewport:pe,reset:ne}}function rm(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,d=new WeakMap,g=new Set;let f;const p=new WeakMap,x=new Set,S=new FinalizationRegistry(T=>x.delete(T));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function u(T,v){return m?new OffscreenCanvas(T,v):Vs("canvas")}function b(T,v,G){let Q=1;const J=Fe(T);if((J.width>G||J.height>G)&&(Q=G/Math.max(J.width,J.height)),Q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const de=Math.floor(Q*J.width),pe=Math.floor(Q*J.height);f===void 0&&(f=u(de,pe));const z=v?u(de,pe):f;return z.width=de,z.height=pe,z.getContext("2d").drawImage(T,0,0,de,pe),je("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+de+"x"+pe+")."),z}else return"data"in T&&je("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function w(T){return T.generateMipmaps}function E(T){i.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(T,v,G,Q,J,de=!1){if(T!==null){if(i[T]!==void 0)return i[T];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let pe;Q&&(pe=e.get("EXT_texture_norm16"),pe||je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let z=v;if(v===i.RED&&(G===i.FLOAT&&(z=i.R32F),G===i.HALF_FLOAT&&(z=i.R16F),G===i.UNSIGNED_BYTE&&(z=i.R8),G===i.UNSIGNED_SHORT&&pe&&(z=pe.R16_EXT),G===i.SHORT&&pe&&(z=pe.R16_SNORM_EXT)),v===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(z=i.R8UI),G===i.UNSIGNED_SHORT&&(z=i.R16UI),G===i.UNSIGNED_INT&&(z=i.R32UI),G===i.BYTE&&(z=i.R8I),G===i.SHORT&&(z=i.R16I),G===i.INT&&(z=i.R32I)),v===i.RG&&(G===i.FLOAT&&(z=i.RG32F),G===i.HALF_FLOAT&&(z=i.RG16F),G===i.UNSIGNED_BYTE&&(z=i.RG8),G===i.UNSIGNED_SHORT&&pe&&(z=pe.RG16_EXT),G===i.SHORT&&pe&&(z=pe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(z=i.RG8UI),G===i.UNSIGNED_SHORT&&(z=i.RG16UI),G===i.UNSIGNED_INT&&(z=i.RG32UI),G===i.BYTE&&(z=i.RG8I),G===i.SHORT&&(z=i.RG16I),G===i.INT&&(z=i.RG32I)),v===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(z=i.RGB8UI),G===i.UNSIGNED_SHORT&&(z=i.RGB16UI),G===i.UNSIGNED_INT&&(z=i.RGB32UI),G===i.BYTE&&(z=i.RGB8I),G===i.SHORT&&(z=i.RGB16I),G===i.INT&&(z=i.RGB32I)),v===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),G===i.UNSIGNED_INT&&(z=i.RGBA32UI),G===i.BYTE&&(z=i.RGBA8I),G===i.SHORT&&(z=i.RGBA16I),G===i.INT&&(z=i.RGBA32I)),v===i.RGB&&(G===i.UNSIGNED_SHORT&&pe&&(z=pe.RGB16_EXT),G===i.SHORT&&pe&&(z=pe.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(z=i.R11F_G11F_B10F)),v===i.RGBA){const Z=de?ks:ot.getTransfer(J);G===i.FLOAT&&(z=i.RGBA32F),G===i.HALF_FLOAT&&(z=i.RGBA16F),G===i.UNSIGNED_BYTE&&(z=Z===vt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&pe&&(z=pe.RGBA16_EXT),G===i.SHORT&&pe&&(z=pe.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),z}function _(T,v){let G;return T?v===null||v===Tn||v===wi?G=i.DEPTH24_STENCIL8:v===Mn?G=i.DEPTH32F_STENCIL8:v===Yi&&(G=i.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Tn||v===wi?G=i.DEPTH_COMPONENT24:v===Mn?G=i.DEPTH_COMPONENT32F:v===Yi&&(G=i.DEPTH_COMPONENT16),G}function y(T,v){return w(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ot&&T.minFilter!==Kt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function I(T){const v=new WeakRef(T);n.get(T).__ref=v,x.add(v),S.register(T,v,v)}function N(T){const v=n.get(T).__ref;v!==void 0&&(x.delete(v),S.unregister(v))}function U(T){Y(T.target)}function O(T){P(T.target)}function Y(T){T.removeEventListener("dispose",U),N(T),F(T),T.isVideoTexture&&d.delete(T),T.isHTMLTexture&&g.delete(T)}function P(T){T.removeEventListener("dispose",O),N(T),se(T)}function j(){for(const T of x){const v=T.deref();v!==void 0&&(v.isRenderTarget===!0?P(v):Y(v))}x.clear(),g.clear()}function F(T){const v=n.get(T);if(v.__webglInit===void 0)return;const G=T.source,Q=p.get(G);if(Q){const J=Q[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&W(T),Object.keys(Q).length===0&&p.delete(G)}n.remove(T)}function W(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const G=T.source,Q=p.get(G);delete Q[v.__cacheKey],a.memory.textures--}function se(T){const v=n.get(T);v.__depthDisposeCallback&&v.__depthDisposeCallback();const G=T.depthTexture;if(G&&G.renderTarget===T&&Y(G),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(v.__webglFramebuffer[J]))for(let de=0;de<v.__webglFramebuffer[J].length;de++)i.deleteFramebuffer(v.__webglFramebuffer[J][de]);else i.deleteFramebuffer(v.__webglFramebuffer[J]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[J])}else{if(Array.isArray(v.__webglFramebuffer))for(let J=0;J<v.__webglFramebuffer.length;J++)i.deleteFramebuffer(v.__webglFramebuffer[J]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let J=0;J<v.__webglColorRenderbuffer.length;J++)v.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[J]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const Q=T.textures;for(let J=0,de=Q.length;J<de;J++){const pe=n.get(Q[J]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(Q[J])}n.remove(T)}let q=0;function te(){q=0}function ae(){return q}function we(T){q=T}function Ve(){const T=q;return T>=s.maxTextures&&je("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,T}function ee(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.mipmapsAutoUpdate),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function _e(T,v){const G=n.get(T);if(T.isVideoTexture&&mt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&G.__version!==T.version){const Q=T.image;if(Q===null)je("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)je("WebGLRenderer: Texture marked for update but image is incomplete");else{fe(G,T,v);return}}else T.isExternalTexture&&(G.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+v)}function be(T,v){const G=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){fe(G,T,v);return}else T.isExternalTexture&&(G.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+v)}function Le(T,v){const G=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){fe(G,T,v);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+v)}function ve(T,v){const G=n.get(T);if(T.version>0&&G.__version!==T.version){Oe(G,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+v)}const Be={[Bs]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[Wr]:i.MIRRORED_REPEAT},Et={[Ot]:i.NEAREST,[Mc]:i.NEAREST_MIPMAP_NEAREST,[ss]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[ir]:i.LINEAR_MIPMAP_NEAREST,[Xn]:i.LINEAR_MIPMAP_LINEAR},Ie={[bc]:i.NEVER,[yl]:i.ALWAYS,[Tc]:i.LESS,[Ml]:i.LEQUAL,[Ac]:i.EQUAL,[Sl]:i.GEQUAL,[Rc]:i.GREATER,[wc]:i.NOTEQUAL};function it(T,v){if(v.type===Mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Kt||v.magFilter===ir||v.magFilter===ss||v.magFilter===Xn||v.minFilter===Kt||v.minFilter===ir||v.minFilter===ss||v.minFilter===Xn)&&je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Be[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Be[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Be[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Et[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Et[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ie[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ot||v.minFilter!==ss&&v.minFilter!==Xn||v.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ut(T,v){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",U),I(v));const Q=v.source;let J=p.get(Q);J===void 0&&(J={},p.set(Q,J));const de=ee(v);if(de!==T.__cacheKey){J[de]===void 0&&(J[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),J[de].usedTimes++;const pe=J[T.__cacheKey];pe!==void 0&&(J[T.__cacheKey].usedTimes--,pe.usedTimes===0&&W(v)),T.__cacheKey=de,T.__webglTexture=J[de].texture}return G}function Je(T,v,G){return Math.floor(Math.floor(T/G)/v)}function st(T,v,G,Q){const de=T.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,G,Q,v.data);else{de.sort((C,K)=>C.start-K.start);let pe=0;for(let C=1;C<de.length;C++){const K=de[pe],B=de[C],re=K.start+K.count,oe=Je(B.start,v.width,4),he=Je(K.start,v.width,4);B.start<=re+1&&oe===he&&Je(B.start+B.count-1,v.width,4)===oe?K.count=Math.max(K.count,B.start+B.count-K.start):(++pe,de[pe]=B)}de.length=pe+1;const z=t.getParameter(i.UNPACK_ROW_LENGTH),Z=t.getParameter(i.UNPACK_SKIP_PIXELS),ne=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let C=0,K=de.length;C<K;C++){const B=de[C],re=Math.floor(B.start/4),oe=Math.ceil(B.count/4),he=re%v.width,Re=Math.floor(re/v.width),Ye=oe,ue=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,he),t.pixelStorei(i.UNPACK_SKIP_ROWS,Re),t.texSubImage2D(i.TEXTURE_2D,0,he,Re,Ye,ue,G,Q,v.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(i.UNPACK_SKIP_ROWS,ne)}}function fe(T,v,G){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);const J=ut(T,v),de=v.source;t.bindTexture(Q,T.__webglTexture,i.TEXTURE0+G);const pe=n.get(de);if(de.version!==pe.__version||J===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ue=ot.getPrimaries(ot.workingColorSpace),Ge=v.colorSpace===Wn?null:ot.getPrimaries(v.colorSpace),Ze=v.colorSpace===Wn||ue===Ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let Z=b(v.image,!1,s.maxTextureSize);Z=Ae(v,Z);const ne=r.convert(v.format,v.colorSpace),C=r.convert(v.type);let K=A(v.internalFormat,ne,C,v.normalized,v.colorSpace,v.isVideoTexture);it(Q,v);let B;const re=v.mipmaps,oe=v.isVideoTexture!==!0,he=pe.__version===void 0||J===!0,Re=de.dataReady,Ye=y(v,Z);if(v.isDepthTexture)K=_(v.format===jn,v.type),he&&(oe?t.texStorage2D(i.TEXTURE_2D,1,K,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,K,Z.width,Z.height,0,ne,C,null));else if(v.isDataTexture)if(re.length>0){oe&&he&&t.texStorage2D(i.TEXTURE_2D,Ye,K,re[0].width,re[0].height);for(let ue=0,Ge=re.length;ue<Ge;ue++)B=re[ue],oe?Re&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,B.width,B.height,ne,C,B.data):t.texImage2D(i.TEXTURE_2D,ue,K,B.width,B.height,0,ne,C,B.data);v.generateMipmaps=!1}else oe?(he&&t.texStorage2D(i.TEXTURE_2D,Ye,K,Z.width,Z.height),Re&&st(v,Z,ne,C)):t.texImage2D(i.TEXTURE_2D,0,K,Z.width,Z.height,0,ne,C,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){oe&&he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ye,K,re[0].width,re[0].height,Z.depth);for(let ue=0,Ge=re.length;ue<Ge;ue++)if(B=re[ue],v.format!==Sn)if(ne!==null)if(oe){if(Re)if(v.layerUpdates.size>0){const Ze=Do(B.width,B.height,v.format,v.type);for(const Me of v.layerUpdates){const ft=B.data.subarray(Me*Ze/B.data.BYTES_PER_ELEMENT,(Me+1)*Ze/B.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,Me,B.width,B.height,1,ne,ft)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,B.width,B.height,Z.depth,ne,B.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,K,B.width,B.height,Z.depth,0,B.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?Re&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,B.width,B.height,Z.depth,ne,C,B.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,K,B.width,B.height,Z.depth,0,ne,C,B.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{oe&&he&&t.texStorage2D(i.TEXTURE_2D,Ye,K,re[0].width,re[0].height);for(let ue=0,Ge=re.length;ue<Ge;ue++)B=re[ue],v.format!==Sn?ne!==null?oe?Re&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,B.width,B.height,ne,B.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,K,B.width,B.height,0,B.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?Re&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,B.width,B.height,ne,C,B.data):t.texImage2D(i.TEXTURE_2D,ue,K,B.width,B.height,0,ne,C,B.data)}else if(v.isDataArrayTexture)if(oe){if(he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ye,K,Z.width,Z.height,Z.depth),Re)if(v.layerUpdates.size>0){const ue=Do(Z.width,Z.height,v.format,v.type);for(const Ge of v.layerUpdates){const Ze=Z.data.subarray(Ge*ue/Z.data.BYTES_PER_ELEMENT,(Ge+1)*ue/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ge,Z.width,Z.height,1,ne,C,Ze)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ne,C,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,K,Z.width,Z.height,Z.depth,0,ne,C,Z.data);else if(v.isData3DTexture)oe?(he&&t.texStorage3D(i.TEXTURE_3D,Ye,K,Z.width,Z.height,Z.depth),Re&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ne,C,Z.data)):t.texImage3D(i.TEXTURE_3D,0,K,Z.width,Z.height,Z.depth,0,ne,C,Z.data);else if(v.isFramebufferTexture){if(he)if(oe)t.texStorage2D(i.TEXTURE_2D,Ye,K,Z.width,Z.height);else{let ue=Z.width,Ge=Z.height;for(let Ze=0;Ze<Ye;Ze++)t.texImage2D(i.TEXTURE_2D,Ze,K,ue,Ge,0,ne,C,null),ue>>=1,Ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const ue=i.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),Z.parentNode!==ue){ue.appendChild(Z),g.add(v),ue.onpaint=Ge=>{const Ze=Ge.changedElements;for(const Me of g)Ze.includes(Me.image)&&(Me.needsUpdate=!0)},ue.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{const Ze=i.RGBA,Me=i.RGBA,ft=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ze,Me,ft,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(re.length>0){if(oe&&he){const ue=Fe(re[0]);t.texStorage2D(i.TEXTURE_2D,Ye,K,ue.width,ue.height)}for(let ue=0,Ge=re.length;ue<Ge;ue++)B=re[ue],oe?Re&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ne,C,B):t.texImage2D(i.TEXTURE_2D,ue,K,ne,C,B);v.generateMipmaps=!1}else if(oe){if(he){const ue=Fe(Z);t.texStorage2D(i.TEXTURE_2D,Ye,K,ue.width,ue.height)}Re&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ne,C,Z)}else t.texImage2D(i.TEXTURE_2D,0,K,ne,C,Z);w(v)&&v.mipmapsAutoUpdate===!0&&E(Q),pe.__version=de.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Oe(T,v,G){if(v.image.length!==6)return;const Q=ut(T,v),J=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+G);const de=n.get(J);if(J.version!==de.__version||Q===!0){t.activeTexture(i.TEXTURE0+G);const pe=ot.getPrimaries(ot.workingColorSpace),z=v.colorSpace===Wn?null:ot.getPrimaries(v.colorSpace),Z=v.colorSpace===Wn||pe===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const ne=v.isCompressedTexture||v.image[0].isCompressedTexture,C=v.image[0]&&v.image[0].isDataTexture,K=[];for(let Me=0;Me<6;Me++)!ne&&!C?K[Me]=b(v.image[Me],!0,s.maxCubemapSize):K[Me]=C?v.image[Me].image:v.image[Me],K[Me]=Ae(v,K[Me]);const B=K[0],re=r.convert(v.format,v.colorSpace),oe=r.convert(v.type);let he=A(v.internalFormat,re,oe,v.normalized,v.colorSpace);const Re=v.isVideoTexture!==!0,Ye=de.__version===void 0||Q===!0,ue=J.dataReady;let Ge=y(v,B);it(i.TEXTURE_CUBE_MAP,v);let Ze;if(v.isDepthTexture){if(he=_(v.format===jn,v.type),Ye)if(Re)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,he,B.width,B.height);else for(let Me=0;Me<6;Me++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,he,B.width,B.height,0,re,oe,null)}else if(ne){Re&&Ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ge,he,B.width,B.height);for(let Me=0;Me<6;Me++){Ze=K[Me].mipmaps;for(let ft=0;ft<Ze.length;ft++){const $=Ze[ft];v.format!==Sn?re!==null?Re?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft,0,0,$.width,$.height,re,$.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft,he,$.width,$.height,0,$.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft,0,0,$.width,$.height,re,oe,$.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft,he,$.width,$.height,0,re,oe,$.data)}}}else{if(Ze=v.mipmaps,Re&&Ye){Ze.length>0&&Ge++;const Me=Fe(K[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ge,he,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(C){Re?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,K[Me].width,K[Me].height,re,oe,K[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,he,K[Me].width,K[Me].height,0,re,oe,K[Me].data);for(let ft=0;ft<Ze.length;ft++){const ie=Ze[ft].image[Me].image;Re?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft+1,0,0,ie.width,ie.height,re,oe,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft+1,he,ie.width,ie.height,0,re,oe,ie.data)}}else{Re?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,re,oe,K[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,he,re,oe,K[Me]);for(let ft=0;ft<Ze.length;ft++){const $=Ze[ft];Re?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft+1,0,0,re,oe,$.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ft+1,he,re,oe,$.image[Me])}}}w(v)&&v.mipmapsAutoUpdate===!0&&E(i.TEXTURE_CUBE_MAP),de.__version=J.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Ne(T,v,G,Q,J,de){const pe=r.convert(G.format,G.colorSpace),z=r.convert(G.type),Z=A(G.internalFormat,pe,z,G.normalized,G.colorSpace),ne=n.get(v),C=n.get(G);if(C.__renderTarget=v,!ne.__hasExternalTextures){const K=Math.max(1,v.width>>de),B=Math.max(1,v.height>>de);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,de,Z,K,B,v.depth,0,pe,z,null):t.texImage2D(J,de,Z,K,B,0,pe,z,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),le(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,J,C.__webglTexture,0,He(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,J,C.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(T,v,G){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const Q=v.depthTexture,J=Q&&Q.isDepthTexture?Q.type:null,de=_(v.stencilBuffer,J),pe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;le(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(v),de,v.width,v.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(v),de,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,de,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,T)}else{const Q=v.textures;for(let J=0;J<Q.length;J++){const de=Q[J],pe=r.convert(de.format,de.colorSpace),z=r.convert(de.type),Z=A(de.internalFormat,pe,z,de.normalized,de.colorSpace);le(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(v),Z,v.width,v.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(v),Z,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Z,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function me(T,v,G){const Q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=n.get(v.depthTexture);J.__renderTarget=v;const de=Q?v.depthTexture.image[0]:v.depthTexture.image;(!J.__webglTexture||de.width!==v.width||de.height!==v.height)&&(de.width=v.width,de.height=v.height,v.depthTexture.needsUpdate=!0),Q?ve(v.depthTexture,0):_e(v.depthTexture,0);const pe=J.__webglTexture,z=He(v),Z=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ne=v.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===qn)le(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Z,pe,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Z,pe,0);else if(v.depthTexture.format===jn)le(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Z,pe,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Z,pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Se(T){const v=n.get(T),G=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Q=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Q){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Q.removeEventListener("dispose",J)};Q.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=Q}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(G)for(let Q=0;Q<6;Q++)me(v.__webglFramebuffer[Q],T,Q);else T.texture.mipmaps.length>0?me(v.__webglFramebuffer[0],T,0):me(v.__webglFramebuffer,T,0);else if(G){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]===void 0)v.__webglDepthbuffer[Q]=i.createRenderbuffer(),We(v.__webglDepthbuffer[Q],T,!1);else{const J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=v.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,de)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),We(v.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,de)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(T,v,G){const Q=n.get(T);v!==void 0&&Ne(Q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Se(T)}function $e(T){const v=T.texture,G=n.get(T),Q=n.get(v);T.addEventListener("dispose",O),I(T);const J=T.textures,de=T.isWebGLCubeRenderTarget===!0,pe=J.length>1;if(pe||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,a.memory.textures++),de){G.__webglFramebuffer=[];for(let z=0;z<6;z++)if(v.mipmaps.length>0){G.__webglFramebuffer[z]=[];for(let Z=0;Z<v.mipmaps.length;Z++)G.__webglFramebuffer[z][Z]=i.createFramebuffer()}else G.__webglFramebuffer[z]=i.createFramebuffer()}else{if(v.mipmaps.length>0){G.__webglFramebuffer=[];for(let z=0;z<v.mipmaps.length;z++)G.__webglFramebuffer[z]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(pe)for(let z=0,Z=J.length;z<Z;z++){const ne=n.get(J[z]);ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&le(T)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let z=0;z<J.length;z++){const Z=J[z];G.__webglColorRenderbuffer[z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[z]);const ne=r.convert(Z.format,Z.colorSpace),C=r.convert(Z.type),K=A(Z.internalFormat,ne,C,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),B=He(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,B,K,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,G.__webglColorRenderbuffer[z])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),We(G.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),it(i.TEXTURE_CUBE_MAP,v);for(let z=0;z<6;z++)if(v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)Ne(G.__webglFramebuffer[z][Z],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,Z);else Ne(G.__webglFramebuffer[z],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);w(v)?E(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(pe){for(let z=0,Z=J.length;z<Z;z++){const ne=J[z],C=n.get(ne);let K=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(K=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,C.__webglTexture),it(K,ne),Ne(G.__webglFramebuffer,T,ne,i.COLOR_ATTACHMENT0+z,K,0),w(ne)&&E(K)}t.unbindTexture()}else{let z=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(z=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(z,Q.__webglTexture),it(z,v),v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)Ne(G.__webglFramebuffer[Z],T,v,i.COLOR_ATTACHMENT0,z,Z);else Ne(G.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,z,0);w(v)?E(z):v.mipmaps.length>0&&i.texParameteri(z,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&Se(T)}function L(T){const v=T.textures;for(let G=0,Q=v.length;G<Q;G++){const J=v[G];if(w(J)&&J.mipmapsAutoUpdate===!0){const de=R(T),pe=n.get(J).__webglTexture;t.bindTexture(de,pe),E(de),t.unbindTexture()}}}const ht=[];function Xe(T){if(T.samples>0){if(le(T)===!1){const v=T.textures,G=T.width,Q=T.height;let J=i.COLOR_BUFFER_BIT;const de=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=n.get(T),z=v.length>1;if(z)for(let ne=0;ne<v.length;ne++)t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ne=0;ne<v.length;ne++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pe.__webglColorRenderbuffer[ne]);const C=n.get(v[ne]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,G,Q,0,0,G,Q,J,i.NEAREST),c===!0&&(ht.length=0,ht.push(i.COLOR_ATTACHMENT0+ne),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&ht.push(de),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),z)for(let ne=0;ne<v.length;ne++){t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,pe.__webglColorRenderbuffer[ne]);const C=n.get(v[ne]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.TEXTURE_2D,C,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function He(T){return Math.min(s.maxSamples,T.samples)}function le(T){const v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function mt(T){const v=a.render.frame;d.get(T)!==v&&(d.set(T,v),T.update())}function Ae(T,v){const G=T.colorSpace,Q=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==Hs&&G!==Wn&&(ot.getTransfer(G)===vt?(Q!==Sn||J!==Qt)&&je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):pt("WebGLTextures: Unsupported texture color space:",G)),v}function Fe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Ve,this.resetTextureUnits=te,this.getTextureUnits=ae,this.setTextureUnits=we,this.setTexture2D=_e,this.setTexture2DArray=be,this.setTexture3D=Le,this.setTextureCube=ve,this.rebindTextures=Ue,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=le,this.dispose=j}function am(i,e){function t(n,s=Wn){let r;const a=ot.getTransfer(s);if(n===Qt)return i.UNSIGNED_BYTE;if(n===La)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Da)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ml)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fl)return i.BYTE;if(n===pl)return i.SHORT;if(n===Yi)return i.UNSIGNED_SHORT;if(n===Na)return i.INT;if(n===Tn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===_l)return i.ALPHA;if(n===xl)return i.RGB;if(n===Sn)return i.RGBA;if(n===qn)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===vl)return i.RED;if(n===Ia)return i.RED_INTEGER;if(n===ri)return i.RG;if(n===Ua)return i.RG_INTEGER;if(n===Fa)return i.RGBA_INTEGER;if(n===Ls||n===Ds||n===Is||n===Us)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ls)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ls)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xr||n===jr||n===qr||n===Yr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===qr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Kr||n===$r||n===Zr||n===Jr||n===Qr||n===Gs||n===ea)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Kr||n===$r)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Zr)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Jr)return r.COMPRESSED_R11_EAC;if(n===Qr)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Gs)return r.COMPRESSED_RG11_EAC;if(n===ea)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ta||n===na||n===ia||n===sa||n===ra||n===aa||n===oa||n===la||n===ca||n===da||n===ua||n===ha||n===fa||n===pa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ta)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===na)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ia)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ra)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===aa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===la)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ca)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===da)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ua)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ha)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ma||n===ga||n===_a)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ma)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ga)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xa||n===va||n===zs||n===Ma)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===va)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ma)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const om=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class cm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Nl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ai({vertexShader:om,fragmentShader:lm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rn(new Zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dm extends oi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,g=null,f=null,p=null,x=null;const S=typeof XRWebGLBinding<"u",m=new cm,u={},b=t.getContextAttributes();let w=null,E=null;const R=[],A=[],_=new nt;let y=null,I=null;const N=new sn;N.viewport=new Tt;const U=new sn;U.viewport=new Tt;const O=[N,U],Y=new Md;let P=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let _e=R[ee];return _e===void 0&&(_e=new hr,R[ee]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(ee){let _e=R[ee];return _e===void 0&&(_e=new hr,R[ee]=_e),_e.getGripSpace()},this.getHand=function(ee){let _e=R[ee];return _e===void 0&&(_e=new hr,R[ee]=_e),_e.getHandSpace()};function F(ee){const _e=A.indexOf(ee.inputSource);if(_e===-1)return;const be=R[_e];be!==void 0&&(be.update(ee.inputSource,ee.frame,l||a),be.dispatchEvent({type:ee.type,data:ee.inputSource}))}function W(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",se);for(let ee=0;ee<R.length;ee++){const _e=A[ee];_e!==null&&(A[ee]=null,R[ee].disconnect(_e))}P=null,j=null,m.reset();for(const ee in u)delete u[ee];if(e.setRenderTarget(w),p=null,f=null,g=null,s=null,E=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(_.width,_.height,!1),I!==null){const ee=I.camera;ee.fov=I.fov,ee.zoom=I.zoom,ee.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return g===null&&S&&(g=new XRWebGLBinding(s,t)),g},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",W),s.addEventListener("inputsourceschange",se),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(_),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Le=null,ve=null;b.depth&&(ve=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=b.stencil?jn:qn,Le=b.stencil?wi:Tn);const Be={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};g=this.getBinding(),f=g.createProjectionLayer(Be),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new En(f.textureWidth,f.textureHeight,{format:Sn,type:Qt,depthTexture:new Ci(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const be={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,be),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new En(p.framebufferWidth,p.framebufferHeight,{format:Sn,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ve.setContext(s),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(ee){for(let _e=0;_e<ee.removed.length;_e++){const be=ee.removed[_e],Le=A.indexOf(be);Le>=0&&(A[Le]=null,R[Le].disconnect(be))}for(let _e=0;_e<ee.added.length;_e++){const be=ee.added[_e];let Le=A.indexOf(be);if(Le===-1){for(let Be=0;Be<R.length;Be++)if(Be>=A.length){A.push(be),Le=Be;break}else if(A[Be]===null){A[Be]=be,Le=Be;break}if(Le===-1)break}const ve=R[Le];ve&&ve.connect(be)}}function q(ee,_e){_e===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(_e.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let _e=ee.near,be=ee.far;m.texture!==null&&(m.depthNear>0&&(_e=m.depthNear),m.depthFar>0&&(be=m.depthFar)),Y.near=U.near=N.near=_e,Y.far=U.far=N.far=be,(P!==Y.near||j!==Y.far)&&(s.updateRenderState({depthNear:Y.near,depthFar:Y.far}),P=Y.near,j=Y.far),Y.layers.mask=ee.layers.mask|6,N.layers.mask=Y.layers.mask&-5,U.layers.mask=Y.layers.mask&-3;const Le=ee.parent,ve=Y.cameras;q(Y,Le);for(let Be=0;Be<ve.length;Be++)q(ve[Be],Le);Y.projectionMatrix.copy(N.projectionMatrix),Y.projectionMatrixInverse.copy(N.projectionMatrixInverse),I===null&&ee.isPerspectiveCamera&&(I={camera:ee,fov:ee.fov,zoom:ee.zoom}),te(ee,Y,Le)};function te(ee,_e,be){be===null?ee.matrix.copy(_e.matrixWorld):(ee.matrix.copy(be.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(_e.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(_e.projectionMatrix),ee.projectionMatrixInverse.copy(_e.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=ya*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(ee){c=ee,f!==null&&(f.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Y)},this.getCameraTexture=function(ee){return u[ee]};let ae=null;function we(ee,_e){if(d=_e.getViewerPose(l||a),x=_e,d!==null){const be=d.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let Le=!1;be.length!==Y.cameras.length&&(Y.cameras.length=0,Le=!0);for(let Ie=0;Ie<be.length;Ie++){const it=be[Ie];let ut=null;if(p!==null)ut=p.getViewport(it);else{const st=g.getViewSubImage(f,it);ut=st.viewport,Ie===0&&(e.setRenderTargetTextures(E,st.colorTexture,st.depthStencilTexture),e.setRenderTarget(E))}let Je=O[Ie];Je===void 0&&(Je=new sn,Je.layers.enable(Ie),Je.viewport=new Tt,O[Ie]=Je),Je.matrix.fromArray(it.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(it.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(ut.x,ut.y,ut.width,ut.height),Ie===0&&(Y.matrix.copy(Je.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),Le===!0&&Y.cameras.push(Je)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){g=n.getBinding();const Ie=g.getDepthInformation(be[0]);Ie&&Ie.isValid&&Ie.texture&&m.init(Ie,s.renderState)}if(ve&&ve.includes("camera-access")&&S){e.state.unbindTexture(),g=n.getBinding();for(let Ie=0;Ie<be.length;Ie++){const it=be[Ie].camera;if(it){let ut=u[it];ut||(ut=new Nl,u[it]=ut);const Je=g.getCameraImage(it);ut.sourceTexture=Je}}}}for(let be=0;be<R.length;be++){const Le=A[be],ve=R[be];Le!==null&&ve!==void 0&&ve.update(Le,_e,l||a)}ae&&ae(ee,_e),_e.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_e}),x=null}const Ve=new Ul;Ve.setAnimationLoop(we),this.setAnimationLoop=function(ee){ae=ee},this.dispose=function(){}}}const um=new yt,Xl=new qe;Xl.set(-1,0,0,0,1,0,0,0,1);function hm(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,Ll(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,b,w,E){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(m,u):u.isMeshLambertMaterial?(r(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(m,u),g(m,u)):u.isMeshPhongMaterial?(r(m,u),d(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,E)):u.isMeshMatcapMaterial?(r(m,u),x(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),S(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?c(m,u,b,w):u.isSpriteMaterial?l(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Yt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Yt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const b=e.get(u),w=b.envMap,E=b.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(um.makeRotationFromEuler(E)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Xl),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function c(m,u,b,w){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*b,m.scale.value=w*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function l(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function g(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,b){m.ior.value=u.ior,u.diffuseRoughness>0&&(m.diffuseRoughness.value=u.diffuseRoughness,u.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=u.diffuseRoughnessMap,t(u.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Yt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.retroreflectivity>0&&(m.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=u.iridescenceThicknessMaximum,u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,u){u.matcap&&(m.matcap.value=u.matcap)}function S(m,u){const b=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function fm(i,e,t,n){let s={},r={};function a(b,w){const E=w.program;n.uniformBlockBinding(b,E,s[b.id])}function o(b,w){let E=s[b.id];E===void 0&&(x(b),E=c(b),s[b.id]=E,b.addEventListener("dispose",m));const R=w.program;n.updateUBOMapping(b,R);const A=e.render.frame;r[b.id]!==A&&(l(b),r[b.id]=A)}function c(b){const w=i.createBuffer(),E=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,E,R),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function l(b){const w=s[b.id],E=b.uniforms,R=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let A=0,_=E.length;A<_;A++){const y=E[A];if(Array.isArray(y))for(let I=0,N=y.length;I<N;I++)d(y[I],A,I,R);else d(y,A,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,w,E,R){if(f(b,w,E,R)===!0){const A=b.__offset,_=b.value;if(Array.isArray(_)){let y=0;for(let I=0;I<_.length;I++){const N=_[I],U=S(N,!0);g(N,b.__data,y),y+=U.storage/Float32Array.BYTES_PER_ELEMENT}}else g(_,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,A,b.__data)}}function g(b,w,E){typeof b=="number"||typeof b=="boolean"?w[E]=b:b.isMatrix3?(w[E]=b.elements[0],w[E+1]=b.elements[1],w[E+2]=b.elements[2],w[E+3]=0,w[E+4]=b.elements[3],w[E+5]=b.elements[4],w[E+6]=b.elements[5],w[E+7]=0,w[E+8]=b.elements[6],w[E+9]=b.elements[7],w[E+10]=b.elements[8],w[E+11]=0):ArrayBuffer.isView(b)?w.set(b.subarray(0,w.length-E),E):b.toArray(w,E)}function f(b,w,E,R){const A=b.value,_=w+"_"+E;if(Array.isArray(A)){R[_]===void 0&&(R[_]=[]);const y=R[_];let I=!1;for(let N=0;N<A.length;N++)p(A[N],y,N)===!0&&(I=!0);return I}return p(A,R,_)}function p(b,w,E){if(w[E]===void 0)return typeof b=="number"||typeof b=="boolean"?w[E]=b:ArrayBuffer.isView(b)?w[E]=b.slice():w[E]=b.clone(),!0;{const R=w[E];if(typeof b=="number"||typeof b=="boolean"){if(R!==b)return w[E]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(R.equals(b)===!1)return R.copy(b),!0}}return!1}function x(b){const w=b.uniforms;let E=0;const R=16;for(let _=0,y=w.length;_<y;_++){const I=Array.isArray(w[_])?w[_]:[w[_]];for(let N=0,U=I.length;N<U;N++){const O=I[N],Y=Array.isArray(O.value)?O.value:[O.value],P=Array.isArray(w[_])||Array.isArray(O.value);let j=E;for(let W=0,se=Y.length;W<se;W++){const q=Y[W],te=S(q,P),ae=E%R,we=ae%te.boundary,Ve=ae+we;E+=we,Ve!==0&&R-Ve<te.storage&&(E+=R-Ve),W===0&&(j=E),E+=te.storage}const F=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new F((E-j)/Float32Array.BYTES_PER_ELEMENT),O.__offset=j}}const A=E%R;return A>0&&(E+=R-A),b.__size=E,b.__cache={},this}function S(b,w){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=16,E.storage=48):b.isMatrix4?(E.boundary=16,E.storage=64):b.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(E.boundary=16,E.storage=b.byteLength):je("WebGLRenderer: Unsupported uniform value type.",b),w===!0&&(E.boundary=16,E.storage=Math.ceil(E.storage/16)*16),E}function m(b){const w=b.target;w.removeEventListener("dispose",m),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function u(){for(const b in s)i.deleteBuffer(s[b]);s={},r={}}return{bind:a,update:o,dispose:u}}const pm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function mm(){return _n===null&&(_n=new rd(pm,16,16,ri,An),_n.name="DFG_LUT",_n.minFilter=Kt,_n.magFilter=Kt,_n.wrapS=vn,_n.wrapT=vn,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class gm{constructor(e={}){const{canvas:t=Nc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Qt}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;const S=p,m=new Set([Fa,Ua,Ia]),u=new Set([Qt,Tn,Yi,wi,La,Da]),b=new Uint32Array(4),w=new Int32Array(4),E={textures:[],min:[],max:[],resolution:[]};let R=null,A=null;const _=[],y=[];let I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let U=!1,O=null,Y=null,P=null,j=null;this._outputColorSpace=nn;let F=0,W=0,se=null,q=-1,te=null;const ae=new Tt,we=new Tt;let Ve=null;const ee=new tt(0);let _e=0,be=t.width,Le=t.height,ve=1,Be=null,Et=null;const Ie=new Tt(0,0,be,Le),it=new Tt(0,0,be,Le);let ut=!1;const Je=new $i,st=new za;let fe=!1,Oe=!1;const Ne=new yt,We=new H,me=new Tt,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function $e(){return se===null?ve:1}let L=n;function ht(M,D){return t.getContext(M,D)}let Xe,He,le,mt,Ae,Fe,T,v,G,Q,J,de,pe,z,Z,ne,C,K,B,re,oe,he,Re;try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",Ge,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",Me,!1),L===null){const D="webgl2";if(L=ht(D,M),L===null)throw ht(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ye()}catch(M){throw t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),pt("WebGLRenderer: "+M.message),M}function Ye(){Xe=new vf(L),Xe.init(),oe=new am(L,Xe),He=new lf(L,Xe,e,oe),le=new sm(L,Xe),He.reversedDepthBuffer&&f&&le.buffers.depth.setReversed(!0),Y=L.createFramebuffer(),P=L.createFramebuffer(),j=L.createFramebuffer(),mt=new yf(L),Ae=new Wp,Fe=new rm(L,Xe,le,Ae,He,oe,mt),T=new xf(N),v=new Ed(L),he=new af(L,v),G=new Mf(L,v,mt,he),Q=new bf(L,G,v,he,mt),K=new Ef(L,He,Fe),Z=new cf(Ae),J=new Vp(N,T,Xe,He,he,Z),de=new hm(N,Ae),pe=new jp,z=new Jp(Xe),C=new rf(N,T,le,Q,x,c),ne=new im(N,Q,He),Re=new fm(L,mt,He,le),B=new of(L,Xe,mt),re=new Sf(L,Xe,mt),mt.programs=J.programs,N.capabilities=He,N.extensions=Xe,N.properties=Ae,N.renderLists=pe,N.shadowMap=ne,N.state=le,N.info=mt}S!==Qt&&(I=new Af(S,t.width,t.height,o,s,r));const ue=new dm(N,L);this.xr=ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=Xe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Xe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(M){M!==void 0&&(ve=M,this.setSize(be,Le,!1))},this.getSize=function(M){return M.set(be,Le)},this.setSize=function(M,D,X=!0){if(ue.isPresenting){je("WebGLRenderer: Can't change size while VR device is presenting.");return}be=M,Le=D,t.width=Math.floor(M*ve),t.height=Math.floor(D*ve),X===!0&&(t.style.width=M+"px",t.style.height=D+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(be*ve,Le*ve).floor()},this.setDrawingBufferSize=function(M,D,X){be=M,Le=D,ve=X,t.width=Math.floor(M*X),t.height=Math.floor(D*X),this.setViewport(0,0,M,D)},this.setEffects=function(M){if(S===Qt){pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let D=0;D<M.length;D++)if(M[D].isOutputPass===!0){je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ae)},this.getViewport=function(M){return M.copy(Ie)},this.setViewport=function(M,D,X,k){M.isVector4?Ie.set(M.x,M.y,M.z,M.w):Ie.set(M,D,X,k),le.viewport(ae.copy(Ie).multiplyScalar($e()).round())},this.getScissor=function(M){return M.copy(it)},this.setScissor=function(M,D,X,k){M.isVector4?it.set(M.x,M.y,M.z,M.w):it.set(M,D,X,k),le.scissor(we.copy(it).multiplyScalar($e()).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(M){le.setScissorTest(ut=M)},this.setOpaqueSort=function(M){Be=M},this.setTransparentSort=function(M){Et=M},this.getClearColor=function(M){return M.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(M=!0,D=!0,X=!0){let k=0;if(M){let V=!1;if(se!==null){const ge=se.texture.format;V=m.has(ge)}if(V){const ge=se.texture.type,Te=u.has(ge),xe=C.getClearColor(),Ee=C.getClearAlpha(),De=xe.r,Ke=xe.g,rt=xe.b;Te?(b[0]=De,b[1]=Ke,b[2]=rt,b[3]=Ee,L.clearBufferuiv(L.COLOR,0,b)):(w[0]=De,w[1]=Ke,w[2]=rt,w[3]=Ee,L.clearBufferiv(L.COLOR,0,w))}else k|=L.COLOR_BUFFER_BIT}D&&(k|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),O=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),C.dispose(),pe.dispose(),z.dispose(),Fe.dispose(),Ae.dispose(),T.dispose(),Q.dispose(),G.dispose(),he.dispose(),Re.dispose(),J.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Nt),ue.removeEventListener("sessionend",Fn),Gt.stop()};function Ge(M){M.preventDefault(),io("WebGLRenderer: Context Lost."),U=!0}function Ze(){io("WebGLRenderer: Context Restored."),U=!1;const M=mt.autoReset,D=ne.enabled,X=ne.autoUpdate,k=ne.needsUpdate,V=ne.type;Ye(),mt.autoReset=M,ne.enabled=D,ne.autoUpdate=X,ne.needsUpdate=k,ne.type=V}function Me(M){pt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ft(M){const D=M.target;D.removeEventListener("dispose",ft),$(D)}function $(M){ie(M),Ae.remove(M)}function ie(M){const D=Ae.get(M).programs;D!==void 0&&(D.forEach(function(X){J.releaseProgram(X)}),M.isShaderMaterial&&J.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,X,k,V,ge){D===null&&(D=Se);const Te=V.isMesh&&V.matrixWorld.determinantAffine()<0,xe=Rt(M,D,X,k,V);le.setMaterial(k,Te);let Ee=X.index,De=1;if(k.wireframe===!0){if(Ee=G.getWireframeAttribute(X),Ee===void 0)return;De=2}const Ke=X.drawRange,rt=X.attributes.position;let Ce=Ke.start*De,at=(Ke.start+Ke.count)*De;ge!==null&&(Ce=Math.max(Ce,ge.start*De),at=Math.min(at,(ge.start+ge.count)*De)),Ee!==null?(Ce=Math.max(Ce,0),at=Math.min(at,Ee.count)):rt!=null&&(Ce=Math.max(Ce,0),at=Math.min(at,rt.count));const wt=at-Ce;if(wt<0||wt===1/0)return;he.setup(V,k,xe,X,Ee);let St,Mt=B;if(Ee!==null&&(St=v.get(Ee),Mt=re,Mt.setIndex(St)),V.isMesh)k.wireframe===!0?(le.setLineWidth(k.wireframeLinewidth*$e()),Mt.setMode(L.LINES)):Mt.setMode(L.TRIANGLES);else if(V.isLine){let zt=k.linewidth;zt===void 0&&(zt=1),le.setLineWidth(zt*$e()),V.isLineSegments?Mt.setMode(L.LINES):V.isLineLoop?Mt.setMode(L.LINE_LOOP):Mt.setMode(L.LINE_STRIP)}else V.isPoints?Mt.setMode(L.POINTS):V.isSprite&&Mt.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))Mt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const zt=V._multiDrawStarts,Pe=V._multiDrawCounts,jt=V._multiDrawCount,gt=Ee?v.get(Ee).bytesPerElement:1,Jn=Ae.get(k).currentProgram.getUniforms();for(let Ht=0;Ht<jt;Ht++)Jn.setValue(L,"_gl_DrawID",Ht),Mt.render(zt[Ht]/gt,Pe[Ht])}else if(V.isInstancedMesh)Mt.renderInstances(Ce,wt,V.count);else if(X.isInstancedBufferGeometry){const zt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Pe=Math.min(X.instanceCount,zt);Mt.renderInstances(Ce,wt,Pe)}else Mt.render(Ce,wt)};function _t(M,D,X,k){O!==null&&M.isNodeMaterial&&O.setObject(k,M),fe===!0&&Z.setState(M,X,!1),M.transparent===!0&&M.side===un&&M.forceSinglePass===!1?(M.side=Yt,M.needsUpdate=!0,Kn(M,D,k),M.side=si,M.needsUpdate=!0,Kn(M,D,k),M.side=un):Kn(M,D,k)}this.compile=function(M,D,X=null){X===null&&(X=M),O!==null&&O.renderStart(M,D,X),A=z.get(X),A.init(D),y.push(A),X.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),M!==X&&M.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),A.setupLights(),O!==null&&O.updateLights(A.state.lightsArray),Oe=this.localClippingEnabled,fe=Z.init(this.clippingPlanes,Oe),fe===!0&&Z.setGlobalState(this.clippingPlanes,D),O!==null&&ne.render(A.state.shadowsArray,X,D);const k=new Set;return M.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ge=V.material;if(ge)if(Array.isArray(ge))for(let Te=0;Te<ge.length;Te++){const xe=ge[Te];_t(xe,X,D,V),k.add(xe)}else _t(ge,X,D,V),k.add(ge)}),A=y.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(M,D,X=null){const k=this.compile(M,D,X);return new Promise(V=>{function ge(){if(k.forEach(function(Te){const Ee=Ae.get(Te).currentProgram;(Ee===void 0||Ee.isReady())&&k.delete(Te)}),k.size===0){V(M);return}setTimeout(ge,10)}Xe.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let ze=null;function ke(M){ze&&ze(M)}function Nt(){Gt.stop()}function Fn(){Gt.start()}const Gt=new Ul;Gt.setAnimationLoop(ke),typeof self<"u"&&Gt.setContext(self),this.setAnimationLoop=function(M){ze=M,ue.setAnimationLoop(M),M===null?Gt.stop():Gt.start()},ue.addEventListener("sessionstart",Nt),ue.addEventListener("sessionend",Fn),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;O!==null&&O.renderStart(M,D);const X=ue.enabled===!0&&ue.isPresenting===!0,k=I!==null&&(se===null||X)&&I.begin(N,se);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(D),D=ue.getCamera()),M.isScene===!0&&M.onBeforeRender(N,M,D,se),A=z.get(M,y.length),A.init(D),A.state.textureUnits=Fe.getTextureUnits(),y.push(A),Ne.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?st.setFromArrayCamera(D):Je.setFromProjectionMatrix(Ne,fn,D.reversedDepth),Oe=this.localClippingEnabled,fe=Z.init(this.clippingPlanes,Oe),R=pe.get(M,_.length),R.init(),_.push(R),this.info.render.frame++,ue.enabled===!0&&ue.isPresenting===!0){const Te=N.xr.getDepthSensingMesh();Te!==null&&Rn(Te,D,-1/0,N.sortObjects)}Rn(M,D,0,N.sortObjects),R.finish(),O!==null&&O.updateLights(A.state.lightsArray),N.sortObjects===!0&&R.sort(Be,Et),Ue=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,Ue&&C.addToRenderList(R,M),this.info.autoReset===!0&&this.info.reset(),fe===!0&&Z.beginShadows();const V=A.state.shadowsArray;if(ne.render(V,M,D),fe===!0&&Z.endShadows(),(k&&I.hasRenderPass())===!1){const Te=R.opaque,xe=R.transmissive;if(A.setupLights(),D.isArrayCamera){const Ee=D.cameras;if(xe.length>0)for(let De=0,Ke=Ee.length;De<Ke;De++){const rt=Ee[De];At(Te,xe,M,rt)}Ue&&C.render(M);for(let De=0,Ke=Ee.length;De<Ke;De++){const rt=Ee[De];en(R,M,rt,rt.viewport)}}else xe.length>0&&At(Te,xe,M,D),Ue&&C.render(M),en(R,M,D)}se!==null&&W===0&&(Fe.updateMultisampleRenderTarget(se),Fe.updateRenderTargetMipmap(se)),k&&I.end(N),M.isScene===!0&&M.onAfterRender(N,M,D),he.resetDefaultState(),q=-1,te=null,y.pop(),y.length>0?(A=y[y.length-1],Fe.setTextureUnits(A.state.textureUnits),fe===!0&&Z.setGlobalState(N.clippingPlanes,A.state.camera)):A=null,_.pop(),_.length>0?R=_[_.length-1]:R=null,O!==null&&O.renderEnd()};function Rn(M,D,X,k){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){const Te=D.isArrayCamera?st:Je;if(!M.frustumCulled||M.intersectsFrustum(Te)){k&&me.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ne);const xe=Q.update(M),Ee=M.material;Ee.visible&&R.push(M,xe,Ee,X,me.z,null,D)}}else if(M.isMesh||M.isLine||M.isPoints){const Te=D.isArrayCamera?st:Je;if(!M.frustumCulled||M.intersectsFrustum(Te)){const xe=Q.update(M),Ee=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),me.copy(M.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),me.copy(xe.boundingSphere.center)),me.applyMatrix4(M.matrixWorld).applyMatrix4(Ne)),Array.isArray(Ee)){const De=xe.groups;for(let Ke=0,rt=De.length;Ke<rt;Ke++){const Ce=De[Ke],at=Ee[Ce.materialIndex];at&&at.visible&&R.push(M,xe,at,X,me.z,Ce,D)}}else Ee.visible&&R.push(M,xe,Ee,X,me.z,null,D)}}}const ge=M.children;for(let Te=0,xe=ge.length;Te<xe;Te++)Rn(ge[Te],D,X,k)}function en(M,D,X,k){const{opaque:V,transmissive:ge,transparent:Te}=M;A.setupLightsView(X),fe===!0&&Z.setGlobalState(N.clippingPlanes,X),k&&le.viewport(ae.copy(k)),V.length>0&&mn(V,D,X),ge.length>0&&mn(ge,D,X),Te.length>0&&mn(Te,D,X),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function At(M,D,X,k){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[k.id]===void 0){const Ce=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[k.id]=new En(1,1,{generateMipmaps:!0,type:Ce?An:Qt,minFilter:Xn,samples:Math.max(4,He.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}const ge=A.state.transmissionRenderTarget[k.id],Te=k.viewport||ae;ge.setSize(Te.z*N.transmissionResolutionScale,Te.w*N.transmissionResolutionScale);const xe=N.getRenderTarget(),Ee=N.getActiveCubeFace(),De=N.getActiveMipmapLevel();N.setRenderTarget(ge),N.getClearColor(ee),_e=N.getClearAlpha(),_e<1&&N.setClearColor(16777215,.5),N.clear(),Ue&&C.render(X);const Ke=N.toneMapping;N.toneMapping=In;const rt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),A.setupLightsView(k),fe===!0&&Z.setGlobalState(N.clippingPlanes,k),mn(M,X,k),Fe.updateMultisampleRenderTarget(ge),Fe.updateRenderTargetMipmap(ge),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let at=0,wt=D.length;at<wt;at++){const St=D[at],{object:Mt,geometry:zt,material:Pe,group:jt}=St;if(Pe.side===un&&Mt.layers.test(k.layers)){const gt=Pe.side;Pe.side=Yt,Pe.needsUpdate=!0,Di(Mt,X,k,zt,Pe,jt),Pe.side=gt,Pe.needsUpdate=!0,Ce=!0}}Ce===!0&&(Fe.updateMultisampleRenderTarget(ge),Fe.updateRenderTargetMipmap(ge))}N.setRenderTarget(xe,Ee,De),N.setClearColor(ee,_e),rt!==void 0&&(k.viewport=rt),N.toneMapping=Ke}function mn(M,D,X){const k=D.isScene===!0?D.overrideMaterial:null;for(let V=0,ge=M.length;V<ge;V++){const Te=M[V],{object:xe,geometry:Ee,group:De}=Te;let Ke=Te.material;Ke.allowOverride===!0&&k!==null&&(Ke=k),xe.layers.test(X.layers)&&Di(xe,D,X,Ee,Ke,De)}}function Di(M,D,X,k,V,ge){O!==null&&V.isNodeMaterial&&O.setObject(M,V),M.onBeforeRender(N,D,X,k,V,ge),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),V.onBeforeRender(N,D,X,k,M,ge),V.transparent===!0&&V.side===un&&V.forceSinglePass===!1?(V.side=Yt,V.needsUpdate=!0,N.renderBufferDirect(X,D,k,V,M,ge),V.side=si,V.needsUpdate=!0,N.renderBufferDirect(X,D,k,V,M,ge),V.side=un):N.renderBufferDirect(X,D,k,V,M,ge),M.onAfterRender(N,D,X,k,V,ge)}function ns(M){let D=0;for(const X of M)X.texture!==null&&D++;return D}function Kn(M,D,X){D.isScene!==!0&&(D=Se);const k=Ae.get(M),V=A.state.lights,ge=A.state.shadowsArray,Te=V.state.version,xe=J.getParameters(M,V.state,ge,D,X,A.state.lightProbeGridArray),Ee=J.getProgramCacheKey(xe);let De=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const Ke=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=T.get(M.envMap||k.environment,Ke),k.envMapRotation=k.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",ft),De=new Map,k.programs=De,k.programVariants=new Map);let rt=De.get(Ee);if(rt!==void 0){if(k.currentProgram===rt&&k.lightsStateVersion===Te)return Qe(M,xe),rt}else xe.uniforms=J.getUniforms(M),O!==null&&M.isNodeMaterial&&O.build(M,X,xe),M.onBeforeCompile(xe,N),rt=J.acquireProgram(xe,Ee),De.set(Ee,rt),k.uniforms=xe.uniforms;const Ce=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ce.clippingPlanes=Z.uniform),Qe(M,xe),k.needsLights=Zn(M),k.lightsStateVersion=Te,k.needsLights&&(Ce.ambientLightColor.value=V.state.ambient,Ce.lightProbe.value=V.state.probe,Ce.sunLights.value=V.state.sun,Ce.sunLightShadows.value=V.state.sunShadow,Ce.directionalLights.value=V.state.directional,Ce.directionalLightShadows.value=V.state.directionalShadow,Ce.spotLights.value=V.state.spot,Ce.spotLightShadows.value=V.state.spotShadow,Ce.rectAreaLights.value=V.state.rectArea,Ce.ltc_1.value=V.state.rectAreaLTC1,Ce.ltc_2.value=V.state.rectAreaLTC2,Ce.pointLights.value=V.state.point,Ce.pointLightShadows.value=V.state.pointShadow,Ce.hemisphereLights.value=V.state.hemi,Ce.sunShadowMatrix.value=V.state.sunShadowMatrix,Ce.sunShadowCascade.value=V.state.sunShadowCascade,Ce.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ce.spotLightMatrix.value=V.state.spotLightMatrix,Ce.spotLightMap.value=V.state.spotLightMap,Ce.pointShadowMatrix.value=V.state.pointShadowMatrix),k.numLightProbeGrids=ns(A.state.lightProbeGridArray),k.currentProgram=rt,k.uniformsList=null,rt}function ci(M,D,X,k,V){const ge=Ae.get(M),Te=ge.currentProgram.id+","+k+","+V;let xe=ge.programVariants.get(Te);return xe===void 0?(xe=Kn(M,D,X),ge.programVariants.set(Te,xe)):(ge.currentProgram=xe,ge.uniformsList=null,ge.outputColorSpace=k,ge.toneMapping=V),xe}function $n(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=Os.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Qe(M,D){const X=Ae.get(M);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function Rt(M,D,X,k,V){D.isScene!==!0&&(D=Se),Fe.resetTextureUnits();const ge=D.fog,Te=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,xe=se===null?N.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ot.workingColorSpace,Ee=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,De=T.get(k.envMap||Te,Ee),Ke=k.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,rt=!!X.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ce=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,wt=!!X.morphAttributes.color;let St=In;k.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(St=N.toneMapping);const Mt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,zt=Mt!==void 0?Mt.length:0,Pe=Ae.get(k),jt=A.state.lights;if(fe===!0&&(Oe===!0||M!==te)){const bt=M===te&&k.id===q;Z.setState(k,M,bt)}let gt=!1,Jn=!1;k.version===Pe.__version?Pe.needsLights&&Pe.lightsStateVersion!==jt.state.version||V.isBatchedMesh&&Pe.batching===!1||!V.isBatchedMesh&&Pe.batching===!0||V.isBatchedMesh&&Pe.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Pe.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Pe.instancing===!1||!V.isInstancedMesh&&Pe.instancing===!0||V.isSkinnedMesh&&Pe.skinning===!1||!V.isSkinnedMesh&&Pe.skinning===!0||V.isInstancedMesh&&Pe.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Pe.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Pe.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Pe.instancingMorph===!1&&V.morphTexture!==null||Pe.envMap!==De||k.fog===!0&&Pe.fog!==ge||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==Z.numPlanes||Pe.numIntersection!==Z.numIntersection)||Pe.vertexAlphas!==Ke||Pe.vertexTangents!==rt||Pe.morphTargets!==Ce||Pe.morphNormals!==at||Pe.morphColors!==wt||Pe.morphTargetsCount!==zt||Pe.numLightProbeGrids!==ns(A.state.lightProbeGridArray)?gt=!0:(Pe.outputColorSpace!==xe||Pe.toneMapping!==St)&&(Jn=!0):(gt=!0,Pe.__version=k.version);let Ht=Pe.currentProgram;(gt===!0||Jn===!0)&&(Ht=Jn===!0?ci(k,D,V,xe,St):Kn(k,D,V),O&&k.isNodeMaterial&&O.onUpdateProgram(k,Ht,Pe));let is=!1,On=!1,Qn=!1;const ct=Ht.getUniforms(),Ft=Pe.uniforms;if(le.useProgram(Ht.program)&&(is=!0,On=!0,Qn=!0),k.id!==q&&(q=k.id,On=!0),is||te!==M){le.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ct.setValue(L,"projectionMatrix",M.projectionMatrix),ct.setValue(L,"viewMatrix",M.matrixWorldInverse);const It=ct.map.cameraPosition;It!==void 0&&It.setValue(L,We.setFromMatrixPosition(M.matrixWorld)),He.logarithmicDepthBuffer&&ct.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ct.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),te!==M&&(te=M,On=!0,Qn=!0)}if(Pe.needsLights&&(jt.state.sunShadowMap.length>0&&ct.setValue(L,"sunShadowMap",jt.state.sunShadowMap,Fe),jt.state.directionalShadowMap.length>0&&ct.setValue(L,"directionalShadowMap",jt.state.directionalShadowMap,Fe),jt.state.spotShadowMap.length>0&&ct.setValue(L,"spotShadowMap",jt.state.spotShadowMap,Fe),jt.state.pointShadowMap.length>0&&ct.setValue(L,"pointShadowMap",jt.state.pointShadowMap,Fe)),V.isSkinnedMesh){ct.setOptional(L,V,"bindMatrix"),ct.setOptional(L,V,"bindMatrixInverse");const bt=V.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),ct.setValue(L,"boneTexture",bt.boneTexture,Fe))}V.isBatchedMesh&&(ct.setOptional(L,V,"batchingTexture"),ct.setValue(L,"batchingTexture",V._matricesTexture,Fe),ct.setOptional(L,V,"batchingIdTexture"),ct.setValue(L,"batchingIdTexture",V._indirectTexture,Fe),ct.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&ct.setValue(L,"batchingColorTexture",V._colorsTexture,Fe));const on=X.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&K.update(V,X,Ht),(On||Pe.receiveShadow!==V.receiveShadow)&&(Pe.receiveShadow=V.receiveShadow,ct.setValue(L,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(Ft.envMapIntensity.value=D.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=mm()),On){if(ct.setValue(L,"toneMappingExposure",N.toneMappingExposure),Pe.needsLights&&xt(Ft,Qn),ge&&k.fog===!0&&de.refreshFogUniforms(Ft,ge),de.refreshMaterialUniforms(Ft,k,ve,Le,A.state.transmissionRenderTarget[M.id]),Pe.needsLights&&Pe.numLightProbeGrids>0){const bt=E;let It=0;for(const wn of A.state.lightProbeGridArray)wn.texture!==null&&(bt.textures[It]=wn.texture,bt.min[It]=wn.boundingBox.min,bt.max[It]=wn.boundingBox.max,bt.resolution[It]=wn.resolution,It++);for(const wn in bt)bt[wn].length=It;Ft.probesSH.value=bt.textures,Ft.probesMin.value=bt.min,Ft.probesMax.value=bt.max,Ft.probesResolution.value=bt.resolution}Os.upload(L,$n(Pe),Ft,Fe)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Os.upload(L,$n(Pe),Ft,Fe),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ct.setValue(L,"center",V.center),ct.setValue(L,"modelViewMatrix",V.modelViewMatrix),ct.setValue(L,"normalMatrix",V.normalMatrix),ct.setValue(L,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){const bt=k.uniformsGroups;for(let It=0,wn=bt.length;It<wn;It++){const Ya=bt[It];Re.update(Ya,Ht),Re.bind(Ya,Ht)}}return Ht}function xt(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.sunLights.needsUpdate=D,M.sunLightShadows.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function Zn(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(M,D,X){const k=Ae.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Ae.get(M.texture).__webglTexture=D,Ae.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:X,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,D){const X=Ae.get(M);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,X=0){se=M,F=D,W=X;let k=null,V=!1,ge=!1;if(M){const xe=Ae.get(M);if(xe.__useDefaultFramebuffer!==void 0){le.bindFramebuffer(L.FRAMEBUFFER,xe.__webglFramebuffer),ae.copy(M.viewport),we.copy(M.scissor),Ve=M.scissorTest,le.viewport(ae),le.scissor(we),le.setScissorTest(Ve),q=-1;return}else if(xe.__webglFramebuffer===void 0)Fe.setupRenderTarget(M);else if(xe.__hasExternalTextures)Fe.rebindTextures(M,Ae.get(M.texture).__webglTexture,Ae.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ke=M.depthTexture;if(xe.__boundDepthTexture!==Ke){if(Ke!==null&&Ae.has(Ke)&&(M.width!==Ke.image.width||M.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(M)}}const Ee=M.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ge=!0);const De=Ae.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[D])?k=De[D][X]:k=De[D],V=!0):M.samples>0&&Fe.useMultisampledRTT(M)===!1?k=Ae.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?k=De[X]:k=De,ae.copy(M.viewport),we.copy(M.scissor),Ve=M.scissorTest}else ae.copy(Ie).multiplyScalar(ve).floor(),we.copy(it).multiplyScalar(ve).floor(),Ve=ut;if(X!==0&&(k=Y),le.bindFramebuffer(L.FRAMEBUFFER,k)&&le.drawBuffers(M,k),le.viewport(ae),le.scissor(we),le.setScissorTest(Ve),V){const xe=Ae.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,xe.__webglTexture,X)}else if(ge){const xe=D;for(let Ee=0;Ee<M.textures.length;Ee++){const De=Ae.get(M.textures[Ee]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ee,De.__webglTexture,X,xe)}}else if(M!==null&&X!==0){const xe=Ae.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xe.__webglTexture,X)}q=-1};function an(M){const D=Ae.get(M);return(D.__readFormat!==M.format||D.__readType!==M.type)&&(D.__readFormat=M.format,D.__readType=M.type,D.__formatReadable=He.textureFormatReadable(M.format),D.__typeReadable=He.textureTypeReadable(M.type)),D}this.readRenderTargetPixels=function(M,D,X,k,V,ge,Te,xe=0){if(!(M&&M.isWebGLRenderTarget)){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Ae.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Te!==void 0&&(Ee=Ee[Te],Array.isArray(Ee)&&(Ee=Ee[0])),Ee){le.bindFramebuffer(L.FRAMEBUFFER,Ee);try{const De=M.textures[xe],Ke=De.format,rt=De.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xe);const Ce=an(De);if(Ce.__formatReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-k&&X>=0&&X<=M.height-V&&L.readPixels(D,X,k,V,oe.convert(Ke),oe.convert(rt),ge)}finally{const De=se!==null?Ae.get(se).__webglFramebuffer:null;le.bindFramebuffer(L.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,D,X,k,V,ge,Te,xe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=Ae.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Te!==void 0&&(Ee=Ee[Te],Array.isArray(Ee)&&(Ee=Ee[0])),Ee)if(D>=0&&D<=M.width-k&&X>=0&&X<=M.height-V){le.bindFramebuffer(L.FRAMEBUFFER,Ee);const De=M.textures[xe],Ke=De.format,rt=De.type;M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xe);const Ce=an(De);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,at),L.bufferData(L.PIXEL_PACK_BUFFER,ge.byteLength,L.STREAM_READ),L.readPixels(D,X,k,V,oe.convert(Ke),oe.convert(rt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const wt=se!==null?Ae.get(se).__webglFramebuffer:null;le.bindFramebuffer(L.FRAMEBUFFER,wt);const St=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Lc(L,St,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,at),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ge),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(at),L.deleteSync(St),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,D=null,X=0){const k=Math.pow(2,-X),V=Math.floor(M.image.width*k),ge=Math.floor(M.image.height*k),Te=D!==null?D.x:0,xe=D!==null?D.y:0;Fe.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,Te,xe,V,ge),le.unbindTexture()},this.copyTextureToTexture=function(M,D,X=null,k=null,V=0,ge=0){let Te,xe,Ee,De,Ke,rt,Ce,at,wt;const St=M.isCompressedTexture?M.mipmaps[ge]:M.image;if(X!==null)Te=X.max.x-X.min.x,xe=X.max.y-X.min.y,Ee=X.isBox3?X.max.z-X.min.z:1,De=X.min.x,Ke=X.min.y,rt=X.isBox3?X.min.z:0;else{const ct=Math.pow(2,-V);Te=Math.floor(St.width*ct),xe=Math.floor(St.height*ct),M.isDataArrayTexture?Ee=St.depth:M.isData3DTexture?Ee=Math.floor(St.depth*ct):Ee=1,De=0,Ke=0,rt=0}k!==null?(Ce=k.x,at=k.y,wt=k.z):(Ce=0,at=0,wt=0);const Mt=oe.convert(D.format),zt=oe.convert(D.type);let Pe;D.isData3DTexture?(Fe.setTexture3D(D,0),Pe=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Fe.setTexture2DArray(D,0),Pe=L.TEXTURE_2D_ARRAY):(Fe.setTexture2D(D,0),Pe=L.TEXTURE_2D),le.activeTexture(L.TEXTURE0),le.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),le.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),le.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const jt=le.getParameter(L.UNPACK_ROW_LENGTH),gt=le.getParameter(L.UNPACK_IMAGE_HEIGHT),Jn=le.getParameter(L.UNPACK_SKIP_PIXELS),Ht=le.getParameter(L.UNPACK_SKIP_ROWS),is=le.getParameter(L.UNPACK_SKIP_IMAGES);le.pixelStorei(L.UNPACK_ROW_LENGTH,St.width),le.pixelStorei(L.UNPACK_IMAGE_HEIGHT,St.height),le.pixelStorei(L.UNPACK_SKIP_PIXELS,De),le.pixelStorei(L.UNPACK_SKIP_ROWS,Ke),le.pixelStorei(L.UNPACK_SKIP_IMAGES,rt);const On=M.isDataArrayTexture||M.isData3DTexture,Qn=D.isDataArrayTexture||D.isData3DTexture;if(M.isDepthTexture){const ct=Ae.get(M),Ft=Ae.get(D),on=Ae.get(ct.__renderTarget),bt=Ae.get(Ft.__renderTarget);le.bindFramebuffer(L.READ_FRAMEBUFFER,on.__webglFramebuffer),le.bindFramebuffer(L.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let It=0;It<Ee;It++)On&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ae.get(M).__webglTexture,V,rt+It),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ae.get(D).__webglTexture,ge,wt+It)),L.blitFramebuffer(De,Ke,De+Te,Ke+xe,Ce,at,Ce+Te,at+xe,L.DEPTH_BUFFER_BIT,L.NEAREST);le.bindFramebuffer(L.READ_FRAMEBUFFER,null),le.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||M.isRenderTargetTexture||Ae.has(M)){const ct=Ae.get(M),Ft=Ae.get(D);le.bindFramebuffer(L.READ_FRAMEBUFFER,P),le.bindFramebuffer(L.DRAW_FRAMEBUFFER,j);for(let on=0;on<Ee;on++)On?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ct.__webglTexture,V,rt+on):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ct.__webglTexture,V),Qn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.__webglTexture,ge,wt+on):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ft.__webglTexture,ge),V!==0?L.blitFramebuffer(De,Ke,De+Te,Ke+xe,Ce,at,Ce+Te,at+xe,L.COLOR_BUFFER_BIT,L.NEAREST):Qn?L.copyTexSubImage3D(Pe,ge,Ce,at,wt+on,De,Ke,Te,xe):L.copyTexSubImage2D(Pe,ge,Ce,at,De,Ke,Te,xe);le.bindFramebuffer(L.READ_FRAMEBUFFER,null),le.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Qn?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(Pe,ge,Ce,at,wt,Te,xe,Ee,Mt,zt,St.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Pe,ge,Ce,at,wt,Te,xe,Ee,Mt,St.data):L.texSubImage3D(Pe,ge,Ce,at,wt,Te,xe,Ee,Mt,zt,St):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ge,Ce,at,Te,xe,Mt,zt,St.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ge,Ce,at,St.width,St.height,Mt,St.data):L.texSubImage2D(L.TEXTURE_2D,ge,Ce,at,Te,xe,Mt,zt,St);le.pixelStorei(L.UNPACK_ROW_LENGTH,jt),le.pixelStorei(L.UNPACK_IMAGE_HEIGHT,gt),le.pixelStorei(L.UNPACK_SKIP_PIXELS,Jn),le.pixelStorei(L.UNPACK_SKIP_ROWS,Ht),le.pixelStorei(L.UNPACK_SKIP_IMAGES,is),ge===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&L.generateMipmap(Pe),le.unbindTexture()},this.initRenderTarget=function(M){Ae.get(M).__webglFramebuffer===void 0&&Fe.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Fe.setTextureCube(M,0):M.isData3DTexture?Fe.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Fe.setTexture2DArray(M,0):Fe.setTexture2D(M,0),le.unbindTexture()},this.resetState=function(){F=0,W=0,se=null,le.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}}const _m=26,xm=14,vm=.58;function Dr(i,e,t="full"){if(i===0&&e===0)return{x:0,y:0,z:0,rVis:0,rAU:0};const s=Math.hypot(i,e)/yn,r=Math.atan2(e,i);let a=0;t==="inner"?a=s*_m:a=Math.pow(s,vm)*xm;const o=a*Math.cos(r),c=-a*Math.sin(r);return{x:o,y:0,z:c,rVis:a,rAU:s,angle:r}}function Ir(i,e="full"){if(i.isSun)return e==="inner"?3.6:3;let n={mercury:.72,venus:1.05,earth:1.15,mars:.85,jupiter:2.35,saturn:1.95,uranus:1.5,neptune:1.45}[i.id];if(!n){const s=i.radiusKm||6e3;n=Math.max(.65,Math.min(2.8,Math.pow(s/6371,.45)*1.15))}return e==="inner"&&(n*=1.25),n}function Mm(i="full"){return i==="inner"?[{rAU:.387,label:"0.39 AU (Mercury)"},{rAU:.723,label:"0.72 AU (Venus)"},{rAU:1,label:"1.00 AU (Earth)"},{rAU:1.524,label:"1.52 AU (Mars)"},{rAU:2,label:"2.00 AU"}]:[{rAU:1,label:"1 AU (Earth)"},{rAU:1.524,label:"1.5 AU (Mars)"},{rAU:5.204,label:"5.2 AU (Jupiter)"},{rAU:9.583,label:"9.6 AU (Saturn)"},{rAU:19.22,label:"19.2 AU (Uranus)"},{rAU:30.07,label:"30.1 AU (Neptune)"}]}const dt=new Map;function Sm(){if(dt.has("sun"))return dt.get("sun");const i=document.createElement("canvas");i.width=1024,i.height=512;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,i.height);t.addColorStop(0,"#fef08a"),t.addColorStop(.3,"#f59e0b"),t.addColorStop(.7,"#d97706"),t.addColorStop(1,"#ea580c"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height);const n=e.getImageData(0,0,i.width,i.height),s=n.data;for(let a=0;a<i.height;a++)for(let o=0;o<i.width;o++){const c=(a*i.width+o)*4,l=Math.sin(o*.08)*Math.cos(a*.08),d=Math.sin(o*.03+a*.02)*.5,g=Math.cos(o*.15-a*.1)*.25,f=(l+d+g)*35;s[c]=Math.min(255,Math.max(200,s[c]+f)),s[c+1]=Math.min(235,Math.max(120,s[c+1]+f*.8)),s[c+2]=Math.min(100,Math.max(10,s[c+2]+f*.3))}e.putImageData(n,0,0);for(let a=0;a<24;a++){const o=Math.random()*i.width,c=Math.random()*i.height,l=20+Math.random()*45,d=e.createRadialGradient(o,c,0,o,c,l);d.addColorStop(0,"rgba(255, 255, 220, 0.45)"),d.addColorStop(.5,"rgba(245, 158, 11, 0.2)"),d.addColorStop(1,"rgba(234, 88, 12, 0)"),e.fillStyle=d,e.beginPath(),e.arc(o,c,l,0,Math.PI*2),e.fill()}const r=new pn(i);return r.wrapS=Bs,r.wrapT=vn,dt.set("sun",r),r}function ym(){if(dt.has("mercury"))return dt.get("mercury");const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d");e.fillStyle="#64748b",e.fillRect(0,0,i.width,i.height);for(let n=0;n<800;n++){const s=Math.random()*i.width,r=Math.random()*i.height,a=2+Math.random()*8,o=Math.random()>.5?"rgba(30, 41, 59, 0.35)":"rgba(148, 163, 184, 0.3)";e.fillStyle=o,e.beginPath(),e.arc(s,r,a,0,Math.PI*2),e.fill()}for(let n=0;n<90;n++){const s=Math.random()*i.width,r=Math.random()*i.height,a=3+Math.random()*14;e.strokeStyle="rgba(226, 232, 240, 0.45)",e.lineWidth=1.5,e.beginPath(),e.arc(s,r,a,0,Math.PI*2),e.stroke(),e.fillStyle="rgba(15, 23, 42, 0.5)",e.beginPath(),e.arc(s+1,r+1,a*.75,0,Math.PI*2),e.fill()}const t=new pn(i);return dt.set("mercury",t),t}function Em(){if(dt.has("venus"))return dt.get("venus");const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,i.height);t.addColorStop(0,"#fef08a"),t.addColorStop(.3,"#eab308"),t.addColorStop(.5,"#d97706"),t.addColorStop(.7,"#ca8a04"),t.addColorStop(1,"#fde047"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height),e.fillStyle="rgba(255, 255, 255, 0.18)";for(let s=10;s<i.height;s+=12){e.beginPath(),e.moveTo(0,s);for(let r=0;r<i.width;r+=20){const a=Math.sin(r*.05+s*.1)*6;e.lineTo(r,s+a)}e.lineTo(i.width,i.height),e.lineTo(0,i.height),e.fill()}e.fillStyle="rgba(161, 98, 7, 0.15)";for(let s=0;s<20;s++){const r=Math.random()*i.height;e.fillRect(0,r,i.width,3+Math.random()*8)}const n=new pn(i);return dt.set("venus",n),n}function bm(){if(dt.has("earth"))return dt.get("earth");const i=document.createElement("canvas");i.width=1024,i.height=512;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,i.height);t.addColorStop(0,"#0284c7"),t.addColorStop(.2,"#0369a1"),t.addColorStop(.5,"#075985"),t.addColorStop(.8,"#0369a1"),t.addColorStop(1,"#0284c7"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height);const n=(r,a,o,c,l)=>{e.fillStyle=l,e.beginPath();const d=16;for(let g=0;g<=d;g++){const f=g/d*Math.PI*2,p=.75+Math.sin(f*4)*.2+Math.cos(f*7)*.15,x=r+Math.cos(f)*o*p,S=a+Math.sin(f)*c*p;g===0?e.moveTo(x,S):e.lineTo(x,S)}e.closePath(),e.fill()};n(520,180,160,90,"#15803d"),n(550,310,110,110,"#854d0e"),n(680,220,130,80,"#16a34a"),n(240,170,90,80,"#15803d"),n(290,340,75,110,"#166534"),n(760,370,60,45,"#a16207"),e.fillStyle="#f8fafc",e.fillRect(0,0,i.width,30),e.fillRect(0,i.height-35,i.width,35),e.fillStyle="rgba(255, 255, 255, 0.42)";for(let r=0;r<40;r++){const a=Math.random()*i.width,o=60+Math.random()*(i.height-120),c=40+Math.random()*120,l=15+Math.random()*35;e.beginPath(),e.ellipse(a,o,c,l,Math.random()*.4,0,Math.PI*2),e.fill()}const s=new pn(i);return dt.set("earth",s),s}function Tm(){if(dt.has("mars"))return dt.get("mars");const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,i.height);t.addColorStop(0,"#c2410c"),t.addColorStop(.5,"#ea580c"),t.addColorStop(1,"#9a3412"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height),e.fillStyle="rgba(67, 20, 7, 0.45)";for(let s=0;s<15;s++){const r=Math.random()*i.width,a=80+Math.random()*(i.height-160),o=30+Math.random()*70,c=15+Math.random()*40;e.beginPath(),e.ellipse(r,a,o,c,.2,0,Math.PI*2),e.fill()}e.fillStyle="#f1f5f9",e.beginPath(),e.ellipse(i.width/2,8,i.width/3,16,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(i.width/2,i.height-8,i.width/3.5,14,0,0,Math.PI*2),e.fill();const n=new pn(i);return dt.set("mars",n),n}function Am(){if(dt.has("jupiter"))return dt.get("jupiter");const i=document.createElement("canvas");i.width=1024,i.height=512;const e=i.getContext("2d"),t=["#78350f","#fef3c7","#b45309","#fed7aa","#9a3412","#fef08a","#ca8a04","#fed7aa","#78350f","#fde68a","#92400e","#fef3c7","#7c2d12","#fed7aa","#78350f"],n=i.height/t.length;for(let d=0;d<t.length;d++)e.fillStyle=t[d],e.fillRect(0,d*n,i.width,n);for(let d=0;d<i.height;d+=4){e.fillStyle=d%8===0?"rgba(0, 0, 0, 0.08)":"rgba(255, 255, 255, 0.08)",e.beginPath(),e.moveTo(0,d);for(let g=0;g<i.width;g+=16){const f=Math.sin(g*.04+d*.05)*4;e.lineTo(g,d+f)}e.lineTo(i.width,d+4),e.lineTo(0,d+4),e.fill()}const s=i.width*.62,r=i.height*.64,a=65,o=38,c=e.createRadialGradient(s,r,0,s,r,a);c.addColorStop(0,"#dc2626"),c.addColorStop(.6,"#b91c1c"),c.addColorStop(.85,"#991b1b"),c.addColorStop(1,"rgba(153, 27, 27, 0)"),e.fillStyle=c,e.beginPath(),e.ellipse(s,r,a,o,-.05,0,Math.PI*2),e.fill(),e.fillStyle="rgba(254, 242, 242, 0.4)",e.beginPath(),e.ellipse(s,r,a*.45,o*.35,-.05,0,Math.PI*2),e.fill();const l=new pn(i);return dt.set("jupiter",l),l}function Rm(){if(dt.has("saturn"))return dt.get("saturn");const i=document.createElement("canvas");i.width=1024,i.height=512;const e=i.getContext("2d"),t=["#a16207","#fef08a","#ca8a04","#fef9c3","#b45309","#fde047","#eab308","#fef08a","#ca8a04","#d97706","#fef9c3","#a16207"],n=i.height/t.length;for(let r=0;r<t.length;r++)e.fillStyle=t[r],e.fillRect(0,r*n,i.width,n);e.fillStyle="rgba(255, 255, 255, 0.12)";for(let r=0;r<i.height;r+=8)e.fillRect(0,r,i.width,3);const s=new pn(i);return dt.set("saturn",s),s}function wm(){if(dt.has("saturn-ring"))return dt.get("saturn-ring");const i=document.createElement("canvas");i.width=512,i.height=64;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,i.width,0);t.addColorStop(0,"rgba(161, 98, 7, 0)"),t.addColorStop(.12,"rgba(180, 120, 40, 0.25)"),t.addColorStop(.28,"rgba(217, 150, 50, 0.5)"),t.addColorStop(.32,"rgba(245, 190, 80, 0.85)"),t.addColorStop(.55,"rgba(254, 230, 130, 0.95)"),t.addColorStop(.68,"rgba(240, 180, 70, 0.8)"),t.addColorStop(.7,"rgba(30, 20, 10, 0.05)"),t.addColorStop(.74,"rgba(20, 15, 5, 0.02)"),t.addColorStop(.76,"rgba(230, 170, 70, 0.75)"),t.addColorStop(.88,"rgba(210, 150, 60, 0.65)"),t.addColorStop(.96,"rgba(180, 120, 40, 0.4)"),t.addColorStop(1,"rgba(160, 100, 30, 0)"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height);const n=new pn(i);return dt.set("saturn-ring",n),n}function Cm(){if(dt.has("uranus"))return dt.get("uranus");const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,i.height);t.addColorStop(0,"#67e8f9"),t.addColorStop(.3,"#38bdf8"),t.addColorStop(.5,"#06b6d4"),t.addColorStop(.7,"#38bdf8"),t.addColorStop(1,"#a5f3fc"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height),e.fillStyle="rgba(255, 255, 255, 0.15)";for(let s=20;s<i.height;s+=24)e.fillRect(0,s,i.width,4);const n=new pn(i);return dt.set("uranus",n),n}function Pm(){if(dt.has("neptune"))return dt.get("neptune");const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,i.height);t.addColorStop(0,"#1e40af"),t.addColorStop(.3,"#2563eb"),t.addColorStop(.5,"#1d4ed8"),t.addColorStop(.7,"#1e3a8a"),t.addColorStop(1,"#1d4ed8"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height),e.fillStyle="#0f172a",e.beginPath(),e.ellipse(i.width*.45,i.height*.4,45,24,.1,0,Math.PI*2),e.fill(),e.fillStyle="rgba(240, 249, 255, 0.6)",e.beginPath(),e.ellipse(i.width*.52,i.height*.46,25,6,-.05,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(i.width*.28,i.height*.68,55,5,.05,0,Math.PI*2),e.fill();const n=new pn(i);return dt.set("neptune",n),n}function Nm(i="#ec4899"){const e=`custom_${i}`;if(dt.has(e))return dt.get(e);const t=document.createElement("canvas");t.width=256,t.height=128;const n=t.getContext("2d");n.fillStyle=i,n.fillRect(0,0,t.width,t.height);for(let r=0;r<60;r++){const a=Math.random()*t.width,o=Math.random()*t.height,c=2+Math.random()*6;n.fillStyle=Math.random()>.5?"rgba(255, 255, 255, 0.25)":"rgba(0, 0, 0, 0.25)",n.beginPath(),n.arc(a,o,c,0,Math.PI*2),n.fill()}const s=new pn(t);return dt.set(e,s),s}function Lm({bodies:i,bodiesRef:e,selectedPlanetId:t,onSelectPlanet:n,scaleMode:s="full",cameraFocus:r="sun",onToggleCameraFocus:a,showOrbits:o=!0,showTrails:c=!0,showVelocityVectors:l=!1,showForceVectors:d=!1,showAccelVectors:g=!1,showLabels:f=!0,showGrid:p=!0,vectorScale:x=1,isDark:S=!0,metrics:m=null}){const u=ce.useRef(null),b=ce.useRef(null),w=ce.useCallback(()=>e&&e.current&&e.current.length>0?e.current:i||[],[i,e]),E=ce.useRef(null),R=ce.useRef(null),A=ce.useRef(null),_=ce.useRef(null),y=ce.useRef(new Map),I=ce.useRef(new Map),N=ce.useRef(new Map),U=ce.useRef(null),O=ce.useRef(null),Y=ce.useRef(null),P=ce.useRef(null),j=ce.useRef({radius:s==="inner"?65:155,theta:Math.PI/4,phi:Math.PI/3.2}),F=ce.useRef(new H(0,0,0)),W=ce.useRef(!1),se=ce.useRef(0),q=ce.useRef({x:0,y:0}),te=ce.useRef({x:0,y:0}),[ae,we]=ce.useState([]),[Ve,ee]=ce.useState(!1),[_e,be]=ce.useState("perspective"),Le=ce.useCallback(fe=>{switch(fe.id){case"sun":return Sm();case"mercury":return ym();case"venus":return Em();case"earth":return bm();case"mars":return Tm();case"jupiter":return Am();case"saturn":return Rm();case"uranus":return Cm();case"neptune":return Pm();default:return Nm(fe.color||"#ec4899")}},[]);ce.useEffect(()=>{const fe=u.current;if(!fe)return;const Oe=fe.clientWidth||800,Ne=fe.clientHeight||750,We=new Zc;E.current=We,We.background=new tt(S?198418:659752);const me=new sn(45,Oe/Ne,.5,3500);R.current=me;const Se=new gm({canvas:b.current,antialias:!0,powerPreference:"high-performance",alpha:!1});A.current=Se,Se.setSize(Oe,Ne),Se.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Se.toneMapping=Pa,Se.toneMappingExposure=1.15;const Ue=new _d(16775912,3.4,900,.4);Ue.position.set(0,0,0),We.add(Ue),Y.current=Ue;const $e=new vd(2569545,.42);We.add($e);const L=2400,ht=new Xt,Xe=new Float32Array(L*3),He=new Float32Array(L*3);for(let Q=0;Q<L;Q++){const J=Math.random(),de=Math.random(),pe=J*2*Math.PI,z=Math.acos(2*de-1),Z=700+Math.random()*600,ne=Z*Math.sin(z)*Math.cos(pe),C=Z*Math.sin(z)*Math.sin(pe),K=Z*Math.cos(z);Xe[Q*3]=ne,Xe[Q*3+1]=C,Xe[Q*3+2]=K;const B=Math.random();B>.8?(He[Q*3]=.98,He[Q*3+1]=.92,He[Q*3+2]=.78):B>.6?(He[Q*3]=.78,He[Q*3+1]=.9,He[Q*3+2]=1):(He[Q*3]=.96,He[Q*3+1]=.96,He[Q*3+2]=.98)}ht.setAttribute("position",new bn(Xe,3)),ht.setAttribute("color",new bn(He,3));const le=new wl({size:1.6,vertexColors:!0,transparent:!0,opacity:S?.92:.75,sizeAttenuation:!1}),mt=new od(ht,le);We.add(mt);const Ae=new Ei;We.add(Ae),U.current=Ae;const Fe=new Xi(1.6,1.85,48),T=new Wi({color:3718648,side:un,transparent:!0,opacity:.85}),v=new rn(Fe,T);v.rotation.x=Math.PI/2,v.visible=!1,We.add(v),P.current=v;const G=new ResizeObserver(Q=>{if(!Q||Q.length===0)return;const{width:J,height:de}=Q[0].contentRect;J>0&&de>0&&(me.aspect=J/de,me.updateProjectionMatrix(),Se.setSize(J,de))});return G.observe(fe),()=>{G.disconnect(),_.current&&cancelAnimationFrame(_.current),Se.dispose(),ht.dispose(),le.dispose(),Fe.dispose(),T.dispose()}},[S]),ce.useEffect(()=>{const fe=U.current;if(!fe)return;for(;fe.children.length>0;){const Ne=fe.children[0];Ne.geometry&&Ne.geometry.dispose(),Ne.material&&Ne.material.dispose(),fe.remove(Ne)}if(!p)return;Mm(s).forEach(Ne=>{const{rVis:We}=Dr(Ne.rAU*yn,0,s),me=[],Se=128;for(let ht=0;ht<=Se;ht++){const Xe=ht/Se*Math.PI*2;me.push(new H(We*Math.cos(Xe),0,We*Math.sin(Xe)))}const Ue=new Xt().setFromPoints(me),$e=new Ws({color:S?3359061:4674921,transparent:!0,opacity:S?.3:.4,linewidth:1}),L=new Ea(Ue,$e);fe.add(L)})},[s,p,S]),ce.useEffect(()=>{const fe=E.current;if(!fe)return;const Oe=y.current,Ne=w(),We=new Set(Ne.map(me=>me.id));for(const[me,Se]of Oe.entries())We.has(me)||(fe.remove(Se.group),Se.sphereMesh.geometry&&Se.sphereMesh.geometry.dispose(),Se.sphereMesh.material&&Se.sphereMesh.material.dispose(),Se.ringMesh&&(Se.ringMesh.geometry&&Se.ringMesh.geometry.dispose(),Se.ringMesh.material&&Se.ringMesh.material.dispose()),Oe.delete(me));Ne.forEach(me=>{let Se=Oe.get(me.id);const Ue=Ir(me,s);if(Se)Math.abs(Se.currentRadius-Ue)>.05&&(Se.sphereMesh.geometry.dispose(),Se.sphereMesh.geometry=new bi(Ue,40,40),Se.currentRadius=Ue,Se.ringMesh&&(Se.ringMesh.geometry.dispose(),Se.ringMesh.geometry=new Xi(Ue*1.35,Ue*2.55,64)),Se.coronaMesh&&(Se.coronaMesh.geometry.dispose(),Se.coronaMesh.geometry=new bi(Ue*1.28,32,32)));else{const $e=new Ei,L=new bi(Ue,40,40),ht=Le(me);let Xe;me.isSun?Xe=new Wi({map:ht,color:16777215}):Xe=new To({map:ht,roughness:me.id==="venus"?.35:.72,metalness:.1});const He=new rn(L,Xe);He.userData={bodyId:me.id,bodyName:me.name},$e.add(He);let le=null;if(me.isSun){const Ae=new bi(Ue*1.28,32,32),Fe=new Wi({color:16096779,transparent:!0,opacity:.24,blending:Fr,side:Yt});le=new rn(Ae,Fe),$e.add(le),O.current=le}let mt=null;if(me.hasRings){const Ae=Ue*1.35,Fe=Ue*2.55,T=new Xi(Ae,Fe,64),v=wm(),G=new To({map:v,side:un,transparent:!0,opacity:.92,roughness:.6});mt=new rn(T,G),mt.rotation.x=Math.PI/2+.46,$e.add(mt)}fe.add($e),Se={group:$e,sphereMesh:He,coronaMesh:le,ringMesh:mt,currentRadius:Ue},Oe.set(me.id,Se)}})},[i,s,Le,w]),ce.useEffect(()=>{const fe=E.current;if(!fe)return;const Oe=I.current,Ne=w(),We=new Set(Ne.map(me=>me.id));for(const[me,Se]of Oe.entries())We.has(me)||(fe.remove(Se),Se.geometry.dispose(),Se.material.dispose(),Oe.delete(me));if(!c){Oe.forEach(me=>{me.visible=!1});return}Ne.forEach(me=>{let Se=Oe.get(me.id);if(Se)Se.visible=!0,Se.material.opacity=me.id===t?.85:.45;else{const Ue=new Xt,$e=new tt(me.color||"#38bdf8"),L=new Ws({color:$e,transparent:!0,opacity:me.id===t?.85:.45,linewidth:me.id===t?2:1});Se=new Ea(Ue,L),fe.add(Se),Oe.set(me.id,Se)}})},[i,c,t,w]),ce.useEffect(()=>{const fe=E.current;if(!fe)return;const Oe=N.current;if(Oe.forEach(Se=>{fe.remove(Se)}),Oe.clear(),!l&&!d&&!g)return;const Ne=w(),We=new H(1,0,0),me=new H(0,0,0);Ne.forEach(Se=>{if(!Se.isSun){if(l){const Ue=new Pr(We,me,5,1096065,1.2,.8);fe.add(Ue),Oe.set(`vel_${Se.id}`,Ue)}if(d){const Ue=new Pr(We,me,5,15485081,1.4,.9);fe.add(Ue),Oe.set(`force_${Se.id}`,Ue)}if(g){const Ue=new Pr(We,me,5,16347926,1.2,.8);fe.add(Ue),Oe.set(`acc_${Se.id}`,Ue)}}})},[i,l,d,g,w]),ce.useEffect(()=>{const fe=E.current,Oe=R.current,Ne=A.current;if(!fe||!Oe||!Ne)return;let We=!1;const me=Se=>{if(We)return;const Ue=w(),$e=j.current,L=F.current,ht=y.current,Xe=I.current,He=N.current,le=u.current,mt=le?le.clientWidth:800,Ae=le?le.clientHeight:750,Fe=[];let T=null;const v=Ue.find(z=>z.isSun)||Ue[0];Ue.forEach(z=>{const Z=ht.get(z.id),{x:ne,z:C}=Dr(z.x,z.y,s);if(Z&&(Z.group.position.set(ne,0,C),z.isSun||(Z.sphereMesh.rotation.y+=.015)),z.id===t&&(T=new H(ne,0,C)),c&&Xe){const K=Xe.get(z.id),B=z.trail||[];if(K&&B.length>=2){const re=new Float32Array(B.length*3);for(let oe=0;oe<B.length;oe++){const he=B[oe],Re=Dr(he.x,he.y,s);re[oe*3]=Re.x,re[oe*3+1]=0,re[oe*3+2]=Re.z}K.geometry.setAttribute("position",new bn(re,3)),K.visible=!0}else K&&(K.visible=!1)}if(!z.isSun){const K=new H(ne,0,C);if(l){const B=He.get(`vel_${z.id}`);if(B){const re=Math.hypot(z.vx,z.vy);re>0?(B.position.copy(K),B.setDirection(new H(z.vx/re,0,-z.vy/re)),B.setLength(Math.min(re*.12*x,22),1.2,.8),B.visible=!0):B.visible=!1}}if(d&&v){const B=He.get(`force_${z.id}`);if(B){const re=v.x-z.x,oe=-(v.y-z.y),he=Math.hypot(re,oe);he>0?(B.position.copy(K),B.setDirection(new H(re/he,0,oe/he)),B.setLength(7.5*x,1.4,.9),B.visible=!0):B.visible=!1}}if(g){const B=He.get(`acc_${z.id}`);if(B){const re=Math.hypot(z.ax,z.ay);re>0?(B.position.copy(K),B.setDirection(new H(z.ax/re,0,-z.ay/re)),B.setLength(6*x,1.2,.8),B.visible=!0):B.visible=!1}}}if(f&&le){const K=Ir(z,s),B=new H(ne,K+1.2,C);if(B.project(Oe),B.z<1){const re=(B.x+1)*mt/2,oe=(-B.y+1)*Ae/2;Fe.push({id:z.id,name:z.name,color:z.color,x:re,y:oe,isSelected:z.id===t})}}}),we(Fe);const G=O.current;if(G){const z=1+Math.sin(Se*.0025)*.06;G.scale.set(z,z,z),G.rotation.y+=.003}const Q=P.current;if(Q&&T){Q.visible=!0,Q.position.copy(T);const z=Ue.find(C=>C.id===t),ne=(z?Ir(z,s):2)*1.6/1.7;Q.scale.set(ne,ne,ne),Q.rotation.z+=.02}else Q&&(Q.visible=!1);r==="planet"&&T?L.lerp(T,.06):L.lerp(new H(0,0,0),.06);const J=L.x+$e.radius*Math.sin($e.phi)*Math.sin($e.theta),de=L.y+$e.radius*Math.cos($e.phi),pe=L.z+$e.radius*Math.sin($e.phi)*Math.cos($e.theta);Oe.position.set(J,de,pe),Oe.lookAt(L),Ne.render(fe,Oe),_.current=requestAnimationFrame(me)};return _.current=requestAnimationFrame(me),()=>{We=!0,_.current&&cancelAnimationFrame(_.current)}},[s,r,t,f,c,l,d,g,x,w]);const ve=fe=>{W.current=!0,se.current=fe.button,q.current={x:fe.clientX,y:fe.clientY},te.current={x:fe.clientX,y:fe.clientY}},Be=fe=>{if(!W.current)return;const Oe=fe.clientX-q.current.x,Ne=fe.clientY-q.current.y;q.current={x:fe.clientX,y:fe.clientY};const We=j.current,me=F.current;if(se.current===0&&!fe.shiftKey)We.theta-=Oe*.007,We.phi=Math.max(.01,Math.min(Math.PI/2-.02,We.phi-Ne*.007));else{const Se=We.radius*.0015,Ue=R.current;if(Ue){const $e=new H,L=new H;Ue.matrix.extractBasis($e,L,new H),me.addScaledVector($e,-Oe*Se),me.addScaledVector(L,Ne*Se)}}},Et=fe=>{var Ne;if(W.current=!1,Math.hypot(fe.clientX-te.current.x,fe.clientY-te.current.y)<6&&fe.button===0){const We=u.current,me=R.current,Se=E.current;if(!We||!me||!Se)return;const Ue=We.getBoundingClientRect(),$e=new nt((fe.clientX-Ue.left)/Ue.width*2-1,-((fe.clientY-Ue.top)/Ue.height)*2+1),L=new Sd;L.setFromCamera($e,me);const ht=[];y.current.forEach(He=>{ht.push(He.sphereMesh),He.ringMesh&&ht.push(He.ringMesh)});const Xe=L.intersectObjects(ht,!1);if(Xe.length>0){const le=(Ne=Xe[0].object.userData)==null?void 0:Ne.bodyId;le&&n&&n(le)}}},Ie=fe=>{fe.preventDefault();const Oe=fe.deltaY>0?1.1:.91,Ne=j.current,We=s==="inner"?12:25,me=s==="inner"?240:550;Ne.radius=Math.max(We,Math.min(me,Ne.radius*Oe))},it=()=>{be("topdown"),j.current.phi=.02},ut=()=>{be("perspective"),j.current.phi=Math.PI/3.2,j.current.theta=Math.PI/4},Je=()=>{F.current.set(0,0,0),j.current={radius:s==="inner"?65:155,theta:Math.PI/4,phi:Math.PI/3.2},be("perspective")},st=ce.useMemo(()=>{const fe=w();return fe.find(Oe=>Oe.id===t)||fe[3]||fe[0]},[w,t]);return h.jsxs("div",{ref:u,className:"solar-3d-viewport",onMouseDown:ve,onMouseMove:Be,onMouseUp:Et,onWheel:Ie,onContextMenu:fe=>fe.preventDefault(),children:[h.jsx("canvas",{ref:b,className:"solar-3d-canvas"}),f&&h.jsx("div",{className:"projected-labels-overlay",children:ae.map(fe=>h.jsxs("button",{className:`projected-planet-label ${fe.isSelected?"selected":""}`,style:{transform:`translate3d(${fe.x}px, ${fe.y}px, 0)`},onClick:Oe=>{Oe.stopPropagation(),n&&n(fe.id)},children:[h.jsx("span",{className:"label-dot",style:{backgroundColor:fe.color}}),h.jsx("span",{className:"label-text",children:fe.name})]},fe.id))}),h.jsxs("div",{className:"viewport-overlay-controls",children:[h.jsxs("div",{className:"view-mode-group",children:[h.jsxs("button",{className:`view-btn ${_e==="perspective"?"active":""}`,onClick:ut,title:"3D Perspective Isometric Angle",children:[h.jsx(Jt,{name:"compass",size:14}),h.jsx("span",{children:"3D Perspective"})]}),h.jsxs("button",{className:`view-btn ${_e==="topdown"?"active":""}`,onClick:it,title:"Top-Down 2D Ecliptic Projection",children:[h.jsx(Jt,{name:"atom",size:14}),h.jsx("span",{children:"Top-Down (2D)"})]})]}),h.jsxs("div",{className:"camera-tracking-group",children:[h.jsxs("button",{className:`view-btn ${r==="planet"?"active tracking":""}`,onClick:a,title:r==="planet"?"Unlock Camera from Planet":"Track Selected Planet",children:[h.jsx(Jt,{name:"compass",size:14}),h.jsx("span",{children:r==="planet"?`Tracking: ${st==null?void 0:st.name}`:"Follow Planet"})]}),h.jsx("button",{className:"view-btn icon-only",onClick:Je,title:"Reset Camera Framing",children:h.jsx(Jt,{name:"reset",size:14})})]})]}),st&&h.jsxs("div",{className:`planet-hud-card ${Ve?"collapsed":""}`,children:[h.jsxs("div",{className:"hud-card-header",children:[h.jsxs("div",{className:"hud-title-group",children:[h.jsx("span",{className:"hud-color-indicator",style:{backgroundColor:st.color}}),h.jsxs("div",{className:"hud-title-text",children:[h.jsx("h4",{className:"hud-planet-name",children:st.name}),h.jsx("span",{className:"hud-planet-type",children:st.type||"Celestial Body"})]})]}),h.jsx("button",{className:"hud-collapse-btn",onClick:()=>ee(fe=>!fe),title:Ve?"Expand Telemetry":"Minimize Telemetry",children:h.jsx(Jt,{name:Ve?"chevron-down":"chevron-up",size:14})})]}),!Ve&&h.jsxs("div",{className:"hud-metrics-grid",children:[h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Mass"}),h.jsxs("span",{className:"hud-metric-val mono",children:[st.mass.toExponential(3)," kg",h.jsxs("span",{className:"hud-subval",children:["(",(st.mass/59724e20).toFixed(2)," M⊕)"]})]})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Equatorial Radius"}),h.jsxs("span",{className:"hud-metric-val mono",children:[(st.radiusKm||6e3).toLocaleString()," km"]})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Distance from Sun"}),h.jsxs("span",{className:"hud-metric-val mono highlight",children:[m?`${m.distanceAU.toFixed(3)} AU`:"—",h.jsx("span",{className:"hud-subval",children:m?`${(m.distanceKm/1e6).toFixed(1)}M km`:""})]})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Orbital Speed"}),h.jsx("span",{className:"hud-metric-val mono",children:m?`${m.speedKmS.toFixed(2)} km/s`:"—"})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Orbital Period"}),h.jsxs("span",{className:"hud-metric-val mono",children:[m&&m.theoreticalPeriodDays!==1/0?`${m.theoreticalPeriodDays.toFixed(1)} d`:"—",h.jsx("span",{className:"hud-subval",children:m&&m.theoreticalPeriodYears!==1/0?`(${m.theoreticalPeriodYears.toFixed(2)} yr)`:""})]})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Solar Gravitational Force"}),h.jsx("span",{className:"hud-metric-val mono",children:m?`${m.solarForceNewtons.toExponential(2)} N`:"—"})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Acceleration (a)"}),h.jsx("span",{className:"hud-metric-val mono",children:m?`${m.accelMs2.toExponential(3)} m/s²`:"—"})]}),h.jsxs("div",{className:"hud-metric-item",children:[h.jsx("span",{className:"hud-metric-label",children:"Coordinates (x, y)"}),h.jsxs("span",{className:"hud-metric-val mono",children:[(st.x/yn).toFixed(2),", ",(st.y/yn).toFixed(2)," AU"]})]})]})]}),h.jsx("div",{className:"viewport-hint-pill",children:h.jsx("span",{children:"Left Drag: 3D Orbit • Right/Shift Drag: Pan • Scroll: Zoom • Click Planet to Inspect"})})]})}function Im(){const{isDark:i}=tl(),[e,t]=ce.useState("workspace"),[n,s]=ce.useState("3d"),[r,a]=ce.useState(1),[o,c]=ce.useState(30),[l,d]=ce.useState(!0),[g,f]=ce.useState(!1),[p,x]=ce.useState("earth"),[S,m]=ce.useState({}),[u,b]=ce.useState([]),[w,E]=ce.useState(null),[R,A]=ce.useState(!1),[_,y]=ce.useState(null),[I,N]=ce.useState(!0),[U,O]=ce.useState(!0),[Y,P]=ce.useState(!1),[j,F]=ce.useState(!1),[W,se]=ce.useState(!1),[q,te]=ce.useState(!0),[ae,we]=ce.useState(!1),[Ve,ee]=ce.useState(!1),[_e,be]=ce.useState(!0),[Le,ve]=ce.useState(1),[Be,Et]=ce.useState("full"),[Ie,it]=ce.useState("sun"),[ut,Je]=ce.useState(1),st=ce.useRef({x:0,y:0});ce.useRef(!1),ce.useRef({x:0,y:0});const fe=ce.useRef(null),Oe=ce.useRef(null),Ne=ce.useRef(null),We=ce.useRef(0),me=ce.useRef(er(1,1)),[Se,Ue]=ce.useState([]),$e=ce.useRef(0),[L,ht]=ce.useState(null),Xe=ce.useRef(0),He=ce.useRef(null),le=ce.useRef(null),mt=ce.useRef(null),Ae=ce.useRef(null),Fe=ce.useRef(null),T=ce.useRef(null),v=ce.useRef(null),G=ce.useRef(null),Q=ce.useRef(null),J=ce.useRef(null),de=ce.useRef(null),pe=ce.useRef(null),z=ce.useRef(null),Z=ce.useRef(null),ne=ce.useMemo(()=>{const $=me.current||[];return $.find(ie=>ie.id===p)||$.find(ie=>ie.id==="earth")||$[1]||$[0]},[p,me.current]),C=S[p]||{massMultiplier:1,velocityMultiplier:1},K=ce.useCallback(()=>{if(n!=="2d")return;const $=fe.current;if(!$)return;const ie=$.getContext("2d"),_t=$.getBoundingClientRect(),ze=window.devicePixelRatio||1,ke=Math.floor(_t.width*ze),Nt=Math.floor(_t.height*ze);($.width!==ke||$.height!==Nt)&&($.width=ke,$.height=Nt),ie.save(),ie.clearRect(0,0,ke,Nt),ie.fillStyle=i?"#0b0f19":"#f8fafc",ie.fillRect(0,0,ke,Nt);const Fn=Be==="inner"?2.2:36,Rn=(Math.min(ke,Nt)/2-30*ze)/Fn*ut,en=Rn/yn,At=me.current||[],mn=At.find(Qe=>Qe.isSun)||At[0]||{x:0,y:0},Di=Ie==="planet"&&At.find(Qe=>Qe.id===p)||mn,ns=Di.x*en,Kn=-Di.y*en,ci=ke/2+st.current.x*ze-(Ie==="planet"?ns:0),$n=Nt/2+st.current.y*ze-(Ie==="planet"?Kn:0);if(_e){ie.strokeStyle=i?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.05)",ie.lineWidth=1*ze;const Rt=(Be==="inner"?.5:5)*Rn;for(let xt=ci%Rt;xt<ke;xt+=Rt)ie.beginPath(),ie.moveTo(xt,0),ie.lineTo(xt,Nt),ie.stroke();for(let xt=$n%Rt;xt<Nt;xt+=Rt)ie.beginPath(),ie.moveTo(0,xt),ie.lineTo(ke,xt),ie.stroke()}if(I){const Qe=Be==="inner"?[.387,.723,1,1.524,2]:[1,1.524,5.2,9.58,19.2,30.07];for(const Rt of Qe){const xt=Rt*Rn;ie.beginPath(),ie.arc(ci,$n,xt,0,Math.PI*2),ie.strokeStyle=i?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.08)",ie.lineWidth=1*ze,ie.setLineDash([4*ze,4*ze]),ie.stroke(),ie.setLineDash([])}}if(U)for(const Qe of At){if(!Qe.trail||Qe.trail.length<2)continue;const Rt=Qe.isSun?i?"rgba(245, 158, 11, 0.4)":"rgba(217, 119, 6, 0.4)":i?Qe.color:Qe.colorLight||Qe.color;ie.strokeStyle=Rt,ie.lineWidth=(Qe.id===p?2:1)*ze,ie.beginPath();for(let xt=0;xt<Qe.trail.length;xt++){const Zn=Qe.trail[xt],an=ci+Zn.x*en,M=$n-Zn.y*en;xt===0?ie.moveTo(an,M):ie.lineTo(an,M)}ie.stroke()}for(const Qe of At){const Rt=ci+Qe.x*en,xt=$n-Qe.y*en,Zn=Qe.id===p;if(Qe.isSun){const an=(Be==="inner"?18:12)*ze;ie.beginPath(),ie.arc(Rt,xt,an*1.6,0,Math.PI*2),ie.fillStyle=i?"rgba(245, 158, 11, 0.2)":"rgba(217, 119, 6, 0.15)",ie.fill(),ie.beginPath(),ie.arc(Rt,xt,an,0,Math.PI*2),ie.fillStyle=i?"#f59e0b":"#d97706",ie.fill(),q&&(ie.font=`bold ${Math.max(10,Math.round(11*ze))}px system-ui, sans-serif`,ie.fillStyle=i?"#fde047":"#b45309",ie.textAlign="center",ie.fillText("Sun",Rt,xt+an+14*ze))}else{const an=i?Qe.color:Qe.colorLight||Qe.color;let M=(Qe.displayRadius||5)*ze;Be==="inner"&&(M*=1.35),Zn&&(ie.beginPath(),ie.arc(Rt,xt,M+5*ze,0,Math.PI*2),ie.strokeStyle="#38bdf8",ie.lineWidth=2*ze,ie.stroke()),Qe.hasRings&&(ie.save(),ie.translate(Rt,xt),ie.rotate(.35),ie.beginPath(),ie.ellipse(0,0,M*2.2,M*.75,0,0,Math.PI*2),ie.strokeStyle=i?"rgba(202, 138, 4, 0.7)":"rgba(161, 98, 7, 0.7)",ie.lineWidth=2*ze,ie.stroke(),ie.restore()),ie.fillStyle=an,ie.beginPath(),ie.arc(Rt,xt,M,0,Math.PI*2),ie.fill(),q&&(ie.font=`${Math.max(10,Math.round(10.5*ze))}px system-ui, sans-serif`,ie.fillStyle=Zn?i?"#38bdf8":"#0284c7":i?"#cbd5e1":"#334155",ie.textAlign="center",ie.fillText(Qe.name,Rt,xt-M-6*ze));const D=.6*Le;if(Y){const X=Math.hypot(Qe.vx,Qe.vy);if(X>0){const k=Qe.vx/X*Math.min(X*7e-4*D,50*ze),V=-Qe.vy/X*Math.min(X*7e-4*D,50*ze);Ur(ie,Rt,xt,k,V,"#10b981",ze)}}if(j){const X=Math.hypot(Qe.ax,Qe.ay);if(X>0){const k=Qe.ax/X*28*ze*D,V=-Qe.ay/X*28*ze*D;Ur(ie,Rt,xt,k,V,"#f97316",ze)}}if(W&&mn){const X=mn.x-Qe.x,k=-(mn.y-Qe.y),V=Math.hypot(X,k);if(V>0){const ge=X/V*32*ze*D,Te=k/V*32*ze*D;Ur(ie,Rt,xt,ge,Te,"#ec4899",ze)}}}}ie.restore()},[n,Be,ut,Ie,p,I,U,Y,j,W,q,_e,Le,i]),B=ce.useCallback(()=>{const $=me.current;if(!$||$.length===0)return;const ie=$.find(ke=>ke.isSun)||$[0],_t=$.find(ke=>ke.id===p),ze=We.current;if(He.current&&(He.current.textContent=`${ze.toFixed(1)} d`),mt.current&&(mt.current.textContent=`${(ze/30.4375).toFixed(1)} mo`),le.current&&(le.current.textContent=`${(ze/365.256).toFixed(2)} yr`),_t){const ke=Za(_t,$,r,ie);Ae.current&&(Ae.current.textContent=`${ke.distanceAU.toFixed(3)} AU`),Fe.current&&(Fe.current.textContent=`${(ke.distanceKm/1e6).toFixed(2)} M km`),T.current&&(T.current.textContent=`${ke.speedKmS.toFixed(2)} km/s`),v.current&&(v.current.textContent=`${ke.vxKmS.toFixed(2)} km/s`),G.current&&(G.current.textContent=`${ke.vyKmS.toFixed(2)} km/s`),Q.current&&(Q.current.textContent=`${ke.accelMs2.toExponential(3)} m/s²`),J.current&&(J.current.textContent=`${ke.solarForceNewtons.toExponential(2)} N`),de.current&&(de.current.textContent=`${ke.kineticEnergyJoules.toExponential(2)} J`),pe.current&&(pe.current.textContent=`${ke.potentialEnergyJoules.toExponential(2)} J`),z.current&&(z.current.textContent=`${ke.totalEnergyJoules.toExponential(2)} J`),Z.current&&(Z.current.textContent=`${ke.eccentricity.toFixed(4)}`),ze-Xe.current>=.1&&(Xe.current=ze,ht(ke)),ze-$e.current>=.5&&($e.current=ze,Ue(Nt=>{const Fn={timeDays:ze,distanceAU:ke.distanceAU,speedKmS:ke.speedKmS,forceN:ke.solarForceNewtons,kineticJ:ke.kineticEnergyJoules,potentialJ:ke.potentialEnergyJoules,totalEnergyJ:ke.totalEnergyJoules},Gt=[...Nt,Fn];return Gt.length>220?Gt.slice(Gt.length-220):Gt}))}},[p,r]),re=ce.useCallback(($={})=>{const ie=$.gravityMultiplier!==void 0?$.gravityMultiplier:r,_t=$.planetOverrides!==void 0?$.planetOverrides:S,ze=$.customBodies!==void 0?$.customBodies:u,ke=$.allowSunMotion!==void 0?$.allowSunMotion:R,Nt=$.isolatePlanetId!==void 0?$.isolatePlanetId:_;me.current=er(ie,1,{planetOverrides:_t,customBodies:ze,allowSunMotion:ke,isolatePlanetId:Nt}),We.current=0,Ne.current=null,$e.current=0,Xe.current=0,Ue([]),B(),n==="2d"&&K()},[r,S,u,R,_,n,K,B]),oe=ce.useCallback(()=>{a(1),m({}),b([]),E(null),A(!1),y(null),Je(1),st.current={x:0,y:0},it("sun"),me.current=er(1,1,{planetOverrides:{},customBodies:[],allowSunMotion:!1,isolatePlanetId:null}),We.current=0,Ne.current=null,$e.current=0,Xe.current=0,Ue([]),B(),n==="2d"&&K()},[n,K,B]);ce.useEffect(()=>{if(!l||g){Oe.current&&cancelAnimationFrame(Oe.current);return}let $=!1;const ie=_t=>{if($)return;Ne.current||(Ne.current=_t);const ze=Math.min(_t-Ne.current,64);Ne.current=_t;const ke=o*zi,Nt=ze/1e3*ke,Fn=.15*zi,Gt=Math.ceil(Nt/Fn),Rn=Nt/Gt,en=me.current;for(let At=0;At<Gt;At++)$a(en,Rn,r);We.current+=Nt/zi;for(const At of en)At.isSun&&!At.allowMotion||(At.trail||(At.trail=[]),At.trail.push({x:At.x,y:At.y}),At.trail.length>350&&At.trail.shift());B(),n==="2d"&&K(),Oe.current=requestAnimationFrame(ie)};return Oe.current=requestAnimationFrame(ie),()=>{$=!0,Oe.current&&cancelAnimationFrame(Oe.current)}},[l,g,o,r,n,K,B]);const he=()=>{const $=me.current,ie=1*zi,_t=6,ze=ie/_t;for(let ke=0;ke<_t;ke++)$a($,ze,r);We.current+=1;for(const ke of $)ke.isSun&&!ke.allowMotion||(ke.trail||(ke.trail=[]),ke.trail.push({x:ke.x,y:ke.y}),ke.trail.length>350&&ke.trail.shift());B(),n==="2d"&&K()},Re=($,ie)=>{const _t={...S,[$]:{...S[$]||{},massMultiplier:ie}};m(_t);const ze=me.current.find(ke=>ke.id===$);ze&&(ze.mass=ze.baseMass*ie,ze.massMultiplier=ie)},Ye=($,ie)=>{const _t={...S,[$]:{...S[$]||{},velocityMultiplier:ie}};m(_t),re({planetOverrides:_t})},ue=$=>{E($.id);const{setup:ie}=$;ie.gravityMultiplier!==void 0&&a(ie.gravityMultiplier),ie.selectedPlanetId&&x(ie.selectedPlanetId),ie.allowSunMotion!==void 0&&A(ie.allowSunMotion),ie.isolatePlanetId!==void 0&&y(ie.isolatePlanetId);const _t=ie.planetOverrides||{};m(_t),re({gravityMultiplier:ie.gravityMultiplier,planetOverrides:_t,allowSunMotion:ie.allowSunMotion,isolatePlanetId:ie.isolatePlanetId}),t("workspace")},Ge=$=>{const ie=[...u,$];b(ie),x($.id),re({customBodies:ie}),t("workspace")},Ze=$=>{const ie=u.filter(_t=>_t.id!==$);b(ie),p===$&&x("earth"),re({customBodies:ie})},Me=()=>{const $=me.current;for(const ie of $)ie.trail=[];n==="2d"&&K()},ft=ce.useMemo(()=>{if(L)return L;const $=me.current||[],ie=$.find(ze=>ze.isSun)||$[0],_t=$.find(ze=>ze.id===p);return _t?Za(_t,$,r,ie):null},[p,r,L]);return h.jsxs("div",{className:"solar-system-root",children:[h.jsxs("div",{className:"workspace-tabs",children:[h.jsxs("button",{className:`tab-btn ${e==="workspace"?"active":""}`,onClick:()=>t("workspace"),children:[h.jsx(Jt,{name:"atom",size:15}),h.jsx("span",{children:"Gravitational Workspace"})]}),h.jsxs("button",{className:`tab-btn ${e==="experiments"?"active":""}`,onClick:()=>t("experiments"),children:[h.jsx(Jt,{name:"compass",size:15}),h.jsx("span",{children:"Interactive Experiments"})]}),h.jsxs("button",{className:`tab-btn ${e==="twobody"?"active":""}`,onClick:()=>t("twobody"),children:[h.jsx(Jt,{name:"atom",size:15}),h.jsx("span",{children:"Two-Body Force Visualizer"})]}),h.jsxs("button",{className:`tab-btn ${e==="graphs"?"active":""}`,onClick:()=>t("graphs"),children:[h.jsx(Jt,{name:"compass",size:15}),h.jsx("span",{children:"Live Physics Graphs"})]}),h.jsxs("button",{className:`tab-btn ${e==="theory"?"active":""}`,onClick:()=>t("theory"),children:[h.jsx(Jt,{name:"book",size:15}),h.jsx("span",{children:"Orbital Mechanics Theory"})]})]}),e==="workspace"&&h.jsxs("div",{className:"solar-grid",children:[h.jsxs("div",{className:"solar-canvas-wrapper",children:[h.jsxs("div",{className:"solar-toolbar",children:[h.jsxs("div",{className:"toolbar-group",children:[h.jsx("span",{className:"toolbar-label",children:"Scale:"}),h.jsx("button",{className:`chip-btn ${Be==="inner"?"active":""}`,onClick:()=>{Et("inner"),Je(1),st.current={x:0,y:0}},title:"Inner Solar System (Mercury to Mars, 0–2.2 AU)",children:"Inner (0–2 AU)"}),h.jsx("button",{className:`chip-btn ${Be==="full"?"active":""}`,onClick:()=>{Et("full"),Je(1),st.current={x:0,y:0}},title:"Full Solar System (All 8 Planets up to Neptune, 30 AU)",children:"Full (All 8)"})]}),h.jsxs("div",{className:"toolbar-group",children:[h.jsx("span",{className:"toolbar-label",children:"Camera:"}),h.jsx("button",{className:`chip-btn ${Ie==="sun"?"active":""}`,onClick:()=>it("sun"),children:"Center: Sun"}),h.jsxs("button",{className:`chip-btn ${Ie==="planet"?"active":""}`,onClick:()=>it("planet"),children:["Track: ",(ne==null?void 0:ne.name)||"Planet"]})]}),h.jsxs("div",{className:"toolbar-group",children:[h.jsxs("label",{className:"toggle-label",title:"Toggle orbital trails",children:[h.jsx("input",{type:"checkbox",checked:U,onChange:$=>O($.target.checked)}),h.jsx("span",{children:"Trails"})]}),h.jsxs("label",{className:"toggle-label",title:"Toggle velocity vectors",children:[h.jsx("input",{type:"checkbox",checked:Y,onChange:$=>P($.target.checked)}),h.jsx("span",{children:"v (Velocity)"})]}),h.jsxs("label",{className:"toggle-label",title:"Toggle gravitational attraction vectors",children:[h.jsx("input",{type:"checkbox",checked:W,onChange:$=>se($.target.checked)}),h.jsx("span",{children:"Fg (Gravity)"})]}),h.jsxs("label",{className:"toggle-label",title:"Toggle acceleration vectors",children:[h.jsx("input",{type:"checkbox",checked:j,onChange:$=>F($.target.checked)}),h.jsx("span",{children:"a (Accel)"})]}),h.jsxs("label",{className:"toggle-label",title:"Toggle planet name labels",children:[h.jsx("input",{type:"checkbox",checked:q,onChange:$=>te($.target.checked)}),h.jsx("span",{children:"Labels"})]}),h.jsxs("label",{className:"toggle-label",title:"Toggle AU distance reference rings",children:[h.jsx("input",{type:"checkbox",checked:_e,onChange:$=>be($.target.checked)}),h.jsx("span",{children:"AU Rings"})]})]}),h.jsxs("div",{className:"toolbar-group engine-toggle-group",children:[h.jsx("span",{className:"toolbar-label",children:"Engine:"}),h.jsx("button",{className:`chip-btn ${n==="3d"?"active":""}`,onClick:()=>s("3d"),title:"Photorealistic 3D WebGL Simulation",children:"3D WebGL"}),h.jsx("button",{className:`chip-btn ${n==="2d"?"active":""}`,onClick:()=>s("2d"),title:"2D Schematic Canvas",children:"2D Canvas"})]})]}),n==="3d"?h.jsx(Lm,{bodies:me.current,bodiesRef:me,selectedPlanetId:p,onSelectPlanet:x,scaleMode:Be,cameraFocus:Ie,onToggleCameraFocus:()=>it($=>$==="sun"?"planet":"sun"),showOrbits:I,showTrails:U,showVelocityVectors:Y,showForceVectors:W,showAccelVectors:j,showLabels:q,showGrid:_e,vectorScale:Le,isDark:i,metrics:ft}):h.jsxs("div",{className:"solar-canvas-box",children:[h.jsx("canvas",{ref:fe,className:"physics-canvas"}),h.jsx("div",{className:"canvas-hint",children:"Scroll to zoom • Click & drag to pan • Click any planet to inspect"})]}),h.jsxs("div",{className:"secondary-toggles-bar",children:[h.jsxs("div",{className:"vector-scale-group",children:[h.jsx("span",{className:"scale-label",children:"Vector Scale:"}),h.jsx("input",{type:"range",min:"0.3",max:"2.5",step:"0.1",value:Le,onChange:$=>ve(Number($.target.value)),className:"range-slider mini"}),h.jsxs("span",{className:"mono scale-val",children:[Le.toFixed(1),"x"]})]}),h.jsxs("div",{className:"scale-legend-info",children:[h.jsx("span",{className:"legend-tag",children:"Scale Mode:"}),h.jsx("span",{className:"legend-desc",children:Be==="inner"?"Inner System: Linear 0–2.2 AU (Mercury, Venus, Earth, Mars)":"Full System: Perceptual Power-Law 0–30.1 AU (All 8 Planets)"})]}),h.jsx("button",{className:"chip-btn",onClick:Me,title:"Clear orbital trail history",children:"Clear Trails"})]}),h.jsxs("div",{className:"solar-telemetry-bar",children:[h.jsxs("div",{className:"tel-stat",children:[h.jsx("span",{className:"tel-stat-label",children:"Elapsed Time"}),h.jsx("span",{ref:He,className:"tel-stat-val mono",children:"0.0 d"})]}),h.jsxs("div",{className:"tel-stat",children:[h.jsx("span",{className:"tel-stat-label",children:"Months / Years"}),h.jsx("span",{ref:le,className:"tel-stat-val mono",children:"0.00 yr"})]}),h.jsxs("div",{className:"tel-stat",children:[h.jsx("span",{className:"tel-stat-label",children:"Selected Distance"}),h.jsx("span",{ref:Ae,className:"tel-stat-val mono",children:"1.000 AU"})]}),h.jsxs("div",{className:"tel-stat",children:[h.jsx("span",{className:"tel-stat-label",children:"Distance (km)"}),h.jsx("span",{ref:Fe,className:"tel-stat-val mono",children:"149.6 M km"})]}),h.jsxs("div",{className:"tel-stat",children:[h.jsx("span",{className:"tel-stat-label",children:"Orbital Velocity"}),h.jsx("span",{ref:T,className:"tel-stat-val mono",children:"29.78 km/s"})]}),h.jsxs("div",{className:"tel-stat",children:[h.jsx("span",{className:"tel-stat-label",children:"Total Energy"}),h.jsx("span",{ref:z,className:"tel-stat-val mono",children:"— J"})]})]}),h.jsxs("div",{className:"planet-selector-strip",children:[h.jsx("span",{className:"strip-title",children:"Select Celestial Body:"}),h.jsx("div",{className:"strip-pills",children:(me.current||[]).map($=>h.jsxs("button",{className:`planet-pill ${p===$.id?"active":""}`,onClick:()=>x($.id),children:[h.jsx("span",{className:"pill-dot",style:{backgroundColor:$.color}}),h.jsx("span",{children:$.name})]},$.id))})]})]}),h.jsxs("aside",{className:"solar-sidebar",children:[h.jsxs("div",{className:"sidebar-card",children:[h.jsx("div",{className:"card-header",children:h.jsx("h3",{children:"Simulation Controls"})}),h.jsxs("div",{className:"action-button-row",children:[h.jsxs("button",{className:"primary-btn",onClick:()=>f($=>!$),children:[h.jsx(Jt,{name:g?"play":"pause",size:15}),h.jsx("span",{children:g?"Resume":"Pause"})]}),h.jsx("button",{className:"secondary-btn",onClick:he,title:"Advance simulation by 1 day",children:h.jsx("span",{children:"Step (+1d)"})}),h.jsxs("button",{className:"secondary-btn",onClick:oe,title:"Reset to default initial solar system",children:[h.jsx(Jt,{name:"reset",size:15}),h.jsx("span",{children:"Reset All"})]})]}),h.jsxs("div",{className:"control-field",children:[h.jsxs("label",{children:["Simulation Rate: ",h.jsxs("strong",{children:[o," days/sec"]})]}),h.jsx("div",{className:"speed-pills",children:[5,15,30,90,365,730].map($=>h.jsx("button",{className:`chip-btn ${o===$?"active":""}`,onClick:()=>c($),children:$>=365?`${($/365.25).toFixed(0)} yr/s`:`${$} d/s`},$))})]})]}),h.jsxs("div",{className:"sidebar-card",children:[h.jsx("div",{className:"card-header",children:h.jsx("h3",{children:"Gravitational Strength (G)"})}),h.jsxs("div",{className:"control-field",children:[h.jsxs("div",{className:"field-label-row",children:[h.jsx("label",{htmlFor:"gravity-multiplier",children:"Gravitational Constant Multiplier"}),h.jsxs("span",{className:"field-value mono",children:[r.toFixed(2),"x"]})]}),h.jsx("input",{id:"gravity-multiplier",type:"range",min:"0.1",max:"5.0",step:"0.05",value:r,onChange:$=>a(Number($.target.value)),className:"range-slider"}),h.jsx("div",{className:"gravity-presets-row",children:[.25,.5,1,1.5,2.5,4].map($=>h.jsxs("button",{className:`chip-btn ${r===$?"active":""}`,onClick:()=>a($),children:[$,"x"]},$))}),h.jsx("span",{className:"field-hint",children:"Alters universal gravity F = G·m₁m₂/r². Higher G contracts orbits into tighter ellipses; lower G expands them."})]})]}),h.jsxs("div",{className:"sidebar-card",children:[h.jsx("div",{className:"card-header",children:h.jsxs("h3",{children:["Modify ",(ne==null?void 0:ne.name)||"Planet"," Parameters"]})}),h.jsxs("div",{className:"control-field",children:[h.jsxs("div",{className:"field-label-row",children:[h.jsx("label",{children:"Mass Multiplier:"}),h.jsxs("span",{className:"field-value mono",children:[(C.massMultiplier||1).toFixed(2),"x"]})]}),h.jsx("input",{type:"range",min:"0.1",max:"10.0",step:"0.1",value:C.massMultiplier||1,onChange:$=>Re(p,Number($.target.value)),className:"range-slider"}),h.jsx("div",{className:"param-pills-row",children:[.2,.5,1,2,5,10].map($=>h.jsxs("button",{className:`chip-btn ${(C.massMultiplier||1)===$?"active":""}`,onClick:()=>Re(p,$),children:[$,"x"]},$))})]}),h.jsxs("div",{className:"control-field",children:[h.jsxs("div",{className:"field-label-row",children:[h.jsx("label",{children:"Initial Velocity Scale:"}),h.jsxs("span",{className:"field-value mono",children:[(C.velocityMultiplier||1).toFixed(2),"x"]})]}),h.jsx("input",{type:"range",min:"0.2",max:"2.0",step:"0.05",value:C.velocityMultiplier||1,onChange:$=>Ye(p,Number($.target.value)),className:"range-slider"}),h.jsxs("div",{className:"orbital-velocity-presets",children:[h.jsx("span",{className:"preset-title",children:"Orbital Speed Presets:"}),h.jsx("div",{className:"preset-buttons-grid",children:[{label:"50%",val:.5},{label:"75%",val:.75},{label:"100% (Circular)",val:1},{label:"125%",val:1.25},{label:"150% (Escape)",val:1.5}].map($=>h.jsx("button",{className:`chip-btn ${(C.velocityMultiplier||1)===$.val?"active":""}`,onClick:()=>Ye(p,$.val),children:$.label},$.val))})]})]}),h.jsx("button",{className:"reset-params-btn",onClick:()=>{Re(p,1),Ye(p,1)},children:"Restore Natural Planetary Mass & Velocity"})]}),h.jsxs("div",{className:"sidebar-card planet-info-card",children:[h.jsxs("div",{className:"card-header planet-card-header",children:[h.jsxs("div",{className:"planet-title-badge",children:[h.jsx("span",{className:"planet-color-dot",style:{backgroundColor:ne==null?void 0:ne.color}}),h.jsxs("h3",{children:[ne==null?void 0:ne.name," Telemetry"]})]}),h.jsx("span",{className:"planet-type-tag",children:(ne==null?void 0:ne.type)||"Celestial Body"})]}),h.jsxs("div",{className:"planet-metrics-list",children:[h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Current Mass:"}),h.jsxs("strong",{className:"mono",children:[ne!=null&&ne.mass?ne.mass.toExponential(3):"—"," kg"]})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Distance from Sun:"}),h.jsx("strong",{ref:Ae,className:"mono",children:"1.000 AU"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Orbital Velocity (v):"}),h.jsx("strong",{ref:T,className:"mono",children:"29.78 km/s"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Velocity (vx, vy):"}),h.jsxs("strong",{className:"mono",children:[h.jsx("span",{ref:v,children:"0.00"}),", ",h.jsx("span",{ref:G,children:"0.00"})]})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Gravitational Force:"}),h.jsx("strong",{ref:J,className:"mono",children:"— N"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Current Acceleration:"}),h.jsx("strong",{ref:Q,className:"mono",children:"— m/s²"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Kinetic Energy (K):"}),h.jsx("strong",{ref:de,className:"mono",children:"— J"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Potential Energy (U):"}),h.jsx("strong",{ref:pe,className:"mono",children:"— J"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Total Mechanical Energy:"}),h.jsx("strong",{ref:z,className:"mono highlight",children:"— J"})]}),h.jsxs("div",{className:"metric-row",children:[h.jsx("span",{children:"Eccentricity (e):"}),h.jsx("strong",{ref:Z,className:"mono",children:"—"})]})]})]})]})]}),e==="experiments"&&h.jsx(Kl,{onApplyExperiment:ue,onAddCustomBody:Ge,onRemoveCustomBody:Ze,customBodies:u,activeExperimentId:w}),e==="twobody"&&h.jsx(Yl,{bodies:me.current||[],gravityMultiplier:r}),e==="graphs"&&h.jsxs("div",{className:"graphs-tab-view",children:[h.jsxs("div",{className:"graphs-top-controls",children:[h.jsx("span",{className:"graphs-select-label",children:"Select Planet to Graph:"}),h.jsx("select",{value:p,onChange:$=>{x($.target.value),Ue([])},className:"level-dropdown",children:(me.current||[]).map($=>h.jsxs("option",{value:$.id,children:[$.name," (",$.isSun?"Sun":$.type||"Planet",")"]},$.id))}),h.jsx("span",{className:"graphs-hint-text",children:"Advance the simulation to populate graph data points in real time."})]}),h.jsx(ql,{graphHistory:Se,selectedPlanetName:(ne==null?void 0:ne.name)||"Selected Body",isIsolatedTwoBody:_!==null}),h.jsx($l,{selectedPlanet:ne,detailedMetrics:ft})]}),e==="theory"&&h.jsxs("div",{className:"solar-theory-view",children:[h.jsxs("div",{className:"theory-header",children:[h.jsx("h2",{children:"Newtonian Celestial Mechanics & Gravitation"}),h.jsx("p",{children:"In classical mechanics, the orbital paths of planetary bodies result from the balance between gravitational attraction and inertia according to Newton's universal laws."})]}),h.jsxs("div",{className:"theory-cards-grid",children:[h.jsxs("div",{className:"theory-box",children:[h.jsx("span",{className:"box-badge",children:"Fundamental Law"}),h.jsx("h3",{children:"Newton's Law of Universal Gravitation"}),h.jsx("p",{children:"Every point mass attracts every other point mass by a force acting along the line intersecting their centers:"}),h.jsx("div",{className:"formula-card mono",children:"F = G · (m₁ · m₂) / r²"}),h.jsxs("p",{className:"box-subtext",children:["Where ",h.jsx("strong",{children:"G = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²"}),", m₁ and m₂ are the interacting masses, and r is the separation distance."]})]}),h.jsxs("div",{className:"theory-box",children:[h.jsx("span",{className:"box-badge",children:"Centripetal Equilibrium"}),h.jsx("h3",{children:"Orbital Velocity"}),h.jsx("p",{children:"For a stable circular orbit, the gravitational pull supplies the requisite centripetal force: (m · v²) / r = G · (M · m) / r²."}),h.jsx("div",{className:"formula-card mono",children:"v_orbit = √( G · M_sun / r )"}),h.jsx("p",{className:"box-subtext",children:"Because orbital speed is inversely proportional to √r, inner planets like Mercury (47.4 km/s) move much faster than outer planets like Neptune (5.4 km/s)."})]}),h.jsxs("div",{className:"theory-box",children:[h.jsx("span",{className:"box-badge",children:"Keplerian Law"}),h.jsx("h3",{children:"Kepler's Third Law (Harmonic Law)"}),h.jsx("p",{children:"The square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit:"}),h.jsx("div",{className:"formula-card mono",children:"T² = ( 4π² / (G · M_sun) ) · a³"}),h.jsx("p",{className:"box-subtext",children:"This dictates why Earth's year is 365.25 days, while Neptune's year is nearly 165 Earth years."})]}),h.jsxs("div",{className:"theory-box",children:[h.jsx("span",{className:"box-badge",children:"Elliptical Geometry"}),h.jsx("h3",{children:"Circular vs. Elliptical Orbits"}),h.jsx("p",{children:"Real orbits have non-zero eccentricity (e). Speed varies throughout the orbit according to the Vis-Viva equation:"}),h.jsx("div",{className:"formula-card mono",children:"v² = G · M_sun · ( 2 / r − 1 / a )"}),h.jsx("p",{className:"box-subtext",children:"Planets travel fastest at perihelion (closest approach) and slowest at aphelion (farthest distance), conserving angular momentum."})]}),h.jsxs("div",{className:"theory-box",children:[h.jsx("span",{className:"box-badge",children:"Computational Method"}),h.jsx("h3",{children:"Velocity Verlet Numerical Integration"}),h.jsx("p",{children:"Standard Euler integration suffers from severe artificial energy gain over long orbits. Our simulation uses the symplectic Velocity Verlet integrator:"}),h.jsxs("div",{className:"formula-card mono",children:["r(t + Δt) = r(t) + v(t)Δt + ½ a(t)Δt²",h.jsx("br",{}),"v(t + Δt) = v(t) + ½ [a(t) + a(t + Δt)]Δt"]}),h.jsx("p",{className:"box-subtext",children:"This guarantees conservation of total mechanical energy and stable multi-year closed orbits."})]}),h.jsxs("div",{className:"theory-box",children:[h.jsx("span",{className:"box-badge",children:"Escape Boundary"}),h.jsx("h3",{children:"Escape Velocity (v_esc)"}),h.jsx("p",{children:"The minimum speed required for an object to overcome a celestial body's gravitational field without further propulsion:"}),h.jsx("div",{className:"formula-card mono",children:"v_esc = √( 2 · G · M_sun / r ) = √2 · v_circular"}),h.jsx("p",{className:"box-subtext",children:"If an orbit's speed exceeds √2 times its circular speed, the eccentricity exceeds 1.0 and the orbit transitions into a hyperbolic escape trajectory."})]})]})]})]})}function Ur(i,e,t,n,s,r,a){const o=e+n,c=t+s,l=6*a,d=Math.atan2(s,n);i.strokeStyle=r,i.lineWidth=1.8*a,i.beginPath(),i.moveTo(e,t),i.lineTo(o,c),i.stroke(),i.fillStyle=r,i.beginPath(),i.moveTo(o,c),i.lineTo(o-l*Math.cos(d-Math.PI/6),c-l*Math.sin(d-Math.PI/6)),i.lineTo(o-l*Math.cos(d+Math.PI/6),c-l*Math.sin(d+Math.PI/6)),i.closePath(),i.fill()}export{Im as default};
