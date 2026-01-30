const SHEET_NAME = "Reports";

function doGet(e) {
  const action = (e.parameter.action || "").toLowerCase();
  if (action === "list") return listReports(e);
  return json({ ok: false, error: "Unknown action" });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || "{}");
  const action = (body.action || "").toLowerCase();
  if (action === "create") return createReport(body);
  if (action === "setstatus") return setStatus(body);
  return json({ ok: false, error: "Unknown action" });
}

function listReports(e) {
  const site = e.parameter.site || "";
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const values = sh.getDataRange().getValues();
  const headers = values[0];
  const rows = values.slice(1).map(r => Object.fromEntries(headers.map((h,i)=>[h,r[i]])));

  const filtered = site ? rows.filter(x => String(x.site) === String(site)) : rows;
  filtered.sort((a,b)=> (new Date(b.timestamp) - new Date(a.timestamp)));
  return json({ ok:true, data: filtered });
}

function createReport(body) {
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);

  const id = new Date().getTime(); // unique enough for this use
  const now = new Date();

  const row = [
    id,
    now.toISOString(),
    body.site || "",
    body.area || "",
    body.type || "",
    body.item || "",
    body.desc || "",
    body.urgency || "רגיל",
    "פתוח",
    body.imageUrl || ""
  ];

  sh.appendRow(row);
  return json({ ok:true, id });
}

function setStatus(body) {
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const id = String(body.id || "");
  const status = String(body.status || "");

  const values = sh.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf("id");
  const statusCol = headers.indexOf("status");
  if (idCol === -1 || statusCol === -1) return json({ok:false, error:"Missing columns: id/status"});

  for (let i=1; i<values.length; i++) {
    if (String(values[i][idCol]) === id) {
      sh.getRange(i+1, statusCol+1).setValue(status);
      return json({ok:true});
    }
  }
  return json({ok:false, error:"Not found"});
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
