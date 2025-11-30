// script.js — renders fixture + implements showTeam(team)
document.addEventListener('DOMContentLoaded', () => {
  // === FIXTURE DATA (32 matches) ===
  const matches = [
    {no:1,date:'13 Dec 2025',match:'Satpuda Super Kings vs Satpuda Royals',venue:'Satpuda Cricket Ground'},
    {no:2,date:'13 Dec 2025',match:'Satpuda Panthers vs Satpuda Blasters',venue:'Satpuda Cricket Ground'},
    {no:3,date:'13 Dec 2025',match:'Satpuda Warriors vs Satpuda Strikers',venue:'Satpuda Cricket Ground'},
    {no:4,date:'20 Dec 2025',match:'Satpuda Super Kings vs Satpuda Panthers',venue:'Satpuda Cricket Ground'},
    {no:5,date:'20 Dec 2025',match:'Satpuda Royals vs Satpuda Blasters',venue:'Satpuda Cricket Ground'},
    {no:6,date:'20 Dec 2025',match:'Satpuda Warriors vs Satpuda Super Kings',venue:'Satpuda Cricket Ground'},
    {no:7,date:'27 Dec 2025',match:'Satpuda Strikers vs Satpuda Panthers',venue:'Satpuda Cricket Ground'},
    {no:8,date:'27 Dec 2025',match:'Satpuda Blasters vs Satpuda Super Kings',venue:'Satpuda Cricket Ground'},
    {no:9,date:'27 Dec 2025',match:'Satpuda Royals vs Satpuda Warriors',venue:'Satpuda Cricket Ground'},
    {no:10,date:'03 Jan 2026',match:'Satpuda Panthers vs Satpuda Royals',venue:'Satpuda Cricket Ground'},
    {no:11,date:'03 Jan 2026',match:'Satpuda Strikers vs Satpuda Super Kings',venue:'Satpuda Cricket Ground'},
    {no:12,date:'03 Jan 2026',match:'Satpuda Blasters vs Satpuda Warriors',venue:'Satpuda Cricket Ground'},
    {no:13,date:'10 Jan 2026',match:'Satpuda Royals vs Satpuda Strikers',venue:'Satpuda Cricket Ground'},
    {no:14,date:'10 Jan 2026',match:'Satpuda Blasters vs Satpuda Strikers',venue:'Satpuda Cricket Ground'},
    {no:15,date:'10 Jan 2026',match:'Satpuda Panthers vs Satpuda Warriors',venue:'Satpuda Cricket Ground'},
    {no:16,date:'17 Jan 2026',match:'Satpuda Royals vs Satpuda Super Kings',venue:'Satpuda Cricket Ground'},
    {no:17,date:'17 Jan 2026',match:'Satpuda Blasters vs Satpuda Panthers',venue:'Satpuda Cricket Ground'},
    {no:18,date:'17 Jan 2026',match:'Satpuda Strikers vs Satpuda Warriors',venue:'Satpuda Cricket Ground'},
    {no:19,date:'24 Jan 2026',match:'Satpuda Royals vs Satpuda Blasters',venue:'Satpuda Cricket Ground'},
    {no:20,date:'24 Jan 2026',match:'Satpuda Super Kings vs Satpuda Warriors',venue:'Satpuda Cricket Ground'},
    {no:21,date:'24 Jan 2026',match:'Satpuda Panthers vs Satpuda Strikers',venue:'Satpuda Cricket Ground'},
    {no:22,date:'31 Jan 2026',match:'Satpuda Super Kings vs Satpuda Blasters',venue:'Satpuda Cricket Ground'},
    {no:23,date:'31 Jan 2026',match:'Satpuda Warriors vs Satpuda Royals',venue:'Satpuda Cricket Ground'},
    {no:24,date:'31 Jan 2026',match:'Satpuda Royals vs Satpuda Panthers',venue:'Satpuda Cricket Ground'},
    {no:25,date:'07 Feb 2026',match:'Satpuda Super Kings vs Satpuda Strikers',venue:'Satpuda Cricket Ground'},
    {no:26,date:'07 Feb 2026',match:'Satpuda Warriors vs Satpuda Blasters',venue:'Satpuda Cricket Ground'},
    {no:27,date:'07 Feb 2026',match:'Satpuda Strikers vs Satpuda Royals',venue:'Satpuda Cricket Ground'},
    {no:28,date:'14 Feb 2026',match:'Satpuda Strikers vs Satpuda Blasters',venue:'Satpuda Cricket Ground'},
    {no:29,date:'14 Feb 2026',match:'Satpuda Warriors vs Satpuda Panthers',venue:'Satpuda Cricket Ground'},
    {no:30,date:'14 Feb 2026',match:'Satpuda Panthers vs Satpuda Super Kings',venue:'Satpuda Cricket Ground'},
    {no:31,date:'21 Feb 2026',match:'Eliminator – Rank 2 vs Rank 3',venue:'Satpuda Cricket Ground'},
    {no:32,date:'28 Feb 2026',match:'Final – Rank 1 vs Winner of Eliminator',venue:'Satpuda Cricket Ground'}
  ];

  // DOM ref
  const tbody = document.getElementById('tbody');

  if(!tbody){
    console.error('tbody not found!');
    return;
  }

  // render function (adds data-label attributes for mobile stacked view)
  function render(list = matches){
    tbody.innerHTML = '';
    const data = list || matches;
    data.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="#">${m.no}</td>
        <td data-label="Date">${m.date}</td>
        <td data-label="Match">${m.match}</td>
        <td data-label="Venue">${m.venue}</td>
      `;
      tbody.appendChild(tr);
    });
    // scroll to top of table on mobile when rendering filtered list
    if(window.innerWidth <= 820){
      const tableBox = document.querySelector('.table-wrap') || tbody;
      tableBox.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }

  // showTeam is global (buttons use it); attach to window
  window.showTeam = function(team){
    if(!team || team === 'all' || team.toLowerCase() === 'all matches'){
      render(matches);
      removeHighlights();
      return;
    }
    const filtered = matches.filter(m => m.match.toLowerCase().includes(team.toLowerCase()));
    render(filtered);
    // highlight matching rows visually (desktop)
    document.querySelectorAll('#tbody tr').forEach(r => {
      if(r.innerText.toLowerCase().includes(team.toLowerCase())) r.classList.add('highlight');
      else r.classList.remove('highlight');
    });
  };

  function removeHighlights(){
    document.querySelectorAll('#tbody tr').forEach(r=>r.classList.remove('highlight'));
  }

  // initial render
  render();

  // small defensive: if buttons are added dynamically or not using onclick,
  // attach click listeners to any .team-buttons button elements to map their image/label to team name.
  document.querySelectorAll('.team-buttons button').forEach(btn => {
    // if button already has onclick="showTeam('...')" skip
    if(btn.onclick) return;
    // otherwise try to infer team text
    const txt = (btn.innerText || btn.textContent || '').trim();
    btn.addEventListener('click', ()=> {
      if(txt.toLowerCase().includes('all')) window.showTeam('all');
      else window.showTeam(txt);
    });
  });

  // helpful console logs
  console.log('fixture rendered:', matches.length, 'rows');
});