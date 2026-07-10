(function exposeTripData(root) {
  const trip = {
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

  if (typeof module !== "undefined" && module.exports) {
    module.exports = trip;
  }

  if (root) {
    root.JAPAN_TRIP = trip;
  }
})(typeof window !== "undefined" ? window : null);
