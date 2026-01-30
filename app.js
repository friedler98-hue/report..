// === CONFIG ===
// 1) After you deploy your Google Apps Script Web App, paste its URL here.
// Example: https://script.google.com/macros/s/AKfycb.../exec
const API_URL = "https://script.google.com/macros/s/AKfycbyC27tcmToOXoGphRcyaBdDZFJrjcbBOutpeawlf4hIQMvzujQWo6OEZRsp8mn7eh3l/exec";

// 2) Update your sites list here (names shown in the Home screen)
const SITES = ["בן גביר","אורית סטרוק","ארז","אורן","מוריה","זוקף מוריה","אגוז","ורד","אוקליפטוס","זוקף אוקליפטוס","זוקף סביון"];

function qs(name){ return new URLSearchParams(location.search).get(name); }

function escapeHtml(s){
  return String(s||"").replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]));
}

function formatTime(iso){
  const d = new Date(iso);
  if (isNaN(d)) return String(iso||"");
  const hh = String(d.getHours()).padStart(2,"0");
  const mm = String(d.getMinutes()).padStart(2,"0");
  const ss = String(d.getSeconds()).padStart(2,"0");
  const ymd = d.toISOString().slice(0,10);
  return `${hh}:${mm}:${ss} ${ymd}`;
}

async function apiList(site){
  const url = `${API_URL}?action=list${site ? `&site=${encodeURIComponent(site)}` : ""}`;
  const res = await fetch(url);
  return await res.json();
}

async function apiCreate(payload){
  const res = await fetch(API_URL, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ action:"create", ...payload })
  });
  return await res.json();
}

async function apiSetStatus(id, status){
  const res = await fetch(API_URL, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ action:"setstatus", id, status })
  });
  return await res.json();
}
