(async function(){
  const res = await fetch('./data/config.json');
  const cfg = await res.json();

  // Discord リンク
  const discordLink = document.getElementById('discord-link');
  if(discordLink && cfg.discordInvite){
    discordLink.href = cfg.discordInvite;
  }

  // サーバー IP
  const ip = cfg.testServer?.address ?? '';
  const version = cfg.testServer?.mcVersion ?? '—';
  const notes = cfg.testServer?.notes ?? '—';
  const ipEl1 = document.getElementById('server-ip');
  const ipEl2 = document.getElementById('server-ip-2');
  if(ipEl1) ipEl1.textContent = ip || '未設定';
  if(ipEl2) ipEl2.textContent = ip || '未設定';
  const verEl = document.getElementById('mc-version');
  if(verEl) verEl.textContent = version;
  const notesEl = document.getElementById('server-notes');
  if(notesEl) notesEl.textContent = notes;

  // コピー
  const copyBtn = document.getElementById('copy-ip');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      if(!ip) return alert('アドレスが未設定です');
      await navigator.clipboard.writeText(ip);
      copyBtn.textContent = 'コピーしました!';
      setTimeout(()=> copyBtn.textContent = 'サーバーアドレスをコピー', 1400);
    });
  }

  // ニュース
  const ul = document.getElementById('news-list');
  ul.innerHTML = '';
  (cfg.news || []).forEach(n => {
    const li = document.createElement('li');
    li.className = 'news-item';
    li.innerHTML = `<b>${n.title}</b><br><small>${n.date}</small><p>${n.body}</p>`;
    ul.appendChild(li);
  });

  // フッター
  document.getElementById('year').textContent = new Date().getFullYear();
  const gh = document.getElementById('github-link');
  if(gh && cfg.githubRepo){ gh.href = `https://github.com/${cfg.githubRepo}`; }
})();