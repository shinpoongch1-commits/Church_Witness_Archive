/* 인물 페이지 (people.html?p=이름): 제목·소개글 → [인적사항] [증언] [다운로드] 탭
   좌측 이름 목록은 data/site.js의 인물 side, 제목·소개글은 data/site.js의 people
   내용은 모달과 같은 원본·같은 모양 (인적사항 = data/people/영문이름.js, 증언 = data/intvw/영문이름.js, 증언은 번호마다 접기·펼치기)
   다운로드 = 증언(문답) 원문만: PDF(브라우저 인쇄 창의 'PDF로 저장') / Word(.docx)·텍스트(.txt)는 바로 받음, 파일 이름은 "이름 문답"
   ?p= 가 없으면(people.html) 목록의 첫 사람을 보여 줌 */
(function () {
  var S = window.SITE, V = S.view, D = S.people;
  var first = S.menu.filter(function (m) { return m.id === "people"; })[0].side[0].items[0].name;
  var name = new URLSearchParams(location.search).get("p") || first;
  var witness = S.menu.filter(function (m) { return m.id === "people"; })[0].side[0].items.some(function (i) { return i.name === name; });   /* 1013: 질문자는 증언 원문이 없어 [인적사항]만 */
  var app = document.getElementById("app");
  app.innerHTML = '<div class="page-head"><h1 class="eyebrow">' + D.title + '</h1><p class="lede">' + D.lede + "</p></div>" +
    '<section class="sec"><div class="vt"><button type="button">인적사항</button>' + (witness ? '<button type="button">증언</button><button type="button">다운로드</button>' : "") + '</div>' +
    '<div class="modal-body on-page"></div></section>';
  var tabs = app.querySelectorAll(".vt button"), box = app.querySelector(".on-page");
  function show(i) {
    for (var k = 0; k < tabs.length; k++) tabs[k].className = k === i ? "on" : "";
    if (i === 2) {
      box.innerHTML = '<p class="desc">' + name + ' 문답(증언 원문)을 내려받습니다. PDF는 인쇄 창이 열리면 대상에서 ‘PDF로 저장’을 고르세요.</p>' +
        '<div class="dls"><button type="button" class="dl">PDF</button><button type="button" class="dl">Word(.docx)</button><button type="button" class="dl">텍스트(.txt)</button></div>';
      var b = box.querySelectorAll(".dl");
      b[0].onclick = pdf; b[1].onclick = function () { file("docx"); }; b[2].onclick = function () { file("txt"); };
      return;
    }
    V.load(i ? "intvw" : "people", name, function (d) {
      box.innerHTML = d ? (i ? V.intvw(d, true) : V.person(d)) : '<p class="note">자료를 찾지 못했습니다.</p>';
    });
  }
  function pdf() {   /* 인쇄용으로 문답 전체(펼친 상태)를 잠시 붙였다가 인쇄 뒤 지움 */
    V.load("intvw", name, function (d) {
      if (!d) return;
      var t = document.title, p = document.createElement("div");
      p.className = "modal-body on-page print-only"; p.innerHTML = V.intvw(d);
      document.body.appendChild(p); document.title = d.title;
      window.addEventListener("afterprint", function () { document.title = t; p.remove(); }, { once: true });   /* 인쇄 창이 닫힌 뒤에 지움 */
      window.print();
    });
  }
  function file(kind) {   /* Word·텍스트: 원문(data/intvw/영문이름.js)으로 그 자리에서 파일을 만들어 받음 */
    V.load("intvw", name, function (d) {
      if (!d) return;
      var lines = [["h1", d.title]].concat(d.note ? [["note", d.note]] : []);
      d.sections.forEach(function (s, i) {
        lines.push(["h2", (i + 1) + ". " + s.title]);
        s.qa.forEach(function (x) { lines.push(x.q !== undefined ? ["q", "문: " + x.q] : ["a", "답: " + x.a]); });
      });
      var blob = kind === "txt"
        ? new Blob(["\ufeff" + lines.map(function (l) { return (l[0] === "h2" ? "\n" : "") + l[1]; }).join("\n")], { type: "text/plain;charset=utf-8" })
        : docx(lines);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = d.title + "." + kind;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
  }
  function docx(lines) {   /* 최소 Word 문서: 문서 내용 xml 3개를 zip(압축 없이)으로 묶음 */
    function x(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    var st = { h1: '<w:b/><w:sz w:val="36"/>', h2: '<w:b/><w:sz w:val="26"/>', note: '<w:color w:val="6B6A64"/><w:sz w:val="20"/>', q: '<w:color w:val="6B6A64"/>', a: "" };
    var body = lines.map(function (l) {
      return '<w:p><w:pPr><w:spacing w:before="' + (l[0] === "h2" ? 360 : 0) + '" w:after="120"/></w:pPr><w:r><w:rPr><w:rFonts w:eastAsia="맑은 고딕"/>' + st[l[0]] + "</w:rPr><w:t xml:space=\"preserve\">" + x(l[1]) + "</w:t></w:r></w:p>";
    }).join("");
    var head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
    return zip([
      ["[Content_Types].xml", head + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'],
      ["_rels/.rels", head + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
      ["word/document.xml", head + '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + body + "</w:body></w:document>"]
    ]);
  }
  function zip(files) {   /* 압축 없는 zip (docx 껍데기) */
    var enc = new TextEncoder(), parts = [], dir = [], off = 0, crcT = [];
    for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crcT[n] = c >>> 0; }
    function crc(b) { var c = -1; for (var i = 0; i < b.length; i++) c = crcT[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; }
    function le(v, n) { var a = []; for (var i = 0; i < n; i++) a.push((v >>> (8 * i)) & 255); return a; }
    files.forEach(function (f) {
      var nm = enc.encode(f[0]), dt = enc.encode(f[1]), c = crc(dt);
      var common = [].concat(le(20, 2), le(0x800, 2), le(0, 2), le(0, 4), le(c, 4), le(dt.length, 4), le(dt.length, 4), le(nm.length, 2));
      var local = new Uint8Array([].concat(le(0x04034b50, 4), common, le(0, 2)));
      parts.push(local, nm, dt);
      dir.push(new Uint8Array([].concat(le(0x02014b50, 4), le(20, 2), common, le(0, 2), le(0, 2), le(0, 2), le(0, 2), le(0, 4), le(off, 4))), nm);
      off += local.length + nm.length + dt.length;
    });
    var size = dir.reduce(function (s, b) { return s + b.length; }, 0);
    var end = new Uint8Array([].concat(le(0x06054b50, 4), le(0, 4), le(files.length, 2), le(files.length, 2), le(size, 4), le(off, 4), le(0, 2)));
    return new Blob(parts.concat(dir, [end]), { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  }
  for (var k = 0; k < tabs.length; k++) tabs[k].onclick = show.bind(null, k);
  show(0);
  if (!location.search) {   /* people.html로 들어오면 첫 사람 이름도 현재 위치로 표시 */
    var a = document.querySelector('.side a[href="people.html?p=' + first + '"]');
    if (a) a.className = "on";
  }
})();
