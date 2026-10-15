// Wolkenleser-Demo (vorgeschriebene Antworten) + Buchungs-Mock. Keine Daten werden gesendet.
(function(){
  var A = {
    fly: {q:"Fliegen wir morgen?", a:[
      "Stand jetzt: ja, sieht gut aus. 🟢 Für 7:45 sind 8 km/h Westwind gemeldet, die Wolken bleiben über 2.600 Metern.",
      "Endgültig entscheidet Lisa, deine Pilotin, um 18 Uhr nach dem Abendcheck. Um 6 Uhr schaut sie noch einmal. Ich sag dir sofort Bescheid."], ampel:"g"},
    angst: {q:"Ich hab ein bisserl Höhenangst.", a:[
      "Damit bist du nicht allein. Viele merken in der Luft nichts davon, weil man nirgends hinunterschaut wie von einer Kante. Man sitzt eher wie in einem Sessel.",
      "Sag's Lisa beim Briefing heute Abend, dann fliegt sie extra ruhig und erklärt dir vorher jeden Schritt. Und du kannst jederzeit Nein sagen, auch noch am Startplatz."]},
    regen: {q:"Was, wenn's regnet?", a:[
      "Dann wird nicht geflogen, Sicherheit geht vor. Dein Flug rutscht auf Samstag, das ist euer Wetter-Joker. 🌦️",
      "Für morgen Vormittag hätte ich als Plan B die Dachsteinhöhlen um 10:15 oder eine Talwanderung zum Wasserfall. Soll ich etwas davon reservieren?"], ampel:"y"},
    zug: {q:"Wie komm ich hin?", a:[
      "Mit der Salzkammergutbahn bis Obertraun-Dachsteinhöhlen, von dort fährt der Bus zur Talstation der Seilbahn. 🚆",
      "Die letzte Bergfahrt für Hüttengäste ist im Juni um 16:30. Nimm also spätestens einen Zug, der mittags ankommt, dann bleibt Zeit fürs Groundhandling am See."]},
    see: {q:"Was seh ich da unten?", a:[
      "Unter dir liegt der Hallstätter See, gut 8 Kilometer lang und an der tiefsten Stelle rund 125 Meter tief.",
      "Links am Ufer siehst du Hallstatt. Im Berg dahinter wird seit über 7.000 Jahren Salz abgebaut, länger als fast überall sonst auf der Welt. Davon hat die Gegend ihren Namen: Salzkammergut."]}
  };
  var msgs=document.getElementById('msgs'), chips=document.getElementById('chips'), ampel=document.getElementById('ampel');
  function add(text,cls){var d=document.createElement('div');d.className='msg '+cls;d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d;}
  function setAmpel(c){
    if(!c)return; var l=ampel.querySelectorAll('.lights i');
    l.forEach(function(i){i.classList.remove('on')});
    ampel.querySelector('.lights .'+c).classList.add('on');
    ampel.querySelector('div:last-child').innerHTML = c==='g'
      ? '<b>Flugampel morgen, 7:45</b><br>Wind West 8 km/h, Basis 2.600 m.<br>Sieht gut aus. Entscheidung 18:00.'
      : '<b>Flugampel morgen, 7:45</b><br>Regenschauer ab 7 Uhr möglich.<br>Wackelig. Wetter-Joker Samstag ist frei.';
  }
  if(chips){chips.addEventListener('click',function(e){
    var b=e.target.closest('.chip'); if(!b||b.disabled)return;
    var item=A[b.dataset.q]; var all=chips.querySelectorAll('.chip'); all.forEach(function(c){c.disabled=true});
    add(item.q,'me'); var t=add('Wolkenleser schreibt …','bot typing'); var i=0;
    function next(){ if(i<item.a.length){ setTimeout(function(){ if(i===0){t.remove();} add(item.a[i],'bot'); i++; if(i<item.a.length){t=add('Wolkenleser schreibt …','bot typing'); setTimeout(function(){t.remove();next();},600);} else {setAmpel(item.ampel); all.forEach(function(c){c.disabled=false}); b.disabled=true;} }, i===0?700:0);} }
    next();
  });}

  // Buchungs-Mock
  var f=document.getElementById('bookform'); if(!f)return;
  var pers=document.getElementById('pers'), oeffi=document.getElementById('oeffi'), zweiter=document.getElementById('zweiter'), summe=document.getElementById('summe');
  function calc(){var n=Math.max(1,Math.min(6,parseInt(pers.value||1,10))); var p=590-(oeffi.checked?30:0)+(zweiter.checked?170:0); summe.textContent='€ '+String(n*p).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
  [pers,oeffi,zweiter].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}); calc();
  f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('toast').classList.add('show');});
})();
