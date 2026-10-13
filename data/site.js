/* 사이트 공통 설정: 로고·메뉴·footer·메인 문구는 여기서만 고칩니다 */
window.SITE = {
  
  menu: [
    { id: "home",     name: "홈",               href: "index.html" },
    { id: "son",     name: "손양원 목사",       href: "son.html",
      side: [
        { title: "손양원 목사", href: "son.html", items: [{ name: "사택위치", href: "son_loca.html" }, { name: "사택경제", href: "son_economy.html" }, { name: "설교현장", href: "son_sermon.html" }] }
      ] },
    { id: "jeong",    name: "정양순 사모",       href: "jeong.html",
      /* 좌측 메뉴(side): 이 메뉴에 속한 페이지(data-page="jeong")에 나타남. href 없는 항목은 흐리게 표시 */
      side: [
        { title: "정양순 사모", href: "jeong.html", items: [{ name: "애양원", href: "jeong_aeyang.html" }, { name: "경제", href: "jeong_economy.html" } ] },
        { title: "정양순 사모 개척", items: [{ name: "신앙 조력자", href: "jeong_supporter.html" }, { name: "사택위치", href: "jeong_loca.html" }, { name: "가정예배", href: "jeong_service.html" }, { name: "에피소드", href: "jeong_episodes.html" }] }
      ] },
    { id: "seongkwang", name: "성광교회",           href: "seongkwang.html",
      side: [
        { title: "성광교회 개척", href: "seongkwang.html", items: [{ name: "전국모금", href: "seongkwang_fund.html" }, { name: "건축과정", href: "seongkwang_build.html" }] },
        { title: "성광·성암 착공·준공", href: "seongkwang_order.html", items: [/*{ name: "돌 예배당 착공·준공", href: "seongkwang_order.html" }*/ ] },
        { title: "남문교회", href: "seongkwang_nammun.html", items: [] }
      ] },
    { id: "shinpung", name: "신풍교회",            href: "shinpung.html",
      side: [
        { title: "신풍교회", href: "shinpung.html", items: [{ name: "백영희 목사와 인연", href: "shinpung_paik.html" }, { name: "총공회 소속 변경", href: "shinpung_split.html" }] }
      ] },
    /* 1013 연대기(timeline.html) 메뉴 삭제 */
    { id: "people", name: "인물·증언",            href: "people.html",
      /* 1012 인물: 이름 가나다순. 페이지는 people.html?p=이름 하나로 그림 (내용은 data/people/영문이름.js, data/intvw/영문이름.js) — href를 넣으면 연결 */
      side: [
        { title: "증언자", href: "people.html", items: [{ name: "강위상", href: "people.html?p=강위상" },
          { name: "류우열", href: "people.html?p=류우열" },
          { name: "문순금", href: "people.html?p=문순금" },
          { name: "박창호", href: "people.html?p=박창호" },
          { name: "손활인", href: "people.html?p=손활인" },
          { name: "심보라", href: "people.html?p=심보라" },
          { name: "오동원", href: "people.html?p=오동원" },
          { name: "유완종", href: "people.html?p=유완종" },
          { name: "이길수", href: "people.html?p=이길수" },
          { name: "이진석", href: "people.html?p=이진석" },
          { name: "차병용", href: "people.html?p=차병용" },
          { name: "차상희", href: "people.html?p=차상희" },
          { name: "차요한", href: "people.html?p=차요한" },
          { name: "차진후", href: "people.html?p=차진후" } ] },
        { title: "질문자 이영인", href: "people.html?p=이영인", items: [] }   /* 1013 질문자: 인적사항만 */
      ] }
    /* 1013 자료실(archive.html) 메뉴 삭제 — 필요해지면 { id: "archive", name: "자료실", href: "archive.html" } 다시 추가 */
  ],
  /* 1001 추가: 모달이 읽는 자료 위치 ({name} 자리에 이름이 들어감) */
  source: { intvw: "data/intvw/{name}.js", people: "data/people/{name}.js" },
  /* 1013 파일 이름 대응표: 화면·주소(people.html?p=강위상)는 한글 이름, 실제 파일은 영문 이름 (서버 인코딩 문제 방지)
     새 증언자를 넣을 때는 data/intvw·data/people에 영문 이름 파일을 만들고 여기에 한 줄 추가 */
  files: {
    "강위상": "kang-wisang",
    "류우열": "ryu-uyeol",
    "문순금": "mun-sungeum",
    "박창호": "park-changho",
    "손활인": "son-hwalin",
    "심보라": "sim-bora",
    "오동원": "oh-dongwon",
    "유완종": "yu-wanjong",
    "이길수": "lee-gilsu",
    "이진석": "lee-jinseok",
    "차병용": "cha-byeongyong",
    "차상희": "cha-sanghui",
    "차요한": "cha-yohan",
    "차진후": "cha-jinhu",
    "이영인": "lee-youngin"
  },
  /* 1012 인물 페이지 제목·소개글 */
  people: { title: "인물 정보·증언", lede: "증언자와 질문자의 인적 사항과 신앙 걸음을 볼 수 있습니다." },
  /* 1013 질문자 이름: 질문 줄·원문 안내·인물 정보 참고에서 이 이름을 누르면 인물 정보(data/people/lee-youngin.js)가 열림 */
  asker: "이영인",
  /* footer: credit = 1013 모든 페이지 맨 아래 만든 이 한 줄 (이름·주소 링크는 <a>로 직접) */
  footer: { addr: "전남 여수 여순로 419-5", email: "pkist.net@gmail.com",
    credit: "구술 기록 · 여수 신풍교회 · 질문 <a class=\"js-modal\" href=\"#\" data-person=\"이영인\">이영인</a> 목사 · 총공회 목회연구소(<a href=\"https://pkist.net/\" target=\"_blank\" rel=\"noopener\">pkist.net</a>)" },
  /* 1013 메인 (그리는 코드: assets/page-home.js) — 위에서부터 첫 화면 → 만든 이 → 증언으로 살펴보는 사실 → 질문 2개 → 이어진 신앙 노선
     연도 구간은 '~'로 씀 */
  home: {
    eyebrow: "구술 증언 기록",
    title: "‘항상 두 길, 오직 한 길’",
    motto: "바른 신앙 노선을 지키기 위해<br>넓은 길이 아닌 좁은 길을 택했습니다.",
    lede: "1950년 손양원 목사가 순교한 뒤 애양원은 총회파를 택했고, 정양순 사모는 고려파 신앙 노선을 지켰습니다. 애양원과 함께했다면 쉽고 편한 신앙의 길을 걸어갈 수 있었지만, 사모는 좁은 밝은 진리의 빛을 좇으며 홀로 가정예배를 드렸고 훗날 성광교회 돌 예배당을 개척하게 됩니다.",
    photo: "images/church.png",
    photoCaption: "성광교회 돌 예배당",
    /* 만든 이 밝힘 (첫 화면 바로 아래) */
    about: "이 기록은 여수 신풍교회가 2009년부터 2013년까지 증언자 열네 분을 찾아가 면담한 내용을 정리한 것입니다. 면담 대부분은 신풍교회 <a class=\"js-modal\" href=\"#\" data-person=\"이영인\">이영인</a> 목사가 질문했으며, 총공회 목회연구소(<a href=\"https://pkist.net/\" target=\"_blank\" rel=\"noopener\">pkist.net</a>)에서 공개합니다. 증언은 말한 그대로 두었고, 서로 엇갈리는 부분은 엇갈린 대로 보여 드립니다.",
    /* 증언으로 살펴보는 사실: 시기 / 시기 설명 / 제목 / 설명 / 증언자 수 / 이동할 주소
       증언자 수 = 그 페이지 증언자 이름 수 (1013 기준: 애양원 10, 가정예배·사택위치 10, 전국모금·건축과정 9) */
    scenesTitle: "증언으로 살펴보는 사실",
    scenesLede: "한 사람이 아니라 여러 사람이 서로 다른 자리에서 기억하는 장면입니다.",
    scenes: [
      { when: "1950~51", note: "순교·제명", title: "애양원과 갈라서다", desc: "총회파에 선 애양원과 고려파 노선을 지킨 정양순 사모", count: 10, href: "jeong_aeyang.html" },
      { when: "1951·52~1952·53년", note: "추정", title: "홀로 가정예배를 드리다", desc: "신앙 노선을 지키며 이어 간 가정예배, 성광교회의 출발", count: 10, href: "jeong_service.html" },
      { when: "1952·53~1956·57년", note: "추정", title: "돌 예배당을 세우다", desc: "전국 모금과 돌·모래·목재를 마련한 건축 과정", count: 9, href: "seongkwang_build.html" }
    ],
    /* 질문 2개: 제목 / 설명 / 링크 문구 / 이동할 주소 */
    questions: [
      { title: "성암교회와 성광교회의 착공 시기는 언제인가?", desc: "정양순 사모 가정예배로 출발한 성광교회의 개척 시기에 대한 증언을 연도별로 추정해 봅니다.", more: "연도별로 보기", href: "seongkwang_order.html" },
      { title: "신풍교회의 뿌리는 어디인가?", desc: "1975년 출발한 신풍교회의 원뿌리에 대해 증언을 통해 알아봅니다.", more: "증언 보기", href: "shinpung_paik.html#jeong" }
    ],
    /* 이어진 신앙 노선: 이름 / 한 줄 / 이동할 주소 */
    flowTitle: "이어진 신앙 노선",
    flowLede: "손양원 목사에서 지금의 신풍교회까지",
    flow: [
      { name: "손양원 목사", desc: "~1950 순교",     href: "son.html" },
      { name: "정양순 사모", desc: "가정예배",       href: "jeong.html" },
      { name: "성광교회",    desc: "돌 예배당 개척", href: "seongkwang.html" },
      { name: "신풍교회",    desc: "1975~ 총공회",   href: "shinpung.html" }
    ],
    flowNote: "그 신앙 노선은 1975년 백영희 목사의 예수교장로회 한국총공회로 이어져, 지금 신풍교회가 지키고 있습니다."
  }
};
