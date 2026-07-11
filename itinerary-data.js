(function exposeTripData(root) {
  const plan2 = {
    tripMeta: {
      title: "2026 日本楓葉家庭旅行",
      start: "2026/10/30",
      end: "2026/12/02",
      days: 34,
      nights: 33,
      route: "東京進、福岡出"
    },
    cities: [
      { id: "tokyo", name: "東京", dates: "10/30–11/5", nights: 6, accent: "blue" },
      { id: "kanazawa", name: "金澤", dates: "11/5–11/9", nights: 4, accent: "pine" },
      { id: "takayama", name: "高山", dates: "11/9–11/12", nights: 3, accent: "gold" },
      { id: "kyoto", name: "京都", dates: "11/12–11/24", nights: 12, accent: "maple" },
      { id: "hiroshima", name: "廣島", dates: "11/24–11/28", nights: 4, accent: "plum" },
      { id: "fukuoka", name: "福岡", dates: "11/28–12/2", nights: 4, accent: "orange" }
    ],
    days: [
      { city: "tokyo", date: "10/30", weekday: "五", title: "抵達東京、入住", kind: "move", effort: "低", note: "只在飯店附近吃飯與採買，不跨區。" },
      { city: "tokyo", date: "10/31", weekday: "六", title: "上野公園、東京國立博物館", kind: "visit", effort: "低至中", note: "景點集中；有體力再逛阿美橫町。" },
      { city: "tokyo", date: "11/1", weekday: "日", title: "淺草寺、仲見世、隅田川", kind: "visit", effort: "中", note: "早上先到淺草寺，午後可直接回飯店。" },
      { city: "tokyo", date: "11/2", weekday: "一", title: "東京車站、丸之內、銀座", kind: "visit", effort: "低", note: "平坦路線與室內空間為主。" },
      { city: "tokyo", date: "11/3", weekday: "二", title: "明治神宮、新宿御苑", kind: "visit", effort: "中", note: "文化之日，人潮過多就提早收工。" },
      { city: "tokyo", date: "11/4", weekday: "三", title: "橫濱半日或東京自由活動", kind: "rest", effort: "低至中", note: "隔天移動，優先休息與整理行李。" },

      { city: "kanazawa", date: "11/5", weekday: "四", title: "北陸新幹線前往金澤", kind: "move", effort: "低", note: "入住後只逛近江町市場或車站周邊。" },
      { city: "kanazawa", date: "11/6", weekday: "五", title: "兼六園、金澤城公園", kind: "foliage", effort: "中", note: "兩處相鄰，不再追加遠距離景點。" },
      { city: "kanazawa", date: "11/7", weekday: "六", title: "東茶屋街、主計町", kind: "visit", effort: "中", note: "早上先到，午後找茶屋坐下休息。" },
      { city: "kanazawa", date: "11/8", weekday: "日", title: "長町武家屋敷、尾山神社", kind: "rest", effort: "低", note: "半日慢遊；大行李宅配到京都。" },

      { city: "takayama", date: "11/9", weekday: "一", title: "白川鄉半日、高山入住", kind: "move", effort: "中", note: "只帶三晚小行李，兩段高速巴士都先預約。" },
      { city: "takayama", date: "11/10", weekday: "二", title: "宮川朝市、高山陣屋、古街", kind: "visit", effort: "中", note: "景點集中在老城區，午後回飯店休息。" },
      { city: "takayama", date: "11/11", weekday: "三", title: "飛驒之里、溫泉或咖啡", kind: "rest", effort: "低", note: "不去奧飛驒，保留體力給隔天長途移動。" },

      { city: "kyoto", date: "11/12", weekday: "四", title: "經名古屋前往京都、入住", kind: "move", effort: "低", note: "抵達後只在京都站周邊散步。" },
      { city: "kyoto", date: "11/13", weekday: "五", title: "南禪寺、永觀堂", kind: "foliage", effort: "中", note: "京都第一個賞楓日，兩處相鄰。" },
      { city: "kyoto", date: "11/14", weekday: "六", title: "宇治：平等院、宇治川、茶屋", kind: "foliage", effort: "中", note: "週末離開市中心，行程集中在車站步行圈。" },
      { city: "kyoto", date: "11/15", weekday: "日", title: "京都御苑、自由午餐", kind: "rest", effort: "低", note: "第一個正式休息日，也可以只出門吃飯。" },
      { city: "kyoto", date: "11/16", weekday: "一", title: "嵐山、天龍寺、渡月橋", kind: "foliage", effort: "中", note: "早上抵達，不安排猴子公園。" },
      { city: "kyoto", date: "11/17", weekday: "二", title: "奈良：東大寺、奈良公園", kind: "visit", effort: "中至高", note: "車站到東大寺搭巴士，春日大社看體力。" },
      { city: "kyoto", date: "11/18", weekday: "三", title: "清水寺、三年坂、祇園", kind: "foliage", effort: "中至高", note: "搭車到上方，再順坡往下走。" },
      { city: "kyoto", date: "11/19", weekday: "四", title: "金閣寺、龍安寺", kind: "foliage", effort: "中", note: "只排兩座寺院，以計程車或巴士串接。" },
      { city: "kyoto", date: "11/20", weekday: "五", title: "東福寺、伏見稻荷下段", kind: "foliage", effort: "中", note: "東福寺為主，伏見稻荷不登山。" },
      { city: "kyoto", date: "11/21", weekday: "六", title: "大阪：中之島、大阪站周邊", kind: "visit", effort: "中", note: "大阪城與道頓堀依興趣二選一。" },
      { city: "kyoto", date: "11/22", weekday: "日", title: "京都植物園、北山", kind: "foliage", effort: "低", note: "可依當週紅葉前線替換成狀況最好的景點。" },
      { city: "kyoto", date: "11/23", weekday: "一", title: "休息、洗衣、附近午餐", kind: "rest", effort: "低", note: "國定假日與賞楓高峰，刻意不排名勝。" },

      { city: "hiroshima", date: "11/24", weekday: "二", title: "新幹線前往廣島", kind: "move", effort: "低", note: "不拖行李停姬路，入住後只逛車站周邊。" },
      { city: "hiroshima", date: "11/25", weekday: "三", title: "宮島、嚴島神社、紅葉谷", kind: "foliage", effort: "中", note: "核心賞楓日；纜車看天氣，不走彌山山頂。" },
      { city: "hiroshima", date: "11/26", weekday: "四", title: "平和紀念公園、資料館", kind: "visit", effort: "低至中", note: "午後安排咖啡或回飯店休息。" },
      { city: "hiroshima", date: "11/27", weekday: "五", title: "縮景園、廣島城外苑", kind: "rest", effort: "低至中", note: "天氣好且有精神，才改去岩國錦帶橋。" },

      { city: "fukuoka", date: "11/28", weekday: "六", title: "新幹線前往博多、入住", kind: "move", effort: "低", note: "午後只走櫛田神社、川端或博多站。" },
      { city: "fukuoka", date: "11/29", weekday: "日", title: "友泉亭公園、大濠公園", kind: "foliage", effort: "低至中", note: "兩處之間搭計程車，減少轉乘。" },
      { city: "fukuoka", date: "11/30", weekday: "一", title: "太宰府天滿宮、竈門神社", kind: "foliage", effort: "中", note: "晚秋紅葉主日，太宰府到竈門神社搭車。" },
      { city: "fukuoka", date: "12/1", weekday: "二", title: "天神、博多購物", kind: "rest", effort: "低", note: "也是下雨時的賞楓備用日，晚上整理行李。" },
      { city: "fukuoka", date: "12/2", weekday: "三", title: "前往福岡機場、返台", kind: "move", effort: "低", note: "依航班時間安排，不追加景點。" }
    ]
  };

  const makeDays = (rows) => rows.map(([city, date, weekday, title, kind, effort, note]) => ({
    city, date, weekday, title, kind, effort, note
  }));

  Object.assign(plan2, {
    id: "plan2",
    routeNotes: [
      ["大行李", "11/8 從金澤宅配到京都，高山三晚只帶小行李。"],
      ["賞楓主場", "京都 11/13–22、宮島 11/25、福岡 11/29–30。"],
      ["票券", "長距離分段試算；不要為了 JR Pass 改動休息日。"]
    ],
    travelRules: [
      ["移動日不塞景點。", "入住、吃飯、熟悉車站就夠了。"],
      ["熱門景點早點去。", "午後找地方坐，晚上不追回行程。"],
      ["京都依楓況交換。", "11/13–22 的景點順序保留彈性。"],
      ["計程車也是交通。", "三個人一起搭，常比多次轉車舒服。"]
    ],
    ticketNote: "不先綁全國 JR Pass。依東京至金澤、北陸與西日本各段實際票價再比較。"
  });
  Object.assign(plan2.tripMeta, {
    label: "方案 2｜平衡版",
    kicker: "方案 2 已定案",
    theme: "maple",
    heroTitle: "楓葉平衡版",
    lead: "東京進、福岡出。兼顧紅葉、休息與移動，帶爸媽一路舒服往西。",
    rhythm: "紅葉與休息平衡",
    routeTitle: "只換五次飯店，\n一路往西不回頭。"
  });

  const plan1 = {
    id: "plan1",
    tripMeta: {
      title: "2026 日本家庭旅行｜完整環日本壯遊版", label: "方案 1｜壯遊版", kicker: "完整環日本壯遊版",
      theme: "rail", heroTitle: "從北海道一路到九州", start: "2026/10/30", end: "2026/12/02",
      days: 34, nights: 33, route: "函館進、福岡出", lead: "從函館出發，沿鐵道一路南下，旅行感最完整，也保留固定休息日。",
      rhythm: "七大定點縱走", routeTitle: "七個定點，\n從北到南慢慢走。"
    },
    cities: [
      { id: "hakodate", name: "函館", dates: "10/30–11/3", nights: 4, accent: "blue" },
      { id: "sendai", name: "仙台", dates: "11/3–11/7", nights: 4, accent: "pine" },
      { id: "tokyo", name: "東京", dates: "11/7–11/12", nights: 5, accent: "plum" },
      { id: "kanazawa", name: "金澤", dates: "11/12–11/16", nights: 4, accent: "gold" },
      { id: "kyoto", name: "京都", dates: "11/16–11/23", nights: 7, accent: "maple" },
      { id: "hiroshima", name: "廣島", dates: "11/23–11/27", nights: 4, accent: "orange" },
      { id: "fukuoka", name: "福岡", dates: "11/27–12/2", nights: 5, accent: "pine" }
    ],
    days: makeDays([
      ["hakodate","10/30","五","抵達函館、入住","move","低","只在飯店附近吃飯，不安排夜景。"],
      ["hakodate","10/31","六","元町、紅磚倉庫、海灣區","visit","中","山坡區搭市電與計程車，午後回飯店。"],
      ["hakodate","11/1","日","五稜郭公園、湯之川溫泉","foliage","低至中","景點集中，溫泉作為休息。"],
      ["hakodate","11/2","一","見晴公園／香雪園","rest","低","函館晚秋主日；天候不好就完全休息。"],
      ["sendai","11/3","二","新幹線前往仙台","move","低","文化之日，不追加景點。"],
      ["sendai","11/4","三","瑞鳳殿、定禪寺通","visit","中","以觀光巴士減少轉乘。"],
      ["sendai","11/5","四","松島：瑞巖寺、海岸散步","visit","中","不加長距離步道。"],
      ["sendai","11/6","五","鳴子峽日歸或仙台休息","rest","高・可選","楓況、天氣與體力不好就取消。"],
      ["tokyo","11/7","六","新幹線前往東京","move","低","抵達後只在車站周邊用餐。"],
      ["tokyo","11/8","日","淺草寺、仲見世、隅田川","visit","中","早上出門，午後回飯店。"],
      ["tokyo","11/9","一","明治神宮、新宿御苑","visit","中","只排西東京一個區域。"],
      ["tokyo","11/10","二","完全休息、洗衣","rest","低","不安排補進度。"],
      ["tokyo","11/11","三","橫濱或鎌倉二選一","visit","中至高・可選","橫濱較平坦；鎌倉較有古都感。"],
      ["kanazawa","11/12","四","北陸新幹線前往金澤","move","低","入住後只逛近江町市場或車站。"],
      ["kanazawa","11/13","五","兼六園、金澤城公園","foliage","中","兩處相鄰，不追加遠距離景點。"],
      ["kanazawa","11/14","六","東茶屋街、主計町","visit","中","午後找茶屋坐下休息。"],
      ["kanazawa","11/15","日","長町武家屋敷、自由活動","rest","低","半日慢遊並整理行李。"],
      ["kyoto","11/16","一","經敦賀前往京都","move","低","抵達後只在京都站周邊活動。"],
      ["kyoto","11/17","二","南禪寺、永觀堂","foliage","中","兩處相鄰，早上出門。"],
      ["kyoto","11/18","三","嵐山：天龍寺、渡月橋","foliage","中","不去猴子公園。"],
      ["kyoto","11/19","四","京都御苑、完全休息","rest","低","可整天留在飯店。"],
      ["kyoto","11/20","五","奈良：東大寺、奈良公園","visit","中至高","春日大社依體力決定。"],
      ["kyoto","11/21","六","清水寺、三年坂、祇園","foliage","中至高","搭車到上方，再順坡往下。"],
      ["kyoto","11/22","日","東福寺、伏見稻荷下段","foliage","中","伏見稻荷不登山。"],
      ["hiroshima","11/23","一","新幹線前往廣島","move","低","勤勞感謝之日，不排名勝。"],
      ["hiroshima","11/24","二","宮島、嚴島神社、紅葉谷","foliage","中","纜車看天氣，不走彌山山頂。"],
      ["hiroshima","11/25","三","平和紀念公園、資料館","visit","低至中","午後回飯店休息。"],
      ["hiroshima","11/26","四","縮景園或完全休息","rest","低","不安排跨縣日歸。"],
      ["fukuoka","11/27","五","新幹線前往福岡","move","低","抵達後只在博多站周邊活動。"],
      ["fukuoka","11/28","六","大濠公園、舞鶴公園","visit","低","平坦散步，午後休息。"],
      ["fukuoka","11/29","日","友泉亭公園、福岡市內賞楓","foliage","低至中","友泉亭通常週一休園。"],
      ["fukuoka","11/30","一","太宰府天滿宮、竈門神社","foliage","中","以巴士或計程車銜接。"],
      ["fukuoka","12/1","二","天神、博多購物、整理行李","rest","低","也是雨天備用日。"],
      ["fukuoka","12/2","三","前往福岡機場、返台","move","低","不追加景點。"]
    ]),
    routeNotes: [
      ["交通策略", "函館至東京可先試算 6 日 JR 東日本・南北海道周遊券。"],
      ["休息節奏", "鳴子峽與橫濱／鎌倉都是可取消日，不追回進度。"],
      ["行李", "跨區移動前一晚宅配，大移動日只帶一晚小包。"]
    ],
    travelRules: [
      ["壯遊不等於趕路。", "每個基地至少留一個低體力日。"],
      ["高體力日可取消。", "鳴子峽與近郊日看天氣、楓況與爸媽精神。"],
      ["長途移動只做一件事。", "移動日抵達後只用餐與入住。"],
      ["票券服務行程。", "不為了回本改動休息日。"]
    ],
    ticketNote: "先比較 6 日 JR 東日本・南北海道周遊券與 7 日北陸拱型周遊券；全國 21 日券目前 100,000 日圓，試算後才買。"
  };

  const plan3 = {
    id: "plan3",
    tripMeta: {
      title: "2026 日本家庭旅行｜三大區域孝親版", label: "方案 3｜孝親版", kicker: "三大區域孝親慢遊版",
      theme: "pine", heroTitle: "東京、關西、九州慢慢住", start: "2026/10/30", end: "2026/12/02",
      days: 34, nights: 33, route: "東京進、福岡出", lead: "四間飯店，只換三次。每天慢慢出門，累了就把遠郊改成休息。",
      rhythm: "最多休息日", routeTitle: "真正三大定點，\n四間飯店只換三次。"
    },
    cities: [
      { id: "tokyo", name: "東京", dates: "10/30–11/9", nights: 10, accent: "blue" },
      { id: "umeda", name: "大阪梅田", dates: "11/9–11/15", nights: 6, accent: "gold" },
      { id: "kyoto", name: "京都", dates: "11/15–11/22", nights: 7, accent: "maple" },
      { id: "fukuoka", name: "福岡", dates: "11/22–12/2", nights: 10, accent: "pine" }
    ],
    days: makeDays([
      ["tokyo","10/30","五","抵達東京、入住","move","低","飯店附近吃飯與採買，不跨區。"],
      ["tokyo","10/31","六","上野公園、東京國立博物館","visit","低至中","有體力再逛阿美橫町。"],
      ["tokyo","11/1","日","淺草寺、仲見世、隅田川","visit","中","早上出門，午後回飯店。"],
      ["tokyo","11/2","一","東京車站、丸之內、銀座","rest","低","平坦路線與室內空間為主。"],
      ["tokyo","11/3","二","明治神宮、新宿御苑","visit","中","人潮多就提早收工。"],
      ["tokyo","11/4","三","橫濱港未來、山下公園","visit","中","以海濱散步與室內用餐為主。"],
      ["tokyo","11/5","四","完全休息或飯店附近散步","rest","低","不安排補進度。"],
      ["tokyo","11/6","五","鎌倉：鶴岡八幡宮、長谷寺","visit","中至高・可選","搭巴士或江之電縮短步行。"],
      ["tokyo","11/7","六","日光／河口湖／箱根三選一","visit","高・可取消","天候不好就留在東京。"],
      ["tokyo","11/8","日","自由活動、整理行李","rest","低","隔天移動，不加景點。"],
      ["umeda","11/9","一","新幹線前往大阪梅田","move","低","抵達後只熟悉車站與用餐。"],
      ["umeda","11/10","二","梅田、中之島、大阪站周邊","visit","低","第一天只走市中心平坦路線。"],
      ["umeda","11/11","三","大阪城公園、天滿橋","visit","中","是否進城依排隊與體力決定。"],
      ["umeda","11/12","四","完全休息、梅田用餐","rest","低","洗衣、午睡或百貨公司慢逛。"],
      ["umeda","11/13","五","神戶：北野或港區二選一","visit","中・可選","不把山坡北野與港區塞在同一天。"],
      ["umeda","11/14","六","姬路城或岡山二選一","visit","中至高・可選","只選一座城市。"],
      ["kyoto","11/15","日","移動至京都、入住","move","低","大行李短程宅配或計程車銜接。"],
      ["kyoto","11/16","一","南禪寺、永觀堂","foliage","中","兩處相鄰，早上出門。"],
      ["kyoto","11/17","二","嵐山：天龍寺、渡月橋","foliage","中","不去猴子公園。"],
      ["kyoto","11/18","三","京都御苑、附近午餐","rest","低","可整天留在飯店。"],
      ["kyoto","11/19","四","奈良：東大寺、奈良公園","visit","中至高・可選","春日大社依體力決定。"],
      ["kyoto","11/20","五","清水寺、三年坂、祇園","foliage","中至高","搭車到上方，再順坡往下。"],
      ["kyoto","11/21","六","東福寺、伏見稻荷下段","foliage","中","伏見稻荷不登山。"],
      ["fukuoka","11/22","日","新幹線前往福岡","move","低","抵達後只在博多站附近活動。"],
      ["fukuoka","11/23","一","完全休息、博多站附近吃飯","rest","低","國定假日不排名勝。"],
      ["fukuoka","11/24","二","大濠公園、舞鶴公園","visit","低","平坦散步，下午回飯店。"],
      ["fukuoka","11/25","三","太宰府天滿宮、竈門神社","foliage","中","以巴士或計程車銜接。"],
      ["fukuoka","11/26","四","完全休息","rest","低","不安排補進度。"],
      ["fukuoka","11/27","五","長崎或熊本二選一","visit","高・可取消","只選一座城市；也可改福岡市內。"],
      ["fukuoka","11/28","六","福岡市博物館、百道海濱","visit","低至中","下雨改室內為主。"],
      ["fukuoka","11/29","日","友泉亭公園、福岡市內賞楓","foliage","低至中","友泉亭通常週一休園。"],
      ["fukuoka","11/30","一","柳川日歸或福岡休息","rest","中・可取消","不去別府；累了就留在福岡。"],
      ["fukuoka","12/1","二","天神、博多購物、整理行李","rest","低","也是雨天備用日。"],
      ["fukuoka","12/2","三","前往福岡機場、返台","move","低","不追加景點。"]
    ]),
    routeNotes: [
      ["真正三大區域", "東京 10 晚、關西 13 晚、福岡 10 晚；關西只分梅田與京都兩間飯店。"],
      ["遠郊可取消", "日光／河口湖／箱根、長崎／熊本都不是必修。"],
      ["行李", "東京送梅田、梅田短程送京都、京都送福岡。"]
    ],
    travelRules: [
      ["每四至五天休息。", "休息日不拿來補前一天沒走完的景點。"],
      ["遠郊只選一個。", "連續兩天早出晚歸就取消下一個遠郊。"],
      ["京都一天一區。", "紅葉景點依當週楓況交換，不連續暴走。"],
      ["別府不排。", "九州遠郊保留長崎、熊本或柳川。"]
    ],
    ticketNote: "不建議全國 14 日 JR Pass。跨區先買單程票；確定長崎或熊本後，再比較北九州 JR Pass。"
  };

  const trips = { plan1, plan2, plan3 };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = trips;
  }

  if (root) {
    root.JAPAN_TRIPS = trips;
  }
})(typeof window !== "undefined" ? window : null);
